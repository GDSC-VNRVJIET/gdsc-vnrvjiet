import React, { useState, useEffect, useRef,useLayoutEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getPastEvents, getUpcomingEvents } from '../../Apis/events';
import Loader from '../Loader';

const Events: React.FC = () => {
  const location = useLocation();
  const isPast = location.pathname.includes("past");
  const [scrolled, setScrolled] = useState(window.innerWidth <= 1024);
  const [activeTab, setActiveTab] = useState(isPast ? "past-events" : "upcoming-events");
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayLoader, setDisplayLoader] = useState(true);

  useEffect(() => {
    if (tabsRef.current.length === 0) return;
    const currentTab = tabsRef.current.find((tab) => tab?.id === activeTab) as HTMLElement;
    if (currentTab) {
      setTabUnderlineLeft(currentTab.offsetLeft);
      setTabUnderlineWidth(currentTab.clientWidth);
    }else {
      console.error("currentTab is not found. Check if refs are set correctly.");
    }
  }, [activeTab,displayLoader]);

  async function fetchData() {
    try {
      const upcomingResponse = await getUpcomingEvents();
      if (upcomingResponse.payload != null) {
        setUpcomingEvents(upcomingResponse.payload.reverse());
      }
      const pastResponse = await getPastEvents();
      if (pastResponse.payload != null) {
        setPastEvents(pastResponse.payload.reverse());
      }
      setDisplayLoader(false);
    } catch (error) {
      setDisplayLoader(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleScroll = () => {
    const target = document.getElementById('navLinks');
    const navbarHeight = 95;
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;  
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
      setScrolled(true);
    }
  };

  const handleScrollEvent = () => {
    if (window.scrollY > 50) { 
      if (!scrolled) {
        handleScroll();  
      }
    } 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [scrolled]);

  return displayLoader ? (
    <Loader/>
  ) : (
    <div className="w-full h-full p-4">
      <div className={`HeroSection flex flex-col bg-cover bg-center bg-no-repeat mt-4 relative ${scrolled ? 'static mt-4' : ''}`}>
        <div className={`relative flex justify-center ${scrolled ? 'static' : ''}`}>
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
            title="Watch full video"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 48 48"
            className="w-10 h-10 lg:w-12 lg:h-12"
          >
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                  cx="19.38"
                  cy="42.035"
                  r="44.899"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#fd5"></stop>
                  <stop offset=".328" stop-color="#ff543f"></stop>
                  <stop offset=".348" stop-color="#fc5245"></stop>
                  <stop offset=".504" stop-color="#e64771"></stop>
                  <stop offset=".643" stop-color="#d53e91"></stop>
                  <stop offset=".761" stop-color="#cc39a4"></stop>
                  <stop offset=".841" stop-color="#c837ab"></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <radialGradient
                  id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                  cx="11.786"
                  cy="5.54"
                  r="29.813"
                  gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#4168c9"></stop>
                  <stop
                    offset=".999"
                    stop-color="#4168c9"
                    stop-opacity="0"
                  ></stop>
                </radialGradient>
                <path
                  fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                  d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                ></path>
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                ></path>
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                ></path>
            </svg>
          </a>
        </div>
        {!scrolled && (
          <div className='absolute bottom-0 left-0 right-0 bg-opacity-25 p-2 backdrop-blur-lg lg:w-4/5 sm:w-full m-auto'>
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

      {!scrolled && (
        <div className="flex justify-center my-4">
          <button onClick={handleScroll} className="text-gray-800 scale-150 hover:scale-[200%] mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      )}

      {scrolled && (
        <div className='w-full flex flex-col items-center mt-10 lg:mt-32'>
          <h1 className="text-3xl font-bold text-gray-700 mb-2">Events</h1>
          <p className="text-sm text-gray-600 text-center mb-4">
            GDGC hosts diverse events like workshops, hackathons, speaker sessions, and study jams to help students learn and grow.
          </p>
        </div>
      )}

      <div id="navLinks" className="relative flex justify-center my-4">
      <span
          className="absolute bottom-0 h-full -z-4 transition-all duration-300 bg-blue-500 rounded-lg"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth,height: "40px" }}
        ></span>
        <Link
          to="upcoming-events"
          id="upcoming-events"
          ref={(el) => (tabsRef.current[0] = el)}
          className={`px-4 py-2 font-semibold text-lg rounded-s-lg z-0 ${
            activeTab === "upcoming-events" ? 'text-white' : 'text-gray-700'}`}
          onClick={() => handleTabClick("upcoming-events")}
        >
          Upcoming Events
        </Link>
        <Link
          to="past-events"
          id='past-events'
          ref={(el) => (tabsRef.current[1] = el)}
          className={`px-4 py-2 font-semibold text-lg rounded-e-lg z-0 ${activeTab === "past-events" ? 'text-white' : 'text-gray-700'}`}
          onClick={() => handleTabClick("past-events")}
        >
          Past Events
        </Link>
      </div>

      <div className="w-full">
        <Outlet context={{ upcomingEvents, pastEvents }}/>
      </div>
    </div>
  );
};

export default Events;
