import React from 'react';

interface FlagIconProps {
  countryCode: 'KE' | 'EU' | 'GB' | 'US' | 'JP' | 'AE' | 'DE';
  className?: string;
  size?: number;
}

export default function FlagIcon({ countryCode, className = '', size = 20 }: FlagIconProps) {
  const clipId = `flag-clip-${countryCode}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`inline-block shrink-0 rounded-full shadow-xs ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${countryCode} Flag`}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="15" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {countryCode === 'KE' && (
          // Kenya Flag
          <g>
            <rect width="32" height="10" y="0" fill="#000000" />
            <rect width="32" height="1" y="9.5" fill="#FFFFFF" />
            <rect width="32" height="12" y="10" fill="#BB0000" />
            <rect width="32" height="1" y="21.5" fill="#FFFFFF" />
            <rect width="32" height="10" y="22" fill="#006600" />
            {/* Traditional Maasai Shield & Spears */}
            <g transform="translate(16, 16)">
              {/* Crossed Spears */}
              <line x1="-8" y1="-8" x2="8" y2="8" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="8" y1="-8" x2="-8" y2="8" stroke="#FFFFFF" strokeWidth="1.2" />
              {/* Shield Body */}
              <ellipse cx="0" cy="0" rx="3.5" ry="7.5" fill="#BB0000" stroke="#000000" strokeWidth="0.8" />
              <ellipse cx="0" cy="0" rx="1.8" ry="7.2" fill="#000000" />
              <circle cx="0" cy="0" r="1.1" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {countryCode === 'EU' && (
          // European Union Flag
          <g>
            <rect width="32" height="32" fill="#003399" />
            {/* 12 Golden Stars in a Circle */}
            <g transform="translate(16, 16) scale(0.95)" fill="#FFCC00">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const r = 9;
                const x = r * Math.sin(rad);
                const y = -r * Math.cos(rad);
                return (
                  <polygon
                    key={deg}
                    points="0,-1.4 0.4,-0.4 1.4,-0.4 0.6,0.3 0.9,1.3 0,0.7 -0.9,1.3 -0.6,0.3 -1.4,-0.4 -0.4,-0.4"
                    transform={`translate(${x.toFixed(2)}, ${y.toFixed(2)})`}
                  />
                );
              })}
            </g>
          </g>
        )}

        {countryCode === 'DE' && (
          // Germany Flag
          <g>
            <rect width="32" height="10.6" y="0" fill="#000000" />
            <rect width="32" height="10.6" y="10.6" fill="#DD0000" />
            <rect width="32" height="10.8" y="21.2" fill="#FFCC00" />
          </g>
        )}

        {countryCode === 'GB' && (
          // United Kingdom (Union Jack) Flag
          <g>
            <rect width="32" height="32" fill="#012169" />
            {/* White Saltires */}
            <line x1="0" y1="0" x2="32" y2="32" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="32" y1="0" x2="0" y2="32" stroke="#FFFFFF" strokeWidth="6" />
            {/* Red Saltires */}
            <line x1="0" y1="0" x2="32" y2="32" stroke="#C8102E" strokeWidth="2.2" />
            <line x1="32" y1="0" x2="0" y2="32" stroke="#C8102E" strokeWidth="2.2" />
            {/* St. George Cross White */}
            <rect x="12" y="0" width="8" height="32" fill="#FFFFFF" />
            <rect x="0" y="12" width="32" height="8" fill="#FFFFFF" />
            {/* St. George Cross Red */}
            <rect x="13.5" y="0" width="5" height="32" fill="#C8102E" />
            <rect x="0" y="13.5" width="32" height="5" fill="#C8102E" />
          </g>
        )}

        {countryCode === 'US' && (
          // United States Flag
          <g>
            {/* 13 Red & White Stripes */}
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={(i * 32) / 13}
                width="32"
                height={32 / 13 + 0.1}
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect x="0" y="0" width="15" height="17.2" fill="#3C3B6E" />
            {/* Star Dots */}
            <g fill="#FFFFFF">
              <circle cx="3" cy="3" r="0.8" />
              <circle cx="7.5" cy="3" r="0.8" />
              <circle cx="12" cy="3" r="0.8" />
              <circle cx="5.25" cy="6" r="0.8" />
              <circle cx="9.75" cy="6" r="0.8" />
              <circle cx="3" cy="9" r="0.8" />
              <circle cx="7.5" cy="9" r="0.8" />
              <circle cx="12" cy="9" r="0.8" />
              <circle cx="5.25" cy="12" r="0.8" />
              <circle cx="9.75" cy="12" r="0.8" />
              <circle cx="3" cy="14.5" r="0.8" />
              <circle cx="7.5" cy="14.5" r="0.8" />
              <circle cx="12" cy="14.5" r="0.8" />
            </g>
          </g>
        )}

        {countryCode === 'JP' && (
          // Japan Flag
          <g>
            <rect width="32" height="32" fill="#FFFFFF" />
            <circle cx="16" cy="16" r="8.5" fill="#BC002D" />
          </g>
        )}

        {countryCode === 'AE' && (
          // UAE Flag
          <g>
            {/* Green top */}
            <rect width="32" height="10.6" y="0" fill="#00732F" />
            {/* White middle */}
            <rect width="32" height="10.6" y="10.6" fill="#FFFFFF" />
            {/* Black bottom */}
            <rect width="32" height="10.8" y="21.2" fill="#000000" />
            {/* Red hoist band */}
            <rect width="9" height="32" x="0" y="0" fill="#FF0000" />
          </g>
        )}
      </g>

      {/* Subtle Circular Outer Border */}
      <circle cx="16" cy="16" r="15" fill="none" stroke="#23150c" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
  );
}
