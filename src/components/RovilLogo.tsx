'use client';

import React from 'react';
import Link from 'next/link';

interface RovilLogoProps {
  variant?: 'color' | 'light' | 'adaptive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showSubtitle?: boolean;
  subtitleText?: string;
  href?: string;
  className?: string;
}

export function RovilLogoIcon({
  variant = 'color',
  className = 'w-10 h-10',
}: {
  variant?: 'color' | 'light' | 'adaptive';
  className?: string;
}) {
  const isLight = variant === 'light';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 354.10 441.68"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="ROVIL Official Trademark Logo"
    >
      {/* Path 1: Main Coffee Bean Upper Outer Arch */}
      <path
        d="M 311.98 269.86 C 303.22 289.33, 298.09 306.70, 282.33 318.74 C 301.74 314.96, 313.12 287.12, 311.98 269.86 M 205.06 429.41 C 220.44 410.00, 228.63 391.11, 231.39 368.24 C 232.86 356.10, 238.96 344.08, 248.51 336.34 L 270.63 318.42 C 284.75 306.99, 296.37 295.22, 302.18 277.25 L 315.41 236.38 C 342.04 260.19, 344.10 295.40, 333.74 328.19 C 322.74 363.03, 302.34 393.00, 270.94 411.95 C 250.86 423.21, 230.41 431.68, 205.06 429.41"
        fill={isLight ? '#ffffff' : '#601800'}
      />
      {/* Path 2: Highlight Edge Curve */}
      <path
        d="M 311.98 269.86 C 313.12 287.12, 301.74 314.96, 282.33 318.74 C 298.09 306.70, 303.22 289.33, 311.98 269.86"
        fill={isLight ? '#f2e8de' : '#f5e8de'}
        opacity={isLight ? 0.9 : 1}
      />
      {/* Path 3: Mid Crescent Body */}
      <path
        d="M 139.43 311.09 C 136.31 308.26, 134.10 306.65, 129.53 307.63 C 149.44 324.65, 162.12 346.38, 165.38 372.75 C 166.06 378.28, 167.05 383.35, 170.66 388.29 C 168.43 351.44, 164.86 334.15, 139.43 311.09 M 183.27 421.95 C 141.51 390.50, 171.55 347.73, 118.63 312.61 C 99.68 300.03, 84.19 283.81, 79.25 260.91 C 77.05 250.70, 73.86 241.11, 70.08 230.86 C 93.97 227.85, 115.64 234.45, 134.92 246.92 C 171.70 270.70, 196.59 307.49, 203.51 351.15 C 207.61 376.96, 200.69 402.36, 183.27 421.95"
        fill={isLight ? '#f5eedb' : '#601800'}
      />
      {/* Path 4: Soft Accent Inlay */}
      <path
        d="M 139.43 311.09 C 164.86 334.15, 168.43 351.44, 170.66 388.29 C 167.05 383.35, 166.06 378.28, 165.38 372.75 C 162.12 346.38, 149.44 324.65, 129.53 307.63 C 134.10 306.65, 136.31 308.26, 139.43 311.09"
        fill={isLight ? '#e7cdb8' : '#f7ede8'}
      />
      {/* Path 5: Tea Leaf / Roasted Amber Wing */}
      <path
        d="M 51.53 271.78 C 52.88 289.16, 60.26 306.96, 75.54 316.17 Z M 134.18 367.00 C 135.36 390.13, 145.47 408.16, 157.59 427.25 C 126.90 428.02, 100.05 416.75, 77.96 396.70 C 36.60 359.15, 10.00 284.57, 50.06 239.02 C 58.30 270.76, 73.28 299.46, 98.35 319.46 C 113.22 331.33, 132.82 340.24, 134.18 367.00"
        fill={isLight ? '#d89f68' : '#c47030'}
      />
      {/* Path 6: Leaf Tip Shimmer */}
      <path
        d="M 51.53 271.78 L 75.54 316.17 C 60.26 306.96, 52.88 289.16, 51.53 271.78"
        fill={isLight ? '#ffebd6' : '#fbf1e2'}
      />
      {/* Path 7: Inner Petal Accent */}
      <path
        d="M 223.46 316.17 L 221.98 321.89 C 221.73 322.82, 218.29 321.54, 218.36 320.58 L 218.71 316.10 C 224.02 303.01, 233.81 289.73, 249.56 285.60 C 240.59 296.31, 229.44 303.08, 223.46 316.17"
        fill={isLight ? '#fcefe3' : '#fcefe3'}
      />
      {/* Path 8: Warm Amber Core S-Curve */}
      <path
        d="M 223.46 316.17 C 229.44 303.08, 240.59 296.31, 249.56 285.60 C 233.81 289.73, 224.02 303.01, 218.71 316.10 L 218.36 320.58 C 218.29 321.54, 221.73 322.82, 221.98 321.89 Z M 235.97 317.20 L 214.68 346.22 C 207.50 326.63, 200.56 309.72, 190.91 290.40 C 212.76 257.23, 249.59 224.77, 291.36 231.34 C 293.06 270.93, 269.77 300.64, 235.97 317.20"
        fill={isLight ? '#e59d64' : '#c36e37'}
      />
      {/* Path 9: Crown Stem Spire */}
      <path
        d="M 175.45 10.00 L 177.49 10.00 C 169.02 30.75, 168.06 53.72, 176.78 75.64 L 204.76 145.99 C 215.69 173.46, 210.04 204.92, 189.26 225.09 C 197.35 199.82, 198.58 178.65, 189.37 156.22 L 166.13 99.68 C 154.08 70.34, 153.26 31.17, 175.45 10.00"
        fill={isLight ? '#e68a44' : '#611d04'}
      />
      {/* Path 10: Center Spire Flame */}
      <path
        d="M 175.09 198.30 C 169.53 214.63, 169.40 230.51, 170.37 249.58 C 161.51 242.95, 160.62 232.06, 159.68 222.01 C 157.31 196.53, 165.28 171.82, 178.18 148.22 C 186.68 155.07, 186.12 165.89, 182.87 175.43 Z"
        fill={isLight ? '#f2ad76' : '#c3753a'}
      />
      {/* Path 11: Top Golden Leaf Crest */}
      <path
        d="M 203.58 122.88 C 193.03 110.94, 195.14 97.86, 196.31 84.39 L 198.18 62.97 C 211.98 81.73, 208.68 103.53, 203.58 122.88"
        fill={isLight ? '#f8be8b' : '#c07034'}
      />
    </svg>
  );
}

