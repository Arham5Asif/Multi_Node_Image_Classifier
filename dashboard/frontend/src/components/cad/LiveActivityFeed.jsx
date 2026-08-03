export default function LiveActivityFeed() {
  const activities = [
    "Worker-2 heartbeat restored.",

    "Worker-7 anomaly detected.",

    "Worker-5 packet loss increased.",

    "Master reassigned Worker-7 jobs.",

    "Isolation Forest executed.",
  ];

  return (
    <div className="details-card">
      <h2>Live Activity Feed</h2>

      <div className="activity-feed">
        {activities.map((item, index) => (
          <div className="activity-item" key={index}>
            🟢 {item}
          </div>
        ))}
      </div>
    </div>
  );
}
