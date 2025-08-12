import { useState } from "react";
import MdLogo from "../assets/MdLogo.png";
import { HAMBURGER_ICON } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <header className="bg-gray-900 md:flex md:justify-between md:items-center p-2">
      {/* Top Row for Mobile: Hamburger + Logo */}
      <div className="flex justify-between items-center">
        {/* Hamburger icon (only on mobile) */}
        <button
          className={`md:hidden p-2 w-8 cursor-pointer transition-transform duration-300
 ${showNav ? "rotate-90" : "rotate-0"} `}
          onClick={toggleNav}
          aria-label="Toggle Navigation"
        >
          <img className="w-6 filter invert" src={HAMBURGER_ICON} alt="menu" />
        </button>

        {/* Logo */}
        <span>
          <Link to="/">
            <img className="w-36 md:w-48 m-1" src={MdLogo} alt="logo" />
          </Link>
        </span>
      </div>

      {/* Nav Menu */}
      <ul
        className={`
    ${showNav ? "flex" : "hidden"}
    flex-col md:flex md:flex-row 
    items-center justify-center md:justify-end 
    gap-2 md:gap-4 mt-2 md:mt-0
  `}
      >
        <Link to="/">
          <li className="text-sm md:temd text-white cursor-pointer hover:underline">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="text-sm md:text-md text-white cursor-pointer hover:underline">
            About Us
          </li>
        </Link>
        <Link to="/contact">
          <li className="text-sm md:text-md text-white cursor-pointer hover:underline">
            Contact Us
          </li>
        </Link>
        <li className="text-sm md:text-md text-white cursor-pointer hover:underline">
          Login
        </li>
        <li className="text-sm md:text-md text-white cursor-pointer hover:underline">
          Cart
        </li>
      </ul>
    </header>
  );
};

export default Header;
