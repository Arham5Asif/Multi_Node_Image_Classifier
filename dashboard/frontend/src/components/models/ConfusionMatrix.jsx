export default function ConfusionMatrix() {
  return (
    <div className="details-card">
      <h2>Confusion Matrix</h2>

      <div className="matrix-placeholder">
        <table className="matrix-table">
          <tbody>
            <tr>
              <th></th>
              <th>Pred +</th>
              <th>Pred -</th>
            </tr>

            <tr>
              <th>Actual +</th>
              <td>945</td>
              <td>58</td>
            </tr>

            <tr>
              <th>Actual -</th>
              <td>42</td>
              <td>955</td>
            </tr>
          </tbody>
        </table>

        <p className="placeholder-text">
          Live confusion matrix will be loaded from the backend after
          deployment.
        </p>
      </div>
    </div>
  );
}
