export default function ModelHeader({ model }) {
  return (
    <div className="model-details-header">
      <div>
        <h1>{model.name}</h1>

        <p>Deep Learning Image Classification Model</p>
      </div>

      <span className={`status ${model.status.toLowerCase()}`}>
        {model.status}
      </span>
    </div>
  );
}
