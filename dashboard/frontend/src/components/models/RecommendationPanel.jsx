export default function RecommendationPanel({ model }) {
  const isBest = model.name === "EfficientNet-B0";

  return (
    <div className="details-card">
      <h2>AI Recommendation</h2>

      {isBest ? (
        <div className="recommend-box success">
          <h3>✅ Recommended for Deployment</h3>

          <ul>
            <li>Highest Accuracy (94.20%)</li>

            <li>Highest Precision (94.18%)</li>

            <li>Highest Recall (94.20%)</li>

            <li>Highest F1 Score (94.18%)</li>

            <li>Compact Model Size (15.61 MB)</li>
          </ul>

          <p>
            EfficientNet-B0 provides the best balance between prediction
            performance and storage efficiency for the distributed system.
          </p>
        </div>
      ) : (
        <div className="recommend-box warning">
          <h3>Alternative Model</h3>

          <p>
            This model is available for deployment, but EfficientNet-B0 achieved
            better overall classification performance.
          </p>
        </div>
      )}
    </div>
  );
}
