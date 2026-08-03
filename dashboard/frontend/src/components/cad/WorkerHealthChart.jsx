import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WorkerHealthChart() {
  const data = [
    { worker: "W1", health: 98 },

    { worker: "W2", health: 72 },

    { worker: "W3", health: 95 },

    { worker: "W4", health: 90 },

    { worker: "W5", health: 61 },

    { worker: "W6", health: 99 },

    { worker: "W7", health: 82 },
  ];

  return (
    <div className="details-card">
      <h2>Worker Health</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="worker" />

          <Tooltip />

          <Bar dataKey="health" fill="#16a34a" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
