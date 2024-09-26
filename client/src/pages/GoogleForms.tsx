import { useState, useRef, useEffect } from "react";
import Gen from "../images/Gen.png";

const TabComponent: React.FC = () => {

  return (
    <div className="w-full md:px-0">
      <div className="content">
          <div className="relative h-[700px] overflow-auto scrollbar-hide bg-gray-200">
            <div className="relative">
              <img
                src={Gen}
                alt="Coordinator"
                className="w-full lg:w-[646px] lg:pr-3 mt-1 rounded mx-auto"
              />
            </div>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeVvl3yoGIvO53x26I8D6_aBCMNUtm8TvGoFsO2rz3emua7EQ/viewform?embedded=true"
              className="w-full h-full relative z-0 mt-[10px]"
              style={{ border: 0 }}
              allowFullScreen
              title="Third Year Google Form"
            >
              Loading…
            </iframe>
          </div>
      </div>
    </div>
  );
};

export default TabComponent;
