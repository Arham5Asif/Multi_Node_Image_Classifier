# Distributed System Module (Week 3–4)

This is the **master-worker distributed architecture** for your FYP:
*Distributed Image Processing and Monitoring System with AI Integration*.

It implements everything in the "Distributed Systems" box of your pipeline:
Master Node, Worker Nodes, FastAPI communication, Task Scheduling, and Load
Balancing — fully working and testable **today**, even though the final
AI model isn't chosen yet (see "Placeholder classifier" below).

## Architecture

```
                    ┌─────────────────┐
   test_client.py → │   MASTER NODE    │  (master_node.py, port 8000)
   (or dashboard)   │  - registration  │
                    │  - scheduler     │
                    │  - load balancer │
                    │  - aggregator    │
                    └───┬────┬────┬────┘
                        │    │    │  HTTP (async, parallel)
              ┌─────────┘    │    └─────────┐
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ worker1  │   │ worker2  │   │ worker3  │
        │ :9001    │   │ :9002    │   │ :9003    │
        └──────────┘   └──────────┘   └──────────┘
```

- **Master node** never processes images itself — it only schedules and
  aggregates. This keeps it lightweight and matches your proposal's
  description of the master's responsibilities.
- **Workers** register on startup and send a heartbeat every 5 seconds
  reporting their current load. If a worker misses heartbeats for 15s,
  the master marks it `offline` and stops sending it work — this is your
  first building block toward Week 9's scalability/reliability testing,
  and useful raw data for Week 7's CAD module later.
- **Task scheduling**: incoming image lists are split into batches (one
  per available worker).
- **Load balancing**: batches go to whichever worker currently has the
  *fewest active tasks relative to its capacity* (least-connections
  strategy) — see `select_workers_for_job()` in `master_node.py` for the
  full reasoning and how to swap in round-robin for comparison.
- **Communication**: HTTP/REST via FastAPI + async `httpx`, chosen over
  raw sockets because it's easier to secure later with JWT/SSL (Week 7 /
  Objective 4) and gives you free interactive docs at `/docs`.

## Placeholder classifier — important

Only one of your three models (ResNet50) is trained so far. Rather than
wait, `worker/worker_node.py` has a `classify_image()` function that
currently returns realistic-looking **fake** predictions with randomized
confidence and latency, so you can build and demo the *entire* distributed
pipeline right now.

When the best model is selected (Objective 2), open `worker_node.py` and
swap the placeholder block for the commented-out "REAL VERSION" block —
nothing else in the system needs to change. That's the benefit of the
master-worker separation: infrastructure and AI model are decoupled.

## Project structure

```
distributed_system/
├── master/
│   ├── master_node.py     # run this on your "master" machine
│   └── schemas.py         # (copy of shared/schemas.py)
├── worker/
│   ├── worker_node.py     # run this on each "worker" machine
│   └── schemas.py         # (copy of shared/schemas.py)
├── shared/
│   └── schemas.py         # source of truth — edit here, then re-copy
├── test_client.py         # simulates submitting a job
├── run_local_demo.sh      # spins up master + 3 workers on one laptop
└── requirements.txt
```

## Quick start (single laptop, for development)

```bash
pip install -r requirements.txt

# starts 1 master + 3 workers locally on different ports
bash run_local_demo.sh

# in another terminal, submit a test job
python3 test_client.py --num-images 24

# see live worker status any time
curl http://localhost:8000/workers

# interactive API explorer
open http://localhost:8000/docs

# stop everything
kill $(cat demo_pids.txt) && rm demo_pids.txt
```

## Running across real machines (LAN) — matches your hardware setup

You listed multiple laptops + an Ethernet switch as hardware resources.
Once wired up on the same LAN:

**On the master machine:**
```bash
uvicorn master_node:app --host 0.0.0.0 --port 8000
```
Note its LAN IP (e.g. `192.168.1.10`) via `ipconfig` (Windows) or `ip addr`
(Linux).

**On each worker machine** (find that machine's own LAN IP first):
```bash
python worker_node.py \
    --worker-id worker1 \
    --host 0.0.0.0 \
    --port 9001 \
    --advertise-host 192.168.1.20 \
    --master-url http://192.168.1.10:8000
```

- `--host 0.0.0.0` = bind on all interfaces (so it can be reached).
- `--advertise-host` = **this machine's own LAN IP**, told to the master so
  it knows where to send batches back.
- `--master-url` = the master machine's LAN IP + port.

Repeat on the other worker laptops with unique `--worker-id` and
`--advertise-host`.

**From your own machine (client):**
```bash
python test_client.py --master-url http://192.168.1.10:8000 --num-images 50
```

## What this demonstrates for your report / demo

- **Specific Objective 1** (master-worker architecture for parallel
  processing) — fully implemented and testable.
- Parallel execution is real, not simulated: batches are sent with
  `asyncio.gather`, so 3 workers genuinely classify concurrently — you can
  prove this for your Week 9 speed-comparison testing by timing single-node
  (1 worker) vs multi-node (3 workers) runs using the same `test_client.py`.
- Heartbeats + worker status give you the raw signal your Week 4→7 CAD
  module will build on (communication frequency, response times).
- `/workers` and `/job/{id}` endpoints are ready to be pulled straight into
  your Week 8 dashboard.

## Next steps (in order)

1. Get this running locally, then across 2–3 physical machines on your LAN.
2. Once a model is chosen, replace `classify_image()` in `worker_node.py`.
3. Add a `/register`-time worker capability check (optional): let a worker
   report which model it's running, useful if not every machine can run
   the same model.
4. Move on to CAD (Week 7): the master already logs every request; wrap
   that logging into structured communication logs Isolation Forest can
   train on.
