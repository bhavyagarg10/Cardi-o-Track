import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

const MODEL_URI = import.meta.env.VITE_BACKEND_URI;

const ModelAnalysis = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    axios.get(`${MODEL_URI}/metrics`)
      .then(res => setMetrics(res.data))
      .catch(err => console.error('Failed to load metrics:', err));
  }, []);

  if (!metrics) {
    return (
       <div className="w-full h-screen flex items-center justify-center bg-black">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-200 mb-10">
          📊 Model Performance by Class
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 0 - Precision</h3>
            <p className="text-slate-300">{(metrics.class_0.precision * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 0 - Recall</h3>
            <p className="text-slate-300">{(metrics.class_0.recall * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 0 - F1 Score</h3>
            <p className="text-slate-300">{(metrics.class_0.f1 * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 1 - Precision</h3>
            <p className="text-slate-300">{(metrics.class_1.precision * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 1 - Recall</h3>
            <p className="text-slate-300">{(metrics.class_1.recall * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Class 1 - F1 Score</h3>
            <p className="text-slate-300">{(metrics.class_1.f1 * 100).toFixed(2)}%</p>
          </div>
          <div className="bg-slate-800 p-6 rounded shadow hover:shadow-lg transition col-span-full">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Overall Accuracy</h3>
            <p className="text-slate-300">{(metrics.accuracy * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAnalysis;
