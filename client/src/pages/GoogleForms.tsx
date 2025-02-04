import { useState, useRef, useEffect } from "react";
import Gen from "../images/sc.png";

const TabComponent: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
      setIsLoading(false); // Hide the loading indicator when iframe content is fully loaded
  };

  return (
    // <div className="w-full md:px-0">
    //   <div className="content">
    //       <div className="relative h-[700px] overflow-auto scrollbar-hide bg-green-200">
    //         <div className="relative">
    //           <img
    //             src={Gen}
    //             alt="Coordinator"
    //             className="w-full lg:w-[646px] lg:pr-3 mt-1 rounded mx-auto"
    //           />
    //         </div>
    //         {isLoading && (
    //             <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
    //                 <p className="text-lg font-semibold">Loading...</p>
    //             </div>
    //         )}
    //         <iframe
    //           src="https://docs.google.com/forms/d/e/1FAIpQLSeMOw5PDbM7uXx9YIaDtl0v-jK5Hm-mBhiytshpmGYYqEMhiA/viewform?embedded=true"
    //           className="w-full h-full relative z-0 mt-[10px]"
    //           style={{ border: 0 }}
    //           allowFullScreen
    //           onLoad={handleIframeLoad}
    //           title="Third Year Google Form"
    //           id="gform"
    //         >
    //           Loading…
    //         </iframe>
    //       </div>
    //   </div>
    // </div>
    <div className="flex justify-center items-center mt-[12rem]">
      <div className="bg-red-500 text-white p-4 rounded-lg shadow-md text-center">
      <p className="text-lg font-bold">The form is now closed!</p>
      <p className="text-sm mt-2">Thank you for your interest. Stay tuned for future opportunities!</p>
    </div>
    </div>
  );
};

export default TabComponent;
