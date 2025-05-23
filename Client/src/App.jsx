import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import About from "./components/About.jsx"
import Home from "./components/Home.jsx"
import Services from "./components/Services.jsx"
import CheckUp from "./components/CheckUp.jsx"
import ModelAnalysis from "./components/ModelAnalysis.jsx"
import Footer from "./components/Footer.jsx"
import "./index.css";
import Contact from "./components/Contact.jsx";
const App = () => {
  return (
    // <div className="">
      <BrowserRouter>
      <Navbar />
      <div className="bg-black text-white flex flex-col w-full min-h-screen">
        <div className="flex items-center justify-center max-w-screen-2xl pt-[70px] mx-auto w-full ">
        <Routes>
          <Route element={<Home />} path={"/"} />
          <Route element={<Services />} path={"/services"} />
          <Route element={<CheckUp />} path={"/checkup"} />
          <Route element={<ModelAnalysis />} path={"/analysis"} />
          <Route element={<Contact />} path={"/contact"} />
        </Routes>
        </div>
        <Footer />
      </div>
      </BrowserRouter>
    // </div>
  );
};

export default App;
