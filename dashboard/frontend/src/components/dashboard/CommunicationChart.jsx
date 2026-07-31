import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10:00", messages: 120 },
  { time: "10:05", messages: 180 },
  { time: "10:10", messages: 150 },
  { time: "10:15", messages: 240 },
  { time: "10:20", messages: 200 },
  { time: "10:25", messages: 280 },
];

export default function CommunicationChart() {
  return (
    <div className="chart-panel">
      <h2>Communication Traffic</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="messages"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
