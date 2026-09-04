'use client';

import React from 'react';

interface BeanConfig {
  id: number;
  x: number; // percentage horizontal position [0..100]
  size: number; // width in px
  duration: number; // animation duration in seconds
  delay: number; // negative delay in seconds for immediate scatter
  blur: number; // blur in px for depth of field
  opacity: number; // watermark opacity
}

// 12 strategically placed coffee beans across the hero background
const BEANS: BeanConfig[] = [
  { id: 1, x: 6, size: 28, duration: 22, delay: -4, blur: 1.5, opacity: 0.22 },
  { id: 2, x: 20, size: 22, duration: 26, delay: -14, blur: 2.5, opacity: 0.16 },
  { id: 3, x: 38, size: 32, duration: 20, delay: -8, blur: 1.0, opacity: 0.25 },
  { id: 4, x: 50, size: 24, duration: 25, delay: -18, blur: 2.0, opacity: 0.18 },
  { id: 5, x: 64, size: 36, duration: 19, delay: -3, blur: 0.5, opacity: 0.26 },
  { id: 6, x: 74, size: 20, duration: 28, delay: -22, blur: 3.0, opacity: 0.15 },
  { id: 7, x: 86, size: 34, duration: 21, delay: -11, blur: 1.2, opacity: 0.24 },
  { id: 8, x: 94, size: 26, duration: 27, delay: -16, blur: 2.2, opacity: 0.18 },
  { id: 9, x: 14, size: 30, duration: 24, delay: -12, blur: 1.8, opacity: 0.20 },
  { id: 10, x: 44, size: 20, duration: 29, delay: -6, blur: 2.8, opacity: 0.15 },
  { id: 11, x: 80, size: 28, duration: 23, delay: -19, blur: 1.0, opacity: 0.22 },
  { id: 12, x: 98, size: 22, duration: 26, delay: -2, blur: 2.5, opacity: 0.16 },
];

function CoffeeBeanSVG({ size }: { size: number }) {
  const height = Math.round(size * 1.35);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 40 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xs"
    >
      {/* Outer Roast Bean Body */}
      <path
        d="M20 2 C32 2 39 13 39 27 C39 41 32 52 20 52 C8 52 1 41 1 27 C1 13 8 2 20 2 Z"
        fill="#432412"
      />

      {/* Subtle Inner Highlight */}
      <path
        d="M20 4 C30 4 37 14 37 27 C37 40 30 50 20 50 C10 50 3 40 3 27 C3 14 10 4 20 4 Z"
        fill="#5a3118"
      />

      {/* Characteristic S-Curved Arabica Crease */}
      <path
        d="M20 5 C17.5 16 23.5 24 18.5 36 C16 43 19.5 49 20 49"
        stroke="#231208"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Crease Edge Highlight */}
      <path
        d="M21 7 C18.8 17 24.5 24.5 20 36 C17.8 43 21 47 21 47"
        stroke="#8a4f2b"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.8"
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
          className="absolute animate-bean-drift will-change-transform"
          style={{
            left: `${b.x}%`,
            top: 0,
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <CoffeeBeanSVG size={b.size} />
        </div>
      ))}
    </div>
  );
}
