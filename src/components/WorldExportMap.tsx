'use client';

import React, { useState } from 'react';
import { Anchor, Navigation, Box, CheckCircle2 } from 'lucide-react';

interface RouteDestination {
  id: string;
  name: string;
  region: string;
  flag: string;
  x: number;
  y: number;
  products: string;
  containerType: string;
}

const DESTINATIONS: RouteDestination[] = [
  {
    id: 'europe',
    name: 'Europe',
    region: 'Rotterdam, Hamburg & Antwerp',
    flag: '🇪🇺',
    x: 520,
    y: 195,
    products: 'Grade AA & AB Arabica Coffee, Purple Tea',
    containerType: '20ft & 40ft Full Containers',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    region: 'London & Felixstowe',
    flag: '🇬🇧',
    x: 485,
    y: 185,
    products: 'Black CTC Tea (BP1/PF1) & Grade AA Coffee',
    containerType: 'Commercial Container Loads',
  },
  {
    id: 'usa',
    name: 'United States',
    region: 'New York & Oakland Ports',
    flag: '🇺🇸',
    x: 230,
    y: 220,
    products: 'Specialty Grade AA & Peaberry (PB)',
    containerType: 'FCL GrainPro Hermetic Bags',
  },
  {
    id: 'japan',
    name: 'Japan & East Asia',
    region: 'Yokohama & Tokyo',
    flag: '🇯🇵',
    x: 820,
    y: 230,
    products: 'High-Altitude Specialty AA & Orthodox Tea',
    containerType: 'Pesticide Tested GrainPro Shipments',
  },
  {
    id: 'china',
    name: 'Asia',
    region: 'Shanghai & Guangzhou',
    flag: '🇨🇳',
    x: 740,
    y: 255,
    products: 'Kenyan Arabica C & Loose Leaf Teas',
    containerType: 'Direct Maritime Freight',
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    region: 'Dubai (Jebel Ali)',
    flag: '🇦🇪',
    x: 620,
    y: 265,
    products: 'Commercial Coffee Grades & CTC Black Teas',
    containerType: 'Fast Coastal Sea Cargo (10-14 Days)',
  },
  {
    id: 'africa',
    name: 'Africa',
    region: 'Durban & Regional Hubs',
    flag: '🇿🇦',
    x: 550,
    y: 440,
    products: 'Commercial Bulk Grades & Tea Consignments',
    containerType: 'Road Freight & Ocean Shipments',
  },
];

// Kenya Origin Coordinate on the 960x540 SVG coordinate plane
const KENYA_X = 565;
const KENYA_Y = 325;

