'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Real3DGlobe = dynamic(() => import('./Real3DGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#7a4727] border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-[#7a4727] uppercase tracking-wider font-medium">
          Loading 3D Earth & Trade Corridors...
        </span>
      </div>
    </div>
  ),
});

export default function Real3DGlobeWrapper() {
  return <Real3DGlobe />;
}
