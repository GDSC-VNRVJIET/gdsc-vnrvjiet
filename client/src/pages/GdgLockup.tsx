import React, { forwardRef } from "react";

/*
 * GDG On Campus VNRVJIET horizontal lockup as a crisp vector SVG.
 * Used by the hero (static) and the intro (animated), so the intro can land
 * its lockup exactly on top of the hero's.
 *
 * Mark geometry is measured from home-assets/logo.png (541x300); lockup layout
 * from the 1558x344 lockup artwork. Fonts: "Google Developer Groups" = Google
 * Sans, "On Campus • VNRVJIET" = Roboto (both loaded in public/index.html).
 */

// --- Mark (in its own 541x300 space) ---
const OUTER = 123; // full pill width including outline
const INNER = 103; // coloured fill width (outline ≈ 10px)
const OUTLINE = "#0F0F0F";
const PILLS = [
  { color: "#EA4335", from: [61.5, 149], to: [183, 62] }, // red (under blue)
  { color: "#4285F4", from: [61.5, 149], to: [183, 236] }, // blue
  { color: "#F9AB00", from: [477, 149], to: [355.4, 236] }, // yellow (under green)
  { color: "#34A853", from: [477, 149], to: [355.4, 62] }, // green
];

// --- Lockup layout (in 1558x344 artwork space) ---
const MARK = { x: 12, y: 87, scale: 0.505 };
const TITLE = { x: 348, baseline: 165, size: 107.5, width: 1172, color: "#1F1F1F" };
const SUBTITLE = { cx: 930, baseline: 257, size: 62, width: 670 };
const ARCHES =
  "M1194 68 V57 A52 52 0 0 1 1298 57 V68 M1298 57 A52 52 0 0 1 1402 57 V68 " +
  "M1402 57 A52 52 0 0 1 1506 57 V68";
// Ink bounding box of the whole lockup, used as the viewBox so the SVG's
// on-screen rect is exactly the lockup's ink box.
const INK = { x: 12, y: 3, w: 1505, h: 267 };

// --- Intro animation timing ---
export const CYCLE = 3.2; // seconds for the intro animation
const DRAW = 0.55; // seconds for a single pill to draw in
const STAGGER = 0.22; // delay between pills
const LOGO_DONE = (PILLS.length - 1) * STAGGER + DRAW;

const pct = (s: number) => `${((s / CYCLE) * 100).toFixed(2)}%`;

const KEYFRAMES = `
  ${PILLS.map((_, i) => {
    const start = i * STAGGER;
    return `
      @keyframes gdg-pill-${i} {
        0%, ${pct(start)} { stroke-dashoffset: 1; opacity: 0; }
        ${pct(start + 0.01)} { opacity: 1; }
        ${pct(start + DRAW)}, 100% { stroke-dashoffset: 0; opacity: 1; }
      }`;
  }).join("\n")}
  @keyframes gdg-pop {
    0%, ${pct(LOGO_DONE - 0.1)} { transform: scale(1); }
    ${pct(LOGO_DONE + 0.15)} { transform: scale(1.08); }
    ${pct(LOGO_DONE + 0.4)}, 100% { transform: scale(1); }
  }
  @keyframes gdg-title {
    0%, ${pct(LOGO_DONE - 0.2)} { transform: translateX(-24px); opacity: 0; }
    ${pct(LOGO_DONE + 0.3)}, 100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes gdg-subtitle {
    0%, ${pct(LOGO_DONE + 0.1)} { transform: translateY(12px); opacity: 0; }
    ${pct(LOGO_DONE + 0.55)}, 100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes gdg-arches {
    0%, ${pct(LOGO_DONE + 0.3)} { stroke-dashoffset: 1; opacity: 0; }
    ${pct(LOGO_DONE + 0.31)} { opacity: 1; }
    ${pct(LOGO_DONE + 0.9)}, 100% { stroke-dashoffset: 0; opacity: 1; }
  }
  .gdg-anim { transform-box: fill-box; transform-origin: center; }
  @media (prefers-reduced-motion: reduce) {
    .gdg-anim {
      animation-name: none !important; stroke-dashoffset: 0 !important;
      opacity: 1 !important; transform: none !important;
    }
  }`;

