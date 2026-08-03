export default function DeployPanel({ model }) {
  return (
    <div className="details-card">
      <h2>Deployment</h2>

      <div className="deploy-status">
        <p>
          <strong>Current Status:</strong> {model.status}
        </p>

        <p>
          <strong>Version:</strong> v1.0
        </p>

        <p>
          <strong>Deployment Date:</strong> 02-Aug-2026
        </p>

        <button className="deploy-btn">Deploy Model</button>
      </div>
    </div>
  );
}
