'use client';

import React from 'react';
import { ShieldCheck, ArrowRight, Anchor, Globe, Sparkles } from 'lucide-react';
import GlobeWrapper from '@/components/3d/GlobeWrapper';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-8 pb-16 overflow-hidden">
      {/* Background ambient lighting gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#d4a373]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#3d6852]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative B2B Export Messaging (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Trust Pill / Verification Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-[#d4a373]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d4a373] animate-ping" />
              <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
              <span className="text-xs uppercase tracking-widest text-[#fdfbf7] font-semibold">
                Licensed Coffee Exporter | Kenya
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm uppercase tracking-wider text-[#d4a373] font-semibold">
                Direct Origin Sourcing • Commercial Containers
              </div>
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight font-heading leading-[1.12]">
                <span className="block text-white">Kenyan Coffee & Tea,</span>
                <span className="gold-gradient-text block">Exported to the World.</span>
              </h1>
            </div>

            {/* Value Proposition Body */}
            <p className="text-base sm:text-lg text-[#baa99e] leading-relaxed max-w-2xl font-light">
              From our farms and trusted producers in the fertile highlands of Kenya to commercial commodity buyers across <span className="text-white font-medium">Europe, the UK, the United States, Asia, Japan, and Africa</span>—we supply premium Kenyan Arabica coffee grades and specialty teas in large-volume export shipments.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#rfq-quote"
                className="gold-button px-7 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 font-semibold shadow-lg text-center"
              >
                <span>Request a Bulk Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#products"
                className="outline-gold-button px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <span>Explore Products & Grades</span>
              </a>
            </div>

            {/* Fast Fact Trust Markers */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#baa99e]">
              <div className="flex items-center gap-2">
                <Anchor className="w-4 h-4 text-[#d4a373] shrink-0" />
                <span>Port of Mombasa Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#d4a373] shrink-0" />
                <span>FOB / CIF Global Terms</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-[#d4a373] shrink-0" />
                <span>SCA Lab Cupped Batches</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Kenya Origin Globe (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              {/* Subtle backglow spotlight */}
              <div className="absolute inset-0 bg-radial from-[#d4a373]/15 via-transparent to-transparent rounded-full filter blur-2xl pointer-events-none" />
              
              {/* 3D Globe Component */}
              <GlobeWrapper />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