type GdgLockupProps = Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
  /** Play the intro draw-in animation. */
  animated?: boolean;
  /** Called when the intro animation finishes (animated only). */
  onAnimationDone?: () => void;
  /** Extra attributes (e.g. data-*) pass through to the <svg>. */
  [dataAttr: `data-${string}`]: unknown;
};

const GdgLockup = forwardRef<SVGSVGElement, GdgLockupProps>(
  ({ animated = false, onAnimationDone, ...svgProps }, ref) => {
    const anim = (name: string, easing = "ease-out") =>
      animated ? `${name} ${CYCLE}s ${easing} 1 both` : undefined;
    const dash = animated ? { strokeDasharray: 1 } : {};

    return (
      <svg
        ref={ref}
        viewBox={`${INK.x} ${INK.y} ${INK.w} ${INK.h}`}
        role="img"
        aria-label="Google Developer Groups On Campus VNRVJIET"
        {...svgProps}
        style={{ overflow: "visible", ...svgProps.style }}
      >
        {animated && <style>{KEYFRAMES}</style>}

        {/* Mark */}
        <g transform={`translate(${MARK.x} ${MARK.y}) scale(${MARK.scale})`}>
          <g
            className="gdg-anim"
            style={{ animation: anim("gdg-pop", "ease-in-out") }}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget) onAnimationDone?.();
            }}
          >
            {PILLS.map(({ color, from, to }, i) => {
              const d = `M${from[0]} ${from[1]} L${to[0]} ${to[1]}`;
              const style: React.CSSProperties = {
                ...dash,
                animation: anim(`gdg-pill-${i}`, "cubic-bezier(0.65, 0, 0.35, 1)"),
              };
              return (
                <g key={color} fill="none" strokeLinecap="round">
                  <path className="gdg-anim" d={d} pathLength={1} stroke={OUTLINE} strokeWidth={OUTER} style={style} />
                  <path className="gdg-anim" d={d} pathLength={1} stroke={color} strokeWidth={INNER} style={style} />
                </g>
              );
            })}
          </g>
        </g>

        {/* Arches above "Groups" */}
        <path
          className="gdg-anim"
          d={ARCHES}
          pathLength={1}
          fill="none"
          stroke={TITLE.color}
          strokeWidth={7}
          style={{ ...dash, animation: anim("gdg-arches", "ease-in-out") }}
        />

        {/* Google Developer Groups — Google Sans */}
        <text
          className="gdg-anim"
          x={TITLE.x}
          y={TITLE.baseline}
          textLength={TITLE.width}
          lengthAdjust="spacing"
          fill={TITLE.color}
          style={{
            fontFamily: '"Google Sans", sans-serif',
            fontSize: TITLE.size,
            fontWeight: 400,
            animation: anim("gdg-title"),
          }}
        >
          Google Developer Groups
        </text>

        {/* On Campus • VNRVJIET — Roboto */}
        <text
          className="gdg-anim"
          x={SUBTITLE.cx}
          y={SUBTITLE.baseline}
          textAnchor="middle"
          textLength={SUBTITLE.width}
          lengthAdjust="spacing"
          style={{
            fontFamily: '"Roboto", sans-serif',
            fontSize: SUBTITLE.size,
            fontWeight: 400,
            animation: anim("gdg-subtitle"),
          }}
        >
          <tspan fill="#4285F4">On Campus</tspan>
          <tspan fill="#000000"> • VNRVJIET</tspan>
        </text>
      </svg>
    );
  }
);

GdgLockup.displayName = "GdgLockup";

export default GdgLockup;
