import { Link, useParams } from "react-router-dom";

import "../styles/ModelDetails.css";

import ModelHeader from "../components/models/ModelHeader";
import ModelInfo from "../components/models/ModelInfo";
import ModelPerformanceChart from "../components/models/ModelPerformanceChart";
import TrainingChart from "../components/models/TrainingChart";
import InferenceChart from "../components/models/InferenceChart";
import DeployPanel from "../components/models/DeployPanel";
import RecommendationPanel from "../components/models/RecommendationPanel";
import DeploymentHistory from "../components/models/DeploymentHistory";
import ConfusionMatrix from "../components/models/ConfusionMatrix";
import ROCPanel from "../components/models/ROCPanel";
import VersionNotes from "../components/models/VersionNotes";
import DownloadModel from "../components/models/DownloadModel";

export default function ModelDetails() {
  const { name } = useParams();

  const models = {
    "EfficientNet-B0": {
      name: "EfficientNet-B0",

      accuracy: "94.20%",

      precision: "94.18%",

      recall: "94.20%",

      f1: "94.18%",

      training: "20.15 min",

      inference: "5.613 ms/img",

      size: "15.61 MB",

      status: "Online",
    },

    ResNet50: {
      name: "ResNet50",

      accuracy: "92.43%",

      precision: "92.45%",

      recall: "92.43%",

      f1: "92.44%",

      training: "32.17 min",

      inference: "2.684 ms/img",

      size: "90.03 MB",

      status: "Available",
    },

    MobileNetV3: {
      name: "MobileNetV3",

      accuracy: "92.33%",

      precision: "92.42%",

      recall: "92.33%",

      f1: "92.33%",

      training: "12.34 min",

      inference: "3.0146 ms/img",

      size: "16.26 MB",

      status: "Available",
    },
  };

  const model = models[decodeURIComponent(name)];

  return (
    <div className="page-container">
      <Link to="/models" className="back-link">
        ← Back to Models
      </Link>

      <ModelHeader model={model} />

      <div className="model-details-grid">
        <ModelInfo model={model} />
        <ModelPerformanceChart model={model} />
        <TrainingChart />
        <InferenceChart />
        <DeployPanel model={model} />
        <RecommendationPanel model={model} />
        <DeploymentHistory model={model} />
        <ConfusionMatrix model={model} />
        <ROCPanel model={model} />
        <VersionNotes model={model} />
        <DownloadModel model={model} />
      </div>
    </div>
  );
}
