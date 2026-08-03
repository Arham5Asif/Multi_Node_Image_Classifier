export default function DownloadModel({ model }) {
  const downloadModel = () => {
    alert(
      `${model.name} download will be available after backend integration.`,
    );
  };

  return (
    <div className="details-card">
      <h2>Model Export</h2>

      <p>Download the trained model for deployment.</p>

      <button className="download-btn" onClick={downloadModel}>
        Download Model
      </button>
    </div>
  );
}
