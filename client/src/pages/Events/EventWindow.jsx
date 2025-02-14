import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

function EventWindow() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(window.innerWidth <= 1024);

  // Define styles for the tabs
  const workshopActiveStyle = {
    background: "#4285F4",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "25px 0 0 25px",
    transition: "background-color 0.5s ease, color 0.5s ease",
  };

  const workshopInactiveStyle = {
    background: "#E0E0E0",
    color: "black",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "25px 0 0 25px",
    transition: "background-color 0.5s ease, color 0.5s ease",
  };

  const hackathonActiveStyle = {
    background: "#EA4335",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "0 25px 25px 0",
    transition: "background-color 0.5s ease, color 0.5s ease",
  };

  const hackathonInactiveStyle = {
    background: "#E0E0E0",
    color: "black",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "0 25px 25px 0",
    transition: "background-color 0.5s ease, color 0.5s ease",
  };

  // Scroll handling functions
  const handleScroll = () => {
    const target = document.getElementById("navLinks");
    const navbarHeight = 95;
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setScrolled(true);
    }
  };

  const handleScrollEvent = () => {
    if (window.scrollY > 50 && !scrolled) {
      handleScroll();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, [scrolled]);

  return (
    <div>
      {/* Hero Section */}
      <div className="w-full h-full p-4">
        <div
          className={`HeroSection flex flex-col bg-cover bg-center bg-no-repeat mt-4 relative ${
            scrolled ? "static mt-4" : ""
          }`}
        >
          <div
            className={`relative flex justify-center ${scrolled ? "static" : ""}`}
          >
            <video
              className="lg:w-4/5 sm:w-full animate-fadeIn"
              autoPlay
              loop
              muted
            >
              <source
                src={`${process.env.PUBLIC_URL}/banner2.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <a
              href="https://www.instagram.com/reel/C7s9-0Otwu8/?igsh=bnRzaHk4Nnl0cGlk"
              className="absolute top-2 right-2 sm:top-1 sm:right-1 lg:top-4 lg:right-40 text-red-500 hover:text-red-600"
              target="_blank"
              rel="noreferrer"
              title="Watch full video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 48 48"
                className="w-10 h-10 lg:w-12 lg:h-12"
              >
                <radialGradient
                  id="grad1"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fd5" />
                  <stop offset=".328" stopColor="#ff543f" />
                  <stop offset=".348" stopColor="#fc5245" />
                  <stop offset=".504" stopColor="#e64771" />
                  <stop offset=".643" stopColor="#d53e91" />
                  <stop offset=".761" stopColor="#cc39a4" />
                  <stop offset=".841" stopColor="#c837ab" />
                </radialGradient>
                <path
                  fill="url(#grad1)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20
                     c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20
                     C42.014,38.383,38.417,41.986,34.017,41.99z"
                />
                <radialGradient
                  id="grad2"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#4168c9" />
                  <stop offset=".999" stopColor="#4168c9" stopOpacity="0" />
                </radialGradient>
                <path
                  fill="url(#grad2)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20
                     c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20
                     C42.014,38.383,38.417,41.986,34.017,41.99z"
                />
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z 
                     M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                />
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12
                     C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18
                     c0-2.757-2.243-5-5-5H18z"
                />
              </svg>
            </a>
          </div>

          {/* Overlay for non-scrolled state */}
          {!scrolled && (
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-25 p-2 backdrop-blur-lg lg:w-4/5 sm:w-full m-auto">
              <div className="w-full flex items-center justify-center mt-2">
                <h1 className="text-3xl font-bold text-gray-200">Events</h1>
              </div>
              <div className="flex justify-center my-4">
                <p className="text-sm text-gray-200 text-center">
                  GDSC hosts diverse events like workshops, hackathons, speaker sessions, and study jams to help students learn and grow.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Down Button */}
        {!scrolled && (
          <div className="flex justify-center my-4">
            <button
              onClick={() => {}}
              className="text-gray-800 scale-150 hover:scale-[200%] mb-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
        )}

        {/* Title Section when scrolled */}
        {scrolled && (
          <div className="w-full flex flex-col items-center mt-10 lg:mt-32">
            <h1 className="text-3xl font-bold text-gray-700 mb-2">Events</h1>
            <p className="text-sm text-gray-600 text-center mb-4">
              GDSC hosts diverse events like workshops, hackathons, speaker sessions, and study jams to help students learn and grow.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Tabs using NavLink for URL-driven active styling */}
      <div className="flex justify-center py-8" id="navLinks">
        <NavLink
          to="workshops/upcoming-events"
          style={() =>
            location.pathname.includes("workshops")
              ? workshopActiveStyle
              : workshopInactiveStyle
          }
        >
          Workshops
        </NavLink>
        <NavLink
          to="hackathons/upcoming-hackathons"
          style={() =>
            location.pathname.includes("hackathons")
              ? hackathonActiveStyle
              : hackathonInactiveStyle
          }
        >
          Hackathons
        </NavLink>
      </div>

      {/* Render nested routes */}
      <Outlet />
    </div>
  );
}

export default EventWindow;
