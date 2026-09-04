'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  Clock,
  MapPin,
  FileText,
  Boxes,
  Thermometer,
  Microscope,
  Send,
  Package,
  Award,
  Globe2,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { coffeeGrades } from '@/data/coffeeGrades';
import { teaVarieties } from '@/data/teaVarieties';
import {
  SlideUp,
  SlideIn,
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  AnimatePresence,
  motion,
} from '@/components/motion/MotionWrappers';

export default function WhatWeDoPage() {
  const [activeTab, setActiveTab] = useState<'coffee' | 'qc' | 'tea' | 'logistics'>('coffee');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-aa');
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);

  const selectedGrade = coffeeGrades.find((g) => g.id === selectedGradeId) || coffeeGrades[0];

  return (
    <div className="min-h-screen bg-white text-[#1f1610] flex flex-col font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Section with Depth Layers, Scrim, Ambient Orbs & Photographic Texture */}
      <section className="relative min-h-[55vh] lg:min-h-[62vh] flex items-center justify-center overflow-hidden bg-[#180f08] text-white pt-16 pb-20">
        {/* Layer 0: Background Warehouse Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/what-we-do/grainpro-export-bags.jpg"
            alt="Rovil Kenyan Coffee GrainPro Export Warehouse"
            fill
            unoptimized
            priority
            className="object-cover object-center opacity-65 scale-105"
          />
        </div>

        {/* Layer 1: Dark Scrim & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180f08]/60 via-[#180f08]/40 to-[#180f08]/90 pointer-events-none z-1" />

        {/* Layer 4: Glowing Orb Blobs (Part 5.4) */}
        <motion.div
          className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-[#b57a44]/20 blur-3xl pointer-events-none z-2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 left-10 w-96 h-96 rounded-full bg-[#7a4727]/25 blur-3xl pointer-events-none z-2"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Content Container (Layer 10, relative z-10) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-4 py-1.5 text-[#f4ece4] text-xs font-semibold tracking-wider uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-[#b57a44] animate-pulse" />
              Direct Commercial Exporter • Nairobi & Port of Mombasa
            </span>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              What We Do: <span className="text-[#d89f68]">Export Specifications</span> & Technical Supply Chain
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-white/80 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Everything international green coffee traders, commercial roasters, and tea packers need: certified screen sizes, laboratory moisture analysis, hermetic GrainPro packing, EUDR geolocation documentation, and direct FOB Mombasa ocean vessel schedules.
            </p>
          </SlideUp>

          {/* Quick Technical Indicator Badges */}
          <SlideUp delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Screen Size: 17/18 (AA) & 15/16 (AB)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Moisture: 10.0% – 11.5% Max
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Water Activity: aW &lt; 0.60
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                EUDR Polygon Compliant
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* 3. Interactive Navigation Tabs (Sticky B2B Controller) */}
      <div className="sticky top-20 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#ece3db] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 gap-3 no-scrollbar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('coffee')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'coffee'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>1. Green Arabica Grades</span>
              </button>

              <button
                onClick={() => setActiveTab('qc')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'qc'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Microscope className="w-4 h-4" />
                <span>2. Laboratory QC & Cupping</span>
              </button>

              <button
                onClick={() => setActiveTab('tea')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'tea'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>3. Kenyan CTC & Purple Teas</span>
              </button>

              <button
                onClick={() => setActiveTab('logistics')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'logistics'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Ship className="w-4 h-4" />
                <span>4. Logistics & EUDR Compliance</span>
              </button>
            </div>

            <button
              onClick={() => setSampleModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#7a4727] hover:bg-[#23150c] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Pre-Shipment Sample (PSS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Tabbed Content Area */}
      <main className="flex-1 py-16 lg:py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 1: COFFEE GRADES & PHYSICAL SCREEN SEPARATION */}
            {activeTab === 'coffee' && (
              <motion.div
                key="tab-coffee"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-16"
              >
                {/* Intro Split: Text & Actual Sizing Sieve Lab Photograph */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#7a4727] block font-mono">
                      Physical Screen Calibration
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Mechanical Screen Sizing & <span className="text-[#7a4727]">Gravity Density Grading</span>
                    </h2>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      In Kenya, green coffee is classified mechanically using perforated brass sieves. Larger screen sizes (AA = screen 17/18) correlate with bean maturity, high elevation, dense aromatic oils, and superior thermal conductivity during roasting.
                    </p>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      Every lot dispatched by Rovil undergoes density destoning, optical color sorting (bichromatic bichrome sorting), and triple manual hand-sorting on conveyor belts to eliminate unripe, broca-damaged, or discolored beans before bagging.
                    </p>

                    {/* Bullet Metric Checkpoints */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">Screen Accuracy</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">&gt; 90% Above Sieve</div>
                        <div className="text-[11px] text-[#574c43]">Exceeds national AFA standards</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">Density Metric</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">&gt; 710 g / Litre</div>
                        <div className="text-[11px] text-[#574c43]">High thermal retention for roasters</div>
                      </div>
                    </div>
                  </div>

                  {/* Lab Photo Card with Glassmorphic Badge */}
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-lg group">
                    <div className="relative h-[380px] sm:h-[420px] w-full">
                      <Image
                        src="/images/what-we-do/green-coffee-grading.jpg"
                        alt="Raw Kenyan Green Arabica Coffee Grading Sieves and Moisture Meter"
                        fill
                        unoptimized
                        priority
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-[#23150c]">
                        <span>KENYA AA &amp; AB SEED TRAY ANALYSIS</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          10.8% MOISTURE VERIFIED
                        </span>
                      </div>
                      <p className="text-[#574c43] text-[11px] mt-1">
                        Sieve calibration showing Grade AA (Screen 18 / 7.14mm) and Grade AB (Screen 16 / 6.35mm) with digital Wile 55 moisture measurement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Grade Cards Grid */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#7a4727] font-semibold">
                        Commercial Export Catalogue
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#23150c]">
                        Select a Grade for Technical Specifications
                      </h3>
                    </div>
                    <span className="text-xs text-[#7d7065] font-mono">
                      Click any card to load complete lab &amp; contract details
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coffeeGrades.slice(0, 4).map((grade, idx) => {
                      const isSelected = selectedGradeId === grade.id;
                      const ghostNum = `0${idx + 1}`;

                      return (
                        <motion.div
                          key={grade.id}
                          onClick={() => setSelectedGradeId(grade.id)}
                          className={`group relative flex flex-col justify-between p-6 rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'border-[#7a4727] ring-2 ring-[#7a4727]/30 shadow-md scale-[1.01]'
                              : 'border-[#ece3db] hover:border-[#7a4727]/50 shadow-xs'
                          }`}
                          whileHover={{
                            y: -6,
                            boxShadow: '0 20px 50px rgba(35, 21, 12, 0.08)',
                          }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          {/* Hover gradient reveal (Part 6) */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#7a4727]/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                          {/* Ghost Number Watermark (Part 3.4) */}
                          <span className="absolute top-3 right-4 font-mono font-bold text-5xl opacity-[0.06] select-none pointer-events-none text-[#23150c]">
                            {ghostNum}
                          </span>

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
                              <h4 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors duration-200">
                                {grade.name}
                              </h4>
                              <div className="text-xs text-[#7a4727] font-mono font-semibold mt-0.5">
                                Screen: {grade.screenSize} ({grade.screenMm})
                              </div>
                            </div>

                            <p className="text-xs text-[#574c43] leading-relaxed line-clamp-3">
                              {grade.beanDescription}
                            </p>

                            {/* Flavor notes */}
                            <div className="pt-2">
                              <div className="text-[10px] uppercase font-mono tracking-wider text-[#7d7065] font-semibold mb-1.5">
                                Sensory Descriptors
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

                          <div className="relative z-10 pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs">
                            <span className="text-[#7d7065] font-mono">60kg GrainPro</span>
                            <span className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors">
                              <span>Select Spec</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Grade Full Technical Deep-Dive Panel */}
                <div className="p-8 rounded-3xl bg-white border border-[#d8c2b0] shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#b57a44]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded bg-[#23150c] text-white font-mono font-bold text-xs">
                          GRADE {selectedGrade.code} OFFICIAL EXPORT SPECIFICATION
                        </span>
                        <span className="text-xs font-semibold text-[#7a4727] font-mono">
                          Harvest Crop 2026/2027
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23150c]">
                        {selectedGrade.name} Technical Dossier
                      </h3>

                      <p className="text-sm text-[#574c43] leading-relaxed">
                        {selectedGrade.beanDescription}
                      </p>

                      {/* Technical Parameter Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                        <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Moisture Spec</span>
                          <span className="font-bold text-[#23150c] text-sm">10.0% – 11.5% Max</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Screen Size</span>
                          <span className="font-bold text-[#23150c] text-sm">{selectedGrade.screenMm}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Defect Threshold</span>
                          <span className="font-bold text-[#23150c] text-sm">0 Primary / &lt;5 Sec.</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-[10px] uppercase font-mono">Container Load</span>
                          <span className="font-bold text-[#23150c] text-sm">320 Bags / 19.2 MT</span>
                        </div>
                      </div>

                      {/* Cup Flavor Architecture */}
                      <div className="p-4 rounded-xl bg-[#f4ece4]/50 border border-[#d8c2b0] space-y-2 text-xs">
                        <div className="font-mono font-bold text-[#23150c] text-xs uppercase">
                          Sensory Profile &amp; Extraction Performance
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <span className="text-[#7d7065] block text-[10px]">Aroma:</span>
                            <span className="font-medium text-[#23150c]">{selectedGrade.cupProfile.aroma}</span>
                          </div>
                          <div>
                            <span className="text-[#7d7065] block text-[10px]">Acidity:</span>
                            <span className="font-medium text-[#23150c]">{selectedGrade.cupProfile.acidity}</span>
                          </div>
                          <div>
                            <span className="text-[#7d7065] block text-[10px]">Body &amp; Mouthfeel:</span>
                            <span className="font-medium text-[#23150c]">{selectedGrade.cupProfile.body}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Direct Sample & Contract Action Card */}
                    <div className="lg:col-span-4 bg-[#fbf9f6] p-6 rounded-2xl border border-[#ece3db] text-center space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-[#7a4727]/10 border border-[#7a4727]/30 text-[#7a4727] flex items-center justify-center mx-auto">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#7a4727] uppercase font-mono block">
                          Contract Allocation
                        </span>
                        <h4 className="text-base font-bold text-[#23150c] mt-1">
                          Book Grade {selectedGrade.code} Shipments
                        </h4>
                        <p className="text-xs text-[#574c43] mt-1">
                          FOB Mombasa or CIF destination port with pre-shipment offer sample validation.
                        </p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <button
                          onClick={() => setSampleModalOpen(true)}
                          className="w-full py-3 px-4 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Request PSS Sample (300g)</span>
                        </button>

                        <a
                          href="#contact"
                          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#f4ece4] border border-[#d8c2b0] text-[#23150c] text-xs font-bold transition-all inline-block"
                        >
                          Lock Container Allocation
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: QUALITY CONTROL, CUPPING LAB & MOISTURE TESTING */}
            {activeTab === 'qc' && (
              <motion.div
                key="tab-qc"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-16"
              >
                {/* Intro Split with Real Cupping Lab Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-lg group">
                    <div className="relative h-[380px] sm:h-[440px] w-full">
                      <Image
                        src="/images/what-we-do/cupping-lab-qc.jpg"
                        alt="Nairobi Specialty Coffee Cupping Laboratory and Certified Q-Graders"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-[#23150c]">
                        <span>NAIROBI EXPORT CUPPING LABORATORY</span>
                        <span className="text-[#7a4727] bg-[#f4ece4] px-2 py-0.5 rounded border border-[#d8c2b0]">
                          SCAA PROTOCOL VERIFIED
                        </span>
                      </div>
                      <p className="text-[#574c43] text-[11px] mt-1">
                        Licensed Kenyan Q-graders conducting blind sensory scoring, moisture testing, and aroma assessment on offer and pre-shipment lots.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#7a4727] block font-mono">
                      Certified SCAA Sensory Protocol
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Laboratory Quality Control &amp; <span className="text-[#7a4727]">Chemical Analysis</span>
                    </h2>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      International roasters cannot afford cup fading, sour ferment defects, or container moisture mold. Rovil operates an independent quality verification protocol in Nairobi adhering to strict Specialty Coffee Association (SCAA) criteria.
                    </p>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      Every single contract lot is evaluated across 10 sensory attributes: Fragrance/Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup, Sweetness, and Overall score.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="flex items-center gap-2 text-[#7a4727] font-bold text-xs font-mono">
                          <Thermometer className="w-4 h-4" />
                          <span>Water Activity (aW)</span>
                        </div>
                        <div className="text-lg font-extrabold text-[#23150c] mt-1">&lt; 0.60 Target</div>
                        <p className="text-[11px] text-[#574c43] mt-0.5">
                          Inhibits fungal growth and lipid degradation during tropical ocean transport.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="flex items-center gap-2 text-[#7a4727] font-bold text-xs font-mono">
                          <Scale className="w-4 h-4" />
                          <span>Defect Score</span>
                        </div>
                        <div className="text-lg font-extrabold text-[#23150c] mt-1">Grade 1 Export</div>
                        <p className="text-[11px] text-[#574c43] mt-0.5">
                          0 full primary defects and maximum 5 secondary defects per 300g sample.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Laboratory Quality Pillars */}
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#7a4727] font-semibold">
                      Scientific Verification
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#23150c] mt-1">
                      Our 4-Stage Quality Checkpoints
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-sm font-mono">
                        01
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Washing Station Parchment Analysis</h4>
                      <p className="text-xs text-[#574c43] leading-relaxed">
                        Testing parchment moisture on raised drying tables prior to central dry mill dispatch. Rejection of lots over 11.8% moisture.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#7a4727] text-white flex items-center justify-center font-bold text-sm font-mono">
                        02
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Milling &amp; Optical Sorting</h4>
                      <p className="text-xs text-[#574c43] leading-relaxed">
                        Hulling and mechanical vibration screen separation. Laser optical sorting removes discolored beans, insect pinholes, and foreign matter.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#b57a44] text-white flex items-center justify-center font-bold text-sm font-mono">
                        03
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Blind Table Cupping</h4>
                      <p className="text-xs text-[#574c43] leading-relaxed">
                        Standardized 8.25g coffee to 150ml water (93°C). Roasted 8–24 hours prior on Probat sample roasters to Agtron 58–63 ground color.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#3e2211] text-white flex items-center justify-center font-bold text-sm font-mono">
                        04
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Pre-Shipment Sample (PSS) Signoff</h4>
                      <p className="text-xs text-[#574c43] leading-relaxed">
                        Drawn directly from sealed GrainPro export bags at the port warehouse. Dispatched to the buyer’s roasting lab via DHL air courier for approval.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: KENYAN TEAS (PURPLE TEA & COMMERCIAL CTC) */}
            {activeTab === 'tea' && (
              <motion.div
                key="tab-tea"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-16"
              >
                {/* Intro Split with Authentic Tea Presentation Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#7a4727] block font-mono">
                      Highland Terroir &amp; Specialty Cultivars
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Commercial CTC Black Tea &amp; <span className="text-[#7a4727]">Rare Purple Tea</span>
                    </h2>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      Kenya is the world’s leading exporter of Black CTC tea, renowned across the United Kingdom, Europe, and the Middle East for bold malty briskness, deep copper liquor, and rapid color extraction for teabag packaging.
                    </p>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      In addition, Rovil exports Kenya’s exclusive high-altitude <strong>Purple Tea (TRFK 306)</strong>. Grown above 2,100 meters, this natural botanical cultivar produces intense anthocyanins, delivering a delicate floral berry cup with exceptional antioxidant value for wellness brands.
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">CTC Primary Grades</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">BP1, PF1, PD, D1</div>
                        <div className="text-[11px] text-[#574c43]">High commercial extraction &amp; briskness</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">Purple Tea (TRFK 306)</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">1.5%–2.5% Anthocyanins</div>
                        <div className="text-[11px] text-[#574c43]">Antioxidant-dense specialty leaf</div>
                      </div>
                    </div>
                  </div>

                  {/* Photo Card with Actual Tea Varieties */}
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-lg group">
                    <div className="relative h-[380px] sm:h-[420px] w-full">
                      <Image
                        src="/images/what-we-do/kenyan-purple-ctc-teas.jpg"
                        alt="Kenyan Purple Tea TRFK 306 and Kenyan Black CTC Tea Infusion"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-[#23150c]">
                        <span>KENYAN TEA SENSORY TRAY EVALUATION</span>
                        <span className="text-[#7a4727] bg-[#f4ece4] px-2 py-0.5 rounded border border-[#d8c2b0]">
                          DIRECT ESTATE SUPPLY
                        </span>
                      </div>
                      <p className="text-[#574c43] text-[11px] mt-1">
                        Left: High-altitude Purple Tea (TRFK 306) with vibrant violet infusion. Right: Brisk Black CTC (BP1) with deep amber-red liquor.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Tea Variety Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7a4727]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <span className="absolute top-3 right-4 font-mono font-bold text-5xl opacity-[0.06] select-none pointer-events-none text-[#23150c]">
                          {ghostNum}
                        </span>

                        <div className="relative z-10 space-y-4">
                          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#7a4727]/10 border border-[#7a4727]/20 text-[#7a4727] group-hover:scale-110 transition-transform duration-300">
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

                          <div className="p-3 rounded-lg bg-[#fbf9f6] border border-[#ece3db] space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-[#7d7065]">Liquor Tone:</span>
                              <span className="font-bold text-[#23150c]">{tea.liquorColor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#7d7065]">Packaging:</span>
                              <span className="font-bold text-[#23150c] truncate max-w-[120px]">{tea.packaging}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#7d7065]">Key Benefit:</span>
                              <span className="font-bold text-[#7a4727] truncate max-w-[130px]">{tea.keyBenefit}</span>
                            </div>
                          </div>
                        </div>

                        <div className="relative z-10 pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs">
                          <span className="text-[#7d7065] font-mono truncate">{tea.originDetails}</span>
                          <button
                            onClick={() => setSampleModalOpen(true)}
                            className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Request Sample</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* TAB 4: LOGISTICS, PACKAGING & EUDR COMPLIANCE */}
            {activeTab === 'logistics' && (
              <motion.div
                key="tab-logistics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-16"
              >
                {/* Intro Split with Warehouse Stacks Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-lg group">
                    <div className="relative h-[380px] sm:h-[440px] w-full">
                      <Image
                        src="/images/what-we-do/grainpro-export-bags.jpg"
                        alt="Kenyan Coffee GrainPro Hermetic Sisal Bags Ready for Ocean Shipping"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md text-xs">
                      <div className="flex items-center justify-between font-mono font-bold text-[#23150c]">
                        <span>60KG SISAL + GRAINPRO HERMETIC LINERS</span>
                        <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          SEALED EXPORT GRADE
                        </span>
                      </div>
                      <p className="text-[#574c43] text-[11px] mt-1">
                        Traditional natural sisal export sacks with multi-layer GrainPro Ultra liners sealing beans against maritime humidity and condensation.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#7a4727] block font-mono">
                      Maritime Shipping &amp; Regulatory Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Mombasa Port Operations, Packaging &amp; <span className="text-[#7a4727]">EUDR Compliance</span>
                    </h2>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      International freight can be compromised by poor maritime packing or incomplete regulatory paperwork. Rovil safeguards every metric ton with hermetic moisture barriers, verified container loading, and full compliance with European Union Deforestation Regulation (EUDR).
                    </p>
                    <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                      Our export operations are situated directly within the Nairobi inland freight corridor with dedicated staging facilities at the Port of Mombasa (Kilindini Harbour), enabling swift ocean container dispatch across global shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd).
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">Container Load (FCL)</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">320 Bags / 19.2 MT</div>
                        <div className="text-[11px] text-[#574c43]">20ft ocean freight standard</div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-[#ece3db] shadow-2xs">
                        <div className="text-[11px] font-mono text-[#7d7065] uppercase">Lead Time to Mombasa</div>
                        <div className="text-base font-bold text-[#23150c] mt-0.5">7 to 10 Days</div>
                        <div className="text-[11px] text-[#574c43]">From contract signoff to port staging</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Compliance & Logistics Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">EUDR Geolocation Mapping</h4>
                    <p className="text-xs text-[#574c43] leading-relaxed">
                      Full GPS polygon coordinates for participating smallholder cooperatives. Verified deforestation-free under EU Regulation 2023/1115.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">KEPHIS Phytosanitary Clearance</h4>
                    <p className="text-xs text-[#574c43] leading-relaxed">
                      Official inspection and phytosanitary certificates issued by the Kenya Plant Health Inspectorate Service ensuring zero pests and zero agricultural contaminants.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">GrainPro Ultra Hermetic Liners</h4>
                    <p className="text-xs text-[#574c43] leading-relaxed">
                      Oxygen-barrier multi-layer liners inserted into heavy 60kg sisal bags. Preserves origin moisture, aromatic oils, and protects against humidity.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <Ship className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">Incoterms 2020: FOB / CIF</h4>
                    <p className="text-xs text-[#574c43] leading-relaxed">
                      Flexible commercial terms: FOB Mombasa Port (Kilindini) or CIF to Hamburg, Rotterdam, Felixstowe, New York, Kobe, and Jebel Ali.
                    </p>
                  </div>
                </div>

                {/* Complete Export Documentation Checklist for Buyers */}
                <div className="p-8 rounded-3xl bg-white border border-[#d8c2b0] shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#7a4727] font-semibold">
                        Standard Documentation Pack
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#23150c]">
                        Documents Provided with Every Commercial Export
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f4ece4] text-[#3e2211] font-mono text-xs font-bold border border-[#d8c2b0]">
                      Full Legal Clean Set
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Original Ocean Bill of Lading (B/L)</span>
                        <span className="text-[#574c43]">3/3 clean on-board Ocean Bills of Lading</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">ICO Certificate of Origin</span>
                        <span className="text-[#574c43]">International Coffee Organization certified origin</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">KEPHIS Phytosanitary Certificate</span>
                        <span className="text-[#574c43]">Government plant health clearance</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">EUDR Geolocation Data File</span>
                        <span className="text-[#574c43]">GeoJSON/CSV farm polygon coordinates</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Commercial Invoice &amp; Packing List</span>
                        <span className="text-[#574c43]">Itemized weights, bag marks, lot numbers</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Official Lab Cupping &amp; Moisture Report</span>
                        <span className="text-[#574c43]">SCAA sensory score &amp; moisture certification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* 5. Pre-Shipment Sample (PSS) Direct Action Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#23150c] text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#b57a44]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#7a4727]/30 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-3.5 py-1 text-[#f4ece4] text-xs font-semibold uppercase font-mono">
                <Clock className="w-3.5 h-3.5 text-[#b57a44]" />
                Fast International Air Dispatch • 72-Hour Courier
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Evaluate Kenya Arabica &amp; Specialty Tea on Your Own Cupping Table
              </h3>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                We supply green coffee offer samples (300g to 500g) and premium tea tasting samples to licensed roasters, commodity traders, and commercial packers worldwide. Samples are dispatched directly from our Nairobi QC lab via DHL Express with full moisture and cupping documentation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#b57a44] hover:bg-[#d89f68] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Pre-Shipment Sample (PSS)</span>
                </button>

                <Link
                  href="/#contact"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Inquire Container Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 6. Pre-Shipment Sample (PSS) Modal Drawer */}
      <AnimatePresence>
        {sampleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#d8c2b0] relative overflow-hidden"
            >
              <button
                onClick={() => setSampleModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f4ece4] text-[#23150c] flex items-center justify-center font-bold text-sm hover:bg-[#ece3db] transition-colors cursor-pointer"
              >
                ✕
              </button>

              {sampleSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#23150c]">Sample Request Dispatched</h4>
                  <p className="text-xs text-[#574c43] max-w-md mx-auto">
                    Thank you. Our Nairobi quality control team has received your Pre-Shipment Sample (PSS) request. A confirmation and DHL tracking dispatch number will be issued to your corporate email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSampleSubmitted(false);
                      setSampleModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#23150c] text-white text-xs font-bold"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSampleSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#7a4727] font-semibold uppercase">
                      Commercial Buyer Verification
                    </span>
                    <h4 className="text-xl font-bold text-[#23150c]">
                      Order Pre-Shipment Sample (PSS)
                    </h4>
                    <p className="text-xs text-[#574c43]">
                      Please specify your desired grade, company details, and international destination for DHL courier dispatch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Company / Roastery Name</label>
                      <input
                        required
                        placeholder="e.g. Nordic Roast Labs"
                        className="w-full px-3 py-2 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Corporate Email</label>
                      <input
                        required
                        type="email"
                        placeholder="buyer@nordicroast.com"
                        className="w-full px-3 py-2 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Commodity &amp; Grade</label>
                      <select className="w-full px-3 py-2 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none bg-white">
                        <option>Kenyan Arabica Grade AA (Screen 17/18)</option>
                        <option>Kenyan Arabica Grade AB (Screen 15/16)</option>
                        <option>Kenyan Arabica Grade PB (Peaberry)</option>
                        <option>Kenyan Arabica Grade C (Blend Base)</option>
                        <option>Specialty Purple Tea (TRFK 306)</option>
                        <option>Black CTC Tea (BP1 / PF1)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Destination Country / Port</label>
                      <input
                        required
                        placeholder="e.g. Hamburg, Germany"
                        className="w-full px-3 py-2 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-[#23150c] mb-1">DHL Courier Shipping Address</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Street, City, Postal Code, Country & Phone for courier delivery"
                      className="w-full px-3 py-2 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#7d7065]">
                      Air courier dispatch within 72h
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      Confirm Sample Request
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Corporate Footer */}
      <Footer />
    </div>
  );
}
