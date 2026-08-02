export default function JobImagePreview({ image }) {
  return (
    <div className="details-card">
      <h2>Image Preview</h2>

      <div className="image-preview">
        <img src={`https://placehold.co/600x400?text=${image}`} alt={image} />
      </div>
    </div>
  );
}
