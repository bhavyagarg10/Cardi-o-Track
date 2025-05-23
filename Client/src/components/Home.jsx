import React from "react";
import { Link } from "react-router-dom";
import HeartBeat from "../assets/HeartBeat.svg";
const Home = () => {
  return (
    <section className="bg-black text-white min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100">
            Welcome to <span className="text-red-500">Cardi-o-Track</span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Empowering healthcare providers with predictive insights to reduce
            heart failure readmissions.
          </p>
          <div className="mt-6">
            <Link
              to="/checkup"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
            >
              Try the Demo
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              What is Cardi-o-Track?
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Cardi-o-Track is an AI-powered tool designed to predict the
              likelihood of 30-day hospital readmissions for heart failure
              patients. By analyzing clinical data, it assists healthcare
              providers in identifying high-risk patients, enabling proactive
              care and improved patient outcomes.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={HeartBeat}
              alt="Heart Shielder Illustration"
              className="w-72 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-200 text-center mb-8">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                Predictive Analytics
              </h3>
              <p className="text-slate-400">
                Utilizes machine learning to forecast 30-day readmission risks
                based on patient data.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                Clinical Data Integration
              </h3>
              <p className="text-slate-400">
                Analyzes comprehensive clinical datasets to enhance prediction
                accuracy.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold text-red-400 mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-slate-400">
                Intuitive design ensures easy navigation for healthcare
                professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-200 mb-4">
            Ready to Enhance Patient Care?
          </h2>
          <p className="text-slate-400 mb-6">
            Explore how Cardi-o-Track can assist in reducing readmission rates
            and improving patient outcomes.
          </p>
          <Link
            to="/checkup"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
