import React, { useState } from "react";
import Lottie from "lottie-react";
import loadingPageAnimation from "../animations/loadingPage.json";

interface LoaderProps {
  handleAnimationComplete?: () => void;
}

const Loader: React.FC<LoaderProps> = ({
  handleAnimationComplete = () => {},
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-50 pt-[40vh] bg-slate-50 flex items-center justify-center transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Lottie
        animationData={loadingPageAnimation}
        onLoopComplete={() => {
          setIsTransitioning(true);
          handleAnimationComplete();
        }}
      />
    </div>
  );
};

export default Loader;
