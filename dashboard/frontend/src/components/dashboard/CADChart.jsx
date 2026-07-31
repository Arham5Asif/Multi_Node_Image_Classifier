import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Normal", value: 92 },
  { name: "Anomaly", value: 8 },
];

const COLORS = ["#16a34a", "#dc2626"];

export default function CADChart() {
  return (
    <div className="chart-panel">
      <h2>CAD Alerts</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
