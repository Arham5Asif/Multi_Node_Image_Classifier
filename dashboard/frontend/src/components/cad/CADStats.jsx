import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react";

export default function CADStats() {
  const stats = [
    {
      title: "Total Alerts",

      value: "18",

      icon: <ShieldAlert size={30} />,

      color: "red",
    },

    {
      title: "Critical Alerts",

      value: "3",

      icon: <AlertTriangle size={30} />,

      color: "orange",
    },

    {
      title: "Healthy Workers",

      value: "7",

      icon: <CheckCircle size={30} />,

      color: "green",
    },

    {
      title: "Average Anomaly Score",

      value: "0.19",

      icon: <Activity size={30} />,

      color: "blue",
    },
  ];

  return (
    <div className="cad-stats-grid">
      {stats.map((item, index) => (
        <div className="cad-card" key={index}>
          <div className="cad-card-header">
            <div>
              <span>{item.title}</span>

              <h2>{item.value}</h2>
            </div>

            <div className={`cad-icon ${item.color}`}>{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
