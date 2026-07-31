const activities = [
  "Worker-1 classified glacier.jpg",
  "Worker-2 completed forest.jpg",
  "Worker-3 disconnected",
  "CAD detected abnormal latency",
  "EfficientNet-B0 deployed successfully",
];

export default function ActivityFeed() {
  return (
    <div className="activity-panel">
      <h2>Live Activity Feed</h2>

      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
