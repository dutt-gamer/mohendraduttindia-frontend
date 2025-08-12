import React from "react";
import Carousel from "./Carousel";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default MainContent;
