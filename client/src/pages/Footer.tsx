import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import logo from "../home-assets/logo_stacked.png";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 shadow-lg mt-4">
      <div className="container mx-auto px-24 py-5 flex flex-col lg:flex-row justify-between items-center gap-8">

        <div className="text-center">
          <img
            src={logo}
            alt="GDSC Logo"
            className="w-28 mx-auto mb-3"
          />
        </div>

        <div className="text-center">
          <p className="mb-2 font-medium">Join us at GDGC.</p>
          <p className="mb-7 text-sm">
            Discover amazing events and connect with like-minded people.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-semibold text-sm">
            {[
              { name: "Terms & Conditions", path: "/terms-and-conditions", color: "hover:text-green-700" },
              { name: "Privacy Policy", path: "/privacy-policy", color: "hover:text-blue-700" },
              { name: "Refund Policy", path: "/refund-policy", color: "hover:text-red-700" },
              { name: "Community Guidelines", path: "/community-guidelines", color: "hover:text-yellow-700" },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`group ${item.color}`}
              >
                {item.name}
                <span className="block h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

       
        <div className="text-center">
          <p className="mb-4 text-black font-semibold text-lg">
            Have any questions?
          </p>

          <Link
            to="/contact-us"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
              Contact Us
            </button>
          </Link>

          <div className="flex justify-center space-x-5 mt-4">
            <a
              href="https://www.instagram.com/gdsc.vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagramSquare size={26} />
            </a>
            <a
              href="https://www.linkedin.com/company/gdsc-vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={26} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
