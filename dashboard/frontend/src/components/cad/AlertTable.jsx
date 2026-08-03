import { useState } from "react";

import AlertRow from "./AlertRow";

export default function AlertTable() {
  const [search, setSearch] = useState("");

  const alerts = [
    {
      id: 101,

      worker: "Worker-2",

      issue: "Heartbeat Delay",

      severity: "High",

      score: 0.91,

      time: "2 min ago",
    },

    {
      id: 102,

      worker: "Worker-5",

      issue: "Packet Loss",

      severity: "Medium",

      score: 0.73,

      time: "5 min ago",
    },

    {
      id: 103,

      worker: "Worker-7",

      issue: "Abnormal Traffic",

      severity: "Critical",

      score: 0.98,

      time: "Just now",
    },

    {
      id: 104,

      worker: "Worker-3",

      issue: "Unexpected Restart",

      severity: "High",

      score: 0.89,

      time: "9 min ago",
    },
  ];

  const filtered = alerts.filter((alert) =>
    alert.worker.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="details-card">
      <div className="table-header">
        <h2>Communication Alerts</h2>

        <input
          type="text"
          placeholder="Search Worker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="cad-table">
        <thead>
          <tr>
            <th>Worker</th>

            <th>Issue</th>

            <th>Severity</th>

            <th>Anomaly Score</th>

            <th>Time</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
