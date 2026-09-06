import Link from 'next/link';
import { ArrowRight, ShieldCheck, Check, Sparkles, MapPin, Award } from 'lucide-react';
import Real3DGlobeWrapper from './Real3DGlobeWrapper';

export default function Hero() {
  return (
    <section id="home" className="relative pt-8 sm:pt-12 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-[#fcfaf7] via-white to-[#fbf8f4] border-b border-[#ece3db] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Layout: Left = Editorial Authority, Right = 3D Trade Corridor Globe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Direct Luxury Authority */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Origin & Licensing Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece4]/80 border border-[#d8c2b0] text-[#3e2211] text-xs font-semibold tracking-wide shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7a4727]" />
              <span>Government of Kenya Licensed Exporter • AFA Coffee Directorate</span>
            </div>

            {/* Editorial Luxury Headline */}
            <div className="space-y-1">
              <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-[54px] font-bold text-[#23150c] tracking-tight leading-[1.12]">
                Kenyan Highland Harvest, <br />
                <span className="text-[#8c4f2b] italic font-normal">Exported to the World.</span>
              </h1>
            </div>

            {/* Direct Editorial Commercial Copy */}
            <p className="text-base sm:text-lg text-[#574c43] leading-relaxed max-w-xl font-normal">
              Direct from the red volcanic terroir of <strong className="text-[#23150c] font-semibold">Mount Kenya &amp; the Aberdares (1,950m ASL)</strong>. We supply master roasters, trading houses, and premium brands worldwide with single-origin Arabica <strong className="text-[#23150c] font-semibold">(Grades AA, AB, PB)</strong>, antioxidant-rich Royal Purple teas, and boutique roasted retail lines.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-md text-center group cursor-pointer"
              >
                <span>Request Green Bean Samples</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f4ece4] text-[#23150c] px-6 py-3.5 rounded-xl text-sm font-semibold transition-all border border-[#d8c2b0] text-center shadow-xs"
              >
                <span>Explore Catalog &amp; Prices</span>
              </Link>
            </div>

            {/* Live Origin & Quality Verification Strip */}
            <div className="pt-5 border-t border-[#ece3db] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#574c43]">
              <div className="bg-[#fbf9f6] p-2.5 rounded-xl border border-[#ece3db]/80">
                <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wider">Crop Status</span>
                <strong className="text-stone-800 font-semibold text-[11px]">Main Harvest 2026</strong>
              </div>
              <div className="bg-[#fbf9f6] p-2.5 rounded-xl border border-[#ece3db]/80">
                <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wider">Elevation</span>
                <strong className="text-stone-800 font-semibold text-[11px]">1,950m – 2,200m</strong>
              </div>
              <div className="bg-[#fbf9f6] p-2.5 rounded-xl border border-[#ece3db]/80">
                <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wider">Cupping Score</span>
                <strong className="text-stone-800 font-semibold text-[11px]">SCA 87.5 – 89.5</strong>
              </div>
              <div className="bg-[#fbf9f6] p-2.5 rounded-xl border border-[#ece3db]/80">
                <span className="text-[10px] text-stone-400 font-medium block uppercase tracking-wider">Seaport</span>
                <strong className="text-stone-800 font-semibold text-[11px]">Port of Mombasa</strong>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Trade Corridor Globe */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <Real3DGlobeWrapper />
          </div>

        </div>

      </div>
    </section>
  );
}