export default function RovilLogo({
  variant = 'color',
  size = 'md',
  showText = true,
  showSubtitle = true,
  subtitleText = 'Coffee & Tea Exporters Kenya',
  href = '/',
  className = '',
}: RovilLogoProps) {
  const isLight = variant === 'light';

  // Sizing configurations
  const iconSizeClass =
    size === 'sm'
      ? 'w-7 h-9'
      : size === 'md'
      ? 'w-9 h-11'
      : size === 'lg'
      ? 'w-11 h-14'
      : 'w-14 h-18';

  const titleSizeClass =
    size === 'sm'
      ? 'text-lg'
      : size === 'md'
      ? 'text-2xl'
      : size === 'lg'
      ? 'text-3xl'
      : 'text-4xl';

  const subtitleSizeClass =
    size === 'sm'
      ? 'text-[9px]'
      : size === 'md'
      ? 'text-[10px] sm:text-xs'
      : size === 'lg'
      ? 'text-xs'
      : 'text-sm';

  const content = (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Emblem Frame */}
      <div
        className={`relative flex items-center justify-center p-1.5 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-sm ${
          isLight
            ? 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-[#000000]/20'
            : 'bg-gradient-to-br from-[#fbf8f5] via-[#f7f0eb] to-[#eedfce] border border-[#d8c2b0]/70 shadow-[#3e2211]/10 hover:border-[#b57a44]/50'
        }`}
      >
        <RovilLogoIcon variant={variant} className={iconSizeClass} />
      </div>

      {/* Typography Mark */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-sans font-black tracking-wider uppercase leading-none transition-colors ${titleSizeClass} ${
              isLight
                ? 'text-white group-hover:text-[#d89f68]'
                : 'text-[#23150c] group-hover:text-[#7a4727]'
            }`}
          >
            ROVIL
          </span>
          {showSubtitle && (
            <span
              className={`font-sans font-bold tracking-wider uppercase block mt-1 transition-colors ${subtitleSizeClass} ${
                isLight ? 'text-[#d8c2b0]' : 'text-[#7a4727]'
              }`}
            >
              {subtitleText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex focus:outline-hidden">
      {content}
    </Link>
  );
}
