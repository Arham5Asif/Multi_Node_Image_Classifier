export default function JobMetrics({ job }) {
  const metrics = [
    {
      title: "Execution Time",
      value: job.executionTime,
    },

    {
      title: "Worker",
      value: job.worker,
    },

    {
      title: "Model",
      value: job.model,
    },

    {
      title: "Status",
      value: job.status,
    },
  ];

  return (
    <div className="details-card">
      <h2>Performance Metrics</h2>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <span>{metric.title}</span>

            <h3>{metric.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
