import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function AnomalyTrendChart() {
  const data = [
    { time: "10:00", score: 0.12 },

    { time: "10:05", score: 0.18 },

    { time: "10:10", score: 0.25 },

    { time: "10:15", score: 0.48 },

    { time: "10:20", score: 0.81 },

    { time: "10:25", score: 0.34 },

    { time: "10:30", score: 0.19 },
  ];

  return (
    <div className="details-card">
      <h2>Anomaly Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis domain={[0, 1]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#dc2626"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
