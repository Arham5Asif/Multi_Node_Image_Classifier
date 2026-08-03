export default function NetworkHealth() {
  return (
    <div className="details-card">
      <h2>Network Health</h2>

      <div className="network-status">
        <div className="health-row">
          <span>Master Node</span>

          <strong className="healthy">Healthy</strong>
        </div>

        <div className="health-row">
          <span>Connected Workers</span>

          <strong>7 / 8</strong>
        </div>

        <div className="health-row">
          <span>Heartbeat</span>

          <strong>Every 2 sec</strong>
        </div>

        <div className="health-row">
          <span>Packet Loss</span>

          <strong>1.2%</strong>
        </div>

        <div className="health-row">
          <span>Network Status</span>

          <strong className="healthy">Stable</strong>
        </div>
      </div>
    </div>
  );
}
