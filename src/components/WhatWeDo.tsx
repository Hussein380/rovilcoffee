'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function WhatWeDo() {
  const packagedProducts = [
    {
      id: 'coffee-125g',
      title: 'ROVIL Global Kenyan Coffee',
      weight: '125g Net Weight',
      tag: '100% Arabica Medium Roast Ground',
      desc: 'Grown in rich volcanic soils of Mount Kenya. Bold acid flavor, mellow wine aftertaste, and pleasant caramel aroma.',
      notes: ['Blackberry', 'Maple Syrup', 'Dark Cocoa', 'Green Apple'],
      image: '/images/branded/rovil-coffee-showcase.jpg',
      roaster: 'Virovil (K) Co. Ltd',
      cta: 'Inquire Packs',
    },
    {
      id: 'tea-150g',
      title: 'ROVIL Black Orthodox & Purple Tea',
      weight: '150g Stand-up Pouch',
      tag: 'Rare High-Altitude TRFK 306',
      desc: 'A blend of rich flavor and natural antioxidants. High in anthocyanin polyphenols with a refreshing aromatic liquor.',
      notes: ['Anthocyanin-Rich', 'Wild Berry', 'Sweet Plum', 'Smooth Malt'],
      image: '/images/branded/rovil-tea-showcase.jpg',
      roaster: 'Natural & Aromatic',
      cta: 'Inquire Packs',
    },
    {
      id: 'greentea-100g',
      title: 'ROVIL Highland Pure Green Tea',
      weight: '100g Eco Pouch',
      tag: 'Steamed Non-Fermented Leaf',
      desc: 'Produced from tender young leaves grown in high altitude volcanic soil. High in bioactive EGCG catechins with crisp vegetal clarity.',
      notes: ['High EGCG', 'Spring Blossom', 'Zero Additives', 'Clean Liquor'],
      image: '/images/branded/rovil-greentea-showcase.jpg',
      roaster: 'Highland Tea Estate',
      cta: 'Inquire Packs',
    },
    {
      id: 'nuts-150g',
      title: 'ROVIL Premium Roasted Mixed Nuts',
      weight: '150g Gourmet Foil Pouch',
      tag: 'Highland Macadamias & Cashews',
      desc: 'Prime Kenyan macadamias and jumbo coastal cashews, dry-roasted in small batches with sea salt. Packaged for retail and luxury hospitality.',
      notes: ['Macadamias', 'Coastal Cashews', 'Sea Salt', 'Slow Roasted'],
      image: '/images/branded/rovil-nuts-showcase.jpg',
      roaster: 'Export Selection',
      cta: 'Inquire Packs',
    },
  ];

  return (
    <section id="what-we-do" className="py-10 sm:py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* SECTION 1: PACKAGED PRODUCT RESERVES */}
        <div className="space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div className="max-w-2xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7a4727] block">
                Official ROVIL Packaged Line • Nairobi, Kenya
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150c] tracking-tight">
                Single-Origin <span className="text-[#7a4727]">Packaged Reserves</span>
              </h2>
              <p className="text-sm text-[#574c43] leading-relaxed">
                Artisanal coffees and specialty highland teas packaged in Nairobi for boutique cafes, gourmet grocers, and international retail distribution.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#23150c] hover:bg-[#382315] text-white px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-[#23150c] border border-stone-300 px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <span>Request Pricing</span>
              </a>
            </div>
          </div>

          {/* 4 Clean Editorial Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packagedProducts.map((p) => (
              <div
                key={p.id}
                className="border border-stone-200 bg-white rounded-sm overflow-hidden flex flex-col justify-between hover:border-stone-400 transition-colors shadow-xs"
              >
                {/* Product Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#23150c]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    {p.weight}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#7a4727] block uppercase tracking-wider">
                      {p.tag}
                    </span>

                    <h3 className="text-[#23150c] text-base font-bold leading-snug">
                      {p.title}
                    </h3>

                    <p className="text-xs text-[#574c43] leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>

                    {/* Tasting Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {p.notes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] font-medium bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-xs text-stone-700"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500 truncate max-w-[120px]">{p.roaster}</span>
                    <a
                      href="#contact"
                      className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1 transition-colors text-[11px] uppercase tracking-wider"
                    >
                      <span>{p.cta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Sub-Page Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200 text-xs text-[#574c43]">
            <div>
              <strong className="text-[#23150c] font-bold">Looking for additional packaging formats, gift tins, or cafe supplies? </strong>
              <span className="text-stone-600">Explore our complete catalog with multi-currency pricing (USD &amp; KES) and specifications.</span>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 font-bold text-[#7a4727] hover:text-[#23150c] transition-colors shrink-0 uppercase text-[11px] tracking-wider"
            >
              <span>Products Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* SECTION 2: COMMERCIAL BULK GREEN COFFEE EXPORTS */}
        <div className="space-y-6 pt-6 border-t border-stone-200">
          
          <div className="max-w-2xl space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7a4727] block">
              Commercial Export • Port of Mombasa Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150c] tracking-tight">
              Bulk Green Arabica <span className="text-[#7a4727]">&amp; Container Lots</span>
            </h2>
            <p className="text-sm text-[#574c43] leading-relaxed">
              We supply international roasting companies, commodity importers, and trading houses with container allocations in 60kg GrainPro hermetic lined jute bags strictly under FOB Incoterms.
            </p>
          </div>

          {/* 2-Column Clean Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-[#faf9f7] p-5 sm:p-6 rounded-sm border border-stone-200">
            
            {/* Left: Genuine Warehouse Photo */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-sm overflow-hidden border border-stone-200 bg-white shadow-sm">
              <Image
                src="/images/branded/rovil-bulk-coffee.jpg"
                alt="Kenyan Green Arabica Grade AA 60kg Burlap Export Bags at Milling Warehouse"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Right: Clean Export Specifications */}
            <div className="lg:col-span-6 space-y-3">
              
              <div className="space-y-2.5">
                <div className="p-3 rounded-sm bg-white border border-stone-200 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#23150c]">Kenya Grade AA Arabica (Screen 17/18)</h4>
                    <p className="text-xs text-[#574c43] mt-0.5">
                      Uniform large beans (7.2mm). Intense blackcurrant aromatics, bright citric acidity, and heavy winey mouthfeel.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#7a4727] bg-[#faf9f7] border border-stone-200 px-2 py-0.5 rounded-xs shrink-0">
                    SCA 87.5+
                  </span>
                </div>

                <div className="p-3 rounded-sm bg-white border border-stone-200 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#23150c]">Kenya Grade AB Arabica (Screen 15/16)</h4>
                    <p className="text-xs text-[#574c43] mt-0.5">
                      Combines premium A and B screen sizes (6.8mm). Crisp malic acidity, floral sweetness, and caramel finish.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#7a4727] bg-[#faf9f7] border border-stone-200 px-2 py-0.5 rounded-xs shrink-0">
                    SCA 85.5+
                  </span>
                </div>

                <div className="p-3 rounded-sm bg-white border border-stone-200 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#23150c]">Kenya Grade PB Arabica (Peaberry)</h4>
                    <p className="text-xs text-[#574c43] mt-0.5">
                      Single rounded whole bean per cherry with concentrated sugar and bright stone fruit complexity.
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#7a4727] bg-[#faf9f7] border border-stone-200 px-2 py-0.5 rounded-xs shrink-0">
                    SCA 86.5+
                  </span>
                </div>
              </div>

              {/* Shipping Logistics Summary */}
              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#574c43]">
                  Standard Load: <strong className="text-[#23150c]">320 Bags (19.2 Tonnes)</strong> per 20ft Container
                </span>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#23150c] hover:bg-[#382315] text-white font-semibold text-xs tracking-wider uppercase text-center transition-colors"
                >
                  Request Bulk Quote
                </a>
              </div>

            </div>

          </div>

          {/* Clean Sub-Page Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200 text-xs text-[#574c43]">
            <div>
              <strong className="text-[#23150c] font-bold">Need full technical export specifications? </strong>
              <span className="text-stone-600">Review moisture tolerance levels, screen sorting methods, laboratory cupping sheets, and ICO certificates.</span>
            </div>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-1 font-bold text-[#7a4727] hover:text-[#23150c] transition-colors shrink-0 uppercase text-[11px] tracking-wider"
            >
              <span>Technical Dossier</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* SECTION 3: MOUNT KENYA TERROIR & TRACEABILITY */}
        <div className="p-6 sm:p-8 rounded-sm bg-[#23150c] text-white space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="max-w-2xl space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d8a87b] block">
                Terroir Provenance &amp; Lot Traceability
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Grown at 1,950m on the Volcanic Slopes of Mount Kenya
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                Our coffee cherries and purple tea leaves are hand-harvested by partnered smallholder farmer cooperatives across Nyeri, Kiambu, and Kirinyaga. Every shipment includes GPS polygon lot mapping compliant with European Union Deforestation Regulations (EUDR).
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/our-farm"
                className="inline-flex items-center gap-2 bg-[#d8a87b] hover:bg-[#c69566] text-[#23150c] px-5 py-2.5 rounded-sm text-xs font-bold tracking-wider uppercase transition-colors"
              >
                <span>Farm &amp; Milling Process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION 4: 4 CORPORATE CREDIBILITY PILLARS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1 border-t border-stone-200">
          <div className="p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200">
            <div className="text-xs font-bold text-[#23150c] uppercase tracking-wider">EUDR Compliant</div>
            <div className="text-[11px] text-stone-500 mt-0.5">GPS Polygon Farm Mapping</div>
          </div>

          <div className="p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200">
            <div className="text-xs font-bold text-[#23150c] uppercase tracking-wider">SCA Certified</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Cupping Scores 84 to 89+</div>
          </div>

          <div className="p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200">
            <div className="text-xs font-bold text-[#23150c] uppercase tracking-wider">Hermetic Liners</div>
            <div className="text-[11px] text-stone-500 mt-0.5">GrainPro Sealed Export</div>
          </div>

          <div className="p-3.5 rounded-sm bg-[#faf9f7] border border-stone-200">
            <div className="text-xs font-bold text-[#23150c] uppercase tracking-wider">FOB Incoterms</div>
            <div className="text-[11px] text-stone-500 mt-0.5">Air Cargo &amp; Ocean Freight</div>
          </div>
        </div>

      </div>
    </section>
  );
}
