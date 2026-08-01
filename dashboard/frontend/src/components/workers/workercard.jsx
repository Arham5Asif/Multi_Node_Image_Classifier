import {
  Cpu,
  MemoryStick,
  HeartPulse,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

export default function WorkerCard({ name, status, cpu, memory, heartbeat }) {
  return (
    <div className="worker-card">
      <div className="worker-card-header">
        <h3>{name}</h3>

        <span className="worker-online">
          <CheckCircle size={18} />
          Online
        </span>
      </div>

      <div className="worker-info">
        <div className="info-row">
          <Cpu size={18} />
          <span>CPU Usage</span>
          <strong>23%</strong>
        </div>

        <div className="info-row">
          <MemoryStick size={18} />
          <span>Memory</span>
          <strong>48%</strong>
        </div>

        <div className="info-row">
          <HeartPulse size={18} />
          <span>Heartbeat</span>
          <strong>2 sec ago</strong>
        </div>
      </div>

      <div className="worker-actions">
        <button className="details-btn">View Details</button>

        <button className="restart-btn">
          <RotateCcw size={16} />
          Restart
        </button>
      </div>
    </div>
  );
}
