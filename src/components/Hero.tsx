import React from 'react';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';
import Real3DGlobeWrapper from './Real3DGlobeWrapper';
import FloatingCoffeeBeans from './FloatingCoffeeBeans';

export default function Hero() {
  return (
    <section id="home" className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 bg-white border-b border-[#ece3db] overflow-hidden">
      {/* Subtle Atmospheric Falling/Drifting Coffee Beans Background */}
      <FloatingCoffeeBeans />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Layout: Left = Editorial Content, Right = Compact 3D Corridor Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Direct Commercial Authority */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Origin & Licensing Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4ece4] border border-[#d8c2b0] text-[#3e2211] text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7a4727]" />
              <span>Licensed Coffee Exporter • Nairobi, Kenya</span>
            </div>

            {/* Clean, Commanding Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-[#23150c] tracking-tight leading-[1.12]">
                Kenyan Coffee & Tea, <br />
                <span className="text-[#7a4727]">Exported to the World.</span>
              </h1>
            </div>

            {/* Direct English Commercial Copy */}
            <p className="text-base sm:text-lg text-[#574c43] leading-relaxed max-w-xl font-normal">
              We are a licensed Kenyan export company based in Nairobi. We source, cultivate, and supply commercial container quantities of premium Arabica coffee and specialty teas to international buyers across <strong className="text-[#23150c] font-semibold">Europe, the UK, the USA, Asia, and Africa</strong>.
            </p>

            {/* Refined Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm text-center"
              >
                <span>Request an Export Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#what-we-do"
                className="inline-flex items-center justify-center gap-2 bg-[#fbf9f6] hover:bg-[#f4ece4] text-[#23150c] px-6 py-3.5 rounded-xl text-sm font-semibold transition-all border border-[#d8c2b0] text-center"
              >
                <span>Explore Products & Grades</span>
              </a>
            </div>

            {/* Single Subtle B2B Trust Verification Line */}
            <div className="pt-4 border-t border-[#ece3db] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#574c43]">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7a4727]" />
                <span>Port of Mombasa Dispatch (FOB / CIF)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7a4727]" />
                <span>20ft & 40ft Full Containers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#7a4727]" />
                <span>Regulated by Coffee Directorate (AFA)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Compact 3D Corridor Globe */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <Real3DGlobeWrapper />
          </div>

        </div>

      </div>
    </section>
  );
}
