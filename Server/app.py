from flask import Flask, request, jsonify
import os
import numpy as np
import pandas as pd
import joblib
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

model = joblib.load(os.path.join(os.path.dirname(__file__), 'rf_model.pkl'))
scaler = joblib.load(os.path.join(os.path.dirname(__file__), 'scaler.pkl'))


@app.route('/metrics', methods=['GET'])
def metrics():
    try:
        # Load raw data
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))

        patients = pd.read_csv(os.path.join(BASE_DIR, 'patients_202208161605.csv'))
        admissions = pd.read_csv(os.path.join(BASE_DIR, 'admissions_202208161605.csv'))
        diagnoses = pd.read_csv(os.path.join(BASE_DIR, 'diagnoses_icd_202208161605.csv'))


        # Preprocessing
        patients['dob'] = pd.to_datetime(patients['dob'], errors='coerce').fillna(pd.Timestamp('1900-01-01'))
        admissions = admissions.merge(patients[['subject_id', 'gender', 'dob']], on='subject_id', how='left')
        diagnoses['icd9_code'] = diagnoses['icd9_code'].astype(str)
        hf_diag = diagnoses[diagnoses['icd9_code'].str.startswith('428')]
        hf_subject_ids = hf_diag['subject_id'].unique()
        hf_adm = admissions[admissions['subject_id'].isin(hf_subject_ids)].copy()
        hf_adm['admittime'] = pd.to_datetime(hf_adm['admittime'], errors='coerce')
        hf_adm['dischtime'] = pd.to_datetime(hf_adm['dischtime'], errors='coerce')
        hf_adm = hf_adm.dropna(subset=['admittime', 'dischtime'])
        hf_adm = hf_adm.sort_values(['subject_id', 'admittime'])
        hf_adm['next_admit'] = hf_adm.groupby('subject_id')['admittime'].shift(-1)
        hf_adm['days_to_readmit'] = (hf_adm['next_admit'] - hf_adm['dischtime']).dt.days
        hf_adm['readmit_30d'] = hf_adm['days_to_readmit'].apply(lambda x: 1 if 0 < x <= 30 else 0)
        hf_adm = hf_adm.dropna(subset=['dob', 'admittime'])
        hf_adm = hf_adm[
            (hf_adm['dob'] < hf_adm['admittime']) &
            (hf_adm['dob'] >= pd.Timestamp('1900-01-01')) &
            (hf_adm['dob'] <= pd.Timestamp('2025-01-01')) &
            (hf_adm['admittime'] >= pd.Timestamp('1900-01-01')) &
            (hf_adm['admittime'] <= pd.Timestamp('2262-04-11'))
        ]

        def safe_age(row):
            try:
                dob = row['dob']
                admit = row['admittime']
                return (admit - dob).days / 365.25 if dob < admit else np.nan
            except:
                return np.nan

        hf_adm['age'] = hf_adm.apply(safe_age, axis=1)
        hf_adm['los'] = (hf_adm['dischtime'] - hf_adm['admittime']).dt.total_seconds() / (24 * 3600)
        hf_adm['los'] = hf_adm['los'].clip(0, 365)
        hf_adm['num_prev_adm'] = hf_adm.groupby('subject_id').cumcount()
        hf_adm['gender_enc'] = LabelEncoder().fit_transform(hf_adm['gender'])

        diag_count = diagnoses.groupby('hadm_id').size().reset_index(name='num_diagnoses')
        hf_adm = hf_adm.merge(diag_count, on='hadm_id', how='left')
        hf_adm['num_diagnoses'] = hf_adm['num_diagnoses'].fillna(0)

        features = ['age', 'gender_enc', 'num_prev_adm', 'los', 'num_diagnoses']
        hf_adm = hf_adm.dropna(subset=features + ['readmit_30d'])
        X = hf_adm[features]
        y = hf_adm['readmit_30d']

        _, X_test, _, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
        X_test_scaled = scaler.transform(X_test)

        y_proba = model.predict_proba(X_test_scaled)[:, 1]
        y_pred = (y_proba >= 0.6).astype(int)

        report = classification_report(y_test, y_pred, output_dict=True, zero_division=0)

        return jsonify({
            'class_0': {
                'precision': report['0']['precision'],
                'recall': report['0']['recall'],
                'f1': report['0']['f1-score']
            },
            'class_1': {
                'precision': report['1']['precision'],
                'recall': report['1']['recall'],
                'f1': report['1']['f1-score']
            },
            'accuracy': report['accuracy']
        })
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received input:", data)  # Debug print

        features = ['age', 'gender_enc', 'num_prev_adm', 'los', 'num_diagnoses']
        missing = [f for f in features if f not in data]
        if missing:
            return jsonify({'error': f'Missing fields: {missing}'}), 400

        input_data = np.array([[data[feature] for feature in features]])
        print("Input for scaler:", input_data)  # Debug print

        input_scaled = scaler.transform(input_data)
        print("Input scaled:", input_scaled)  # Debug print

        proba = model.predict_proba(input_scaled)[0][1]
        prediction = int(proba >= 0.6)

        return jsonify({
            'probability': round(proba, 4),
            'prediction': prediction
        })

    except Exception as e:
        import traceback
        traceback.print_exc()  # Print error to Flask console
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # Render sets PORT env var
    app.run(debug=True, host='0.0.0.0', port=port)
