import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ModelPerformanceChart({ model }) {
  const data = [
    {
      metric: "Accuracy",
      value: parseFloat(model.accuracy),
    },
    {
      metric: "Precision",
      value: parseFloat(model.precision),
    },
    {
      metric: "Recall",
      value: parseFloat(model.recall),
    },
    {
      metric: "F1",
      value: parseFloat(model.f1),
    },
  ];

  return (
    <div className="details-card">
      <h2>Performance Metrics</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="metric" />

          <YAxis domain={[90, 95]} />

          <Tooltip />

          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
