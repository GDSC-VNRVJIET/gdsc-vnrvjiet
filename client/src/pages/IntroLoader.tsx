import React, { useEffect, useRef, useState } from "react";
import GdgLockup, { CYCLE } from "./GdgLockup";

/*
 * One-time intro shown when the site first loads.
 *
 * Plays the GDG On Campus VNRVJIET lockup animation, then (on the home page)
 * flies the lockup onto the identical vector lockup in the hero while the
 * backdrop fades away, so the intro "merges" into the page. On any other
 * page, or with reduced motion, it simply fades out.
 */

const FLY_MS = 900; // lockup flight into the hero
const REVEAL_MS = 500; // backdrop fade once the lockup has landed

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** Where the hero's lockup sits on screen, or null if it isn't visible. */
const findHeroLockup = (): DOMRect | null => {
  if (window.location.pathname !== "/") return null;
  const el = document.querySelector("[data-hero-lockup]");
  if (!el) return null;
  const r = el.getBoundingClientRect();
  const visible =
    r.width > 0 && r.bottom > 0 && r.top < window.innerHeight &&
    r.right > 0 && r.left < window.innerWidth;
  return visible ? r : null;
};

type Phase = "play" | "fly" | "reveal";

const IntroLoader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [phase, setPhase] = useState<Phase>("play");
  const [flight, setFlight] = useState<string | undefined>();
  const svgRef = useRef<SVGSVGElement>(null);
  const exiting = useRef(false);

  // Keep the page from scrolling under the intro, so the hero stays put.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const reveal = () => {
    setPhase("reveal");
    setTimeout(onDone, REVEAL_MS);
  };

  const exit = () => {
    if (exiting.current) return;
    exiting.current = true;

    const target = prefersReducedMotion() ? null : findHeroLockup();
    const svg = svgRef.current;
    if (!target || !svg) return reveal();

    const from = svg.getBoundingClientRect();
    const s = target.width / from.width;
    setFlight(
      `translate(${target.left - from.left}px, ${target.top - from.top}px) scale(${s})`
    );
    setPhase("fly");
    setTimeout(reveal, FLY_MS);
  };

  // Safety net: the animation's end normally triggers the exit, but it never
  // fires when animations are disabled (reduced motion) or the tab is hidden.
  useEffect(() => {
    const timer = setTimeout(exit, prefersReducedMotion() ? 800 : CYCLE * 1000 + 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none" role="status" aria-label="Loading">
      {/* Backdrop: stays solid during the flight, fades once the lockup has landed. */}
      <div
        className="absolute inset-0 bg-slate-50 pointer-events-auto"
        style={{ opacity: phase === "reveal" ? 0 : 1, transition: `opacity ${REVEAL_MS}ms ease` }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <GdgLockup
          ref={svgRef}
          animated
          onAnimationDone={exit}
          className="w-full max-w-[640px] h-auto"
          style={{
            transformOrigin: "0 0",
            transform: flight,
            // After landing, it crossfades into the identical lockup in the hero.
            opacity: phase === "reveal" ? 0 : 1,
            transition: `transform ${FLY_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${REVEAL_MS}ms ease`,
          }}
        />
      </div>
    </div>
  );
};

export default IntroLoader;
