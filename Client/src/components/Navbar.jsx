import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black fixed w-full h-16 z-50 shadow-md shadow-slate-800 border-b border-slate-900">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="text-[1.8rem] font-semibold text-slate-300 cursor-pointer">
          Cardi-o-Track
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 text-white text-xl font-semibold">
          <Link to="/" className="cursor-pointer">Home</Link>
          <Link to="/services" className="cursor-pointer">Services</Link>
          <Link to="/checkup" className="cursor-pointer">CheckUp</Link>
          <Link to="/analysis" className="cursor-pointer">Model Analysis</Link>
          <Link to="/contact" className="cursor-pointer">Contact</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
