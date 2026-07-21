"""
state.py
---------

Shared global state for the Master Node.

This file stores variables that need to be accessed by multiple modules
(e.g., master_node.py and dashboard_api.py) without causing circular imports.
"""

from pathlib import Path

from distributed_system.shared.schemas import WorkerStatus

# ----------------------------------------------------------
# Project Root Directory
# ----------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]

# ----------------------------------------------------------
# Registered Workers
# ----------------------------------------------------------

workers = {}

# ----------------------------------------------------------
# Future Shared Objects
# ----------------------------------------------------------

# job_queue = {}
# completed_jobs = {}
# communication_stats = {}
# anomaly_statistics = {}