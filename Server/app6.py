
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, precision_score, recall_score
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
import joblib

# === Load Data ===
patients = pd.read_csv('patients_202208161605.csv')
admissions = pd.read_csv('admissions_202208161605.csv')
diagnoses = pd.read_csv('diagnoses_icd_202208161605.csv')

# === Fix dob format ===
patients['dob'] = pd.to_datetime(patients['dob'], errors='coerce')
patients['dob'] = patients['dob'].fillna(pd.Timestamp('1900-08-12'))

# Merge admissions with patients
admissions = admissions.merge(patients[['subject_id', 'gender', 'dob']], on='subject_id', how='left')

# === Use ICD column: icd9_code ===
icd_col = 'icd9_code'

# === Identify Heart Failure Patients ===
hf_diag = diagnoses[diagnoses[icd_col].astype(str).str.startswith('428')]
hf_subject_ids = hf_diag['subject_id'].unique()
hf_admissions = admissions[admissions['subject_id'].isin(hf_subject_ids)].copy()

# Convert admittime and dischtime
hf_admissions['admittime'] = pd.to_datetime(hf_admissions['admittime'], errors='coerce')
hf_admissions['dischtime'] = pd.to_datetime(hf_admissions['dischtime'], errors='coerce')

# Drop invalid times
hf_admissions = hf_admissions.dropna(subset=['admittime', 'dischtime'])

# Sort and calculate readmission info
hf_admissions = hf_admissions.sort_values(['subject_id', 'admittime'])
hf_admissions['next_admit'] = hf_admissions.groupby('subject_id')['admittime'].shift(-1)
hf_admissions['days_to_readmit'] = (hf_admissions['next_admit'] - hf_admissions['dischtime']).dt.days
hf_admissions['readmit_30d'] = hf_admissions['days_to_readmit'].apply(lambda x: 1 if 0 < x <= 30 else 0)

# Drop rows with missing or invalid dob/admittime
hf_admissions = hf_admissions.dropna(subset=['dob', 'admittime'])
hf_admissions = hf_admissions[
    (hf_admissions['dob'] < hf_admissions['admittime']) &
    (hf_admissions['dob'] >= pd.Timestamp('1900-01-01')) &
    (hf_admissions['dob'] <= pd.Timestamp('2025-01-01')) &
    (hf_admissions['admittime'] >= pd.Timestamp('1900-01-01')) &
    (hf_admissions['admittime'] <= pd.Timestamp('2262-04-11'))
]

# === Feature Engineering ===
# Safe Age Calculation
def safe_age(row):
    try:
        dob = row['dob'].to_pydatetime()
        admit = row['admittime'].to_pydatetime()
        if dob < admit:
            return (admit - dob).days / 365.25
        else:
            return np.nan
    except:
        return np.nan

hf_admissions['age'] = hf_admissions.apply(safe_age, axis=1)

# Hospital stay duration
hf_admissions['los'] = (hf_admissions['dischtime'] - hf_admissions['admittime']).dt.total_seconds() / (24 * 3600)
hf_admissions['los'] = hf_admissions['los'].clip(0, 365)  # Clip outliers

# Previous admission patterns
hf_admissions['num_prev_adm'] = hf_admissions.groupby('subject_id').cumcount()

# Gender encoding
hf_admissions['gender_enc'] = LabelEncoder().fit_transform(hf_admissions['gender'])

# Get diagnoses count
diagnoses_count = diagnoses.groupby('hadm_id').size().reset_index(name='num_diagnoses')
hf_admissions = hf_admissions.merge(diagnoses_count, on='hadm_id', how='left')
hf_admissions['num_diagnoses'] = hf_admissions['num_diagnoses'].fillna(0)

# Define features
features = ['age', 'gender_enc', 'num_prev_adm', 'los', 'num_diagnoses']

# Print class distribution
print("Class distribution:")
print(hf_admissions['readmit_30d'].value_counts(normalize=True))

# Drop rows with NaNs in features or label
hf_admissions = hf_admissions.dropna(subset=features + ['readmit_30d'])

# Prepare inputs
X = hf_admissions[features]
y = hf_admissions['readmit_30d']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Apply SMOTE to balance classes
smote = SMOTE(random_state=42, sampling_strategy=0.5)  # Create more balanced but not fully balanced dataset
X_train_smote, y_train_smote = smote.fit_resample(X_train_scaled, y_train)

print("Class distribution after SMOTE:")
print(pd.Series(y_train_smote).value_counts(normalize=True))

# Train Random Forest on balanced data
rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    min_samples_leaf=5,
    class_weight='balanced',
    random_state=42
)
rf_model.fit(X_train_smote, y_train_smote)

# Test on imbalanced test data
y_proba_rf = rf_model.predict_proba(X_test_scaled)[:, 1]

# Try different thresholds for Random Forest
thresholds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
rf_results = []

for threshold in thresholds:
    y_pred_rf = (y_proba_rf >= threshold).astype(int)
    precision = precision_score(y_test, y_pred_rf, zero_division=0)
    recall = recall_score(y_test, y_pred_rf, zero_division=0)
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    pos_count = y_pred_rf.sum()
    
    rf_results.append({
        'Threshold': threshold,
        'Precision': precision,
        'Recall': recall,
        'F1': f1,
        'Positives': pos_count
    })

# Display Random Forest results
rf_results_df = pd.DataFrame(rf_results)
print("\nRandom Forest results for different thresholds:")
print(rf_results_df)

# Find best threshold for Random Forest with precision >= 0.4
rf_precision_threshold = rf_results_df[rf_results_df['Precision'] >= 0.4]
if len(rf_precision_threshold) > 0:
    rf_best_row = rf_precision_threshold.loc[rf_precision_threshold['Recall'].idxmax()]
    rf_best_threshold = rf_best_row['Threshold']
    print(f"\nBest RF threshold for precision >= 0.4: {rf_best_threshold}")
    
    # Apply best threshold
    y_pred_rf_best = (y_proba_rf >= rf_best_threshold).astype(int)
    print("\nRandom Forest classification report with best threshold:")
    print(classification_report(y_test, y_pred_rf_best))
else:
    print("\nNo RF threshold achieves precision >= 0.4")
    # Find highest precision threshold
    rf_best_threshold = rf_results_df.loc[rf_results_df['Precision'].idxmax()]['Threshold']
    y_pred_rf_best = (y_proba_rf >= rf_best_threshold).astype(int)
    print(f"\nUsing RF threshold with highest precision: {rf_best_threshold}")
    print(classification_report(y_test, y_pred_rf_best))

# Feature importance analysis
if hasattr(rf_model, 'feature_importances_'):
    importances = pd.DataFrame({
        'Feature': features,
        'Importance': rf_model.feature_importances_
    })
    importances = importances.sort_values('Importance', ascending=False)
    print("\n=== Random Forest Feature Importance ===")
    print(importances)

# Plot the precision-recall trade-off
plt.figure(figsize=(10, 6))
plt.plot(rf_results_df['Threshold'], rf_results_df['Precision'], 'r-', label='Precision')
plt.plot(rf_results_df['Threshold'], rf_results_df['Recall'], 'r--', label='Recall')
plt.axvline(x=rf_best_threshold, color='r', linestyle=':', label=f'Best Threshold: {rf_best_threshold}')
plt.xlabel('Threshold')
plt.ylabel('Score')
plt.title('Precision and Recall vs Threshold')
plt.legend()
plt.grid(True)
plt.savefig('rf_precision_recall_threshold.png')
plt.show()
joblib.dump(rf_model, 'rf_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

