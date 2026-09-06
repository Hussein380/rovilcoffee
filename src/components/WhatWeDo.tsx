'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Coffee,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Layers,
  Ship,
  FileCheck2,
  Package,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { coffeeGrades } from '@/data/coffeeGrades';
import { teaVarieties } from '@/data/teaVarieties';
import {
  SlideUp,
  AnimatePresence,
  motion,
} from '@/components/motion/MotionWrappers';

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState<'coffee' | 'tea' | 'branded'>('branded');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-aa');

  // 4 primary coffee grades for clean 4-column display
  const primaryGrades = coffeeGrades.slice(0, 4);

  return (
    <section id="what-we-do" className="relative py-20 bg-white border-b border-[#ece3db] overflow-hidden">
      
      {/* Background Subtle Ambient Texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbf9f6]/60 to-[#f4ece4]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <SlideUp delay={0.0}>
            <span className="text-sm font-semibold text-[#7a4727] mb-2 block">
              Pure Kenyan Origin • Commercial Export &amp; ROVIL Packaged Goods
            </span>
          </SlideUp>

          <SlideUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23150c] tracking-tight leading-tight">
              What We Do: <span className="text-[#7a4727]">ROVIL Brand</span> &amp; Bulk Supply
            </h2>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-[#574c43] leading-relaxed">
              We operate across the complete coffee and tea value chain. We package our own premium <strong>ROVIL</strong> retail brand for cafes, consumers, and grocery distribution, while also fulfilling multi-ton container export allocations for international commodity buyers worldwide.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm"
              >
                <span>View Full Product Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#branded-retail"
                className="inline-flex items-center gap-2 bg-[#f4ece4] hover:bg-[#ece3db] text-[#3e2211] px-5 py-3 rounded-xl text-sm font-semibold transition-all border border-[#d8c2b0]"
              >
                <span>Explore Retail Packaging</span>
              </a>
            </div>
          </SlideUp>
        </div>

        {/* 1. HIGHLIGHT SECTION: ROVIL BRANDED CONSUMER & RETAIL LINE */}
        <div id="branded-retail" className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4ece4] text-[#7a4727] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Consumer &amp; Retail Brand</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23150c]">
                The ROVIL Packaged Collection
              </h3>
            </div>
            <p className="text-sm text-[#574c43] max-w-md">
              Crafted in Nairobi for specialty coffee shops, retail consumers, and international distributors seeking ready-to-sell packaged Kenyan origins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* ROVIL Coffee Pouches */}
            <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-72 w-full bg-[#fbf9f6] overflow-hidden">
                <Image
                  src="/images/branded/rovil-coffee-pouch.jpg"
                  alt="ROVIL 100% Kenyan Arabica Grade AA Roasted Coffee 250g Pouch"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-2.5 py-1 rounded-full">
                      250g / 500g / 1kg
                    </span>
                    <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Freshly Roasted
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                    ROVIL Single Origin Roasted Coffee
                  </h4>
                  <p className="text-sm text-[#574c43] leading-relaxed">
                    100% Kenyan Arabica Grade AA, artisanal roasted in small batches. Sealed in premium degassing valve pouches preserving rich blackcurrant and jasmine aromatics.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between text-sm">
                  <span className="text-xs text-[#7d7065]">Whole Bean &amp; Fine Ground</span>
                  <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1">
                    <span>Order Packs</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* ROVIL Tea Canisters */}
            <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-72 w-full bg-[#fbf9f6] overflow-hidden">
                <Image
                  src="/images/branded/rovil-tea-canister.jpg"
                  alt="ROVIL Kenyan Highland Purple Tea Luxury Canister 100g"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-2.5 py-1 rounded-full">
                      100g Airtight Tin
                    </span>
                    <span className="text-xs text-purple-800 font-semibold bg-purple-50 px-2 py-0.5 rounded">
                      TRFK 306 Cultivar
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                    ROVIL Highland Purple &amp; Specialty Tea
                  </h4>
                  <p className="text-sm text-[#574c43] leading-relaxed">
                    High-altitude antioxidant purple tea and golden-tipped orthodox leaves packed in elegant canisters. Delivers a vibrant violet infusion with natural sweet berry notes.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between text-sm">
                  <span className="text-xs text-[#7d7065]">Luxury Loose Leaf</span>
                  <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1">
                    <span>Order Tins</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* ROVIL Cafe & Retail Cups Experience */}
            <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-72 w-full bg-[#fbf9f6] overflow-hidden">
                <Image
                  src="/images/branded/rovil-retail-cups.jpg"
                  alt="ROVIL Branded Takeaway Cups and Fresh Artisanal Cafe Brew"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-2.5 py-1 rounded-full">
                      Cafe &amp; Consumer Cups
                    </span>
                    <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                      Local &amp; Events
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                    ROVIL Fresh Brew &amp; Cafe Supply
                  </h4>
                  <p className="text-sm text-[#574c43] leading-relaxed">
                    Supplying hospitality venues, retail outlets, and corporate offices with branded ROVIL takeaway cups, signature espresso blends, and pour-over single origins.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between text-sm">
                  <span className="text-xs text-[#7d7065]">Hospitality &amp; Retail</span>
                  <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1">
                    <span>Cafe Inquiries</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. BULK EXPORT GRADES & COMMODITY TABS */}
        <div className="space-y-8 pt-10 border-t border-[#ece3db]">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727] block">
                Commercial Container Export
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23150c]">
                Bulk Green Coffee &amp; Wholesale Tea
              </h3>
            </div>

            {/* Tab Switcher */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#f4ece4] border border-[#d8c2b0] shadow-xs self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('coffee')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'coffee'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c]'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>Green Arabica (4 Grades)</span>
              </button>

              <button
                onClick={() => setActiveTab('tea')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'tea'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c]'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>Highland Teas (Bulk)</span>
              </button>
            </div>
          </div>

          {/* Tab Content Panels */}
          <AnimatePresence mode="wait">
            {activeTab === 'coffee' || activeTab === 'branded' ? (
              <motion.div
                key="coffee-tab"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* 4 Column Coffee Grades Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {primaryGrades.map((grade) => {
                    const isSelected = grade.id === selectedGradeId;

                    return (
                      <motion.div
                        key={grade.id}
                        onClick={() => setSelectedGradeId(grade.id)}
                        className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                          isSelected
                            ? 'bg-white border-[#b57a44] shadow-md ring-2 ring-[#b57a44]/30'
                            : 'bg-white border-[#ece3db] hover:border-[#d8c2b0] shadow-xs'
                        }`}
                        whileHover={{ y: -4 }}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#7a4727]/10 border border-[#7a4727]/20 text-[#7a4727] font-bold text-lg group-hover:bg-[#7a4727] group-hover:text-white transition-all">
                              {grade.code}
                            </span>

                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#f4ece4] text-[#3e2211]">
                              {grade.accentBadge}
                            </span>
                          </div>

                          <div>
                            <h3 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors">
                              {grade.name}
                            </h3>
                            <div className="text-xs font-medium text-[#7a4727] mt-0.5">
                              Screen: {grade.screenSize} ({grade.screenMm})
                            </div>
                          </div>

                          <p className="text-sm text-[#574c43] leading-relaxed line-clamp-3">
                            {grade.beanDescription}
                          </p>

                          {/* Cupping Flavor Tags */}
                          <div className="pt-2">
                            <div className="text-xs font-semibold text-[#7d7065] mb-1.5">
                              Cup Profile
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {grade.cupProfile.notes.slice(0, 3).map((note) => (
                                <span
                                  key={note}
                                  className="px-2.5 py-1 rounded-md text-xs bg-[#fbf9f6] border border-[#ece3db] text-[#3e2211] font-medium"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-4 mt-5 border-t border-[#ece3db] flex items-center justify-between text-sm">
                          <span className="text-[#574c43] font-medium">60kg GrainPro</span>
                          <a
                            href="#contact"
                            className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors"
                          >
                            <span>Inquire</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Selected Grade Commercial Deep-Dive Box */}
                {selectedGradeId && (
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#faf8f5] border border-[#d8c2b0] shadow-xs">
                    {(() => {
                      const grade = coffeeGrades.find((g) => g.id === selectedGradeId) || coffeeGrades[0];
                      return (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          <div className="lg:col-span-8 space-y-3">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded bg-[#23150c] text-white font-semibold text-xs">
                                {grade.code} SPEC SHEET
                              </span>
                              <span className="text-sm text-[#7a4727] font-semibold">{grade.tagline}</span>
                            </div>

                            <h4 className="text-2xl font-bold text-[#23150c]">
                              {grade.name} Technical Export Profile
                            </h4>

                            <p className="text-base text-[#574c43] leading-relaxed">
                              {grade.beanDescription}
                            </p>

                            {/* Technical Indicators */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-sm">
                              <div className="p-3.5 rounded-xl bg-white border border-[#ece3db]">
                                <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Moisture Spec</span>
                                <span className="font-bold text-[#23150c]">10.0% – 11.5% Max</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-white border border-[#ece3db]">
                                <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Screen Diameter</span>
                                <span className="font-bold text-[#23150c]">{grade.screenMm}</span>
                              </div>
                              <div className="p-3.5 rounded-xl bg-white border border-[#ece3db]">
                                <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Container Load</span>
                                <span className="font-bold text-[#23150c]">320 Bags / 19.2 MT</span>
                              </div>
                            </div>
                          </div>

                          <div className="lg:col-span-4 flex flex-col items-stretch gap-3 bg-white p-6 rounded-xl border border-[#d8c2b0] text-center">
                            <span className="text-xs font-semibold text-[#7a4727] uppercase">
                              Ready for FOB / CIF Contract
                            </span>
                            <span className="text-base font-bold text-[#23150c]">
                              Pre-Shipment Samples (PSS) Available
                            </span>
                            <a
                              href="#contact"
                              className="w-full py-3 px-4 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white text-sm font-semibold transition-all shadow-xs"
                            >
                              <span>Request Quote for {grade.code}</span>
                            </a>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="tea-tab"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* 4 Column Tea Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teaVarieties.map((tea) => (
                    <motion.div
                      key={tea.id}
                      className="group relative rounded-2xl p-6 bg-white border border-[#ece3db] hover:border-[#d8c2b0] shadow-xs flex flex-col justify-between"
                      whileHover={{ y: -4 }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#f4ece4] text-[#3e2211]">
                            {tea.subtitle}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors">
                            {tea.name}
                          </h3>
                        </div>

                        <p className="text-sm text-[#574c43] leading-relaxed">
                          {tea.description}
                        </p>

                        <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece3db] space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#7d7065]">Liquor:</span>
                            <strong className="text-[#23150c]">{tea.liquorColor}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#7d7065]">Packaging:</span>
                            <strong className="text-[#23150c] truncate max-w-[140px]">{tea.packaging}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-5 border-t border-[#ece3db] flex items-center justify-between text-sm">
                        <span className="text-[#574c43] font-medium">{tea.originDetails}</span>
                        <a
                          href="#contact"
                          className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4 Corporate Credibility Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#ece3db]">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ece3db]">
            <ShieldCheck className="w-5 h-5 text-[#7a4727] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#23150c]">EUDR Compliant</div>
              <div className="text-xs text-[#574c43]">GPS Polygon Farm Mapping</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ece3db]">
            <Layers className="w-5 h-5 text-[#7a4727] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#23150c]">SCA Certified</div>
              <div className="text-xs text-[#574c43]">Lab Cupping Scores 84–88+</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ece3db]">
            <FileCheck2 className="w-5 h-5 text-[#7a4727] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#23150c]">Hermetic Liners</div>
              <div className="text-xs text-[#574c43]">GrainPro Sealed Against Moisture</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#ece3db]">
            <Ship className="w-5 h-5 text-[#7a4727] shrink-0" />
            <div>
              <div className="text-sm font-bold text-[#23150c]">Port of Mombasa</div>
              <div className="text-xs text-[#574c43]">FOB &amp; CIF Contract Terms</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
