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
  Layers,
  Scale,
  Ship,
  FileCheck2,
  Clock,
  Thermometer,
  Microscope,
  Send,
  Package,
} from 'lucide-react';
import { coffeeGrades } from '@/data/coffeeGrades';
import { teaVarieties } from '@/data/teaVarieties';
import {
  SlideUp,
  FadeIn,
  AnimatePresence,
  motion,
} from '@/components/motion/MotionWrappers';

export default function WhatWeDoPage() {
  const [activeTab, setActiveTab] = useState<'branded' | 'coffee' | 'qc' | 'tea' | 'logistics'>('branded');
  const [selectedGradeId, setSelectedGradeId] = useState<string>('grade-aa');
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [sampleSubmitted, setSampleSubmitted] = useState(false);

  const selectedGrade = coffeeGrades.find((g) => g.id === selectedGradeId) || coffeeGrades[0];

  return (
    <div className="min-h-screen bg-white text-[#1f1610] flex flex-col font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#180f08] text-white pt-16 pb-20">
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#180f08]/70 via-[#180f08]/50 to-[#180f08]/95 pointer-events-none z-1" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-4 py-1.5 text-[#f4ece4] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#b57a44] animate-pulse" />
              ROVIL Branded Retail &amp; Direct Commercial Exporter • Nairobi, Kenya
            </span>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              ROVIL Packaged Brand &amp; Bulk Supply Chain
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-white/85 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
              From our consumer-packaged ROVIL roasted coffee bags and specialty tea canisters for retail &amp; cafe distribution, to 20ft/40ft container export allocations with certified screen sizes and EUDR compliance.
            </p>
          </SlideUp>

          {/* Quick Indicator Badges */}
          <SlideUp delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                ROVIL Branded 250g / 500g / 1kg Pouches
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Luxury Purple Tea Tins (100g)
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Bulk Green Coffee (320 Bags FCL)
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Port of Mombasa (FOB / CIF)
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* 3. Interactive Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#ece3db] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 gap-3 no-scrollbar">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('branded')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'branded'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>1. ROVIL Packaged Retail</span>
              </button>

              <button
                onClick={() => setActiveTab('coffee')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'coffee'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>2. Bulk Green Arabica</span>
              </button>

              <button
                onClick={() => setActiveTab('qc')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'qc'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Microscope className="w-4 h-4" />
                <span>3. Lab QC &amp; Cupping</span>
              </button>

              <button
                onClick={() => setActiveTab('tea')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'tea'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>4. Kenyan CTC &amp; Purple Teas</span>
              </button>

              <button
                onClick={() => setActiveTab('logistics')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'logistics'
                    ? 'bg-[#23150c] text-white shadow-sm'
                    : 'text-[#574c43] hover:text-[#23150c] hover:bg-[#f4ece4]'
                }`}
              >
                <Ship className="w-4 h-4" />
                <span>5. Logistics &amp; EUDR</span>
              </button>
            </div>

            <button
              onClick={() => setSampleModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#7a4727] hover:bg-[#23150c] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Request Pre-Shipment Sample</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Tabbed Content Area */}
      <main className="flex-1 py-16 lg:py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 0: ROVIL PACKAGED CONSUMER & RETAIL PRODUCTS */}
            {activeTab === 'branded' && (
              <motion.div
                key="tab-branded"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Intro Headline */}
                <div className="max-w-3xl space-y-4">
                  <span className="text-sm font-semibold text-[#7a4727] block">
                    Artisanal Roasting &amp; Specialty Packaging
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                    The ROVIL Packaged <span className="text-[#7a4727]">Retail &amp; Cafe Collection</span>
                  </h2>
                  <p className="text-[#574c43] text-base leading-relaxed">
                    In addition to raw green coffee container exports, Rovil packages its own flagship retail line for local Kenyan consumers, specialty cafes, grocery distributors, and international direct-import buyers. Every pouch and tin is crafted to the highest quality standards.
                  </p>
                </div>

                {/* 3 Large Showcase Cards with Photos */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Card 1: ROVIL Roasted Coffee Pouch */}
                  <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="relative h-80 w-full bg-[#fbf9f6] overflow-hidden">
                      <Image
                        src="/images/branded/rovil-coffee-pouch.jpg"
                        alt="ROVIL 100% Kenyan Arabica Grade AA Roasted Coffee Bag"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-3 py-1 rounded-full">
                            250g / 500g / 1kg Pouches
                          </span>
                          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded">
                            Grade AA Roast
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                          ROVIL Single Origin Roasted Arabica
                        </h3>
                        <p className="text-sm text-[#574c43] leading-relaxed">
                          100% Mount Kenya Grade AA beans roasted to medium profile to highlight signature blackcurrant, citrus fruit acidity, and sweet caramel finish. Packed with one-way degassing valves.
                        </p>
                        
                        <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece3db] text-xs text-[#574c43] space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Available Formats:</span>
                            <span className="font-bold text-[#23150c]">Whole Bean or Medium Ground</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Shelf Life:</span>
                            <span className="font-bold text-[#23150c]">12 Months (Nitrogen Sealed)</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between">
                        <span className="text-xs text-[#7d7065]">Retail &amp; Wholesale Carton</span>
                        <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1 text-sm">
                          <span>Order Retail Packs</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: ROVIL Purple Tea Tin */}
                  <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="relative h-80 w-full bg-[#fbf9f6] overflow-hidden">
                      <Image
                        src="/images/branded/rovil-tea-canister.jpg"
                        alt="ROVIL Kenyan Highland Purple Tea Luxury Tin Canister"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-3 py-1 rounded-full">
                            100g Airtight Luxury Canister
                          </span>
                          <span className="text-xs text-purple-800 font-semibold bg-purple-50 px-2.5 py-0.5 rounded">
                            Rare Botanical
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                          ROVIL Highland Purple Tea
                        </h3>
                        <p className="text-sm text-[#574c43] leading-relaxed">
                          Artisanal TRFK 306 loose-leaf purple tea grown above 2,100 meters. Packed in luxury matte canisters with airtight double lids for maximum anthocyanin and antioxidant preservation.
                        </p>

                        <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece3db] text-xs text-[#574c43] space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Liquor Tone:</span>
                            <span className="font-bold text-[#23150c]">Natural Violet / Lavender</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Caffeine Level:</span>
                            <span className="font-bold text-[#23150c]">Low Caffeine &amp; High Antioxidants</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between">
                        <span className="text-xs text-[#7d7065]">Gift &amp; Specialty Retail</span>
                        <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1 text-sm">
                          <span>Order Tea Tins</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: ROVIL Retail Cups & Cafe Experience */}
                  <div className="group rounded-3xl overflow-hidden border border-[#d8c2b0] bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                    <div className="relative h-80 w-full bg-[#fbf9f6] overflow-hidden">
                      <Image
                        src="/images/branded/rovil-retail-cups.jpg"
                        alt="ROVIL Branded Cups and Fresh Roasted Cafe Experience"
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-7 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#7a4727] bg-[#f4ece4] px-3 py-1 rounded-full">
                            Consumer &amp; Cafe Cups
                          </span>
                          <span className="text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-0.5 rounded">
                            Local &amp; Corporate
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#23150c] group-hover:text-[#7a4727] transition-colors">
                          ROVIL Fresh Brew &amp; Cafe Service
                        </h3>
                        <p className="text-sm text-[#574c43] leading-relaxed">
                          We supply coffee shops, restaurants, corporate offices, and local events with branded eco-friendly ROVIL takeaway cups, brewing equipment support, and weekly fresh roasted bean deliveries.
                        </p>

                        <div className="p-3 bg-[#fbf9f6] rounded-xl border border-[#ece3db] text-xs text-[#574c43] space-y-1 mt-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Cup Sizes:</span>
                            <span className="font-bold text-[#23150c]">8oz, 12oz &amp; 16oz Eco Cups</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium text-[#7d7065]">Distribution:</span>
                            <span className="font-bold text-[#23150c]">Nairobi Delivery &amp; Global Shipping</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#ece3db] flex items-center justify-between">
                        <span className="text-xs text-[#7d7065]">Wholesale &amp; Retail Supply</span>
                        <a href="#contact" className="font-bold text-[#7a4727] hover:text-[#23150c] flex items-center gap-1 text-sm">
                          <span>Hospitality Inquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* TAB 1: COFFEE GRADES & PHYSICAL SCREEN SEPARATION */}
            {activeTab === 'coffee' && (
              <motion.div
                key="tab-coffee"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {/* Intro Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-sm font-semibold text-[#7a4727] block">
                      Physical Screen Calibration
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Mechanical Screen Sizing &amp; <span className="text-[#7a4727]">Gravity Density Grading</span>
                    </h2>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      In Kenya, green coffee is classified mechanically using perforated brass sieves. Larger screen sizes (AA = screen 17/18) correlate with bean maturity, high elevation, dense aromatic oils, and superior thermal conductivity during roasting.
                    </p>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      Every lot dispatched by Rovil undergoes density destoning, optical color sorting, and triple manual hand-sorting on conveyor belts to eliminate unripe, broca-damaged, or discolored beans before bagging.
                    </p>

                    {/* Checkpoints */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">Screen Accuracy</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">&gt; 90% Above Sieve</div>
                        <div className="text-xs text-[#574c43] mt-0.5">Exceeds national AFA standards</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">Density Metric</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">&gt; 710 g / Litre</div>
                        <div className="text-xs text-[#574c43] mt-0.5">High thermal retention for roasters</div>
                      </div>
                    </div>
                  </div>

                  {/* Photo Card */}
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-md group">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md">
                      <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                        <span>Kenya AA &amp; AB Seed Tray Analysis</span>
                        <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          10.8% Moisture Verified
                        </span>
                      </div>
                      <p className="text-[#574c43] text-xs mt-1">
                        Sieve calibration showing Grade AA (Screen 18 / 7.14mm) and Grade AB (Screen 16 / 6.35mm) with digital moisture measurement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Grade Cards Grid */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-sm font-semibold text-[#7a4727]">
                        Commercial Export Catalogue
                      </span>
                      <h3 className="text-2xl font-extrabold text-[#23150c]">
                        Select a Grade for Technical Specifications
                      </h3>
                    </div>
                    <span className="text-xs text-[#7d7065]">
                      Click any card to load complete specifications
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coffeeGrades.slice(0, 4).map((grade) => {
                      const isSelected = selectedGradeId === grade.id;

                      return (
                        <motion.div
                          key={grade.id}
                          onClick={() => setSelectedGradeId(grade.id)}
                          className={`group relative flex flex-col justify-between p-6 rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'border-[#7a4727] ring-2 ring-[#7a4727]/30 shadow-md'
                              : 'border-[#ece3db] hover:border-[#7a4727]/50 shadow-xs'
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
                              <h4 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors">
                                {grade.name}
                              </h4>
                              <div className="text-xs text-[#7a4727] font-medium mt-0.5">
                                Screen: {grade.screenSize} ({grade.screenMm})
                              </div>
                            </div>

                            <p className="text-sm text-[#574c43] leading-relaxed line-clamp-3">
                              {grade.beanDescription}
                            </p>

                            <div className="pt-2">
                              <div className="text-xs font-semibold text-[#7d7065] mb-1.5">
                                Sensory Descriptors
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

                          <div className="pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-sm">
                            <span className="text-[#7d7065] font-medium">60kg GrainPro</span>
                            <span className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors">
                              <span>Select Spec</span>
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Grade Full Technical Deep-Dive Panel */}
                <div className="p-8 rounded-3xl bg-white border border-[#d8c2b0] shadow-sm relative overflow-hidden">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded bg-[#23150c] text-white font-semibold text-xs">
                          GRADE {selectedGrade.code} OFFICIAL EXPORT SPECIFICATION
                        </span>
                        <span className="text-sm font-semibold text-[#7a4727]">
                          Harvest Crop 2026/2027
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23150c]">
                        {selectedGrade.name} Technical Dossier
                      </h3>

                      <p className="text-base text-[#574c43] leading-relaxed">
                        {selectedGrade.beanDescription}
                      </p>

                      {/* Technical Parameter Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-sm">
                        <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Moisture Spec</span>
                          <span className="font-bold text-[#23150c]">10.0% – 11.5% Max</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Screen Size</span>
                          <span className="font-bold text-[#23150c]">{selectedGrade.screenMm}</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Defect Threshold</span>
                          <span className="font-bold text-[#23150c]">0 Primary / &lt;5 Sec.</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                          <span className="text-[#7d7065] block text-xs font-semibold mb-0.5">Container Load</span>
                          <span className="font-bold text-[#23150c]">320 Bags / 19.2 MT</span>
                        </div>
                      </div>

                      {/* Cup Flavor Architecture */}
                      <div className="p-4 rounded-xl bg-[#f4ece4]/50 border border-[#d8c2b0] space-y-2 text-sm">
                        <div className="font-bold text-[#23150c]">
                          Sensory Profile &amp; Extraction Performance
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-[#7d7065] block">Aroma:</span>
                            <span className="font-medium text-[#23150c]">{selectedGrade.cupProfile.aroma}</span>
                          </div>
                          <div>
                            <span className="text-[#7d7065] block">Acidity:</span>
                            <span className="font-medium text-[#23150c]">{selectedGrade.cupProfile.acidity}</span>
                          </div>
                          <div>
                            <span className="text-[#7d7065] block">Body &amp; Mouthfeel:</span>
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
                        <span className="text-xs font-semibold text-[#7a4727] uppercase block">
                          Contract Allocation
                        </span>
                        <h4 className="text-lg font-bold text-[#23150c] mt-1">
                          Book Grade {selectedGrade.code} Shipments
                        </h4>
                        <p className="text-xs text-[#574c43] mt-1">
                          FOB Mombasa or CIF destination port with pre-shipment offer sample validation.
                        </p>
                      </div>

                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={() => setSampleModalOpen(true)}
                          className="w-full py-3 px-4 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white text-sm font-semibold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Request Sample (300g)</span>
                        </button>

                        <a
                          href="#contact"
                          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#f4ece4] border border-[#d8c2b0] text-[#23150c] text-sm font-semibold transition-all inline-block"
                        >
                          Lock Container Allocation
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: QUALITY CONTROL & CUPPING LAB */}
            {activeTab === 'qc' && (
              <motion.div
                key="tab-qc"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-md group">
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
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md">
                      <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                        <span>Nairobi Export Cupping Laboratory</span>
                        <span className="text-[#7a4727] bg-[#f4ece4] px-2.5 py-0.5 rounded-md text-xs font-semibold">
                          SCA Protocols
                        </span>
                      </div>
                      <p className="text-[#574c43] text-xs mt-1">
                        Licensed Kenyan Q-graders conducting blind sensory scoring, moisture testing, and aroma assessment on offer and pre-shipment lots.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-sm font-semibold text-[#7a4727] block">
                      Certified SCA Sensory Protocol
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Laboratory Quality Control &amp; <span className="text-[#7a4727]">Chemical Analysis</span>
                    </h2>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      International roasters cannot afford cup fading, sour ferment defects, or container moisture mold. Rovil operates an independent quality verification protocol in Nairobi adhering to strict Specialty Coffee Association (SCA) criteria.
                    </p>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      Every single contract lot is evaluated across 10 sensory attributes: Fragrance/Aroma, Flavor, Aftertaste, Acidity, Body, Balance, Uniformity, Clean Cup, Sweetness, and Overall score.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="flex items-center gap-2 text-[#7a4727] font-semibold text-sm">
                          <Thermometer className="w-4 h-4" />
                          <span>Water Activity (aW)</span>
                        </div>
                        <div className="text-xl font-bold text-[#23150c] mt-1">&lt; 0.60 Target</div>
                        <p className="text-xs text-[#574c43] mt-1">
                          Inhibits fungal growth and lipid degradation during tropical ocean transport.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="flex items-center gap-2 text-[#7a4727] font-semibold text-sm">
                          <Scale className="w-4 h-4" />
                          <span>Defect Score</span>
                        </div>
                        <div className="text-xl font-bold text-[#23150c] mt-1">Grade 1 Export</div>
                        <p className="text-xs text-[#574c43] mt-1">
                          0 full primary defects and maximum 5 secondary defects per 300g sample.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Laboratory Quality Pillars */}
                <div className="space-y-6">
                  <div className="text-center max-w-xl mx-auto">
                    <span className="text-sm font-semibold text-[#7a4727]">
                      Scientific Verification
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23150c] mt-1">
                      Our 4-Stage Quality Checkpoints
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-sm">
                        01
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Washing Station Parchment Analysis</h4>
                      <p className="text-sm text-[#574c43] leading-relaxed">
                        Testing parchment moisture on raised drying tables prior to central dry mill dispatch. Rejection of lots over 11.8% moisture.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#7a4727] text-white flex items-center justify-center font-bold text-sm">
                        02
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Milling &amp; Optical Sorting</h4>
                      <p className="text-sm text-[#574c43] leading-relaxed">
                        Hulling and mechanical vibration screen separation. Laser optical sorting removes discolored beans, insect pinholes, and foreign matter.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#b57a44] text-white flex items-center justify-center font-bold text-sm">
                        03
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Blind Table Cupping</h4>
                      <p className="text-sm text-[#574c43] leading-relaxed">
                        Standardized 8.25g coffee to 150ml water (93°C). Roasted 8–24 hours prior on Probat sample roasters to Agtron 58–63 ground color.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                      <div className="w-10 h-10 rounded-xl bg-[#3e2211] text-white flex items-center justify-center font-bold text-sm">
                        04
                      </div>
                      <h4 className="font-bold text-[#23150c] text-base">Pre-Shipment Sample (PSS) Signoff</h4>
                      <p className="text-sm text-[#574c43] leading-relaxed">
                        Drawn directly from sealed GrainPro export bags at the port warehouse. Dispatched to the buyer’s roasting lab via DHL air courier for approval.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: KENYAN TEAS */}
            {activeTab === 'tea' && (
              <motion.div
                key="tab-tea"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-sm font-semibold text-[#7a4727] block">
                      Highland Terroir &amp; Specialty Cultivars
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Commercial CTC Black Tea &amp; <span className="text-[#7a4727]">Rare Purple Tea</span>
                    </h2>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      Kenya is the world’s leading exporter of Black CTC tea, renowned across the United Kingdom, Europe, and the Middle East for bold malty briskness, deep copper liquor, and rapid color extraction for teabag packaging.
                    </p>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      In addition, Rovil exports Kenya’s exclusive high-altitude <strong>Purple Tea (TRFK 306)</strong>. Grown above 2,100 meters, this natural botanical cultivar produces intense anthocyanins, delivering a delicate floral berry cup with exceptional antioxidant value for wellness brands.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">CTC Primary Grades</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">BP1, PF1, PD, D1</div>
                        <div className="text-xs text-[#574c43] mt-0.5">High commercial extraction &amp; briskness</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">Purple Tea (TRFK 306)</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">1.5%–2.5% Anthocyanins</div>
                        <div className="text-xs text-[#574c43] mt-0.5">Antioxidant-dense specialty leaf</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-md group">
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
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md">
                      <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                        <span>Kenyan Tea Sensory Evaluation</span>
                        <span className="text-[#7a4727] bg-[#f4ece4] px-2.5 py-0.5 rounded-md text-xs font-semibold">
                          Direct Estate Supply
                        </span>
                      </div>
                      <p className="text-[#574c43] text-xs mt-1">
                        Left: High-altitude Purple Tea (TRFK 306) with vibrant violet infusion. Right: Brisk Black CTC (BP1) with deep amber-red liquor.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4 Tea Variety Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teaVarieties.map((tea) => (
                    <motion.div
                      key={tea.id}
                      className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[#ece3db] bg-white overflow-hidden transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div className="space-y-4">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#7a4727]/10 border border-[#7a4727]/20 text-[#7a4727]">
                          <Leaf className="w-6 h-6" />
                        </div>

                        <div>
                          <span className="text-xs font-semibold text-[#7a4727] block">
                            {tea.subtitle}
                          </span>
                          <h3 className="font-bold text-[#23150c] text-lg group-hover:text-[#7a4727] transition-colors">
                            {tea.name}
                          </h3>
                        </div>

                        <p className="text-sm text-[#574c43] leading-relaxed line-clamp-3">
                          {tea.description}
                        </p>

                        <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#ece3db] space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#7d7065]">Liquor:</span>
                            <span className="font-bold text-[#23150c]">{tea.liquorColor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#7d7065]">Packaging:</span>
                            <span className="font-bold text-[#23150c] truncate max-w-[130px]">{tea.packaging}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#7d7065]">Key Benefit:</span>
                            <span className="font-bold text-[#7a4727] truncate max-w-[130px]">{tea.keyBenefit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 mt-6 border-t border-[#ece3db] flex items-center justify-between text-sm">
                        <span className="text-[#7d7065] truncate font-medium">{tea.originDetails}</span>
                        <button
                          onClick={() => setSampleModalOpen(true)}
                          className="font-bold text-[#7a4727] group-hover:text-[#23150c] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                        >
                          <span>Sample</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: LOGISTICS & EUDR COMPLIANCE */}
            {activeTab === 'logistics' && (
              <motion.div
                key="tab-logistics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#ece3db] shadow-md group">
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
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-md">
                      <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                        <span>60kg Sisal + GrainPro Hermetic Liners</span>
                        <span className="text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          Sealed Export Grade
                        </span>
                      </div>
                      <p className="text-[#574c43] text-xs mt-1">
                        Traditional natural sisal export sacks with multi-layer GrainPro Ultra liners sealing beans against maritime humidity and condensation.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-sm font-semibold text-[#7a4727] block">
                      Maritime Shipping &amp; Regulatory Transparency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] leading-tight">
                      Mombasa Port Operations, Packaging &amp; <span className="text-[#7a4727]">EUDR Compliance</span>
                    </h2>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      International freight can be compromised by poor maritime packing or incomplete regulatory paperwork. Rovil safeguards every metric ton with hermetic moisture barriers, verified container loading, and full compliance with European Union Deforestation Regulation (EUDR).
                    </p>
                    <p className="text-[#574c43] text-base leading-relaxed">
                      Our export operations are situated directly within the Nairobi inland freight corridor with dedicated staging facilities at the Port of Mombasa (Kilindini Harbour), enabling swift ocean container dispatch across global shipping lines (Maersk, MSC, CMA CGM, Hapag-Lloyd).
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">Container Load (FCL)</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">320 Bags / 19.2 MT</div>
                        <div className="text-xs text-[#574c43] mt-0.5">20ft ocean freight standard</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white border border-[#ece3db] shadow-xs">
                        <div className="text-xs text-[#7d7065] font-semibold">Lead Time to Mombasa</div>
                        <div className="text-lg font-bold text-[#23150c] mt-0.5">7 to 10 Days</div>
                        <div className="text-xs text-[#574c43] mt-0.5">From contract signoff to port staging</div>
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
                    <p className="text-sm text-[#574c43] leading-relaxed">
                      Full GPS polygon coordinates for participating smallholder cooperatives. Verified deforestation-free under EU Regulation 2023/1115.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">KEPHIS Phytosanitary Clearance</h4>
                    <p className="text-sm text-[#574c43] leading-relaxed">
                      Official inspection and phytosanitary certificates issued by the Kenya Plant Health Inspectorate Service ensuring zero pests and contaminants.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">GrainPro Ultra Hermetic Liners</h4>
                    <p className="text-sm text-[#574c43] leading-relaxed">
                      Oxygen-barrier multi-layer liners inserted into heavy 60kg sisal bags. Preserves origin moisture and protects against maritime humidity.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                      <Ship className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#23150c] text-base">Incoterms 2020: FOB / CIF</h4>
                    <p className="text-sm text-[#574c43] leading-relaxed">
                      Flexible commercial terms: FOB Mombasa Port (Kilindini) or CIF to Hamburg, Rotterdam, Felixstowe, New York, Kobe, and Jebel Ali.
                    </p>
                  </div>
                </div>

                {/* Complete Export Documentation Checklist for Buyers */}
                <div className="p-8 rounded-3xl bg-white border border-[#d8c2b0] shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-sm font-semibold text-[#7a4727]">
                        Standard Documentation Pack
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#23150c]">
                        Documents Provided with Every Commercial Export
                      </h3>
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-[#f4ece4] text-[#3e2211] text-xs font-bold border border-[#d8c2b0]">
                      Full Legal Clean Set
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Original Ocean Bill of Lading (B/L)</span>
                        <span className="text-xs text-[#574c43]">3/3 clean on-board Ocean Bills of Lading</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">ICO Certificate of Origin</span>
                        <span className="text-xs text-[#574c43]">International Coffee Organization certified origin</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">KEPHIS Phytosanitary Certificate</span>
                        <span className="text-xs text-[#574c43]">Government plant health clearance</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">EUDR Geolocation Data File</span>
                        <span className="text-xs text-[#574c43]">GeoJSON/CSV farm polygon coordinates</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Commercial Invoice &amp; Packing List</span>
                        <span className="text-xs text-[#574c43]">Itemized weights, bag marks, lot numbers</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#23150c] block">Official Lab Cupping &amp; Moisture Report</span>
                        <span className="text-xs text-[#574c43]">SCA sensory score &amp; moisture certification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* 5. Pre-Shipment Sample (PSS) Direct Action Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#23150c] text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-3.5 py-1 text-[#f4ece4] text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#b57a44]" />
                Fast International Air Dispatch • 72-Hour Courier
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Evaluate Kenya Arabica &amp; Specialty Tea on Your Own Cupping Table
              </h3>

              <p className="text-white/80 text-base leading-relaxed">
                We supply green coffee offer samples (300g to 500g) and premium tea tasting samples to licensed roasters, commodity traders, and commercial packers worldwide. Samples are dispatched directly from our Nairobi QC lab via DHL Express with full moisture and cupping documentation.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => setSampleModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-[#b57a44] hover:bg-[#d89f68] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Pre-Shipment Sample</span>
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
                  <p className="text-sm text-[#574c43] max-w-md mx-auto">
                    Thank you. Our Nairobi quality control team has received your Pre-Shipment Sample (PSS) request. A confirmation and DHL tracking dispatch number will be issued to your corporate email within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSampleSubmitted(false);
                      setSampleModalOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#23150c] text-white text-sm font-semibold"
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
                    <span className="text-xs text-[#7a4727] font-semibold uppercase">
                      Commercial Buyer Verification
                    </span>
                    <h4 className="text-xl font-bold text-[#23150c]">
                      Order Pre-Shipment Sample (PSS)
                    </h4>
                    <p className="text-sm text-[#574c43]">
                      Please specify your desired grade, company details, and international destination for DHL courier dispatch.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Company / Roastery Name</label>
                      <input
                        required
                        placeholder="e.g. Nordic Roast Labs"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Corporate Email</label>
                      <input
                        required
                        type="email"
                        placeholder="buyer@nordicroast.com"
                        className="w-full px-3 py-2.5 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <label className="block font-semibold text-[#23150c] mb-1">Commodity &amp; Grade</label>
                      <select className="w-full px-3 py-2.5 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none bg-white">
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
                        className="w-full px-3 py-2.5 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="text-sm">
                    <label className="block font-semibold text-[#23150c] mb-1">DHL Courier Shipping Address</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Street, City, Postal Code, Country & Phone for courier delivery"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ece3db] focus:border-[#7a4727] outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-[#7d7065]">
                      Air courier dispatch within 72h
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white font-semibold text-sm transition-colors cursor-pointer"
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
