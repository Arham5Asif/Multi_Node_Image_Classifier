import { CheckCircle, Clock, LoaderCircle } from "lucide-react";

const jobs = [
  {
    id: "JOB-101",
    image: "glacier.jpg",
    worker: "Worker-1",
    status: "Completed",
    time: "2 sec",
  },
  {
    id: "JOB-102",
    image: "forest.jpg",
    worker: "Worker-2",
    status: "Completed",
    time: "3 sec",
  },
  {
    id: "JOB-103",
    image: "sea.jpg",
    worker: "Worker-3",
    status: "Running",
    time: "--",
  },
  {
    id: "JOB-104",
    image: "mountain.jpg",
    worker: "Worker-1",
    status: "Queued",
    time: "--",
  },
];

export default function RecentJobs() {
  return (
    <div className="jobs-panel">
      <div className="jobs-header">
        <h2>Recent Jobs</h2>
      </div>

      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Image</th>
            <th>Worker</th>
            <th>Status</th>
            <th>Processing Time</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.image}</td>
              <td>{job.worker}</td>

              <td>
                {job.status === "Completed" && (
                  <span className="completed">
                    <CheckCircle size={18} />
                    Completed
                  </span>
                )}

                {job.status === "Running" && (
                  <span className="running">
                    <LoaderCircle size={18} />
                    Running
                  </span>
                )}

                {job.status === "Queued" && (
                  <span className="queued">
                    <Clock size={18} />
                    Queued
                  </span>
                )}
              </td>

              <td>{job.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
