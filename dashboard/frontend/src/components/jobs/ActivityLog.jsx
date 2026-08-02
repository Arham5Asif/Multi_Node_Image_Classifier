export default function ActivityLog() {
  const logs = [
    {
      time: "10:20 AM",
      event: "Job queued",
    },

    {
      time: "10:21 AM",
      event: "Assigned to Worker-1",
    },

    {
      time: "10:22 AM",
      event: "Image preprocessing completed",
    },

    {
      time: "10:23 AM",
      event: "Inference started",
    },

    {
      time: "10:23 AM",
      event: "Classification completed",
    },

    {
      time: "10:24 AM",
      event: "Result stored successfully",
    },
  ];

  return (
    <div className="details-card">
      <h2>Activity Log</h2>

      <div className="activity-list">
        {logs.map((log, index) => (
          <div className="activity-item" key={index}>
            <span className="activity-time">{log.time}</span>

            <span className="activity-event">{log.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
