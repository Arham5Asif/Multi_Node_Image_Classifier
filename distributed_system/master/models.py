from pydantic import BaseModel

from distributed_system.shared.schemas import WorkerStatus


class WorkerRecord(BaseModel):
    worker_id: str
    host: str
    port: int
    max_capacity: int

    active_tasks: int = 0
    status: WorkerStatus = WorkerStatus.IDLE
    last_heartbeat: float = 0.0

    @property
    def base_url(self):
        return f"http://{self.host}:{self.port}"

    @property
    def load_ratio(self):
        return self.active_tasks / max(self.max_capacity, 1)