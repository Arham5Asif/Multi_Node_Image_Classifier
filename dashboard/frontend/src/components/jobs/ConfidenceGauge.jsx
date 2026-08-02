export default function ConfidenceGauge({ confidence }) {
  const value = parseFloat(confidence);

  const color = value >= 95 ? "#22c55e" : value >= 80 ? "#f59e0b" : "#ef4444";

  return (
    <div className="details-card">
      <h2>Confidence Score</h2>

      <div className="confidence-container">
        <div
          className="confidence-circle"
          style={{
            background: `conic-gradient(${color} ${value}%, #e5e7eb ${value}% 100%)`,
          }}
        >
          <div className="confidence-inner">
            <h2>{confidence}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
