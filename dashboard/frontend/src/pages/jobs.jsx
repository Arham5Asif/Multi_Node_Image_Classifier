import { useState } from "react";

import "../styles/Jobs.css";

import JobCard from "../components/jobs/JobCard";

export default function Jobs() {
  const jobs = [
    {
      id: 101,
      image: "mountain.jpg",
      worker: "Worker-1",
      model: "EfficientNet-B0",
      status: "Completed",
      progress: 100,
      confidence: "98.72%",
      executionTime: "0.84 sec",
    },

    {
      id: 102,
      image: "forest.jpg",
      worker: "Worker-2",
      model: "EfficientNet-B0",
      status: "Running",
      progress: 62,
      confidence: "--",
      executionTime: "--",
    },

    {
      id: 103,
      image: "sea.jpg",
      worker: "Worker-3",
      model: "EfficientNet-B0",
      status: "Queued",
      progress: 12,
      confidence: "--",
      executionTime: "--",
    },

    {
      id: 104,
      image: "street.jpg",
      worker: "Worker-2",
      model: "EfficientNet-B0",
      status: "Failed",
      progress: 100,
      confidence: "--",
      executionTime: "1.34 sec",
    },
  ];

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.image.toLowerCase().includes(search.toLowerCase()) ||
      job.worker.toLowerCase().includes(search.toLowerCase());

    const matchFilter = filter === "All" || job.status === filter;

    return matchSearch && matchFilter;
  });

  const completed = jobs.filter((j) => j.status === "Completed").length;
  const running = jobs.filter((j) => j.status === "Running").length;
  const failed = jobs.filter((j) => j.status === "Failed").length;

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Jobs</h1>

        <p>Manage distributed image classification jobs.</p>
      </div>

      <div className="job-stats">
        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>{running}</h2>
          <p>Running</p>
        </div>

        <div className="stat-card">
          <h2>{failed}</h2>
          <p>Failed</p>
        </div>
      </div>

      <div className="jobs-toolbar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Completed</option>
          <option>Running</option>
          <option>Queued</option>
          <option>Failed</option>
        </select>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
