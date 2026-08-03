import { Link, useParams } from "react-router-dom";

import "../styles/AlertDetails.css";

export default function AlertDetails() {
  const { id } = useParams();

  return (
    <div className="page-container">
      <Link to="/cad" className="back-link">
        ← Back to CAD
      </Link>

      <h1>Alert #{id}</h1>

      <div className="details-card">
        <h2>Anomaly Information</h2>

        <p>
          <strong>Worker:</strong> Worker-7
        </p>

        <p>
          <strong>Issue:</strong> Abnormal Traffic
        </p>

        <p>
          <strong>Isolation Forest Score:</strong> 0.98
        </p>

        <p>
          <strong>Detected:</strong> 3 Aug 2026
        </p>

        <p>
          <strong>Status:</strong> Critical
        </p>
      </div>
    </div>
  );
}
