"""
master/master_node.py
----------------------
The MASTER NODE of your distributed system.

Responsibilities (matches your proposal's System Design Approach - Section on
Master Node):
    - Worker registration & health tracking
    - Task distribution (splitting an image job into batches)
    - Load balancing (choosing which worker gets which batch)
    - Result collection / aggregation

Run it with:
    uvicorn distributed_system.master.master_node:app --host 0.0.0.0 --port 8000 --reload

Then open http://<master-ip>:8000/docs for an interactive API tester (Swagger UI).
"""

import asyncio
import time
import uuid
import logging
import json
import httpx
import joblib
import pandas as pd
from typing import Dict, List
from pathlib import Path
from distributed_system import worker
from distributed_system.shared.logger import CommunicationLogger
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from distributed_system.master.models import WorkerRecord
from distributed_system.master.state import (
    PROJECT_ROOT,
    workers,
)


from distributed_system.shared.schemas import (
    RegisterRequest,
    HeartbeatRequest,
    WorkerStatus,
    ImageTask,
    ProcessBatchRequest,
    ProcessBatchResponse,
    SubmitJobRequest,
    JobStatus,
    ClassificationResult,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [MASTER] %(message)s")
log = logging.getLogger("master")

LOG_FILE = PROJECT_ROOT / "cad_anomaly_detection" / "logs" / "communication_logs.csv"
MODEL_PATH = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "models"
    / "isolation_forest.pkl"
)
logger = CommunicationLogger(LOG_FILE)
try:
    isolation_model = joblib.load(MODEL_PATH)
    log.info("Isolation Forest model loaded successfully.")
except Exception as e:
    isolation_model = None
    log.error(f"Failed to load Isolation Forest model: {e}")

# =====================================================
# Live anomaly log file
# =====================================================

LIVE_LOG = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "logs"
    / "live_anomaly_logs.csv"
)

COMMUNICATION_LOG = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "logs"
    / "communication_logs.csv"
)

import csv
import os

def log_live_prediction(
    worker_id,
    response_time,
    message_size,
    prediction,
    anomaly_score
):
    file_exists = os.path.exists(LIVE_LOG)

    with open(LIVE_LOG, "a", newline="") as f:

        writer = csv.writer(f)

        if not file_exists:
            writer.writerow([
                "timestamp",
                "worker_id",
                "response_time_ms",
                "message_size_bytes",
                "prediction",
                "anomaly_score"
            ])

        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            worker_id,
            round(response_time, 2),
            message_size,
            prediction,
            round(anomaly_score, 5)
        ])

app = FastAPI(title="Distributed Image Classifier - Master Node")

# ---------------------------------------------------------------------------
# IN-MEMORY STATE
# For your FYP prototype, in-memory dicts are fine. If you later want
# persistence across restarts, this is where you'd swap in SQLite/PostgreSQL
# (which your proposal already lists as a deliverable).
# ---------------------------------------------------------------------------

workers: Dict[str, WorkerRecord] = {}
jobs: Dict[str, dict] = {}  # job_id -> {status, total_images, results: []}

HEARTBEAT_TIMEOUT_SECONDS = 15  # worker considered offline if no heartbeat in this window


# ---------------------------------------------------------------------------
# WORKER REGISTRATION & HEALTH
# ---------------------------------------------------------------------------

@app.post("/register")
def register_worker(req: RegisterRequest):
    """A worker calls this once on startup to join the pool."""
    workers[req.worker_id] = WorkerRecord(
        worker_id=req.worker_id,
        host=req.host,
        port=req.port,
        max_capacity=req.max_capacity,
        last_heartbeat=time.time(),
    )
    log.info(f"Worker registered: {req.worker_id} at {req.host}:{req.port} "
             f"(capacity={req.max_capacity})")
    return {"message": f"Worker {req.worker_id} registered successfully"}


