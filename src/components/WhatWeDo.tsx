'use client';

import React, { useState } from 'react';
import {
  Coffee,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Ship,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import { coffeeGrades } from '@/data/coffeeGrades';
import { teaVarieties } from '@/data/teaVarieties';
import {
  SlideUp,
  SlideIn,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatePresence,
  motion,
} from '@/components/motion/MotionWrappers';

import Image from 'next/image';

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState<'coffee' | 'tea'>('coffee');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-aa');

  // Filter 4 primary coffee cards for clean 4-column display
  const primaryCoffeeGrades = coffeeGrades.slice(0, 4);

  return (
    <section id="what-we-do" className="relative py-20 lg:py-28 bg-[#fbf9f6] border-b border-[#ece3db] overflow-hidden">
      
      {/* Visual Depth: Ambient Warm Light Orbs (Part 5.4) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#7a4727]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#3e2211]/6 blur-3xl pointer-events-none" />
      
      {/* Top Border Glow (Part 5.7) */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7a4727]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header with Eyebrow and Responsive Hierarchy (Part 3) */}
        <div className="max-w-3xl">
          <SlideUp delay={0.0}>
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#7a4727] mb-3 block font-mono">
              Direct Kenyan Origin • Commercial Export Supply
            </span>
          </SlideUp>

          <SlideUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23150c] tracking-tight leading-[1.15]">
              What We Export: Certified Coffee &amp; <span className="text-[#7a4727]">Specialty Teas</span>
            </h2>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-[#574c43] leading-relaxed">
              We supply international commodity traders, commercial roasters, and specialty importers with verified container allocations. From precision screen sizing to hermetic GrainPro packing and Port of Mombasa container dispatch, we manage the entire export chain under strict international trade standards.
            </p>
            <div className="pt-4">
              <a
                href="/what-we-do"
                className="inline-flex items-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                <span>View Full Export Specifications &amp; Lab Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </SlideUp>
        </div>

        {/* 3-Photo Authentic Export Verification Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
            <div className="relative h-48 w-full">
              <Image
                src="/images/what-we-do/green-coffee-grading.jpg"
                alt="Kenyan Green Coffee Bean Screen Sizing and Digital Moisture Meter"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[#23150c]">
                <span>Grade AA / AB Screen Sizing</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">10.8% Moisture</span>
              </div>
              <p className="text-[#574c43] text-xs">
                Precision brass sieves (Screen 18 / 7.14mm) and calibrated digital moisture control.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
            <div className="relative h-48 w-full">
              <Image
                src="/images/what-we-do/cupping-lab-qc.jpg"
                alt="Nairobi SCAA Certified Cupping Laboratory and Q-Graders"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[#23150c]">
                <span>Nairobi Cupping Lab</span>
                <span className="text-[#7a4727] bg-[#f4ece4] px-2 py-0.5 rounded text-[10px]">SCAA Protocols</span>
              </div>
              <p className="text-[#574c43] text-xs">
                Certified Q-graders evaluating aroma, acidity, body, and defect scores per lot.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
            <div className="relative h-48 w-full">
              <Image
                src="/images/what-we-do/grainpro-export-bags.jpg"
                alt="60kg Sisal Bags with GrainPro Hermetic Liners Ready for Ocean Container Loading"
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between font-mono text-xs font-bold text-[#23150c]">
                <span>60kg GrainPro Packing</span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px]">Mombasa FOB</span>
              </div>
              <p className="text-[#574c43] text-xs">
                Multi-layer hermetic liners preserving origin freshness against maritime moisture.
              </p>
            </div>
          </div>
        </div>

        {/* SPA Interactive Commodity Switcher (Part 4.4 Tab Panel Swap) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#ece3db] pb-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#f4ece4] border border-[#d8c2b0] shadow-xs">
            <button
              onClick={() => setActiveTab('coffee')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'coffee'
                  ? 'bg-[#23150c] text-white shadow-sm'
                  : 'text-[#574c43] hover:text-[#23150c]'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Kenyan Arabica Green Coffee (4 Grades)</span>
            </button>

            <button
              onClick={() => setActiveTab('tea')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'tea'
                  ? 'bg-[#23150c] text-white shadow-sm'
                  : 'text-[#574c43] hover:text-[#23150c]'
              }`}
            >
              <Leaf className="w-4 h-4" />
              <span>Kenyan Highland Teas (Purple &amp; CTC)</span>
            </button>
          </div>

          <div className="text-xs text-[#7d7065] font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>2026/2027 Crop Allocation Ready for Booking</span>
          </div>
        </div>

        {/* Tab Content Panels with SPA Slide-In / Slide-Out (Part 4.4) */}
        <AnimatePresence mode="wait">
          {activeTab === 'coffee' ? (
            <motion.div
              key="coffee-tab"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-12"
            >
              {/* 4-Column Coffee Grades Grid (Part 6: Card Design Pattern) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {primaryCoffeeGrades.map((grade, idx) => {
                  const ghostNum = `0${idx + 1}`;
                  const isSelected = selectedGradeId === grade.id;

                  return (
                    <motion.div
                      key={grade.id}
                      onClick={() => setSelectedGradeId(grade.id)}
                      className={`group relative flex flex-col justify-between p-6 rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-[#7a4727] ring-2 ring-[#7a4727]/20 shadow-md'
                          : 'border-[#ece3db] hover:border-[#7a4727]/50 shadow-xs'
                      }`}
                      whileHover={{
                        y: -6,
                        boxShadow: '0 20px 50px rgba(35, 21, 12, 0.08)',
                      }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      {/* 1. Hover gradient reveal (Part 6: Always First Child) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7a4727]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* 2. Ghost Number Watermark (Part 3.4) */}
                      <span className="absolute top-3 right-4 font-mono font-bold text-5xl opacity-[0.06] select-none pointer-events-none text-[#23150c]">
                        {ghostNum}
                      </span>

                      {/* 3. Card Header with Grade Code & Screen Size */}
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#7a4727]/10 border border-[#7a4727]/20 text-[#7a4727] font-extrabold text-base font-mono group-hover:bg-[#7a4727] group-hover:text-white group-hover:scale-105 transition-all duration-300">
                            {grade.code}
                          </span>

                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#f4ece4] text-[#3e2211] border border-[#d8c2b0]">
                            {grade.accentBadge}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors duration-200">
                            {grade.name}
                          </h3>
                          <div className="text-xs text-[#7a4727] font-mono font-semibold mt-0.5">
                            Screen: {grade.screenSize} ({grade.screenMm})
                          </div>
                        </div>

                        <p className="text-xs text-[#574c43] leading-relaxed line-clamp-3">
                          {grade.beanDescription}
                        </p>

                        {/* Cupping Flavor Tags */}
                        <div className="pt-2">
                          <div className="text-[11px] uppercase tracking-wider text-[#7d7065] font-mono font-semibold mb-1.5">
                            Cup Profile
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {grade.cupProfile.notes.slice(0, 3).map((note) => (
                              <span
                                key={note}
                                className="px-2 py-0.5 rounded-md text-[11px] bg-[#fbf9f6] border border-[#ece3db] text-[#3e2211] font-medium"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 4. Commercial Specs Footer */}
                      <div className="relative z-10 pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs">
                        <span className="text-[#7d7065] font-mono">60kg GrainPro</span>
                        <a
                          href="#contact"
                          className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors"
                        >
                          <span>Inquire</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Grade Commercial Deep-Dive Box */}
              {selectedGradeId && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#d8c2b0] shadow-xs">
                  {(() => {
                    const grade = coffeeGrades.find((g) => g.id === selectedGradeId) || coffeeGrades[0];
                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded bg-[#23150c] text-white font-mono font-bold text-xs">
                              {grade.code} SPEC SHEET
                            </span>
                            <span className="text-xs text-[#7a4727] font-semibold">{grade.tagline}</span>
                          </div>

                          <h4 className="text-xl sm:text-2xl font-extrabold text-[#23150c]">
                            {grade.name} Technical Export Profile
                          </h4>

                          <p className="text-sm text-[#574c43] leading-relaxed">
                            {grade.beanDescription}
                          </p>

                          {/* Technical Indicators */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                            <div className="p-2.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db]">
                              <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Moisture Spec</span>
                              <span className="font-bold text-[#23150c]">10.0% – 11.5% Max</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db]">
                              <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Screen Diameter</span>
                              <span className="font-bold text-[#23150c]">{grade.screenMm}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db]">
                              <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Container Load</span>
                              <span className="font-bold text-[#23150c]">320 Bags / 19.2 MT</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col items-stretch gap-3 bg-[#fbf9f6] p-6 rounded-xl border border-[#ece3db] text-center">
                          <span className="text-xs font-semibold text-[#7a4727] uppercase font-mono">
                            Ready for FOB / CIF Contract
                          </span>
                          <span className="text-sm font-bold text-[#23150c]">
                            Pre-Shipment Samples (PSS) Available
                          </span>
                          <a
                            href="#contact"
                            className="w-full py-3 px-4 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white text-xs font-bold transition-all shadow-xs"
                          >
                            Book Grade {grade.code} Container
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
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {teaVarieties.map((tea, idx) => {
                const ghostNum = `0${idx + 1}`;

                return (
                  <motion.div
                    key={tea.id}
                    className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[#ece3db] bg-white overflow-hidden transition-all duration-300"
                    whileHover={{
                      y: -6,
                      boxShadow: '0 20px 50px rgba(35, 21, 12, 0.08)',
                      borderColor: 'rgba(122, 71, 39, 0.4)',
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    {/* Hover gradient reveal (Part 6) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7a4727]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Ghost Number Watermark (Part 3.4) */}
                    <span className="absolute top-3 right-4 font-mono font-bold text-5xl opacity-[0.06] select-none pointer-events-none text-[#23150c]">
                      {ghostNum}
                    </span>

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 group-hover:scale-110 transition-transform duration-300">
                        <Leaf className="w-6 h-6" />
                      </div>

                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#7a4727] font-semibold block">
                          {tea.subtitle}
                        </span>
                        <h3 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors duration-200">
                          {tea.name}
                        </h3>
                      </div>

                      <p className="text-xs text-[#574c43] leading-relaxed line-clamp-3">
                        {tea.description}
                      </p>

                      <div className="p-2.5 rounded-lg bg-[#fbf9f6] border border-[#ece3db] space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#7d7065]">Liquor:</span>
                          <span className="font-bold text-[#23150c]">{tea.liquorColor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#7d7065]">Packaging:</span>
                          <span className="font-bold text-[#23150c] truncate max-w-[120px]">{tea.packaging}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs">
                      <span className="text-[#7d7065] font-mono truncate">{tea.originDetails}</span>
                      <a
                        href="#contact"
                        className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Commercial Buyer Compliance Strip (Part 5.1 & Part 5.7) */}
        <div className="pt-8 border-t border-[#ece3db]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#ece3db] flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#23150c]">EUDR Geolocation Ready</div>
                <div className="text-[11px] text-[#574c43]">GPS polygon compliant for EU imports</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#ece3db] flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727] shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#23150c]">SCAA Lab Cupping Sheets</div>
                <div className="text-[11px] text-[#574c43]">Certified moisture & defect counts</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#ece3db] flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727] shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#23150c]">GrainPro Hermetic Liners</div>
                <div className="text-[11px] text-[#574c43]">Protected from maritime humidity</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#ece3db] flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727] shrink-0">
                <Ship className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#23150c]">Port of Mombasa Dispatch</div>
                <div className="text-[11px] text-[#574c43]">Direct global ocean vessel schedules</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Farm-to-Port Export Lifecycle (Part 4.1 StaggerContainer) */}
        <div className="pt-6 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7a4727] font-semibold">
              Traceable Agricultural Supply Chain
            </span>
            <h3 className="text-2xl font-extrabold text-[#23150c]">
              How Your Shipment Moves from Kenya
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 relative group hover:border-[#7a4727]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-sm font-mono">
                01
              </div>
              <h4 className="font-bold text-[#23150c] text-base">Direct Cooperative Harvest</h4>
              <p className="text-xs text-[#574c43] leading-relaxed">
                Hand-harvested red ripe cherries and two leaves & a bud cultivated by certified grower cooperatives across Mount Kenya and the Great Rift Valley at 1,700m–2,200m altitude.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 relative group hover:border-[#7a4727]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#7a4727] text-white flex items-center justify-center font-bold text-sm font-mono">
                02
              </div>
              <h4 className="font-bold text-[#23150c] text-base">Dry Milling & Precision Sizing</h4>
              <p className="text-xs text-[#574c43] leading-relaxed">
                Hulled, gravitationally density-sorted, and mechanically screen-separated (Grade AA, AB, PB). Moisture verified under 11.5% with certified SCAA quality analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 relative group hover:border-[#7a4727]/40 transition-all shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#b57a44] text-white flex items-center justify-center font-bold text-sm font-mono">
                03
              </div>
              <h4 className="font-bold text-[#23150c] text-base">GrainPro Packing & Mombasa Loading</h4>
              <p className="text-xs text-[#574c43] leading-relaxed">
                Packed in 60kg sisal bags with hermetic GrainPro liners. Loaded into 20ft/40ft containers at Port of Mombasa with Phytosanitary and AFA Coffee Directorate clearance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
