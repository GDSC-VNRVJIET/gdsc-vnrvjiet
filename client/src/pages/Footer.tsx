import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import logo from "../home-assets/logo_stacked.png";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-600 shadow-lg mt-4 bg-white z-50">
      <div className="container mx-auto px-6 sm:px-10 lg:px-24 py-8 flex flex-col lg:flex-row justify-between items-center gap-10">

        <div className="text-center lg:text-left">
          <img
            src={logo}
            alt="GDSC Logo"
            className="w-24 sm:w-28 mx-auto lg:mx-0 mb-3"
          />
        </div>

        <div className="text-center max-w-xl">
          <p className="mb-2 font-medium">Join us at GDGC.</p>
          <p className="mb-6 text-sm">
            Discover amazing events and connect with like-minded people.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-semibold text-sm">
            {[
              {
                name: "Terms & Conditions",
                path: "/terms-and-conditions",
                color: "hover:text-[#0F71F2]",
              },
              {
                name: "Privacy Policy",
                path: "/privacy-policy",
                color: "hover:text-[#318C07]",
              },
              {
                name: "Refund Policy",
                path: "/refund-policy",
                color: "hover:text-[#F2A20C]",
              },
              {
                name: "Community Guidelines",
                path: "/community-guidelines",
                color: "hover:text-[#D92929]",
              },
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
            <button className="
              px-5 py-2
              border-2 border-blue-600
              text-blue-600
              rounded-lg
              shadow-lg hover:shadow-xl
              transition transform hover:scale-105
            ">
              Contact Us
            </button>
          </Link>

          <div className="flex justify-center space-x-6 mt-5">
            <a
              href="https://www.instagram.com/gdgc.vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsInstagram className="w-5 h-5 hover:scale-110 transition" />
            </a>

            <a
              href="https://www.linkedin.com/company/gdsc-vnrvjiet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsLinkedin className="w-5 h-5 hover:scale-110 transition" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;