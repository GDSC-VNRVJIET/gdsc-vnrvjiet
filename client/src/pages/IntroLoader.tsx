import React, { useEffect, useRef, useState } from "react";
import GdgLockup, { CYCLE } from "./GdgLockup";

const REVEAL_MS = 500;

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

const IntroLoader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [revealing, setRevealing] = useState(false);
  const exiting = useRef(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const exit = () => {
    if (exiting.current) return;
    exiting.current = true;
    setRevealing(true);
    setTimeout(onDone, REVEAL_MS);
  };

  useEffect(() => {
    const timer = setTimeout(exit, prefersReducedMotion() ? 800 : CYCLE * 1000 + 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" role="status" aria-label="Loading">
      <div
        className="absolute inset-0 bg-slate-50 pointer-events-auto"
        style={{ opacity: revealing ? 0 : 1, transition: `opacity ${REVEAL_MS}ms ease` }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <GdgLockup
          animated
          onAnimationDone={exit}
          className="w-full max-w-[640px] h-auto"
          style={{
            opacity: revealing ? 0 : 1,
            transition: `opacity ${REVEAL_MS}ms ease`,
          }}
        />
      </div>
    </div>
  );
};

export default IntroLoader;
