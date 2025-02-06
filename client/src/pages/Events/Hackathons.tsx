import React, { useState, useEffect, useRef,useLayoutEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { getPastHackathons, getUpcomingHackathons } from '../../Apis/hackathons';
import Loader from '../Loader';

const Hackathons: React.FC = () => {
  const location = useLocation();
  const isPast = location.pathname.includes("past");
  const [scrolled, setScrolled] = useState(window.innerWidth <= 1024);
  const [activeTab, setActiveTab] = useState(isPast ? "past-hackathons" : "upcoming-hackathons");
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [upcomingHackathons, setUpcomingHackathons] = useState([]);
  const [pastHackathons, setPastHackathons] = useState([]);
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
      const upcomingResponse = await getUpcomingHackathons();
      if (upcomingResponse.payload != null) {
        setUpcomingHackathons(upcomingResponse.payload.reverse());
      }
      const pastResponse = await getPastHackathons();
      if (pastResponse.payload != null) {
        setPastHackathons(pastResponse.payload.reverse());
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

  return displayLoader ? (
    <Loader/>
  ) : (
    <div className="w-full h-full p-4">
      <div className={`HeroSection flex flex-col bg-cover bg-center bg-no-repeat mt-4 relative ${scrolled ? 'static mt-4' : ''}`}>
        <div className={`relative flex justify-center ${scrolled ? 'static' : ''}`}>
        </div>
      </div>

      <div id="navLinks" className="relative flex justify-center my-4">
      <span
          className="absolute bottom-0 h-full -z-4 transition-all duration-300 bg-blue-500 rounded-lg"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth,height: "40px" }}
        ></span>
        <Link
          to="upcoming-hackathons"
          id="upcoming-hackathons"
          ref={(el) => (tabsRef.current[0] = el)}
          className={`px-4 py-2 font-semibold text-lg rounded-s-lg z-0 ${
            activeTab === "upcoming-hackathons" ? 'text-white' : 'text-gray-700'}`}
          onClick={() => handleTabClick("upcoming-hackathons")}
        >
          Upcoming Hackathons
        </Link>
        <Link
          to="past-hackathons"
          id='past-hackathons'
          ref={(el) => (tabsRef.current[1] = el)}
          className={`px-4 py-2 font-semibold text-lg rounded-e-lg z-0 ${activeTab === "past-hackathons" ? 'text-white' : 'text-gray-700'}`}
          onClick={() => handleTabClick("past-hackathons")}
        >
          Past Hackathons
        </Link>
      </div>

      <div className="w-full">
        <Outlet context={{ upcomingHackathons, pastHackathons }}/>
      </div>
    </div>
  );
};

export default Hackathons;