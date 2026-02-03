import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import logo from "../home-assets/logo_stacked.png";

{/*import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import logo from "../home-assets/logo_stacked.png";

const Footer: React.FC = () => {
  return (
    <footer
      style={{ scrollBehavior: "smooth" }}
      className="p-8 shadow-lg mt-8 "
    >
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">

        <div className="w-full lg:w-auto flex justify-center lg:justify-start">

          <img
            src={logo}
            alt="GDSC Logo"
            className="w-40 h-auto mx-auto mb-3"
          />

          
        </div>

        <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right">

          <div className="w-full lg:w-auto text-center">
            <p className="mb-4 text-black-600 text-lg font-semibold">
              Have any questions?
            </p>
            <div className="flex justify-center items-center space-x-2">
              <Link to="/contact-us">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="px-4 py-2 bg-blue-500 mb-4 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:animate-pulse"
                >
                  Contact Us
                </button>
              </Link>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://www.instagram.com/gdsc.vnrvjiet/" target="_blank">
                  <FaInstagramSquare size={25} />
                </a>
                <a href="https://www.linkedin.com/company/gdsc-vnrvjiet/" target="_blank">
                  <FaLinkedin size={25} />
                </a>
              </div>
            </div>
          </div>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
*/}


const Footer: React.FC = () => {
  return (
<footer
  style={{ scrollBehavior: "smooth" }}
  className="p-8 shadow-lg mt-8 "
>
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">

    {/* Left Logo */}
    <div className="flex justify-center lg:justify-start w-full lg:w-auto">
      <img
        src={logo}
        alt="GDSC Logo"
        className="w-40 h-auto"
      />
    </div>

    {/* Right Content */}
    <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-4 w-full lg:w-auto">

      <p className="text-black-600 text-lg font-semibold">
        Have any questions?
      </p>

      {/* Contact + Icons Row */}
      <div className="flex items-center gap-4">
        <Link to="/contact-us">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </Link>

        <a
          href="https://www.instagram.com/gdsc.vnrvjiet/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagramSquare size={25} />
        </a>

        <a
          href="https://www.linkedin.com/company/gdsc-vnrvjiet/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={25} />
        </a>
      </div>

      {/* Policy Links */}
      <div className="flex flex-wrap justify-center lg:justify-end space-x-6 font-semibold mt-2">

        <Link
          to="/terms-and-conditions"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-green-800 transition duration-300 group"
        >
          Terms & Conditions
          <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/privacy-policy"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-blue-800 transition duration-300 group"
        >
          Privacy policy
          <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/refund-policy"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-red-800 transition duration-300 group"
        >
          Refund policy
          <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/community-guidelines"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-yellow-800 transition duration-300 group"
        >
          Community Guidelines
          <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
        </Link>

      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;