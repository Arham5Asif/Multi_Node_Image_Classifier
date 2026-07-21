import pandas as pd
from pathlib import Path
from sklearn.preprocessing import LabelEncoder

# ============================================================
# STEP 1: Locate project root and log file
# ============================================================

PROJECT_ROOT = Path(__file__).resolve().parents[2]

LOG_FILE = (
    PROJECT_ROOT
    / 'cad_anomaly_detection'
    / 'logs'
    / 'communication_logs.csv'
)

OUTPUT_FILE = (
    PROJECT_ROOT
    / 'cad_anomaly_detection'
    / 'logs'
    / 'processed_features.csv'
)

# ============================================================
# STEP 2: Read communication logs
# ============================================================

print('=' * 60)
print('READING COMMUNICATION LOGS')
print('=' * 60)

df = pd.read_csv(LOG_FILE)

print('\\nRaw Data:')
print(df)

# ============================================================
# STEP 3: Check missing values
# ============================================================

print('\\n' + '=' * 60)
print('CHECKING MISSING VALUES')
print('=' * 60)

print(df.isnull().sum())

# ============================================================
# STEP 4: Show data types
# ============================================================

print('\\n' + '=' * 60)
print('DATA TYPES')
print('=' * 60)

print(df.dtypes)

# ============================================================
# STEP 5: Convert timestamp to datetime
# ============================================================

print('\\n' + '=' * 60)
print('CONVERTING TIMESTAMP')
print('=' * 60)

df['timestamp'] = pd.to_datetime(df['timestamp'])

# Extract useful time-based features
df['hour'] = df['timestamp'].dt.hour
df['day_of_week'] = df['timestamp'].dt.dayofweek  # Monday=0

print(df[['timestamp', 'hour', 'day_of_week']])

# ============================================================
# STEP 6: Encode categorical columns
# ============================================================

print('\\n' + '=' * 60)
print('ENCODING CATEGORICAL FEATURES')
print('=' * 60)

worker_encoder = LabelEncoder()
endpoint_encoder = LabelEncoder()
status_encoder = LabelEncoder()

df['worker_id_encoded'] = worker_encoder.fit_transform(df['worker_id'])
df['endpoint_encoded'] = endpoint_encoder.fit_transform(df['endpoint'])
df['status_encoded'] = status_encoder.fit_transform(df['status'])

print('\\nEncoding Mappings:')

print('Worker IDs:')
for i, label in enumerate(worker_encoder.classes_):
    print(f'  {label} -> {i}')

print('\\nEndpoints:')
for i, label in enumerate(endpoint_encoder.classes_):
    print(f'  {label} -> {i}')

print('\\nStatus:')
for i, label in enumerate(status_encoder.classes_):
    print(f'  {label} -> {i}')

# ============================================================
# STEP 7: Create final feature matrix
# ============================================================

print('\\n' + '=' * 60)
print('CREATING FEATURE MATRIX')
print('=' * 60)

feature_columns = [
    'response_time_ms',
    'message_size_bytes',
    'worker_id_encoded',
    'endpoint_encoded',
    'status_encoded',
    'hour',
    'day_of_week'
]

X = df[feature_columns]

print('\\nFinal Feature Matrix:')
print(X)

# ============================================================
# STEP 8: Save processed features
# ============================================================

X.to_csv(OUTPUT_FILE, index=False)

print('\\n' + '=' * 60)
print('FEATURE EXTRACTION COMPLETE')
print('=' * 60)

print(f'Processed features saved to:')
print(OUTPUT_FILE)

print('\\nFeature Matrix Shape:', X.shape)
print('Columns:', list(X.columns))