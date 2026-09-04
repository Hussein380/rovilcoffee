'use client';

import React from 'react';

interface BeanData {
  id: number;
  x: number; // percentage horizontal position [0..100]
  size: number; // width in px
  duration: number; // animation duration in seconds
  delay: number; // negative delay in seconds for immediate scatter
  blur: number; // blur in px for depth
  opacity: number; // visible coffee bean opacity
  animationClass: 'animate-bean-slow' | 'animate-bean-medium' | 'animate-bean-fast';
}

// 28 roasted coffee beans raining down continuously across the hero
const BEANS: BeanData[] = [
  { id: 1, x: 3, size: 30, duration: 11, delay: -2, blur: 0, opacity: 0.70, animationClass: 'animate-bean-medium' },
  { id: 2, x: 8, size: 20, duration: 15, delay: -9, blur: 1.5, opacity: 0.45, animationClass: 'animate-bean-slow' },
  { id: 3, x: 14, size: 38, duration: 9, delay: -5, blur: 0, opacity: 0.75, animationClass: 'animate-bean-fast' },
  { id: 4, x: 19, size: 24, duration: 13, delay: -11, blur: 1.0, opacity: 0.55, animationClass: 'animate-bean-medium' },
  { id: 5, x: 25, size: 34, duration: 10, delay: -4, blur: 0, opacity: 0.65, animationClass: 'animate-bean-fast' },
  { id: 6, x: 31, size: 22, duration: 16, delay: -8, blur: 2.0, opacity: 0.40, animationClass: 'animate-bean-slow' },
  { id: 7, x: 36, size: 42, duration: 9, delay: -1, blur: 0, opacity: 0.80, animationClass: 'animate-bean-fast' },
  { id: 8, x: 41, size: 26, duration: 14, delay: -7, blur: 1.2, opacity: 0.50, animationClass: 'animate-bean-medium' },
  { id: 9, x: 47, size: 32, duration: 12, delay: -3, blur: 0.5, opacity: 0.65, animationClass: 'animate-bean-medium' },
  { id: 10, x: 52, size: 18, duration: 17, delay: -13, blur: 2.5, opacity: 0.38, animationClass: 'animate-bean-slow' },
  { id: 11, x: 58, size: 36, duration: 10, delay: -6, blur: 0, opacity: 0.75, animationClass: 'animate-bean-fast' },
  { id: 12, x: 63, size: 24, duration: 13, delay: -10, blur: 1.0, opacity: 0.55, animationClass: 'animate-bean-medium' },
  { id: 13, x: 69, size: 40, duration: 8.5, delay: -2.5, blur: 0, opacity: 0.80, animationClass: 'animate-bean-fast' },
  { id: 14, x: 74, size: 22, duration: 15, delay: -12, blur: 1.8, opacity: 0.45, animationClass: 'animate-bean-slow' },
  { id: 15, x: 79, size: 34, duration: 11, delay: -5.5, blur: 0.5, opacity: 0.70, animationClass: 'animate-bean-medium' },
  { id: 16, x: 84, size: 28, duration: 14, delay: -8.5, blur: 1.2, opacity: 0.50, animationClass: 'animate-bean-slow' },
  { id: 17, x: 90, size: 44, duration: 9.5, delay: -1.5, blur: 0, opacity: 0.82, animationClass: 'animate-bean-fast' },
  { id: 18, x: 96, size: 24, duration: 13.5, delay: -10.5, blur: 1.5, opacity: 0.48, animationClass: 'animate-bean-medium' },
  { id: 19, x: 11, size: 28, duration: 12.5, delay: -6.5, blur: 0.8, opacity: 0.60, animationClass: 'animate-bean-medium' },
  { id: 20, x: 22, size: 18, duration: 18, delay: -14, blur: 2.2, opacity: 0.35, animationClass: 'animate-bean-slow' },
  { id: 21, x: 34, size: 30, duration: 10.5, delay: -3.5, blur: 0, opacity: 0.70, animationClass: 'animate-bean-fast' },
  { id: 22, x: 45, size: 36, duration: 9, delay: -7.5, blur: 0.5, opacity: 0.75, animationClass: 'animate-bean-fast' },
  { id: 23, x: 56, size: 26, duration: 13, delay: -4.5, blur: 1.2, opacity: 0.52, animationClass: 'animate-bean-medium' },
  { id: 24, x: 66, size: 32, duration: 11.5, delay: -9.5, blur: 0, opacity: 0.68, animationClass: 'animate-bean-medium' },
  { id: 25, x: 77, size: 20, duration: 16, delay: -15, blur: 2.0, opacity: 0.42, animationClass: 'animate-bean-slow' },
  { id: 26, x: 87, size: 38, duration: 8.8, delay: -2, blur: 0, opacity: 0.78, animationClass: 'animate-bean-fast' },
  { id: 27, x: 93, size: 22, duration: 14.5, delay: -11.5, blur: 1.6, opacity: 0.46, animationClass: 'animate-bean-slow' },
  { id: 28, x: 5, size: 36, duration: 10, delay: -5, blur: 0, opacity: 0.72, animationClass: 'animate-bean-fast' },
];

function RichCoffeeBeanSVG({ size }: { size: number }) {
  const height = Math.round(size * 1.36);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 40 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-md"
    >
      {/* Outer Roasted Coffee Bean Body (Deep rich espresso) */}
      <path
        d="M20 2 C32 2 39 13 39 27 C39 41 32 52 20 52 C8 52 1 41 1 27 C1 13 8 2 20 2 Z"
        fill="#2e170c"
      />

      {/* Warm Roasted Mahogany Highlight */}
      <path
        d="M20 4 C30 4 36.5 14 36.5 27 C36.5 40 30 49.5 20 49.5 C10 49.5 3.5 40 3.5 27 C3.5 14 10 4 20 4 Z"
        fill="#452313"
      />

      {/* Surface Gloss Sheen */}
      <ellipse
        cx="14"
        cy="20"
        rx="7"
        ry="13"
        fill="#66361d"
        opacity="0.55"
        transform="rotate(-15 14 20)"
      />

      {/* Signature Arabica S-Curved Furrow / Crease */}
      <path
        d="M20 5 C17 16 23.5 24 18 36 C15.5 43 19.5 49 20 49"
        stroke="#120703"
        strokeWidth="3.6"
        strokeLinecap="round"
      />

      {/* Warm Golden Roast Edge on Crease */}
      <path
        d="M21 7 C18.5 17 24.5 24.5 19.5 36 C17 43 21 47 21 47"
        stroke="#8f512a"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

export default function FloatingCoffeeBeans() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-0"
      aria-hidden="true"
    >
      {BEANS.map((b) => (
        <div
          key={b.id}
          className={`absolute ${b.animationClass} will-change-transform`}
          style={{
            left: `${b.x}%`,
            top: 0,
            filter: b.blur > 0 ? `blur(${b.blur}px)` : 'none',
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <RichCoffeeBeanSVG size={b.size} />
        </div>
      ))}

      {/* Gentle readability shield over headline and copy */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
