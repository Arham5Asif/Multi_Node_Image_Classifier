import "../styles/CAD.css";

import CADStats from "../components/cad/CADStats";
import AlertSummary from "../components/cad/AlertSummary";
import NetworkHealth from "../components/cad/NetworkHealth";
import AlertTable from "../components/cad/AlertTable";
import AnomalyTrendChart from "../components/cad/AnomalyTrendChart";
import AlertDistributionChart from "../components/cad/AlertDistributionChart";
import WorkerHealthChart from "../components/cad/WorkerHealthChart";
import LiveActivityFeed from "../components/cad/LiveActivityFeed";
export default function CAD() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Communication Anomaly Detection</h1>

        <p>
          Monitor communication health and detect abnormal worker behaviour.
        </p>
      </div>

      <CADStats />

      <div className="cad-grid">
        <AlertTable />

        <NetworkHealth />
      </div>

      <div className="cad-grid">
        <AnomalyTrendChart />

        <AlertDistributionChart />
      </div>

      <div className="cad-grid">
        <WorkerHealthChart />

        <LiveActivityFeed />
      </div>
    </div>
  );
}
