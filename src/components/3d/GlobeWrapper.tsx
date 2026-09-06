'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const ExportGlobe = dynamic(() => import('./ExportGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-4 text-center">
        {/* Pulsing globe wireframe skeleton */}
        <div className="w-56 h-56 rounded-full border border-[#d4a373]/20 flex items-center justify-center animate-pulse-glow">
          <div className="w-44 h-44 rounded-full border border-[#d4a373]/30 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-[#d4a373]/40 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full bg-[#d4a373] animate-ping" />
            </div>
          </div>
        </div>
        <div className="text-xs text-[#baa99e] uppercase tracking-wider font-semibold">
          Loading 3D Origin Trade Coordinates...
        </div>
      </div>
    </div>
  ),
});

export default function GlobeWrapper() {
  return <ExportGlobe />;
}
