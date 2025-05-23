# Cardi-o-Track

**Cardi-o-Track** is a full-stack web application designed to help users monitor and manage their cardiovascular health. Users can track vital metrics, view insightful visualizations, and receive personalized health recommendations.

🔗 **Live App**: [https://cardi-o-track-tau.vercel.app](https://cardi-o-track-tau.vercel.app)  
🔗 **Backend API**: [https://cardi-o-track-iqty.onrender.com](https://cardi-o-track-iqty.onrender.com)

---

## 🩺 Features

- 🔐 **User Authentication** — Secure login and signup system.
- ❤️ **Track Vital Metrics** — Monitor heart rate, blood pressure, and more.
- 📊 **Interactive Visualizations** — View health data over time.
- 🧠 **Personalized Insights** — AI-driven feedback based on input.
- ⏰ **Reminders** — Get alerts for medication and check-ups.

---

## 🛠 Technologies Used

- **Frontend**: React, Vite, Tailwind CSS  
  → Deployed on [Vercel](https://cardi-o-track-tau.vercel.app)

- **Backend**: Node.js, Express  
  → Deployed on [Render](https://cardi-o-track-iqty.onrender.com)

- **Database**: MongoDB (via Mongoose)

---

## 🚀 Installation

### Prerequisites

- Node.js and npm
- MongoDB locally or MongoDB Atlas for cloud database

### Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bhavyagarg10/Cardi-o-Track.git
   cd Cardi-o-Track
2. **Backend Setup**:

   ```bash
   cd Server
   npm install
   npm start
3. **Frontend Setup**:

   ```bash
   cd ../Client
   npm install
   npm run dev
4. **Open your browser and go to:** 

   ```bash
   # Open your browser and visit:
   http://localhost:5173

5. **API Configuration**:

   ```bash
   echo "VITE_API_BASE_URL=https://cardi-o-track-iqty.onrender.com" > .env
6. **How to contribute**:

   ```bash
   git checkout -b feature/YourFeature
   git add .
   git commit -m "Add feature"
   git push origin feature/YourFeature
