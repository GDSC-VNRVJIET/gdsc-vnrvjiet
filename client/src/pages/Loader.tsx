import React, { useState } from "react";
import Lottie from "lottie-react";
import loadingPageAnimation from "../animations/loadingPage.json";

interface LoaderProps {
  handleAnimationComplete?: () => void;
  loop?: boolean;
  notfullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  handleAnimationComplete = () => {},
  loop = true,
  notfullScreen = false,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <div
      className={`${
        notfullScreen ? "absolute" : "fixed"} inset-0 z-50 pt-[40vh] bg-slate-50 flex items-center justify-center transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Lottie
        animationData={loadingPageAnimation}
        onComplete={() => {
          setIsTransitioning(true);
          handleAnimationComplete();
        }}
        loop={loop}
      />
    </div>
  );
};

export default Loader;
