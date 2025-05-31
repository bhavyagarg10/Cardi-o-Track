# Cardi-o-Track

Cardi-o-Track is a full-stack web application designed to help users monitor and manage their cardiovascular health. Users can track vital metrics, view insightful visualizations, and receive personalized health recommendations.

🔗 **Live App:** https://cardi-o-track-tau.vercel.app  
🔗 **Backend API:** https://cardi-o-track-iqty.onrender.com

---

## 🩺 Features

- 🔐 User Authentication — Secure login and signup system  
- ❤️ Track Vital Metrics — Monitor heart rate, blood pressure, and more  
- 📊 Interactive Visualizations — View health data over time  
- 🧠 Personalized Insights — AI-driven feedback based on input  
- ⏰ Reminders — Get alerts for medication and check-ups  

---

## 🛠 Technologies Used

- **Frontend:** React, Vite, Tailwind CSS  
  → Deployed on Vercel  

- **Backend:** Python, Flask, scikit-learn, pandas  
  → Deployed on Render  

- **Machine Learning:** scikit-learn, joblib  

---

## 🚀 Installation

### Prerequisites

- Python (v3.10 or higher)  
- Node.js and npm (for frontend)  
- MongoDB (optional, if your app uses it for storage)  

### Setup Instructions

## 1️⃣ Clone the repository
```bash
git clone https://github.com/bhavyagarg10/Cardi-o-Track.git
cd Cardi-o-Track
```

## 2️⃣ Backend Setup (Python + Flask)
```bash
cd Server
pip install -r requirements.txt
python app.py
```

### API will start at: http://localhost:5000

## 3️⃣ Frontend Setup (React + Vite)
```bash
cd ../Client
npm install
npm run dev
```
### Frontend will start at: http://localhost:5173

## 4️⃣ API Configuration
### Inside the Client folder, create a .env file with:
```env
"VITE_API_BASE_URL=http://localhost:5000" >
```
## 🤝 How to Contribute
```bash
git checkout -b feature/YourFeature
git add .
git commit -m "Add feature"
git push origin feature/YourFeature
```
