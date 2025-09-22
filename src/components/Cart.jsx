import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
} from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.items);
  const { user } = useSelector((state) => state.auth); // Redux auth state

  // Calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout"); // user is logged in
    } else {
      navigate("/login"); // user is not logged in
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {/* Header Row (hidden on small screens) */}
          <div className="hidden md:flex font-bold bg-gray-200 p-3 rounded-md mb-2">
            <div className="w-2/4">Product</div>
            <div className="w-4/4 text-center">Quantity</div>
            <div className="w-1/4 text-right">Subtotal</div>
          </div>

          {/* Clear Cart */}
          <div className="flex justify-center md:justify-start w-full md:w-auto mb-2">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white p-2 rounded-md cursor-pointer w-full md:w-auto  hover:bg-red-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.id);
            const maxQuantity = product?.quantity || 0;

            return (
              <div
                key={item.id}
                className="bg-white p-3 mb-3 rounded-md shadow-md flex flex-col md:flex-row md:items-center"
              >
                {/* Product */}
                <div className="flex items-center gap-3 w-full md:w-2/4">
                  <img
                    src={`http://localhost:1337${product?.images[0]?.url}`}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-sm text-gray-500">Available: {maxQuantity}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex justify-between items-center mt-3 md:mt-0 md:w-1/4 md:justify-center">
                  <span className="block md:hidden font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-2 bg-gray-300 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity < maxQuantity) {
                          dispatch(addToCart(item));
                        }
                      }}
                      className="px-2 bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center mt-3 md:mt-0 md:w-1/4 md:justify-end">
                  <span className="block md:hidden font-medium">Subtotal:</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>

                {/* Remove Button */}
                <div className="flex justify-end md:ml-4 mt-3 md:mt-0">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="px-3 py-1"
                  >
                    <FaTrash className="text-red-500 hover:scale-120 transition-transform cursor-pointer" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mt-6">
            {/* Promo Code */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Enter promo code"
                className="p-2 flex-1 bg-gray-200 rounded-md text-gray-600"
              />
              <button className="bg-red-500 p-2 rounded-md text-white cursor-pointer w-full sm:w-auto  hover:bg-red-600 transition-colors">
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="w-full md:w-1/3">
              <p className="font-bold text-lg flex justify-between">
                <span>Subtotal</span> <span>₹{total}</span>
              </p>
              <p className="font-bold text-lg flex justify-between">
                <span>Shipping Charges</span> <span>Free</span>
              </p>
              <p className="font-bold text-lg flex justify-between">
                <span>Total</span> <span>₹{total}</span>
              </p>
              <button
                onClick={handleCheckout}
                className="bg-red-500 p-2 text-white rounded-md w-[100%] cursor-pointer hover:bg-red-600 transition-colors"
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
