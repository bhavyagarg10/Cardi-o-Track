import React from 'react';

const Form = () => {
  return (
    <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-10">
      <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
      <form className="grid grid-cols-1 gap-6">
        <input
          type="text"
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Full Name"
        />
        <input
          type="email"
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Email"
        />
        <input
          type="tel"
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Phone Number"
        />
        <textarea
          name="message"
          rows="5"
          className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
          placeholder="Your Message"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Form;