@app.post("/heartbeat")
def heartbeat(req: HeartbeatRequest):
    """Workers ping this every few seconds so the master knows they're alive
    and how busy they currently are. This is the foundation your CAD module
    (Week 7) will later analyze for abnormal communication patterns."""
    if req.worker_id not in workers:
        raise HTTPException(404, "Unknown worker - please /register first")
    w = workers[req.worker_id]
    w.active_tasks = req.active_tasks
    w.status = req.status
    w.last_heartbeat = time.time()
    return {"message": "ok"}


def _mark_stale_workers_offline():
    now = time.time()
    for w in workers.values():
        if now - w.last_heartbeat > HEARTBEAT_TIMEOUT_SECONDS:
            w.status = WorkerStatus.OFFLINE


@app.get("/workers")
def list_workers():
    """Dashboard-friendly view of all known workers and their load."""
    _mark_stale_workers_offline()
    return {
        wid: {
            "host": w.host,
            "port": w.port,
            "status": w.status,
            "active_tasks": w.active_tasks,
            "max_capacity": w.max_capacity,
            "load_ratio": round(w.load_ratio, 2),
            "seconds_since_heartbeat": round(time.time() - w.last_heartbeat, 1),
        }
        for wid, w in workers.items()
    }


# ---------------------------------------------------------------------------
# LOAD BALANCING
# ---------------------------------------------------------------------------

def get_available_workers() -> List[WorkerRecord]:
    _mark_stale_workers_offline()
    return [w for w in workers.values() if w.status != WorkerStatus.OFFLINE]


def select_workers_for_job(num_batches: int) -> List[WorkerRecord]:
    """
    LEAST-LOADED (least-connections) load balancing strategy.

    Why least-loaded instead of simple round-robin?
    Round-robin assumes every worker is equally fast and equally free, which
    isn't true once workers finish batches at different speeds (e.g. if one
    machine is slower, or already mid-task). Least-loaded picks whichever
    worker currently has the smallest active_tasks/max_capacity ratio, so
    faster/free workers naturally get more of the queue. This is the same
    idea production load balancers (e.g. nginx 'least_conn') use.

    You can swap this out for round-robin later and compare results for your
    Testing phase (Week 9) - that comparison makes a great report section.
    """
    available = get_available_workers()
    if not available:
        raise HTTPException(503, "No workers available")

    # sort ascending by load_ratio -> least busy first
    ranked = sorted(available, key=lambda w: w.load_ratio)
    # cycle through ranked workers to cover num_batches, re-ranking isn't
    # strictly necessary for a single job submission since active_tasks is
    # updated optimistically below
    chosen = []
    for i in range(num_batches):
        chosen.append(ranked[i % len(ranked)])
    return chosen


def split_into_batches(images: List[ImageTask], num_batches: int) -> List[List[ImageTask]]:
    """Task scheduling: divide the image list into roughly equal batches."""
    num_batches = max(1, num_batches)
    batches = [[] for _ in range(num_batches)]
    for i, img in enumerate(images):
        batches[i % num_batches].append(img)
    return [b for b in batches if b]  # drop empty batches


# ---------------------------------------------------------------------------
# JOB SUBMISSION / TASK DISTRIBUTION / RESULT AGGREGATION
# ---------------------------------------------------------------------------

