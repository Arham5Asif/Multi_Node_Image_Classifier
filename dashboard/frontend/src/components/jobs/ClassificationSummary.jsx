export default function ClassificationSummary({ job }) {
  return (
    <div className="details-card">
      <h2>Classification Summary</h2>

      <table className="summary-table">
        <tbody>
          <tr>
            <td>Image</td>
            <td>{job.image}</td>
          </tr>

          <tr>
            <td>Prediction</td>
            <td>{job.prediction}</td>
          </tr>

          <tr>
            <td>Worker</td>
            <td>{job.worker}</td>
          </tr>

          <tr>
            <td>Model</td>
            <td>{job.model}</td>
          </tr>

          <tr>
            <td>Status</td>
            <td>{job.status}</td>
          </tr>

          <tr>
            <td>Confidence</td>
            <td>{job.confidence}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
