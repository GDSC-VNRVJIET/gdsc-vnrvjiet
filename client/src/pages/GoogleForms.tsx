import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Coordinator from "../images/coordinator.jpg";
import Volunteer from "../images/volunteer.jpg";

const TabComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("second-years");
  const tabsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState<number>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState<number>(0);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const activeTabElement = tabsRef.current.find(
      (tab) => tab?.id === activeTab
    );
    if (activeTabElement) {
      setTabUnderlineLeft(activeTabElement.offsetLeft);
      setTabUnderlineWidth(activeTabElement.offsetWidth);
    }
  }, [activeTab]);

  return (
    <div className="w-full md:px-0">
      <div
        id="navLinks"
        className={`relative flex justify-center transition-colors duration-300 p-2 ${
          activeTab === "second-years" ? "bg-amber-100" : "bg-green-100"
        }`}
      >
        <span
          className="absolute bottom-2 h-full -z-4 transition-all duration-300 bg-blue-500 rounded-lg"
          style={{
            left: tabUnderlineLeft,
            width: tabUnderlineWidth,
            height: "40px",
          }}
        ></span>
        <Link
          to=""
          id="second-years"
          ref={(el) => (tabsRef.current[0] = el)}
          className={`px-4 py-2 font-semibold text-base md:text-lg rounded-s-lg z-0 ${
            activeTab === "second-years" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => handleTabClick("second-years")}
        >
          Second year
        </Link>
        <Link
          to=""
          id="third-years"
          ref={(el) => (tabsRef.current[1] = el)}
          className={`px-4 py-2 font-semibold text-base md:text-lg rounded-e-lg z-0 ${
            activeTab === "third-years" ? "text-white" : "text-gray-700"
          }`}
          onClick={() => handleTabClick("third-years")}
        >
          Third year
        </Link>
      </div>

      <div className="content">
        {activeTab === "second-years" && (
          <div className="relative h-[700px] overflow-auto scrollbar-hide bg-amber-100">
            <div className="relative">
              <img
                src={Volunteer}
                alt="Volunteer"
                className="w-full lg:w-1/2 rounded mx-auto"
              />
            </div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScVk1m8He6UWc4saf86_AJT2t8NFBF_IhsKMbIq_FHROVE_xw/viewform?embedded=true"
              className="w-full h-full relative z-0 mt-[10px]"
              style={{ border: 0 }}
              allowFullScreen
              title="Second Year Google Form"
            >
              Loading…
            </iframe>
          </div>
        )}
        {activeTab === "third-years" && (
          <div className="relative h-[700px] overflow-auto scrollbar-hide bg-green-100">
            <div className="relative">
              <img
                src={Coordinator}
                alt="Coordinator"
                className="w-full lg:w-1/2 rounded mx-auto"
              />
            </div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfoCc116x8reSWzHct6ALdnu0yPjRNjk-IitbuV32suWMfz-g/viewform?embedded=true"
              className="w-full h-full relative z-0 mt-[10px]"
              style={{ border: 0 }}
              allowFullScreen
              title="Third Year Google Form"
            >
              Loading…
            </iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
