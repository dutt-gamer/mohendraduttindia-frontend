import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/authSlice";
import MdLogo from "../assets/MdLogo.png";
import { HAMBURGER_ICON } from "../utils/constants";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleNav = () => setShowNav((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 md:flex md:justify-between md:items-center p-2">
      {/* Logo + Mobile Menu Button */}
      <div className="flex justify-between items-center">
        <button
          className={`md:hidden p-2 w-8 cursor-pointer transition-transform duration-300 ${
            showNav ? "rotate-90" : "rotate-0"
          }`}
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          <img className="w-6 filter invert" src={HAMBURGER_ICON} alt="menu" />
        </button>
        <span>
          <Link to="/">
            <img className="w-36 md:w-48 m-1" src={MdLogo} alt="logo" />
          </Link>
        </span>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${
          showNav ? "flex" : "hidden"
        } flex-col md:flex md:flex-row items-center justify-center md:justify-end gap-2 md:gap-4 mt-2 md:mt-0`}
      >
        <Link to="/">
          <li className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform">
            About Us
          </li>
        </Link>
        <Link to="/contact">
          <li className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform">
            Contact Us
          </li>
        </Link>

        {user ? (
          <>
            <Link to="/orders">
              <li className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform">
                My Orders
              </li>
            </Link>
            <li className="text-sm md:text-md text-white px-2">
              Welcome, {user.username}!
            </li>
            <li
              onClick={handleLogout}
              className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform"
            >
              Logout
            </li>
          </>
        ) : (
          <Link to="/login">
            <li className="text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform">
              Login
            </li>
          </Link>
        )}

        <Link to="/cart">
          <li className="relative text-sm md:text-md text-white cursor-pointer hover:scale-150 transition-transform scale-125 flex items-center">
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-0 -right-0 bg-red-600 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
