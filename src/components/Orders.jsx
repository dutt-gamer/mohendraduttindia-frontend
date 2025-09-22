import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/orders");
        const data = await res.json();
        console.log("Orders API Response:", data);

        if (Array.isArray(data.data)) {
          setOrders(data.data);
        } else if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => {
          // ✅ Handle both cases (with or without attributes)
          const details = order;

          return (
            <div
              key={order.id}
              className="border rounded-xl p-4 shadow-md bg-white mb-4"
            >
              <h2 className="text-lg font-semibold">Order # {order.id}</h2>
              <p>Total: ₹{details.total || 0}</p>
              <p>Status: {details.status_0 || "Pending"}</p>
              <p>Payment-ID: {details.razorpay_payment_id} </p>

              <div className="mt-3">
                <h3 className="font-semibold">Delivery Address:</h3>
                <p className="text-sm text-gray-700">
                  {details.address?.fullName || "N/A"},{" "}
                  {details.address?.street || "N/A"},{" "}
                  {details.address?.city || ""}, {details.address?.state || ""}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="font-semibold">Items:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {(details.items || []).map((item, idx) => (
                    <li key={idx}>
                      {item.name} (x{item.qty}) - ₹{item.price * item.qty}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
