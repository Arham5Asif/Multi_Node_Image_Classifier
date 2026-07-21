"""
dashboard_api.py
----------------

Dashboard APIs for the Distributed Image Classification System.

These APIs provide data for the Week-8 Dashboard.

Endpoints
---------
GET /dashboard/dashboard_summary
GET /dashboard/health
GET /dashboard/worker/{worker_id}
GET /dashboard/communication_logs
GET /dashboard/live_anomalies
GET /dashboard/recent_anomalies
GET /dashboard/system_metrics
"""

from pathlib import Path

import pandas as pd

from fastapi import APIRouter

# Import shared project state
from distributed_system.master.state import (
    PROJECT_ROOT,
    workers,
)
from distributed_system.shared.schemas import WorkerStatus

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

# ------------------------------------------------------------
# Log file locations
# ------------------------------------------------------------

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


# ============================================================
# Dashboard Summary
# ============================================================

@router.get("/dashboard_summary")
def dashboard_summary():

    if LIVE_LOG.exists():

        df = pd.read_csv(LIVE_LOG)

        total = len(df)

        normal = len(df[df["prediction"] == "Normal"])

        anomaly = len(df[df["prediction"] == "Anomaly"])

        average_response = round(
            df["response_time_ms"].mean(),
            2
        )

    else:

        total = 0
        normal = 0
        anomaly = 0
        average_response = 0

    workers_online = len(workers)

    workers_busy = len(
        [
            w for w in workers.values()
            if w.status == WorkerStatus.BUSY
        ]
    )

    workers_idle = len(
        [
            w for w in workers.values()
            if w.status == WorkerStatus.IDLE
        ]
    )

    return {

        "workers_online": workers_online,

        "workers_busy": workers_busy,

        "workers_idle": workers_idle,

        "total_communications": total,

        "normal_communications": normal,

        "anomalies": anomaly,

        "average_response_time_ms": average_response,

        "anomaly_rate": round(
            (anomaly / total) * 100,
            2
        ) if total else 0

    }


# ============================================================
# Worker Health
# ============================================================

@router.get("/health")
def health():

    health_data = []

    for worker in workers.values():

        health_data.append({

            "worker_id": worker.worker_id,

            "host": worker.host,

            "port": worker.port,

            "status": worker.status,

            "active_tasks": worker.active_tasks,

            "capacity": worker.max_capacity,

            "load_ratio": worker.load_ratio

        })

    return health_data


# ============================================================
# Worker Details
# ============================================================

@router.get("/worker/{worker_id}")
def worker_details(worker_id: str):

    if worker_id not in workers:

        return {

            "error": "Worker not found"

        }

    worker = workers[worker_id]

    return {

        "worker_id": worker.worker_id,

        "host": worker.host,

        "port": worker.port,

        "status": worker.status,

        "active_tasks": worker.active_tasks,

        "capacity": worker.max_capacity,

        "load_ratio": worker.load_ratio,

        "last_heartbeat": worker.last_heartbeat

    }


# ============================================================
# Communication Logs
# ============================================================

@router.get("/communication_logs")
def communication_logs():

    if not COMMUNICATION_LOG.exists():

        return []

    df = pd.read_csv(COMMUNICATION_LOG)

    return df.tail(100).to_dict(
        orient="records"
    )


# ============================================================
# Live Anomaly Logs
# ============================================================

@router.get("/live_anomalies")
def live_anomalies():

    if not LIVE_LOG.exists():

        return []

    df = pd.read_csv(LIVE_LOG)

    return df.to_dict(
        orient="records"
    )


# ============================================================
# Recent Anomalies
# ============================================================

@router.get("/recent_anomalies")
def recent_anomalies():

    if not LIVE_LOG.exists():

        return []

    df = pd.read_csv(LIVE_LOG)

    df = df[
        df["prediction"] == "Anomaly"
    ]

    return df.tail(10).to_dict(
        orient="records"
    )


# ============================================================
# System Metrics
# ============================================================

@router.get("/system_metrics")
def system_metrics():

    if not LIVE_LOG.exists():

        return {}

    df = pd.read_csv(LIVE_LOG)

    return {

        "maximum_response_time_ms":
            round(df["response_time_ms"].max(), 2),

        "minimum_response_time_ms":
            round(df["response_time_ms"].min(), 2),

        "average_response_time_ms":
            round(df["response_time_ms"].mean(), 2),

        "largest_message_bytes":
            int(df["message_size_bytes"].max()),

        "smallest_message_bytes":
            int(df["message_size_bytes"].min()),

        "average_message_size_bytes":
            round(df["message_size_bytes"].mean(), 2)

    }