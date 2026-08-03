export default function DeploymentHistory() {
  const history = [
    {
      version: "v1.0",

      model: "EfficientNet-B0",

      date: "02-Aug-2026",

      status: "Active",
    },

    {
      version: "v0.9",

      model: "ResNet50",

      date: "25-Jul-2026",

      status: "Archived",
    },
  ];

  return (
    <div className="details-card">
      <h2>Deployment History</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>Version</th>

            <th>Model</th>

            <th>Date</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.version}</td>

              <td>{item.model}</td>

              <td>{item.date}</td>

              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
