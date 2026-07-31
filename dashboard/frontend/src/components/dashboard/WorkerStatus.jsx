import { CheckCircle, XCircle } from "lucide-react";

const workers = [
  {
    id: "Worker-1",
    status: "Online",
    cpu: "23%",
    memory: "48%",
    health: "Healthy",
  },
  {
    id: "Worker-2",
    status: "Online",
    cpu: "31%",
    memory: "40%",
    health: "Healthy",
  },
  {
    id: "Worker-3",
    status: "Offline",
    cpu: "--",
    memory: "--",
    health: "Disconnected",
  },
];

export default function WorkerStatus() {
  return (
    <div className="worker-panel">
      <div className="worker-header">
        <h2>Worker Status</h2>
      </div>

      <table className="worker-table">
        <thead>
          <tr>
            <th>Worker</th>
            <th>Status</th>
            <th>CPU</th>
            <th>Memory</th>
            <th>Health</th>
          </tr>
        </thead>

        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>

              <td>
                {worker.status === "Online" ? (
                  <span className="online">
                    <CheckCircle size={18} />
                    Online
                  </span>
                ) : (
                  <span className="offline">
                    <XCircle size={18} />
                    Offline
                  </span>
                )}
              </td>

              <td>{worker.cpu}</td>

              <td>{worker.memory}</td>

              <td>{worker.health}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
