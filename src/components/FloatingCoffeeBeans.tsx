'use client';

import React from 'react';

interface BeanConfig {
  id: number;
  x: number; // percentage horizontal position strictly in middle corridor [48..54]
  size: number; // width in px
  duration: number; // animation duration in seconds
  delay: number; // negative delay in seconds for immediate continuous cascade
  opacity: number; // crisp visibility
  animationClass: 'animate-bean-slow' | 'animate-bean-medium' | 'animate-bean-fast';
}

// 28 crisp roasted coffee beans cascading strictly in the middle whitespace between text and 3D globe
const MIDDLE_CORRIDOR_BEANS: BeanConfig[] = [
  { id: 1,  x: 48.0, size: 30, duration: 10.5, delay: -1.8, opacity: 0.90, animationClass: 'animate-bean-fast' },
  { id: 2,  x: 49.2, size: 22, duration: 14.2, delay: -8.5, opacity: 0.80, animationClass: 'animate-bean-slow' },
  { id: 3,  x: 50.5, size: 34, duration: 9.0,  delay: -4.2, opacity: 0.94, animationClass: 'animate-bean-fast' },
  { id: 4,  x: 51.8, size: 24, duration: 12.8, delay: -11.0, opacity: 0.84, animationClass: 'animate-bean-medium' },
  { id: 5,  x: 53.2, size: 28, duration: 11.2, delay: -3.4, opacity: 0.88, animationClass: 'animate-bean-medium' },
  { id: 6,  x: 54.2, size: 20, duration: 15.5, delay: -7.6, opacity: 0.76, animationClass: 'animate-bean-slow' },

  { id: 7,  x: 48.6, size: 36, duration: 8.8,  delay: -5.9, opacity: 0.95, animationClass: 'animate-bean-fast' },
  { id: 8,  x: 49.8, size: 24, duration: 13.5, delay: -13.2, opacity: 0.82, animationClass: 'animate-bean-medium' },
  { id: 9,  x: 51.0, size: 32, duration: 9.8,  delay: -2.7, opacity: 0.92, animationClass: 'animate-bean-fast' },
  { id: 10, x: 52.4, size: 22, duration: 16.0, delay: -9.8, opacity: 0.78, animationClass: 'animate-bean-slow' },
  { id: 11, x: 53.8, size: 30, duration: 10.8, delay: -6.4, opacity: 0.88, animationClass: 'animate-bean-fast' },

  { id: 12, x: 48.3, size: 22, duration: 14.8, delay: -10.4, opacity: 0.80, animationClass: 'animate-bean-slow' },
  { id: 13, x: 49.5, size: 32, duration: 9.4,  delay: -3.8, opacity: 0.92, animationClass: 'animate-bean-fast' },
  { id: 14, x: 50.8, size: 26, duration: 12.2, delay: -7.1, opacity: 0.86, animationClass: 'animate-bean-medium' },
  { id: 15, x: 52.0, size: 36, duration: 8.5,  delay: -1.2, opacity: 0.95, animationClass: 'animate-bean-fast' },
  { id: 16, x: 53.5, size: 20, duration: 15.2, delay: -12.6, opacity: 0.75, animationClass: 'animate-bean-slow' },

  { id: 17, x: 48.8, size: 28, duration: 11.6, delay: -8.9, opacity: 0.86, animationClass: 'animate-bean-medium' },
  { id: 18, x: 50.0, size: 34, duration: 9.2,  delay: -4.9, opacity: 0.94, animationClass: 'animate-bean-fast' },
  { id: 19, x: 51.4, size: 22, duration: 13.9, delay: -14.0, opacity: 0.80, animationClass: 'animate-bean-slow' },
  { id: 20, x: 52.8, size: 30, duration: 10.2, delay: -2.3, opacity: 0.90, animationClass: 'animate-bean-fast' },
  { id: 21, x: 54.0, size: 24, duration: 14.5, delay: -6.0, opacity: 0.82, animationClass: 'animate-bean-medium' },

  { id: 22, x: 48.5, size: 32, duration: 10.0, delay: -6.8, opacity: 0.90, animationClass: 'animate-bean-fast' },
  { id: 23, x: 49.6, size: 20, duration: 15.8, delay: -11.5, opacity: 0.76, animationClass: 'animate-bean-slow' },
  { id: 24, x: 51.0, size: 36, duration: 8.7,  delay: -3.0, opacity: 0.95, animationClass: 'animate-bean-fast' },
  { id: 25, x: 52.2, size: 26, duration: 12.5, delay: -9.2, opacity: 0.84, animationClass: 'animate-bean-medium' },
  { id: 26, x: 53.4, size: 32, duration: 9.6,  delay: -5.4, opacity: 0.92, animationClass: 'animate-bean-fast' },
  { id: 27, x: 50.2, size: 24, duration: 13.2, delay: -1.5, opacity: 0.82, animationClass: 'animate-bean-medium' },
  { id: 28, x: 51.6, size: 28, duration: 11.0, delay: -7.8, opacity: 0.88, animationClass: 'animate-bean-medium' },
];

