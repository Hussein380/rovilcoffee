'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Real3DGlobeWrapper from './Real3DGlobeWrapper';

export default function GlobalTradeCorridors() {
  const corridors = [
    {
      region: 'Europe (Rotterdam, Hamburg, Antwerp)',
      mode: 'Sea Freight (FCL GrainPro)',
      transit: '21 to 28 Days',
      departure: 'Port of Mombasa',
      commodities: 'Kenya Arabica AA & AB, Bulk Orthodox Teas',
    },
    {
      region: 'Europe (Frankfurt, Amsterdam, London)',
      mode: 'Air Cargo Express',
      transit: '48 to 72 Hours',
      departure: 'JKIA Airport Nairobi',
      commodities: 'Purple Tea Reserves, Fresh Micro-lots, Roasted Lines',
    },
    {
      region: 'Middle East & Gulf (Dubai Jebel Ali, Dammam)',
      mode: 'Sea & Air Direct',
      transit: '7 to 12 Days (Sea) / 24h (Air)',
      departure: 'Mombasa Port & JKIA',
      commodities: 'Black CTC Teas, Arabica Commercial Lots, Mixed Nuts',
    },
    {
      region: 'North America (New York, Oakland, Houston)',
      mode: 'Ocean Freight FCL',
      transit: '28 to 35 Days',
      departure: 'Port of Mombasa',
      commodities: 'Specialty Grade AA, Peaberry (PB), Single-Origins',
    },
  ];

  return (
    <section id="export-corridors" className="py-10 sm:py-14 bg-[#faf9f7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7a4727] block">
              International Trade Corridors • Virovil (K) Co. Ltd
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150c] tracking-tight">
              From Mount Kenya <span className="text-[#7a4727]">to Global Ports</span>
            </h2>
            <p className="text-sm text-[#574c43] leading-relaxed">
              Every shipment is traceable from our partner farm blocks in Central Kenya directly to <strong>Jomo Kenyatta International Airport (JKIA)</strong> or the <strong>Port of Mombasa</strong>, connecting buyers across 38+ countries worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/export-markets"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-stone-950 hover:bg-[#382315] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <span>Export Markets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-white hover:bg-stone-50 text-stone-950 border-2 border-stone-300 text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors"
            >
              <span>Port Quotation</span>
            </a>
          </div>
        </div>

        {/* 2-Column Showcase: Left 3D Globe, Right Clean Trade Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive 3D Earth Globe */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-sm text-stone-700 pb-2.5 border-b border-stone-300">
                <span className="font-bold text-stone-950">
                  Kenya Export Corridors Hub
                </span>
                <span className="text-stone-600 font-medium">Mombasa (Sea) &amp; JKIA (Air)</span>
              </div>

              {/* 3D Earth Globe Canvas */}
              <div className="w-full flex items-center justify-center py-4">
                <Real3DGlobeWrapper />
              </div>

              <div className="text-xs text-stone-600 text-center font-medium">
                Interactive 3D Trade Earth — Drag to rotate globe &amp; view global delivery routes
              </div>
            </div>
          </div>

          {/* Right Column: Clean Trade Routes & FOB Freight Guidelines */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Clean Trade Routes List */}
            <div className="divide-y divide-stone-300">
              {corridors.map((c, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-base sm:text-lg text-stone-950">
                      {c.region}
                    </h4>
                    <div className="text-sm text-stone-700 font-medium">
                      <span>{c.mode}</span>
                      <span className="mx-2 text-stone-400">•</span>
                      <span>Origin: <strong className="text-stone-950">{c.departure}</strong></span>
                    </div>
                    <div className="text-xs text-stone-600">
                      {c.commodities}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs uppercase tracking-wider text-stone-500 block font-bold">Transit</span>
                    <span className="text-sm font-bold text-[#7a4727]">{c.transit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Clean Logistics Policy */}
            <div className="pt-6 border-t border-stone-300 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-950">
                Commercial FOB Logistics Policy
              </div>

              <p className="text-sm text-stone-700 leading-relaxed font-normal">
                Virovil (K) Co. Ltd operates strictly under <strong>FOB Incoterms</strong>. We handle all Kenyan domestic processing, KEPHIS Phytosanitary inspection, export clearance, and delivery to port/airport. International freight is paid by the buyer:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm pt-1">
                <div className="p-3.5 rounded-sm bg-white border border-stone-300 text-stone-800">
                  <strong className="block text-stone-950 font-bold mb-0.5">Orders under 1 tonne:</strong>
                  <span className="text-stone-600 text-xs">Dispatched by Air Cargo via JKIA Airport, Nairobi.</span>
                </div>

                <div className="p-3.5 rounded-sm bg-white border border-stone-300 text-stone-800">
                  <strong className="block text-stone-950 font-bold mb-0.5">1 tonne and above:</strong>
                  <span className="text-stone-600 text-xs">Shipped via Ocean Freight through Port of Mombasa.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Clean Sub-Page Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm bg-white border border-stone-300 text-sm text-stone-700">
          <div>
            <strong className="text-stone-950 font-bold block sm:inline">Looking for detailed port transit times and buyer onboarding steps? </strong>
            <span className="text-stone-600">Explore our country-specific export guidelines, shipping lines, container loading plans, and sample approval process.</span>
          </div>
          <Link
            href="/export-markets"
            className="inline-flex items-center gap-1.5 font-bold text-[#7a4727] hover:text-stone-950 transition-colors shrink-0 uppercase text-xs tracking-wider"
          >
            <span>All Export Markets</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
