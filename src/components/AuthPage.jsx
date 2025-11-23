import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/authSlice";
import { API_URL } from "../utils/constants";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerOrLogin = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    let userId = null;
    let jwt = "";

    try {
      // Try register
      const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        jwt = data.jwt;
        userId = data.user.id;
        dispatch(setUser({ user: data.user, jwt }));
        setMessage(`✅ Registered successfully! Welcome ${data.user.username}`);
      } else {
        // Ignore duplicate, login instead
        const loginRes = await fetch(`${API_URL}/api/auth/local`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier: formData.email, password: formData.password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          jwt = loginData.jwt;
          userId = loginData.user.id;
          dispatch(setUser({ user: loginData.user, jwt }));
          setMessage(`✅ Logged in as ${loginData.user.username}`);
        } else {
          setMessage("❌ Cannot register or login automatically.");
        }
      }
    } catch (err) {
      setMessage("❌ Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 md:mt-20">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register / Auto Login"}
        </h2>
        <form onSubmit={registerOrLogin} className="space-y-4">
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
          >
            {isLogin ? "Login" : "Register / Continue"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
