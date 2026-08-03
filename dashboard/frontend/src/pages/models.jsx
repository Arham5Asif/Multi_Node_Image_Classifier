import "../styles/Models.css";

import ModelCard from "../components/models/ModelCard";

export default function Models() {
  const models = [
    {
      name: "EfficientNet-B0",

      accuracy: "94.20%",

      precision: "94.18%",

      recall: "94.20%",

      f1: "94.18%",

      inference: "5.613 ms/img",

      training: "20.15 min",

      size: "15.61 MB",

      status: "Online",

      active: true,
    },

    {
      name: "ResNet50",

      accuracy: "92.43%",

      precision: "92.45%",

      recall: "92.43%",

      f1: "92.44%",

      inference: "2.684 ms/img",

      training: "32.17 min",

      size: "90.03 MB",

      status: "Available",

      active: false,
    },

    {
      name: "MobileNetV3",

      accuracy: "92.33%",

      precision: "92.42%",

      recall: "92.33%",

      f1: "92.33%",

      inference: "3.0146 ms/img",

      training: "12.34 min",

      size: "16.26 MB",

      status: "Available",

      active: false,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AI Models</h1>

        <p>Manage deployed image classification models.</p>
      </div>

      <div className="models-grid">
        {models.map((model, index) => (
          <ModelCard key={index} {...model} />
        ))}
      </div>
    </div>
  );
}
