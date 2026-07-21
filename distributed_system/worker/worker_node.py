"""
worker/worker_node.py
-----------------------
A WORKER NODE. You'll run one copy of this per physical machine (or per
process, for local testing). Each worker:

1. Registers itself with the master on startup.
2. Sends periodic heartbeats reporting its current load.
3. Exposes /process, which the master calls to hand it a batch of images.
4. Classifies each image and returns results.

For local testing:

Worker 1:
    uvicorn distributed_system.worker.worker_node:app --host 0.0.0.0 --port 8001 --reload

Worker 2:
    uvicorn distributed_system.worker.worker_node:app --host 0.0.0.0 --port 8002 --reload

Worker 3:
    uvicorn distributed_system.worker.worker_node:app --host 0.0.0.0 --port 8003 --reload

The Master Node should run on:

    uvicorn distributed_system.master.master_node:app --host 0.0.0.0 --port 8000 --reload
"""

import argparse
import asyncio
import logging
import threading
import time
import httpx
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI

from distributed_system.shared.schemas import (
    RegisterRequest,
    HeartbeatRequest,
    WorkerStatus,
    ProcessBatchRequest,
    ProcessBatchResponse,
    ClassificationResult,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [WORKER] %(message)s")
log = logging.getLogger("worker")

# ---------------------------------------------------------------------------
# CONFIG (filled in from CLI args in __main__)
# ---------------------------------------------------------------------------
CONFIG = {
    "worker_id": "worker1",
    "host": "0.0.0.0",       # address to bind the server on
    "advertise_host": "127.0.0.1",  # address the MASTER should use to reach this worker
    "port": 8001,
    "master_url": "http://localhost:8000",
    "max_capacity": 4,
}

active_tasks_lock = threading.Lock()
active_tasks_count = 0


# ---------------------------------------------------------------------------
# PLACEHOLDER CLASSIFIER
# ---------------------------------------------------------------------------
#
# >>> THIS IS THE ONLY FUNCTION YOU NEED TO REPLACE LATER <<<
#
# Right now your teammates haven't finished training EfficientNet-B0 /
# MobileNetV3, and the "best performing model" hasn't been selected yet.
# This placeholder lets you build, test, and demo the ENTIRE distributed
# pipeline (scheduling, load balancing, concurrency, result aggregation)
# without waiting on them.
#
# When Specific Objective 2 is done (best model selected), replace the body
# of classify_image() with real inference. Everything else in this file
# (registration, heartbeats, batch handling) stays exactly the same -
# that's the whole point of the master-worker separation.
#
# Example of what the real version will look like (commented out below).

import random

def classify_image(image_path: str) -> tuple[str, float, float]:
    """Returns (predicted_label, confidence, inference_time_ms)."""
    start = time.time()

    # --- PLACEHOLDER (remove once real model is plugged in) ---
    time.sleep(random.uniform(0.05, 0.2))  # simulate inference latency
    fake_labels = ["cat", "dog", "car", "airplane", "bird", "person"]
    label = random.choice(fake_labels)
    confidence = round(random.uniform(0.70, 0.99), 4)
    # -----------------------------------------------------------

    # --- REAL VERSION (uncomment once ResNet50/best model is ready) ---
    # import torch
    # from torchvision import transforms
    # from PIL import Image
    #
    # model = load_model_once()  # cache this globally, don't reload per call
    # img = Image.open(image_path).convert("RGB")
    # tensor = preprocess(img).unsqueeze(0)
    # with torch.no_grad():
    #     output = model(tensor)
    #     probs = torch.softmax(output, dim=1)
    #     conf, idx = torch.max(probs, dim=1)
    #     label = IMAGENET_CLASSES[idx.item()]
    #     confidence = conf.item()
    # ---------------------------------------------------------------

    elapsed_ms = round((time.time() - start) * 1000, 2)
    return label, confidence, elapsed_ms


# ---------------------------------------------------------------------------
# MASTER COMMUNICATION
# ---------------------------------------------------------------------------

async def register_with_master():
    req = RegisterRequest(
        worker_id=CONFIG["worker_id"],
        host=CONFIG["advertise_host"],
        port=CONFIG["port"],
        max_capacity=CONFIG["max_capacity"],
    )
    async with httpx.AsyncClient() as client:
        for attempt in range(5):
            try:
                resp = await client.post(f"{CONFIG['master_url']}/register", json=req.model_dump(), timeout=5)
                resp.raise_for_status()
                log.info(f"Registered with master at {CONFIG['master_url']}")
                return
            except Exception as e:
                log.warning(f"Registration attempt {attempt+1}/5 failed: {e}. Retrying in 2s...")
                await asyncio.sleep(2)
        log.error("Could not register with master after 5 attempts. "
                   "Is the master running and reachable?")


async def heartbeat_loop():
    async with httpx.AsyncClient() as client:
        while True:
            try:
                with active_tasks_lock:
                    count = active_tasks_count
                req = HeartbeatRequest(
                    worker_id=CONFIG["worker_id"],
                    active_tasks=count,
                    status=WorkerStatus.BUSY if count > 0 else WorkerStatus.IDLE,
                )
                await client.post(f"{CONFIG['master_url']}/heartbeat", json=req.model_dump(), timeout=5)
            except Exception as e:
                log.warning(f"Heartbeat failed: {e}")
            await asyncio.sleep(5)


# ---------------------------------------------------------------------------
# FASTAPI APP
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    await register_with_master()
    hb_task = asyncio.create_task(heartbeat_loop())
    yield
    hb_task.cancel()

app = FastAPI(title="Distributed Image Classifier - Worker Node", lifespan=lifespan)


@app.post("/process", response_model=ProcessBatchResponse)
async def process_batch(req: ProcessBatchRequest):
    global active_tasks_count
    with active_tasks_lock:
        active_tasks_count += len(req.images)

    log.info(f"Job {req.job_id} batch {req.batch_id}: classifying {len(req.images)} image(s)")
    results = []
    for img in req.images:
        label, conf, ms = classify_image(img.image_path)
        results.append(ClassificationResult(
            image_id=img.image_id, predicted_label=label,
            confidence=conf, inference_time_ms=ms,
        ))

    with active_tasks_lock:
        active_tasks_count -= len(req.images)

    return ProcessBatchResponse(
        worker_id=CONFIG["worker_id"], job_id=req.job_id,
        batch_id=req.batch_id, results=results,
    )


@app.get("/")
def root():
    return {"worker_id": CONFIG["worker_id"], "status": "online",
            "active_tasks": active_tasks_count}


# ---------------------------------------------------------------------------
# ENTRY POINT
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--worker-id", default="worker1")
    parser.add_argument("--host", default="0.0.0.0", help="address to BIND the server on")
    parser.add_argument("--advertise-host", default="127.0.0.1",
                         help="address the MASTER should use to reach this worker "
                              "(use this machine's LAN IP for multi-machine setups)")
    parser.add_argument("--port", type=int, default=9001)
    parser.add_argument("--master-url", default="http://localhost:8000")
    parser.add_argument("--max-capacity", type=int, default=4)
    args = parser.parse_args()

    CONFIG.update({
        "worker_id": args.worker_id,
        "host": args.host,
        "advertise_host": args.advertise_host,
        "port": args.port,
        "master_url": args.master_url,
        "max_capacity": args.max_capacity,
    })

    uvicorn.run(app, host=CONFIG["host"], port=CONFIG["port"])
