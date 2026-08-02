export default function JobResult({ job }) {
  return (
    <div className="details-card">
      <h2>Classification Result</h2>

      <div className="result-grid">
        <div className="result-box">
          <span>Prediction</span>

          <h3>{job.prediction}</h3>
        </div>

        <div className="result-box">
          <span>Confidence</span>

          <h3>{job.confidence}</h3>
        </div>
      </div>
    </div>
  );
}
