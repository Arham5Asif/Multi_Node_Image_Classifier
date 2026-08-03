import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function TrainingChart() {
  const data = [
    { epoch: 1, loss: 1.2 },

    { epoch: 2, loss: 0.95 },

    { epoch: 3, loss: 0.71 },

    { epoch: 4, loss: 0.52 },

    { epoch: 5, loss: 0.38 },

    { epoch: 6, loss: 0.3 },

    { epoch: 7, loss: 0.25 },

    { epoch: 8, loss: 0.18 },

    { epoch: 9, loss: 0.14 },

    { epoch: 10, loss: 0.11 },
  ];

  return (
    <div className="details-card">
      <h2>Training Loss</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="epoch" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="loss"
            stroke="#16a34a"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
