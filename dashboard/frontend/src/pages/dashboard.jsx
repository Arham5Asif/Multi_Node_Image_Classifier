import "../styles/Dashboard.css";
import StatsGrid from "../components/dashboard/StatsGrid";
import WorkerStatus from "../components/dashboard/WorkerStatus";
import RecentJobs from "../components/dashboard/RecentJobs";
import CommunicationChart from "../components/dashboard/CommunicationChart";
import CADChart from "../components/dashboard/CADChart";
import ActivityFeed from "../components/dashboard/ActivityFeed";

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>
          Monitor your distributed image classification system in real time.
        </p>
      </div>

      <StatsGrid />

      <div className="dashboard-row">
        <WorkerStatus />

        <RecentJobs />

        <CommunicationChart />

        <CADChart />
      </div>

      <ActivityFeed />
    </div>
  );
}
