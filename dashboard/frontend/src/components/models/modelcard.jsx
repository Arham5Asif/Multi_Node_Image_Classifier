import { Link } from "react-router-dom";

export default function ModelCard({
  name,

  accuracy,

  inference,

  size,

  status,

  active,
}) {
  return (
    <div className={`model-card ${active ? "active-model" : ""}`}>
      <div className="model-header">
        <h2>{name}</h2>

        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      </div>

      <div className="model-info">
        <div>
          <span>Accuracy</span>

          <h3>{accuracy}</h3>
        </div>

        <div>
          <span>Inference</span>

          <h3>{inference}</h3>
        </div>

        <div>
          <span>Model Size</span>

          <h3>{size}</h3>
        </div>
      </div>

      {active && <div className="active-badge">Active Model</div>}

      <Link className="details-btn" to={`/models/${encodeURIComponent(name)}`}>
        View Details
      </Link>
    </div>
  );
}
