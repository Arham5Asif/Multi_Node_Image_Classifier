import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import Jobs from "./pages/Jobs";
import CAD from "./pages/CAD";
import Models from "./pages/Models";
import Settings from "./pages/Settings";
import WorkerDetails from "./pages/WorkerDetails";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="workers" element={<Workers />} />
        <Route path="workers/:id" element={<WorkerDetails />} />

        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />

        <Route path="cad" element={<CAD />} />

        <Route path="models" element={<Models />} />

        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
