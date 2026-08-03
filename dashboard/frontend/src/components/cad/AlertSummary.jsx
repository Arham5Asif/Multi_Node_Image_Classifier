export default function AlertSummary() {
  const alerts = [
    {
      worker: "Worker-2",

      issue: "Heartbeat Delay",

      severity: "High",
    },

    {
      worker: "Worker-5",

      issue: "Packet Loss",

      severity: "Medium",
    },

    {
      worker: "Worker-7",

      issue: "Abnormal Traffic",

      severity: "Critical",
    },
  ];

  return (
    <div className="details-card">
      <h2>Latest Alerts</h2>

      <table className="cad-table">
        <thead>
          <tr>
            <th>Worker</th>

            <th>Issue</th>

            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((alert, index) => (
            <tr key={index}>
              <td>{alert.worker}</td>

              <td>{alert.issue}</td>

              <td>
                <span className={`severity ${alert.severity.toLowerCase()}`}>
                  {alert.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
