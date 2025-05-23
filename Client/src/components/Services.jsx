import React from 'react';
import Card from './Card';
import {
  Stethoscope,
  LineChart,
  Activity,
  ShieldCheck,
  Server,
  Brain
} from 'lucide-react';

const services = [
  {
    number: 1,
    title: "Heart Failure Prediction",
    description: "Predict 30-day hospital readmission risk with clinical ML insights.",
    icon: <Stethoscope className="w-8 h-8" />
  },
  {
    number: 2,
    title: "Clinical Data Analysis",
    description: "Extract patterns from patient datasets to support diagnosis.",
    icon: <LineChart className="w-8 h-8" />
  },
  {
    number: 3,
    title: "Performance Monitoring",
    description: "Real-time model metrics: accuracy, recall, precision, and F1.",
    icon: <Activity className="w-8 h-8" />
  },
  {
    number: 4,
    title: "Risk-Based Prioritization",
    description: "Identify and prioritize high-risk patients for immediate care.",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    number: 5,
    title: "API Integration",
    description: "Connect securely with hospital EMRs using scalable APIs.",
    icon: <Server className="w-8 h-8" />
  },
  {
    number: 6,
    title: "AI-Driven Recommendations",
    description: "Deliver personalized care plans using intelligent algorithms.",
    icon: <Brain className="w-8 h-8" />
  }
];

const Services = () => {
  return (
    <section className="bg-black min-h-screen text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-12">
          💼 Services Offered by Cardi-o-Track
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {services.map((service, i) => (
            <Card
              key={i}
              number={service.number}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
