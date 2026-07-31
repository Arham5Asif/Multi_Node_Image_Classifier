import DashboardCard from "./DashboardCard";

import { Users, Briefcase, Cpu, ShieldAlert } from "lucide-react";

export default function StatsGrid() {
  return (
    <div className="stats-grid">
      <DashboardCard
        title="Workers"
        value="3"
        subtitle="Online"
        icon={<Users size={28} />}
      />

      <DashboardCard
        title="Jobs"
        value="18"
        subtitle="Completed"
        icon={<Briefcase size={28} />}
      />

      <DashboardCard
        title="Model"
        value="EfficientNet-B0"
        subtitle="Active"
        icon={<Cpu size={28} />}
      />

      <DashboardCard
        title="CAD Alerts"
        value="2"
        subtitle="Detected"
        icon={<ShieldAlert size={28} />}
      />
    </div>
  );
}
