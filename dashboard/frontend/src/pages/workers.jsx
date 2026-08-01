import { useState } from "react";

import "../styles/Workers.css";

import WorkerCard from "../components/workers/WorkerCard";

export default function Workers() {
  const workers = [
    {
      id: 1,
      name: "Worker-1",
      status: "Online",
      cpu: "23%",
      memory: "48%",
      heartbeat: "2 sec ago",
    },

    {
      id: 2,
      name: "Worker-2",
      status: "Online",
      cpu: "31%",
      memory: "40%",
      heartbeat: "5 sec ago",
    },

    {
      id: 3,
      name: "Worker-3",
      status: "Offline",
      cpu: "0%",
      memory: "0%",
      heartbeat: "3 min ago",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalWorkers = workers.length;

  const onlineWorkers = workers.filter(
    (worker) => worker.status === "Online",
  ).length;

  const offlineWorkers = totalWorkers - onlineWorkers;

  return (
    <div className="workers-page">
      <div className="page-header">
        <h1>Workers</h1>

        <p>Monitor and manage all worker nodes.</p>
      </div>

      {/* Statistics */}

      <div className="worker-stats">
        <div className="stat-card">
          <h2>{totalWorkers}</h2>
          <p>Total Workers</p>
        </div>

        <div className="stat-card">
          <h2>{onlineWorkers}</h2>
          <p>Online</p>
        </div>

        <div className="stat-card">
          <h2>{offlineWorkers}</h2>
          <p>Offline</p>
        </div>
      </div>

      {/* Search */}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search worker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Worker Cards */}

      <div className="workers-grid">
        {filteredWorkers.map((worker) => (
          <WorkerCard
            key={worker.id}
            name={worker.name}
            status={worker.status}
            cpu={worker.cpu}
            memory={worker.memory}
            heartbeat={worker.heartbeat}
          />
        ))}
      </div>
    </div>
  );
}
