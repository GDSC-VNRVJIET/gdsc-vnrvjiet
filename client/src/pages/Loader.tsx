import React from "react";

/*
 * Lightweight page/data loading indicator (four bouncing dots in Google
 * colours). The full brand animation only plays once, on first load — see
 * IntroLoader.
 */

interface LoaderProps {
  /** Fill the nearest positioned parent instead of the viewport. */
  notfullScreen?: boolean;
}

const DOTS = ["#4285F4", "#EA4335", "#F9AB00", "#34A853"];

const Loader: React.FC<LoaderProps> = ({ notfullScreen = false }) => (
  <div
    className={`${
      notfullScreen ? "absolute" : "fixed"
    } inset-0 z-40 bg-slate-50 flex items-center justify-center`}
    role="status"
    aria-label="Loading"
  >
    <style>{`
      @keyframes gdg-dot {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-14px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .gdg-dot { animation-duration: 2.4s !important; }
      }
    `}</style>
    <div className="flex gap-3">
      {DOTS.map((color, i) => (
        <span
          key={color}
          className="gdg-dot block w-3.5 h-3.5 rounded-full border-2 border-[#0F0F0F]"
          style={{
            backgroundColor: color,
            animation: `gdg-dot 1s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

export default Loader;
