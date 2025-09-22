import React from "react";
import Carousel from "./Carousel";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import ProductPage from "./ProductPage";
import ProductDetailsPage from "./ProductDetailsPage";
import Cart from "./Cart";
import AuthPage from "./AuthPage";
import CheckOut from "./CheckOut";
import Orders from "./Orders";

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <ProductPage />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <span className="flex justify-center bg-gray-900 p-2 border-gray-700 border-t text-gray-300 hover:text-white text-sm sm:text-md transition-colors">
        <a href="#">Back to Top</a>
      </span>
    </div>
  );
};

export default MainContent;