async def _send_batch_to_worker(
    client: httpx.AsyncClient,
    worker: WorkerRecord,
    job_id: str,
    batch_id: str,
    images: List[ImageTask]
):
    payload = ProcessBatchRequest(
        job_id=job_id,
        batch_id=batch_id,
        images=images
    )

    worker.active_tasks += len(images)

    try:
        # -----------------------------
        # Start timer
        # -----------------------------
        start_time = time.perf_counter()

        # Send request to worker
        resp = await client.post(
            f"{worker.base_url}/process",
            json=payload.model_dump(),
            timeout=60
        )

        resp.raise_for_status()

        # -----------------------------
        # Stop timer
        # -----------------------------
        end_time = time.perf_counter()

        response_time_ms = (end_time - start_time) * 1000

        # Size of response message
        message_size = len(resp.content)

        # -----------------------------
        # Save communication log
        # -----------------------------
        logger.log(
            worker_id=worker.worker_id,
            endpoint="/process",
            response_time_ms=response_time_ms,
            message_size_bytes=message_size,
            status="normal"
        )

        # -----------------------------
        # Create feature vector
        # -----------------------------
        current_time = datetime.now()

        feature_vector = pd.DataFrame(
        [[
            response_time_ms,
            message_size,
            0,      # worker_id_encoded
            0,      # endpoint_encoded
            1,      # status_encoded (normal)
            current_time.hour,
            current_time.weekday()
        ]],
        columns=[
            "response_time_ms",
            "message_size_bytes",
            "worker_id_encoded",
            "endpoint_encoded",
            "status_encoded",
            "hour",
            "day_of_week"
        ]
        )
        # -----------------------------
        # Isolation Forest Prediction
        # -----------------------------

        if isolation_model is not None:

            prediction = isolation_model.predict(feature_vector)[0]
            score = isolation_model.decision_function(feature_vector)[0]

            if prediction == -1:

                result = "Anomaly"

                log.warning(
                    f"Anomalous communication detected from {worker.worker_id}"
                )

            else:

                result = "Normal"

                log.info(
                    f"Communication with {worker.worker_id} is normal."
                )

            log_live_prediction(
                worker.worker_id,
                response_time_ms,
                message_size,
                result,
                score
            )
        return ProcessBatchResponse(**resp.json())

    except Exception as e:

        logger.log(
            worker_id=worker.worker_id,
            endpoint="/process",
            response_time_ms=0,
            message_size_bytes=0,
            status="error"
        )

        log.error(
            f"Batch {batch_id} failed on worker {worker.worker_id}: {e}"
        )

        return None

    finally:
        worker.active_tasks = max(
            0,
            worker.active_tasks - len(images)
        )
        
@app.post("/submit_job")
async def submit_job(req: SubmitJobRequest):
    """
    Client entry point: 'here are N images, classify them across the cluster.'

    Flow:
      1. Pick how many batches to split into (one per available worker, so
         they all work in parallel)
      2. Task scheduler splits the image list into batches
      3. Load balancer assigns each batch to the least-loaded worker
      4. Batches are sent CONCURRENTLY (asyncio.gather) - this is the actual
         parallel processing your proposal promises
      5. Results are aggregated back at the master
    """
    if not req.images:
        raise HTTPException(400, "No images provided")

    available = get_available_workers()
    if not available:
        raise HTTPException(503, "No workers available - start a worker first")

    job_id = str(uuid.uuid4())[:8]
    num_batches = min(len(available), len(req.images))
    batches = split_into_batches(req.images, num_batches)
    assigned_workers = select_workers_for_job(len(batches))

    jobs[job_id] = {"status": JobStatus.IN_PROGRESS, "total_images": len(req.images), "results": []}
    log.info(f"Job {job_id}: {len(req.images)} images -> {len(batches)} batches "
             f"across {len(set(w.worker_id for w in assigned_workers))} workers")

    start = time.time()
    async with httpx.AsyncClient() as client:
        tasks = [
            _send_batch_to_worker(client, worker, job_id, f"{job_id}-b{i}", batch)
            for i, (worker, batch) in enumerate(zip(assigned_workers, batches))
        ]
        responses = await asyncio.gather(*tasks)

    all_results: List[ClassificationResult] = []
    failed_batches = 0
    for r in responses:
        if r is None:
            failed_batches += 1
            continue
        all_results.extend(r.results)

    elapsed = round(time.time() - start, 3)
    jobs[job_id]["status"] = JobStatus.COMPLETED
    jobs[job_id]["results"] = [r.model_dump() for r in all_results]
    jobs[job_id]["elapsed_seconds"] = elapsed
    jobs[job_id]["failed_batches"] = failed_batches

    return {
        "job_id": job_id,
        "status": "completed",
        "images_classified": len(all_results),
        "batches_sent": len(batches),
        "failed_batches": failed_batches,
        "elapsed_seconds": elapsed,
    }


@app.get("/job/{job_id}")
def get_job(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    return jobs[job_id]


@app.get("/")
def root():
    return {
        "service": "Distributed Image Classifier - Master Node",
        "workers_registered": len(workers),
        "docs": "/docs",
    }
