import React from "react";
import '../index.css'

const Footer = () => {
  return (
    <div>
      {/* <div className="bg-green-950 text-white py-2 text-lg text-center border-t text-light border-t-input"> */}
      <div className="bg-black text-xl py-2 text-center text-white border-t-[1px] border-t-slate-700">
        Copyright © {new Date().getFullYear()} | Cardi-o-Track
      </div>
    </div>
  );
};

export default Footer;
