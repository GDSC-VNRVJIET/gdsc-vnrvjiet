import React from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import GdgLockup from "./GdgLockup";



const INK = "#1E1E1E";

const CLOUD =
  "M41 -12 C42 -8.3 45.4 3 47 10 C48.6 17 49.6 23.3 50.5 30 C51.4 36.7 52.3 43.3 52.5 50 " +
  "C52.7 56.7 52.1 63.3 51.5 70 C50.9 76.7 50.2 83.3 49 90 C47.8 96.7 46.2 103.3 44 110 " +
  "C41.8 116.7 38.9 123.7 36 130 C33.1 136.3 28.7 143.3 26.5 148 C24.3 152.7 21.4 155.2 23 158 " +
  "C24.6 160.8 30.5 163.3 36 165 C41.5 166.7 49.3 166.5 56 168 C62.7 169.5 69.3 171.7 76 174 " +
  "C82.7 176.3 89.7 179.1 96 182 C102.3 184.9 106.3 186.2 114 191.5 C121.7 196.8 133.6 205.5 142.2 213.8 " +
  "C150.8 222 158.9 231.1 165.8 240.8 C172.7 250.5 178.8 261.1 183.7 271.9 C188.6 282.8 192.5 297 195 306 " +
  "C197.5 315 197.7 319.3 198.5 326 C199.3 332.7 199.9 339.3 200 346 C200.1 352.7 199.7 359.3 199 366 " +
  "C198.3 372.7 197.5 379.3 196 386 C194.5 392.7 192.2 399.3 190 406 C187.8 412.7 185.4 419.7 182.5 426 " +
  "C179.6 432.3 171.9 438.8 172.5 444 C173.1 449.2 180.4 454.7 186 457.5 C191.6 460.3 199.3 459.4 206 461 " +
  "C212.7 462.6 219.5 464.6 226 467 C232.5 469.4 238.8 472.4 245 475.5 C251.2 478.6 257.2 481.8 263 485.5 " +
  "C268.8 489.2 274.5 493.6 280 498 C285.5 502.4 293.3 509.7 296 512 L-20 520 L-20 -20 Z";

const cross = (l: number, a: number) =>
  `M${-a} ${-l} H${a} V${-a} H${l} V${a} H${a} V${l} H${-a} V${a} H${-l} V${-a} H${-a} Z`;

const chip = (o: number, c: number, n: number) =>
  `M${-c} ${-o} H${-n} V${-c} H${n} V${-o} H${c} V${-c} H${o} V${-n} H${c} V${n} H${o} V${c} ` +
  `H${c} V${o} H${n} V${c} H${-n} V${o} H${-c} V${c} H${-o} V${n} H${-c} V${-n} H${-o} V${-c} H${-c} Z`;

const arch = (cx: number, base: number, R: number, r: number) =>
  `M${cx - R} ${base} A${R} ${R} 0 0 1 ${cx + R} ${base} H${cx + r} A${r} ${r} 0 0 0 ${cx - r} ${base} Z`;

const LeftArt = () => (
  <svg viewBox="0 0 300 500" className="h-full w-auto" style={{ aspectRatio: "300 / 500" }} aria-hidden="true">
    <path d={CLOUD} fill="#C3E6F6" stroke={INK} strokeWidth={8} strokeLinejoin="round" />
    <g transform="translate(168.8 242.2) rotate(-13)" strokeWidth={2.5} stroke={INK} strokeLinejoin="round">
      <path d={cross(42.2, 15.2)} fill="#57CAFF" transform="rotate(13) translate(-4 5) rotate(-13)" />
      <path d={cross(42.2, 15.2)} fill="#4285F4" />
    </g>
  </svg>
);

const RightArt = () => (
  <svg viewBox="1240 0 200 500" className="h-full w-auto" style={{ aspectRatio: "200 / 500" }} aria-hidden="true">
    <g stroke={INK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
      <g transform="translate(1317.5 97.5)">
        <path d={chip(44.3, 31.8, 6.2)} fill="#34A853" />
        <g fill="none">
          <circle r={31.5} />
          <ellipse rx={13.75} ry={31.5} />
          <path d="M-29.4 -11.25 H29.4 M-29.4 11.25 H29.4" />
        </g>
        <rect x={-5.5} y={-5.5} width={11} height={11} fill="#FFFFFF" />
      </g>
      <circle cx={1288.75} cy={169} r={11.25} fill="#34A853" />
      <circle cx={1317.5} cy={169} r={11.25} fill="#5CDB6D" />
      <circle cx={1346.25} cy={169} r={11.25} fill="#CCF6C5" />
      <g transform="translate(1317 335)">
        {[0, 45, 90, 135].map((deg) => (
          <path key={deg} d="M-23 0 H23" transform={`rotate(${deg})`} />
        ))}
      </g>
      <path d={arch(1315.5, 430, 58, 34)} fill="#FFE7A5" strokeWidth={2.5} />
      <path d={arch(1326.5, 430, 58, 34)} fill="#F6AA00" strokeWidth={2.5} />
    </g>
  </svg>
);

function Hero() {
  return (
    <div
      className="
        HeroSection
        relative
        w-full
        aspect-[4/3]
        sm:aspect-[16/9]
        md:h-[60vh]
        md:aspect-auto
        min-h-[260px]
        max-h-[600px]
        overflow-hidden
        bg-white
      "
      style={{ containerType: "size" }}
    >
     
      <div
        className="absolute inset-y-0 hidden sm:block"
        style={{ left: "min(0px, calc(20cqw - 43cqh))" }}
      >
        <LeftArt />
      </div>
      <div
        className="absolute inset-y-0 hidden sm:block"
        style={{ right: "min(0px, calc(20cqw - 37cqh))" }}
      >
        <RightArt />
      </div>

      <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[69%] sm:w-[60%] md:w-[51.6%] max-w-[820px]">
        <GdgLockup data-hero-lockup className="block w-full h-auto" />
      </div>

      <div
        className="
          absolute
          bottom-[25%]
          left-1/2
          -translate-x-1/2
          flex
        "
      >
        <div className="flex flex-row gap-8">
          <a
            href="https://www.instagram.com/gdgc.vnrvjiet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition" />
          </a>

          <a
            href="https://www.linkedin.com/company/gdsc-vnrvjiet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
