import React from 'react';

const DisplayResult = ({ result }) => {
  return (
    <div className="mt-10 w-full bg-zinc-900 text-white p-6 rounded-xl shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
      <h3 className="text-2xl font-semibold mb-4">
        Prediction:{' '}
        <span
          className={`font-bold ${
            result.prediction ? 'text-red-400' : 'text-green-400'
          }`}
        >
          {result.prediction ? 'Likely Readmission' : 'No Readmission'}
        </span>
      </h3>
      <p className="text-lg text-zinc-400">
        Probability:{' '}
        <span className="text-white font-medium">
          {(result.probability * 100).toFixed(2)}%
        </span>
      </p>
    </div>
  );
};

export default DisplayResult;
