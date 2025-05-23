import React, { useState } from "react";
import axios from "axios";
import DisplayResult from "./DisplayResult";

const MODEL_URI = import.meta.env.VITE_BACKEND_URI;

const FormInput = () => {
  const [form, setForm] = useState({
    age: "",
    gender_enc: "",
    num_prev_adm: "",
    los: "",
    num_diagnoses: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      age: parseFloat(form.age),
      gender_enc: parseInt(form.gender_enc),
      num_prev_adm: parseInt(form.num_prev_adm),
      los: parseFloat(form.los),
      num_diagnoses: parseInt(form.num_diagnoses),
    };

    try {
      const res = await axios.post(`${MODEL_URI}/predict`, payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error: Could not fetch prediction");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-10 mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">
        Heart Failure Readmission Checkup
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <select
          name="gender_enc"
          value={form.gender_enc}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select Gender</option>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>

        <input
          name="num_prev_adm"
          type="number"
          placeholder="Number of Previous Admissions"
          value={form.num_prev_adm}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          name="los"
          type="number"
          placeholder="Length of Stay (days)"
          value={form.los}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          name="num_diagnoses"
          type="number"
          placeholder="Number of Diagnoses"
          value={form.num_diagnoses}
          onChange={handleChange}
          required
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition"
        >
          Predict
        </button>
      </form>

      {result && <DisplayResult result={result} />}
    </div>
  );
};

export default FormInput;
