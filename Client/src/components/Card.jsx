import React from 'react';

const Card = ({ number, title, description, icon }) => {
  return (
    <div className="w-72 bg-slate-800 text-white shadow-[0px_0px_15px_rgba(255,0,0,0.1)] p-6 space-y-4 relative rounded-lg overflow-hidden">
      <div className="w-20 h-20 bg-red-600 rounded-full absolute -right-6 -top-6 flex items-center justify-center">
        <span className="text-white text-xl font-bold">{number < 10 ? `0${number}` : number}</span>
      </div>
      <div className="w-10 h-10 text-red-400">{icon}</div>
      <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
      <p className="text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
};

export default Card;
