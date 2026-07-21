"""
generate_logs.py

Automatically sends multiple image classification requests
to the Master Node to generate communication logs.

Run:
    python scripts/generate_logs.py
"""

import requests
import time
import random

MASTER_URL = "http://localhost:8000/submit_job"

TOTAL_REQUESTS = 100      # Change this if needed

print("=" * 60)
print(f"Generating {TOTAL_REQUESTS} communication requests...")
print("=" * 60)

successful = 0
failed = 0

for i in range(TOTAL_REQUESTS):

    payload = {
        "images": [
            {
                "image_id": f"img_{i}",
                "image_path": f"test_data/image_{i}.jpg"
            }
        ]
    }

    try:
        response = requests.post(MASTER_URL, json=payload, timeout=10)

        if response.status_code == 200:
            successful += 1
            print(f"[{i+1}/{TOTAL_REQUESTS}] SUCCESS")
        else:
            failed += 1
            print(f"[{i+1}/{TOTAL_REQUESTS}] FAILED ({response.status_code})")

    except Exception as e:
        failed += 1
        print(f"[{i+1}/{TOTAL_REQUESTS}] ERROR: {e}")

    # Random delay to simulate realistic communication
    time.sleep(random.uniform(0.2, 0.8))

print("\n" + "=" * 60)
print("Generation Complete")
print("=" * 60)

print(f"Successful Requests : {successful}")
print(f"Failed Requests     : {failed}")
print("=" * 60)