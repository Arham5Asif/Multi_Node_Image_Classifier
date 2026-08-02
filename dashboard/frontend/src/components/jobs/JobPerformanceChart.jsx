import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function JobPerformanceChart() {
  const data = [
    { job: "101", time: 0.84 },
    { job: "102", time: 0.91 },
    { job: "103", time: 1.12 },
    { job: "104", time: 0.73 },
    { job: "105", time: 0.68 },
    { job: "106", time: 0.95 },
  ];

  return (
    <div className="details-card">
      <h2>Execution Time Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="job" />

          <YAxis
            label={{
              value: "Seconds",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="time"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
