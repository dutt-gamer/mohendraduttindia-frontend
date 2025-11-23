import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"

const Contact = () => {
  return (
    <div className="mx-auto px-6 sm:px-10 lg:px-20 py-10 bg-gray-50">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 text-center md:mt-20">Contact Us</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 space-y-12">
          <section>
            <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
              Registered Address
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Mohendra Dutt (India) & Co.</span>
              <br />
              20, Krishnanagar Lane, Chatribari Road, <br />
              Guwahati - 781 001 (Assam) <br />
              Mobile:{" "}
              <a
                href="tel:+919954499015"
                className="text-blue-600 hover:underline"
              >
                +91 99544 99015
              </a>{" "}
              <br />
              Email:{" "}
              <a
                href="mailto:sufaldutt@gmail.com"
                className="text-blue-600 hover:underline"
              >
                sufaldutt@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-1">
              Retail Showrooms
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                DHIREN MARKET, Hem Barua Road, Fancy Bazar, Guwahati - 781 001
                (Assam)
              </li>
              <li>
                AKRAM'S BUSINESS, Hem Barua Road, Fancy Bazar, Guwahati - 781
                001 (Assam)
              </li>
              <li>
                VIP BUILDING, VIP Road, Six Mile, Guwahati - 781 001 (Assam)
              </li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Mon - Sat: 10:00 AM - 7:00 PM
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-red-600" />
                Sunday: Closed
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Quick Contact</h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-600" />
                <a
                  href="tel:+919954499015"
                  className="hover:underline text-blue-600"
                >
                  +91 99544 99015
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaWhatsapp className="text-green-600" />
                <a
                  href="tel:+918486483683"
                  className="hover:underline text-blue-600"
                >
                  +91 84864 83683
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-yellow-600" />
                <a
                  href="mailto:sufaldutt@gmail.com"
                  className="hover:underline text-blue-600"
                >
                  sufaldutt@gmail.com
                </a>
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-2">
              Connect With Us
            </h2>
            <div className="flex gap-4 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </section>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Mohendra Dutt (India) & Co. Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9350886432627!2d91.7428435!3d26.1783544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a2dde3b0b45%3A0x7f4fd8ec87e97d9f!2sMOHENDRA%20DUTT%20(INDIA)%20%26%20CO.!5e0!3m2!1sen!2sin!4v1691519000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
