import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ scrollBehavior: "smooth" }}
      className="bg-slate-200 text-gray-600 p-8 shadow-lg mt-8"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full lg:w-auto text-center">
          <img
            src="https://cdn-images-1.medium.com/v2/resize:fit:578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
            alt="GDSC Logo"
            className="w-20 h-auto mx-auto mb-3"
          />
          <h1 className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent text-xl font-bold">
            GDGC VNRVJIET
          </h1>

          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://www.instagram.com/gdsc.vnrvjiet/" target="_blank">
              <FaInstagramSquare size={25} />
            </a>
            <a href="https://www.linkedin.com/company/gdsc-vnrvjiet/" target="_blank">
            <FaLinkedin size={25}/>
              </a>
          </div>
        </div>

        <div className="w-full lg:w-auto items-center">
          <div className="w-full lg:w-auto flex flex-wrap justify-center space-x-6 mb-7 font-semibold">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/terms-and-conditions"
              className="text-black-600 hover:text-green-800 transition duration-300 group"
            >
              Terms & Conditions
              <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/privacy-policy"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-black-600 hover:text-blue-800 transition duration-300 group"
            >
              Privacy policy
              <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/refund-policy"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-black-600 hover:text-red-800 transition duration-300 group"
            >
              Refund policy
              <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/community-guidelines"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-black-600 hover:text-yellow-800 transition duration-300 group"
            >
              Community Guidelines
              <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="text-center">
            <p className="mb-4">Join us at GDGC.</p>
            <p>Discover amazing events and connect with like-minded people.</p>
          </div>
        </div>

        <div className="w-full lg:w-auto text-center">
          <p className="mb-4 text-black-600 text-lg font-semibold">
            Have any questions?
          </p>
          <div className="flex justify-center items-center space-x-2">
            <Link to="/contact-us">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:animate-pulse"
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;