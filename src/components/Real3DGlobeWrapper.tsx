'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Real3DGlobe = dynamic(() => import('./Real3DGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center relative rounded-2xl bg-gradient-to-b from-[#fbf9f6] to-[#f4ece4]/50 border border-[#d8c2b0]/40 overflow-hidden">
      {/* Ambient Globe Silhouette */}
      <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#23150c]/5 via-[#7a4727]/10 to-[#b57a44]/15 border border-[#d8c2b0]/30 animate-pulse flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-dashed border-[#7a4727]/30 animate-spin" style={{ animationDuration: '15s' }} />
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#d8c2b0]/60 text-xs font-medium text-[#7a4727] shadow-xs">
        <span className="w-2 h-2 rounded-full bg-[#7a4727] animate-ping" />
        <span>Loading 3D Trade Corridors...</span>
      </div>
    </div>
  ),
});

export default function Real3DGlobeWrapper() {
  return <Real3DGlobe />;
}
