import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-6 sm:pt-8 pb-10 sm:pb-12 bg-[#faf9f7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Authority, Provenance & Actions */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Government License & Provenance Label */}
            <div className="text-xs font-bold uppercase tracking-widest text-[#7a4727]">
              Licensed Kenyan Exporter • Virovil (K) Co. Ltd
            </div>

            {/* Clean Bold Headline (No italics, tight line-height) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#23150c] tracking-tight leading-[1.1]">
              Mount Kenya Harvest, <br />
              <span className="text-[#7a4727]">Exported to the World.</span>
            </h1>

            {/* Mobile-Only Product Photo */}
            <div className="lg:hidden w-full pt-1 pb-1">
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/branded/rovil-hero-advert.jpg"
                  alt="ROVIL Global Kenyan Coffee 125g and Black Orthodox & Purple Tea 150g"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>

            {/* Compact, Clear Commercial Copy */}
            <p className="text-sm sm:text-base text-[#574c43] leading-relaxed max-w-xl font-normal">
              Direct from the volcanic soils of <strong className="text-[#23150c] font-semibold">Mount Kenya (1,950m ASL)</strong>. We supply international roasters and importers with pure Arabica green beans <strong className="text-[#23150c] font-semibold">(Grades AA, AB, PB)</strong> and rare antioxidant-rich Purple Teas. Sourced with full farm-to-destination lot traceability under strict <strong className="text-[#23150c] font-semibold">FOB Incoterms</strong>.
            </p>

            {/* Clear Specifications List */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#23150c] font-medium">
              <div>
                <strong>100% Pure Arabica</strong> • SL28 &amp; SL34 Terroir
              </div>
              <div>
                <strong>Royal Purple Tea</strong> • TRFK 306 Antioxidant
              </div>
            </div>

            {/* Action Buttons (Balanced, not oversized) */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#23150c] hover:bg-[#382315] text-white px-6 py-3 rounded-sm text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors text-center"
              >
                <span>Request FOB Bulk Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-[#23150c] px-5 py-3 rounded-sm text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors border border-stone-300 text-center"
              >
                <span>Explore Catalog &amp; Packs</span>
              </Link>
            </div>

            {/* Live Logistics & FOB Shipping Terms */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#574c43]">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">Orders under 1 tonne</span>
                <span className="font-semibold text-[#23150c]">Air Cargo via JKIA Airport</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">1 tonne and above</span>
                <span className="font-semibold text-[#23150c]">Sea Freight via Port of Mombasa</span>
              </div>

              <div>
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">Shipping Terms</span>
                <span className="font-semibold text-[#23150c]">FOB terms (freight paid by buyer)</span>
              </div>
            </div>

          </div>

          {/* Desktop Right Column: Studio Product Showcase */}
          <div className="hidden lg:flex lg:col-span-6 relative items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-sm overflow-hidden border border-stone-200 shadow-sm bg-white">
              <Image
                src="/images/branded/rovil-hero-advert.jpg"
                alt="ROVIL Global Kenyan Coffee 125g and Black Orthodox & Purple Tea 150g"
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
