import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaLock, FaShieldAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
import Payment from "../assets/Payment.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 py-8">
      <div className="max-w-6xl px-4 mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Mohendra Dutt (India) & Co.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
            Serving quality products since 1882. Trusted by generations for
            excellence and authenticity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/" className="hover:text-white text-gray-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white text-gray-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white text-gray-400 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Follow Us</h2>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <FaXTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Security</h2>
          <div className="flex flex-col mt-3 space-y-2 text-xs sm:text-sm">
            <span className="flex items-center space-x-2">
              <FaLock /> <span>SSL Secured</span>
            </span>
            <span className="flex items-center space-x-2">
              <FaShieldAlt /> <span>Trusted Checkout</span>
            </span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white">Payment Methods</h2>
          <div className="mt-3">
            <img
              src={Payment}
              alt="Payment Methods"
              className="w-56 sm:w-72 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-500 text-xs sm:text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Mohendra Dutt (India) & Co. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
