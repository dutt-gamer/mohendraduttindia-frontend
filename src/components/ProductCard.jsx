import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { API_URL } from "../utils/constants";

const ProductCard = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
    e.stopPropagation(); // stop Link click
    dispatch(addToCart(product));
  };

  // Helper to get correct image URL
  const getImageUrl = (url) => {
    if (!url) return "/placeholder.png"; // fallback if no image
    return url.startsWith("https") ? url : `${API_URL}${url}`;
  };

  const currentImageUrl =
    product.images && product.images.length > 0
      ? getImageUrl(product.images[currentIndex]?.url)
      : "/placeholder.png";

  return (
    <div className="flex flex-col items-center my-1 sm:m-1 sm:p-4 rounded-md w-full sm:w-64 sm:h-[27rem] hover:scale-103 transition-all">
      <Link
        to={"/product/" + product.documentId}
        key={product.id}
        className="w-full flex sm:flex-col items-center justify-evenly"
      >
        <div className="relative w-52 h-60 flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-cover sm:rounded-md"
            src={currentImageUrl}
            alt={product.name}
          />
        </div>

        {/* Image selector */}
        <div className="hidden sm:flex space-x-2 mt-2 relative z-20">
          {product.images?.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              aria-label={`Show image ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentIndex ? "bg-red-600 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-end">
          <h1 className="w-52 font-semibold text-gray-500 text-sm sm:text-md text-center mt-3 line-clamp-2">
            {product.name}
          </h1>
          <p className="text-sm sm:text-md text-gray-500 mt-2">
            Price:{" "}
            <span className="text-gray-500">
              ₹{product.price.toLocaleString("en-IN")}.00
            </span>
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-3 sm:hidden bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-600 hidden sm:block text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
