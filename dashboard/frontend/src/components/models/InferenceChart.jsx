import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function InferenceChart() {
  const data = [
    {
      model: "ResNet50",
      inference: 2.684,
    },

    {
      model: "EfficientNet",
      inference: 5.613,
    },

    {
      model: "MobileNetV3",
      inference: 3.0146,
    },
  ];

  return (
    <div className="details-card">
      <h2>Inference Time Comparison</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="model" />

          <Tooltip />

          <Bar dataKey="inference" fill="#7c3aed" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
