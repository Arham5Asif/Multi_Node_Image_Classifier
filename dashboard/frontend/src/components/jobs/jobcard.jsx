import { useNavigate } from "react-router-dom";

export default function JobCard({
  id,
  image,
  worker,
  model,
  status,
  progress,
  confidence,
  executionTime,
}) {
  const navigate = useNavigate();

  const statusClass = status.toLowerCase();

  return (
    <div
      className="job-card"
      onClick={() => navigate(`/jobs/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="job-header">
        <h3>Job #{id}</h3>

        <span className={`job-status ${statusClass}`}>{status}</span>
      </div>

      <div className="job-body">
        <p>
          <strong>Image:</strong> {image}
        </p>

        <p>
          <strong>Worker:</strong> {worker}
        </p>

        <p>
          <strong>Model:</strong> {model}
        </p>

        <p>
          <strong>Confidence:</strong> {confidence}
        </p>

        <p>
          <strong>Execution:</strong> {executionTime}
        </p>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span>{progress}%</span>
      </div>
    </div>
  );
}
