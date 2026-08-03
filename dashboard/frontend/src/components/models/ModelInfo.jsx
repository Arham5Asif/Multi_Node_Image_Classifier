export default function ModelInfo({ model }) {
  return (
    <div className="details-card">
      <h2>Model Information</h2>

      <table className="summary-table">
        <tbody>
          <tr>
            <td>Accuracy</td>

            <td>{model.accuracy}</td>
          </tr>

          <tr>
            <td>Precision</td>

            <td>{model.precision}</td>
          </tr>

          <tr>
            <td>Recall</td>

            <td>{model.recall}</td>
          </tr>

          <tr>
            <td>F1 Score</td>

            <td>{model.f1}</td>
          </tr>

          <tr>
            <td>Training Time</td>

            <td>{model.training}</td>
          </tr>

          <tr>
            <td>Inference Time</td>

            <td>{model.inference}</td>
          </tr>

          <tr>
            <td>Model Size</td>

            <td>{model.size}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
