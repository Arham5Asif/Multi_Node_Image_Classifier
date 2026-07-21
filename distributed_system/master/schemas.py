"""
shared/schemas.py
------------------
Common data models used by BOTH the master node and worker nodes.
Copy this file into each machine's project folder (master/ and worker/)
so both sides agree on the exact same message format.

Why this matters for your FYP:
  In a distributed system, the master and workers are separate processes
  (often on separate physical machines). They can only "agree" on what a
  message means if both sides use the same schema. Pydantic gives us
  automatic validation + JSON (de)serialization for free.
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum


class WorkerStatus(str, Enum):
    IDLE = "idle"
    BUSY = "busy"
    OFFLINE = "offline"


class RegisterRequest(BaseModel):
    """Sent by a worker to the master when it boots up."""
    worker_id: str
    host: str
    port: int
    max_capacity: int = Field(
        default=4,
        description="How many images this worker can process concurrently"
    )


class HeartbeatRequest(BaseModel):
    """Sent periodically by a worker to prove it's alive and report load."""
    worker_id: str
    active_tasks: int
    status: WorkerStatus = WorkerStatus.IDLE


class ImageTask(BaseModel):
    """A single image to classify."""
    image_id: str
    image_path: str  # local path or URL, resolvable by the worker


class ProcessBatchRequest(BaseModel):
    """Sent by the master to a worker: 'here is a batch of images, classify them'."""
    job_id: str
    batch_id: str
    images: List[ImageTask]


class ClassificationResult(BaseModel):
    image_id: str
    predicted_label: str
    confidence: float
    inference_time_ms: float


class ProcessBatchResponse(BaseModel):
    """Sent by a worker back to the master with results."""
    worker_id: str
    job_id: str
    batch_id: str
    results: List[ClassificationResult]


class SubmitJobRequest(BaseModel):
    """Sent by a client (you, or the dashboard later) to the master to start a job."""
    images: List[ImageTask]


class JobStatus(str, Enum):
    QUEUED = "queued"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
