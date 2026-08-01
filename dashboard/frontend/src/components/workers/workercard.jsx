import {
  Cpu,
  MemoryStick,
  HeartPulse,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function WorkerCard({ name, status, cpu, memory, heartbeat }) {
  const online = status === "Online";
  const navigate = useNavigate();

  return (
    <div className="worker-card" onClick={() => navigate(`/workers/${name}`)}>
      <div className="worker-card-header">
        <h3>{name}</h3>

        <span className={online ? "worker-online" : "worker-offline"}>
          {online ? <CheckCircle size={18} /> : <XCircle size={18} />}
          {status}
        </span>
      </div>

      <div className="worker-info">
        {/* CPU */}

        <div className="info-row">
          <Cpu size={18} />
          <span>CPU Usage</span>
          <strong>{cpu}</strong>
        </div>

        <div className="progress-bar">
          <div className="progress-fill cpu-fill" style={{ width: cpu }}></div>
        </div>

        {/* Memory */}

        <div className="info-row">
          <MemoryStick size={18} />
          <span>Memory</span>
          <strong>{memory}</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill memory-fill"
            style={{ width: memory }}
          ></div>
        </div>

        {/* Heartbeat */}

        <div className="info-row heartbeat">
          <HeartPulse size={18} />

          <span>Heartbeat</span>

          <strong>{heartbeat}</strong>
        </div>
      </div>
    </div>
  );
}
