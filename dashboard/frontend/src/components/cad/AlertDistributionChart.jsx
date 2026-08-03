import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function AlertDistributionChart() {
  const data = [
    { name: "Critical", value: 3 },

    { name: "High", value: 5 },

    { name: "Medium", value: 7 },

    { name: "Low", value: 3 },
  ];

  const colors = ["#dc2626", "#f97316", "#eab308", "#22c55e"];

  return (
    <div className="details-card">
      <h2>Alert Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
