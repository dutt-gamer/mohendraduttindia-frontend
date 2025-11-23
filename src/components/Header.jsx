import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/authSlice";
import MdLogo from "../assets/MdLogo.png";
import HomeIcon from "../assets/Home.png";
import UserIcon from "../assets/user.png";
import { HAMBURGER_ICON } from "../utils/constants";

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNav = () => setShowNav((prev) => !prev);
  const closeNav = () => setShowNav(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gray-900 md:fixed w-full z-30 md:flex md:justify-between md:items-center md:px-28 md:py-3 p-2">
      {/* Logo + Mobile Menu Button */}
      <div className="flex justify-between items-center">
        <button
          className={`md:hidden px-2 w-8 cursor-pointer duration-400 ease-out ${
            showNav ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleNav}
          aria-label="Toggle Navigation"
          aria-expanded={showNav}
        >
          {showNav ? (
            <span
              style={{ fontFamily: "Arial" }}
              className="text-white font-medium text-md"
            >
              X
            </span>
          ) : (
            <img
              className="w-6 filter invert"
              src={HAMBURGER_ICON}
              alt="menu"
            />
          )}
        </button>
        <Link to="/" onClick={closeNav}>
          <img className="w-36 md:w-48 m-1" src={MdLogo} alt="logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${
          showNav ? "flex" : "hidden"
        } flex-col md:flex md:flex-row items-center justify-center md:justify-end gap-3 mt-2 md:mt-0`}
      >
        <li>
          <Link
            to="/"
            onClick={closeNav}
            className="text-sm md:text-md text-white cursor-pointer hover:scale-130 transition-transform flex items-center gap-1"
          >
            <img className="w-4 filter invert" src={HomeIcon} alt="home" />
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            onClick={closeNav}
            className="block text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform"
          >
            About Us
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            onClick={closeNav}
            className="block text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform"
          >
            Contact Us
          </Link>
        </li>

        {user ? (
          <li className="relative">
            <button
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="text-sm md:text-md text-white cursor-pointer hover:scale-130 transition-transform"
            >
              <img className="w-3.5 h-3.5 invert" src={UserIcon} alt="home" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-lg py-2 w-32 z-10">
                <div className="block text-white text-sm px-4 py-2">
                  {user.username}
                </div>
                <Link
                  to="/orders"
                  onClick={() => {
                    closeNav();
                    setShowUserMenu(false);
                  }}
                  className="block text-white text-sm px-4 py-2 hover:bg-gray-700"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-white text-sm px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              onClick={closeNav}
              className="block text-sm md:text-md text-white cursor-pointer hover:scale-110 transition-transform"
            >
              Login
            </Link>
          </li>
        )}

        <li className="relative">
          <Link
            to="/cart"
            onClick={closeNav}
            className="relative text-sm md:text-md text-white cursor-pointer hover:scale-150 transition-transform scale-125 flex items-center"
          >
            🛒
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
