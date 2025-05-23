import React from 'react';
import Form from '../components/Form';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-4 text-center">Get in Touch</h1>
      <p className="text-zinc-400 text-center mb-10 max-w-xl">
        Have questions or want to work with us? Fill out the form below and we’ll get back to you soon.
      </p>
      <Form />
    </div>
  );
};

export default Contact;
