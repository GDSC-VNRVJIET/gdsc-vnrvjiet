import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white border-b-2 border-slate-300 p-3 mr-4">
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400 ml-auto"
        >
          <svg
            className={`fill-current h-3 w-3 ${
              isOpen ? "hidden" : "block"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${
              isOpen ? "block" : "hidden"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex md:items-center md:w-auto ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="hidden md:flex md:items-center">
        <a href="/">
          <img
            className="gdsc_logo"
            src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
            width="50"
            height="50"
          />
        </a>
        </div>
        <a href="/">
          <h1 className="text-[#868686] text-lg pl-5">GDSC VNRVJIET.</h1>
        </a>
        <div className="flex flex-col md:flex-row ml-auto text-slate-600">
          <button className="pl-5">
              <a href="/">Home</a>
            </button>
            <button className="pl-5">
              <a href="/Upcoming-events">Upcoming Events</a>
            </button>
            <button className="pl-5">
              <a href="/Past-events">Past events</a>
            </button>
            <button className="pl-5">
              <a href="/Forum">Forum</a>
            </button>
            {/* <button className="pl-5">
              <a href="/Login">Login</a>
            </button> */}
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
