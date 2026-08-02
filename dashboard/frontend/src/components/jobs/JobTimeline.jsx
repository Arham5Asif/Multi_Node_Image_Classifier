export default function JobTimeline() {
  const steps = [
    {
      title: "Queued",
      time: "10:20 AM",
    },

    {
      title: "Assigned to Worker",
      time: "10:21 AM",
    },

    {
      title: "Processing",
      time: "10:22 AM",
    },

    {
      title: "Classification Complete",
      time: "10:23 AM",
    },
  ];

  return (
    <div className="details-card">
      <h2>Processing Timeline</h2>

      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <h4>{step.title}</h4>

              <span>{step.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
