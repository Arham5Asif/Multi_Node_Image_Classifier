export default function JobInfo({ job }) {
  return (
    <div className="details-card">
      <h2>Job Information</h2>

      <div className="info-grid">
        <div className="info-item">
          <span>Image</span>
          <strong>{job.image}</strong>
        </div>

        <div className="info-item">
          <span>Worker</span>
          <strong>{job.worker}</strong>
        </div>

        <div className="info-item">
          <span>Model</span>
          <strong>{job.model}</strong>
        </div>

        <div className="info-item">
          <span>Prediction</span>
          <strong>{job.prediction}</strong>
        </div>

        <div className="info-item">
          <span>Confidence</span>
          <strong>{job.confidence}</strong>
        </div>

        <div className="info-item">
          <span>Execution Time</span>
          <strong>{job.executionTime}</strong>
        </div>
      </div>
    </div>
  );
}