function ClearRoastedCoffeeBeanSVG({ size }: { size: number }) {
  const height = Math.round(size * 1.36);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 44 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_4px_6px_rgba(25,10,4,0.45)]"
    >
      {/* Outer Roasted Bean Body with Deep Dark Espresso Gradient */}
      <path
        d="M22 2 C35 2 42 14 42 30 C42 46 35 58 22 58 C9 58 2 46 2 30 C2 14 9 2 22 2 Z"
        fill="url(#coffeeDarkRoastGradient)"
      />

      {/* Warm Roasted Mahogany Inner Glow */}
      <path
        d="M22 4 C33 4 39.5 15 39.5 30 C39.5 45 33 55.5 22 55.5 C11 55.5 4.5 45 4.5 30 C4.5 15 11 4 22 4 Z"
        fill="url(#coffeeInnerRoastGradient)"
        opacity="0.9"
      />

      {/* Rich Natural Roasted Oil Gloss Sheen */}
      <ellipse
        cx="14"
        cy="22"
        rx="7"
        ry="14"
        fill="#8a4721"
        opacity="0.6"
        transform="rotate(-18 14 22)"
      />

      {/* Crisp Specular Gloss Reflection Point */}
      <ellipse
        cx="13"
        cy="19"
        rx="3.2"
        ry="7"
        fill="#f3c89d"
        opacity="0.5"
        transform="rotate(-16 13 19)"
      />

      {/* Deep Center Arabica Crease (Pure dark roast furrow) */}
      <path
        d="M22 6 C17.5 18 26.5 27 20 41 C16.5 48 21.5 54 22 54"
        stroke="#0d0402"
        strokeWidth="3.8"
        strokeLinecap="round"
      />

      {/* Warm Golden Roasted Edge along Crease */}
      <path
        d="M23.5 8 C19.5 19 28 28 21.8 41 C18.5 48 23 52 23 52"
        stroke="#a2572b"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export default function FloatingCoffeeBeans() {
  return (
    <div
      className="hidden lg:block absolute inset-0 pointer-events-none overflow-hidden select-none -z-0"
      aria-hidden="true"
    >
      {/* Shared Global SVG Gradients for Crisp Contrast and Performance */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <radialGradient id="coffeeDarkRoastGradient" cx="30%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#542913" />
            <stop offset="40%" stopColor="#35180a" />
            <stop offset="80%" stopColor="#1e0c05" />
            <stop offset="100%" stopColor="#100502" />
          </radialGradient>

          <linearGradient id="coffeeInnerRoastGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a220f" />
            <stop offset="50%" stopColor="#2c1408" />
            <stop offset="100%" stopColor="#160803" />
          </linearGradient>
        </defs>
      </svg>

      {/* Render 28 rich coffee beans cascading strictly in the middle corridor */}
      {MIDDLE_CORRIDOR_BEANS.map((b) => (
        <div
          key={b.id}
          className={`absolute ${b.animationClass} will-change-transform`}
          style={{
            left: `${b.x}%`,
            top: 0,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <ClearRoastedCoffeeBeanSVG size={b.size} />
        </div>
      ))}
    </div>
  );
}