export default function WorldExportMap() {
  const [activeDest, setActiveDest] = useState<RouteDestination>(DESTINATIONS[0]);

  return (
    <div className="w-full bg-[#fbf9f6] border border-[#ece3db] rounded-2xl p-6 sm:p-10 shadow-xs">
      {/* Section Header with simple direct English */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ece4] text-[#5c351c] text-xs font-semibold uppercase tracking-wider mb-3">
          <Navigation className="w-3.5 h-3.5" />
          <span>Global Export Network</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#23150c] tracking-tight">
          Coffee & Tea Exported from Kenya to the World
        </h2>
        <p className="mt-2 text-base text-[#574c43] leading-relaxed">
          Kenya is our origin and growing home. From our farms and trusted producers, we process, grade, and ship commercial containers directly through the Port of Mombasa to major international ports worldwide.
        </p>
      </div>

      {/* SVG Interactive World Map with Animated Routes */}
      <div className="relative w-full overflow-hidden bg-white border border-[#ece3db] rounded-xl p-2 sm:p-6 shadow-xs">
        <svg
          viewBox="0 0 960 540"
          className="w-full h-auto select-none"
          style={{ maxHeight: '560px' }}
        >
          <defs>
            {/* Arrow marker for route endpoints */}
            <marker
              id="coffeeArrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#7a4727" />
            </marker>

            {/* Gradient for subtle map background */}
            <radialGradient id="kenyaGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b57a44" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#b57a44" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Continents Base Shapes (Clean simplified geography) */}
          <g fill="#f1ece5" stroke="#e3d9ce" strokeWidth="1">
            {/* North America */}
            <path d="M120,90 Q200,80 270,110 T320,160 Q340,210 280,240 T220,290 Q170,260 140,210 T110,140 Z" />
            {/* Greenland */}
            <path d="M370,55 Q410,50 430,75 T395,110 Q370,105 370,55 Z" />
            {/* South America */}
            <path d="M260,300 Q310,310 335,360 T320,440 Q280,480 260,490 T240,400 Q235,340 260,300 Z" />
            {/* Europe */}
            <path d="M470,130 Q530,120 570,145 T550,210 Q500,225 465,190 T470,130 Z" />
            {/* United Kingdom */}
            <path d="M465,150 Q485,150 485,175 T465,185 Z" />
            {/* Africa */}
            <path d="M480,230 Q570,220 600,280 T585,410 Q535,480 500,430 T470,330 Q460,260 480,230 Z" />
            {/* Asia */}
            <path d="M580,110 Q720,80 840,140 T860,260 Q780,310 680,300 T610,240 Q600,160 580,110 Z" />
            {/* India */}
            <path d="M660,260 Q700,280 700,340 T650,340 Z" />
            {/* Japan */}
            <path d="M820,185 Q845,190 840,240 T815,245 Z" />
            {/* Australia */}
            <path d="M760,380 Q840,370 870,410 T845,480 Q780,495 760,450 Z" />
          </g>

          {/* Glowing Aura under Kenya */}
          <circle cx={KENYA_X} cy={KENYA_Y} r="70" fill="url(#kenyaGlow)" />

          {/* Export Trade Routes from Kenya */}
          {DESTINATIONS.map((dest) => {
            // Draw a curved bezier curve from Kenya to destination
            const dx = dest.x - KENYA_X;
            const dy = dest.y - KENYA_Y;
            const cx = KENYA_X + dx * 0.45;
            const cy = KENYA_Y + dy * 0.45 - (dest.y < KENYA_Y ? 45 : -25);
            const pathD = `M ${KENYA_X} ${KENYA_Y} Q ${cx} ${cy} ${dest.x} ${dest.y}`;

            const isSelected = activeDest.id === dest.id;

            return (
              <g key={dest.id}>
                {/* Route Line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isSelected ? '#3e2211' : '#b57a44'}
                  strokeWidth={isSelected ? '2.5' : '1.8'}
                  className="route-animated"
                  markerEnd="url(#coffeeArrow)"
                  opacity={isSelected ? 1 : 0.65}
                />

                {/* Animated Moving Coffee Pulse along the route */}
                <circle r={isSelected ? '4.5' : '3.5'} fill={isSelected ? '#3e2211' : '#7a4727'}>
                  <animateMotion
                    path={pathD}
                    dur={`${dest.x < KENYA_X ? '3.2s' : '2.8s'}`}
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Destination Point & Click Target */}
                <g
                  className="cursor-pointer group"
                  onClick={() => setActiveDest(dest)}
                >
                  <circle
                    cx={dest.x}
                    cy={dest.y}
                    r={isSelected ? '9' : '6'}
                    fill={isSelected ? '#3e2211' : '#7a4727'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all"
                  />
                  {/* Destination Label */}
                  <text
                    x={dest.x}
                    y={dest.y - 12}
                    textAnchor="middle"
                    fill={isSelected ? '#23150c' : '#574c43'}
                    fontSize={isSelected ? '12' : '10'}
                    fontWeight={isSelected ? '700' : '600'}
                    className="pointer-events-none transition-all"
                  >
                    {dest.name}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Kenya Origin Center Marker */}
          <g className="cursor-default">
            {/* Outer pulsing ring */}
            <circle
              cx={KENYA_X}
              cy={KENYA_Y}
              r="18"
              fill="none"
              stroke="#5c351c"
              strokeWidth="2"
              className="pulse-circle"
            />
            {/* Solid Kenya core */}
            <circle
              cx={KENYA_X}
              cy={KENYA_Y}
              r="7"
              fill="#3e2211"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Flag & Origin Label */}
            <rect
              x={KENYA_X - 52}
              y={KENYA_Y + 14}
              width="104"
              height="22"
              rx="4"
              fill="#23150c"
            />
            <text
              x={KENYA_X}
              y={KENYA_Y + 29}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="700"
              letterSpacing="0.5"
            >
              KENYA (ORIGIN)
            </text>
          </g>
        </svg>

        {/* Port of Origin Tag */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#574c43] border-t border-[#ece3db] pt-3 px-2">
          <div className="flex items-center gap-2">
            <Anchor className="w-4 h-4 text-[#7a4727]" />
            <span>Port of Departure: <strong>Kilindini Harbour, Port of Mombasa, Kenya</strong></span>
          </div>
          <div className="text-[12px] text-[#7a4727] font-medium">
            Click any destination on the map or select below
          </div>
        </div>
      </div>

      {/* Destination Quick Selector Buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {DESTINATIONS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDest(d)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              activeDest.id === d.id
                ? 'bg-[#3e2211] text-white border-[#3e2211] shadow-xs'
                : 'bg-white text-[#574c43] border-[#ece3db] hover:border-[#7a4727]'
            }`}
          >
            <span>{d.flag}</span>
            <span>{d.name}</span>
          </button>
        ))}
      </div>

      {/* Active Destination Detail Card */}
      <div className="mt-4 p-5 rounded-xl bg-white border border-[#ece3db] grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-[#7a4727] font-semibold">
            Destination & Ports
          </div>
          <div className="text-lg font-bold text-[#23150c] flex items-center gap-2 mt-1">
            <span>{activeDest.flag}</span>
            <span>{activeDest.name}</span>
          </div>
          <div className="text-xs text-[#574c43] mt-0.5">{activeDest.region}</div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-[#7a4727] font-semibold">
            Typical Export Cargo
          </div>
          <div className="text-sm font-medium text-[#23150c] mt-1 flex items-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#7a4727] shrink-0 mt-0.5" />
            <span>{activeDest.products}</span>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-[#7a4727] font-semibold">
            Commercial Supply Type
          </div>
          <div className="text-sm font-medium text-[#23150c] mt-1 flex items-start gap-1.5">
            <Box className="w-4 h-4 text-[#7a4727] shrink-0 mt-0.5" />
            <span>{activeDest.containerType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
