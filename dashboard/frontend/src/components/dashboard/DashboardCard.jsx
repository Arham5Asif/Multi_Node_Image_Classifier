export default function DashboardCard({ title, value, subtitle, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <span className="card-title">{title}</span>

        <span className="card-icon">{icon}</span>
      </div>

      <h2 className="card-value">{value}</h2>

      <p className="card-subtitle">{subtitle}</p>
    </div>
  );
}
