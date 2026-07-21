#!/bin/bash
# run_local_demo.sh
# Spins up 1 master + 3 workers on localhost (different ports) so you can
# test the whole distributed pipeline on a single laptop before moving to
# separate physical machines on the LAN.
#
# Usage: bash run_local_demo.sh
# Stop everything with: kill $(cat demo_pids.txt) ; rm demo_pids.txt

set -e
cd "$(dirname "$0")"

echo "Starting master node on port 8000..."
(cd master && python3 -m uvicorn master_node:app --host 0.0.0.0 --port 8000 > ../master.log 2>&1 &)
echo $! >> demo_pids.txt
sleep 2

for i in 1 2 3; do
  port=$((9000 + i))
  echo "Starting worker$i on port $port..."
  (cd worker && python3 worker_node.py --worker-id worker$i --port $port \
      --master-url http://localhost:8000 --advertise-host 127.0.0.1 > ../worker$i.log 2>&1 &)
  echo $! >> demo_pids.txt
  sleep 1
done

echo ""
echo "All nodes started. Logs: master.log, worker1.log, worker2.log, worker3.log"
echo "Master API docs: http://localhost:8000/docs"
echo "Test with:       python3 test_client.py --num-images 20"
echo "Stop everything with: kill \$(cat demo_pids.txt) ; rm demo_pids.txt"
