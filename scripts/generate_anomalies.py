"""
generate_anomalies.py

Generate artificial communication anomalies for
Communication Anomaly Detection (CAD).

This script APPENDS anomaly records to
communication_logs.csv.
"""

import random
import pandas as pd
from pathlib import Path
from datetime import datetime, timedelta

PROJECT_ROOT = Path(__file__).resolve().parents[1]

LOG_FILE = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "logs"
    / "communication_logs.csv"
)

df = pd.read_csv(LOG_FILE)

print(f"Current log entries: {len(df)}")

anomalies = []

base_time = datetime.now()

for i in range(20):

    anomaly_type = random.choice([
        "slow_response",
        "large_message",
        "worker_error",
        "combined"
    ])

    if anomaly_type == "slow_response":

        response_time = random.uniform(800, 2500)
        message_size = random.randint(150, 220)
        status = "normal"

    elif anomaly_type == "large_message":

        response_time = random.uniform(60, 120)
        message_size = random.randint(3000, 8000)
        status = "normal"

    elif anomaly_type == "worker_error":

        response_time = 0
        message_size = 0
        status = "error"

    else:  # combined anomaly

        response_time = random.uniform(1200, 4000)
        message_size = random.randint(5000, 12000)
        status = "error"

    anomalies.append({
        "timestamp": (base_time + timedelta(seconds=i)).strftime("%Y-%m-%d %H:%M:%S"),
        "worker_id": "worker1",
        "endpoint": "/process",
        "response_time_ms": round(response_time, 2),
        "message_size_bytes": message_size,
        "status": status
    })

anomaly_df = pd.DataFrame(anomalies)

updated_df = pd.concat([df, anomaly_df], ignore_index=True)

updated_df.to_csv(LOG_FILE, index=False)

print("=" * 60)
print("Added 20 anomaly records")
print("Updated log size:", len(updated_df))
print("=" * 60)