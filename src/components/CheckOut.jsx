import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utils/cartSlice"; // ✅ import your clearCart action

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // address state
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order from backend
      const res = await fetch("http://localhost:1337/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            ...item,
            qty: item.quantity,
          })),
          total,
          address,
        }),
      });

      const order = await res.json();

      const options = {
        key: order.key, // your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Success:", response);
          console.log("Delivery Address:", address);

          try {
            // ✅ Save order in Strapi
            const saveRes = await fetch("http://localhost:1337/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                data: {
                  items: cartItems.map((item) => ({
                    name: item.name,
                    price: item.price,
                    qty: item.quantity,
                  })),
                  total,
                  address,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  status_0: "paid", // ✅ matches your enum
                },
              }),
            });

            const savedOrder = await saveRes.json();
            console.log("Saved Order in Strapi:", savedOrder);
          } catch (err) {
            console.error("Error saving order in Strapi:", err);
          }

          // ✅ Clear cart
          dispatch(clearCart());

          // ✅ Show confirmation
          alert(
            `✅ Payment Successful!\n\nYour order will be delivered to:\n${address.fullName},\n${address.street}, ${address.city}, ${address.state} - ${address.pincode}\n\n📦 Expected delivery: 7-14 days.`
          );

          // ✅ Redirect
          navigate("/orders");
        },
        prefill: {
          name: address.fullName || "Guest User",
          email: "test@example.com",
          contact: address.phone || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <p className="mb-4">Total Amount: ₹{total}</p>

      {/* Delivery Address Form */}
      <div className="space-y-3 mb-6">
        <label>Full Name :</label>
        <input
          type="text"
          name="fullName"
          placeholder="Eg: John Doe"
          value={address.fullName}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <label>Phone Number :</label>
        <input
          type="text"
          name="phone"
          placeholder="Eg: 999XXXXXXXX"
          value={address.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <label>Delivery Address :</label>
        <input
          type="text"
          name="street"
          placeholder="Eg: 32/A, Street Name"
          value={address.street}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <label>City :</label>
        <input
          type="text"
          name="city"
          placeholder="Eg: Mumbai"
          value={address.city}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <label>State :</label>
        <input
          type="text"
          name="state"
          placeholder="Eg: Assam"
          value={address.state}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
        <label>Pin Code :</label>
        <input
          type="text"
          name="pincode"
          placeholder="Eg: 781XXX"
          value={address.pincode}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <button
        onClick={handlePayment}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-700 transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
