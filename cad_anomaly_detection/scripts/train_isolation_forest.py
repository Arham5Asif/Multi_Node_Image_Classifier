"""
Train Isolation Forest for Communication Anomaly Detection
"""

import joblib
import pandas as pd
from pathlib import Path
from sklearn.ensemble import IsolationForest

# ============================================================
# Paths
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[2]

FEATURE_FILE = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "logs"
    / "processed_features.csv"
)

MODEL_FILE = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "models"
    / "isolation_forest.pkl"
)

ANOMALY_LOG_FILE = (
    PROJECT_ROOT
    / "cad_anomaly_detection"
    / "logs"
    / "anomaly_logs.csv"
)

# ============================================================
# Load Features
# ============================================================

print("=" * 60)
print("LOADING FEATURE MATRIX")
print("=" * 60)

X = pd.read_csv(FEATURE_FILE)

print(X.head())

print("\nDataset Shape:", X.shape)

# ============================================================
# Train Isolation Forest
# ============================================================

print("\n" + "=" * 60)
print("TRAINING ISOLATION FOREST")
print("=" * 60)

model = IsolationForest(
    n_estimators=100,
    contamination=0.10,
    random_state=42
)

model.fit(X)

print("Training Complete.")

# ============================================================
# Save Model
# ============================================================

joblib.dump(model, MODEL_FILE)

print("\nModel saved to:")

print(MODEL_FILE)

# ============================================================
# Predict Anomalies
# ============================================================

print("\n" + "=" * 60)
print("DETECTING ANOMALIES")
print("=" * 60)

predictions = model.predict(X)

scores = model.decision_function(X)

results = X.copy()

results["anomaly_score"] = scores

results["prediction"] = predictions

results["prediction"] = results["prediction"].replace(
    {
        1: "Normal",
        -1: "Anomaly"
    }
)

results.to_csv(ANOMALY_LOG_FILE, index=False)

print(results.head())

print("\nPrediction Counts:")

print(results["prediction"].value_counts())

print("\nAnomaly log saved to:")

print(ANOMALY_LOG_FILE)

print("\nIsolation Forest Training Complete!")