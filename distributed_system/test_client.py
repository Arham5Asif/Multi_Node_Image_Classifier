"""
test_client.py
---------------
Simulates a client submitting an image classification job to the master.
Use this to test your distributed system end-to-end before building the
real dashboard (Week 8).

Run:
    python test_client.py --master-url http://localhost:8000 --num-images 20
"""

import argparse
import httpx
import json


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--master-url", default="http://localhost:8000")
    parser.add_argument("--num-images", type=int, default=20)
    args = parser.parse_args()

    # In real use these would be real file paths / URLs from your dataset.
    images = [
        {"image_id": f"img_{i:03d}", "image_path": f"/dataset/sample_{i:03d}.jpg"}
        for i in range(args.num_images)
    ]

    print(f"--> Checking registered workers at {args.master_url}/workers ...")
    workers = httpx.get(f"{args.master_url}/workers", timeout=5).json()
    print(json.dumps(workers, indent=2))

    if not workers:
        print("!! No workers registered. Start at least one worker_node.py first.")
        return

    print(f"\n--> Submitting job with {args.num_images} images ...")
    resp = httpx.post(f"{args.master_url}/submit_job", json={"images": images}, timeout=60)
    resp.raise_for_status()
    result = resp.json()
    print(json.dumps(result, indent=2))

    job_id = result["job_id"]
    print(f"\n--> Fetching full results for job {job_id} ...")
    job = httpx.get(f"{args.master_url}/job/{job_id}", timeout=5).json()
    print(json.dumps(job, indent=2))


if __name__ == "__main__":
    main()
