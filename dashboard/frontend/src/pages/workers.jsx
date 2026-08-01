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
      cpu: "--",
      memory: "--",
      heartbeat: "3 min ago",
    },
  ];

  return (
    <div className="workers-page">
      <div className="page-header">
        <h1>Workers</h1>
        <p>Monitor and manage all worker nodes.</p>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search worker..." />
      </div>

      <div className="workers-grid">
        {workers.map((worker) => (
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
