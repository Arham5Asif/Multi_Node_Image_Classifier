import { useParams, Link } from "react-router-dom";

import "../styles/WorkerDetails.css";

export default function WorkerDetails() {
  const { id } = useParams();

  return (
    <div className="worker-details-page">
      <Link to="/workers" className="back-link">
        ← Back to Workers
      </Link>

      <h1>{id}</h1>

      <p>Worker Monitoring Dashboard</p>

      <div className="details-grid">
        <div className="details-card">
          <h3>CPU Usage</h3>

          <p>Chart Coming Soon...</p>
        </div>

        <div className="details-card">
          <h3>Memory Usage</h3>

          <p>Chart Coming Soon...</p>
        </div>

        <div className="details-card">
          <h3>Assigned Jobs</h3>

          <ul>
            <li>Job-101</li>

            <li>Job-102</li>

            <li>Job-103</li>
          </ul>
        </div>

        <div className="details-card">
          <h3>Communication Logs</h3>

          <p>Logs will appear here...</p>
        </div>

        <div className="details-card">
          <h3>Heartbeat History</h3>

          <p>Timeline Coming Soon...</p>
        </div>

        <div className="details-card">
          <h3>CAD Alerts</h3>

          <p>No anomaly detected.</p>
        </div>
      </div>
    </div>
  );
}
