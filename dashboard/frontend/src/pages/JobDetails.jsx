import { Link, useParams } from "react-router-dom";

import "../styles/JobDetails.css";

import JobInfo from "../components/jobs/JobInfo";
import JobTimeline from "../components/jobs/JobTimeline";
import JobImagePreview from "../components/jobs/JobImagePreview";
import JobResult from "../components/jobs/JobResult";
import JobMetrics from "../components/jobs/JobMetrics";
import ActivityLog from "../components/jobs/ActivityLog";
import JobPerformanceChart from "../components/jobs/JobPerformanceChart";
import ConfidenceGauge from "../components/jobs/ConfidenceGauge";
import ClassificationSummary from "../components/jobs/ClassificationSummary";

export default function JobDetails() {
  const { id } = useParams();

  const job = {
    id,

    image: "mountain.jpg",

    worker: "Worker-1",

    model: "EfficientNet-B0",

    prediction: "Mountain",

    confidence: "98.72%",

    executionTime: "0.84 sec",

    status: "Completed",
  };

  return (
    <div className="job-details-page">
      <Link className="back-link" to="/jobs">
        ← Back to Jobs
      </Link>

      <div className="job-title">
        <h1>Job #{job.id}</h1>

        <span className="job-status completed">{job.status}</span>
      </div>

      <div className="job-details-grid">
        <JobImagePreview image={job.image} />

        <JobInfo job={job} />

        <JobResult job={job} />

        <JobTimeline />

        <JobMetrics job={job} />

        <ActivityLog />

        <JobPerformanceChart />

        <ConfidenceGauge confidence={job.confidence} />

        <ClassificationSummary job={job} />
      </div>
    </div>
  );
}
