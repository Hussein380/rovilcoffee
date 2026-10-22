'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Coffee,
  ShieldCheck,
  ArrowRight,
  Droplets,
  MapPin,
  Globe2,
  Trees,
  Compass,
  Check,
  ScanLine,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sun,
  Sparkles,
} from 'lucide-react';
import { farmStages } from '@/data/farmStages';
import {
  motion,
} from '@/components/motion/MotionWrappers';

interface FarmHeroSlide {
  id: string;
  image: string;
  badgeType: 'coffee' | 'tea' | 'harvest' | 'curing';
  categoryLabel: string;
  tag: string;
  titlePrimary: string;
  titleAccent: string;
  description: string;
  badges: string[];
}

const FARM_HERO_SLIDES: FarmHeroSlide[] = [
  {
    id: 'coffee-estates',
    image: '/images/our-farm/kenya-coffee-farm-hero.jpg',
    badgeType: 'coffee',
    categoryLabel: 'Coffee Estates',
    tag: 'Highland Coffee Terroir (1,700m – 2,200m ASL) • Mount Kenya',
    titlePrimary: 'Our Coffee Estates &',
    titleAccent: 'Partnered Smallholders',
    description:
      'Cultivated in nutrient-dense red volcanic soils under native shade canopies. In addition to our core estate plots in Nyeri and Kiambu, we partner with over 1,200 certified small-scale farming families across Mount Kenya and the Aberdares, cultivating pure SL28, SL34, and Batian varieties with full EUDR traceability.',
    badges: [
      'EUDR GPS Polygon Verified',
      '100% Selective Ripe Cherry Plucking',
      '72-Hour Double-Washed Glacial Soak',
      'Sun-Drying on Raised African Beds',
    ],
  },
  {
    id: 'tea-gardens',
    image: '/images/our-farm/tea-two-leaves-bud.jpg',
    badgeType: 'tea',
    categoryLabel: 'Highland Tea Gardens',
    tag: 'High-Altitude Tea Terroir (2,000m – 2,400m ASL) • Great Rift & Mount Kenya',
    titlePrimary: 'Royal Purple Tea Gardens &',
    titleAccent: 'Highland Orthodox Estates',
    description:
      'Perched in cloud-forest altitudes above 2,100 meters across Kericho, Nandi, and Mount Kenya slopes. Intense equatorial UV radiation and persistent highland morning mists prompt unique anthocyanin antioxidant pigments in rare TRFK 306 Purple Tea, hand-harvested strictly at the tender two leaves and a bud stage.',
    badges: [
      'Exclusive TRFK 306 Purple Cultivar',
      'Strict Two Leaves & A Bud Pluck',
      'High Anthocyanin Antioxidant Yield',
      'Pesticide-Free Highland Mist Terroir',
    ],
  },
  {
    id: 'cherry-harvest',
    image: '/images/our-farm/ripe-coffee-cherries.jpg',
    badgeType: 'harvest',
    categoryLabel: 'Selective Harvest',
    tag: 'Artisanal Harvest Standards • Peak Brix Sugar Density',
    titlePrimary: 'Selective Hand-Plucking &',
    titleAccent: 'Cooperative Batch Logging',
    description:
      'Every coffee cherry is hand-harvested across multiple selective passes during peak picking months. Only uniform, deep crimson cherries at peak natural sugar concentration are delivered same-day to cooperative washing stations, where individual farmer lots are weighed and tagged by GPS boundary code.',
    badges: [
      'Multi-Pass Selective Hand Picking',
      'Zero Immature or Defective Cherries',
      'Same-Day Cooperative Wet Milling',
      'Individual Smallholder Lot Logging',
    ],
  },
  {
    id: 'raised-curing',
    image: '/images/our-farm/drying-parchment-coffee.jpg',
    badgeType: 'curing',
    categoryLabel: 'Sun-Drying Beds',
    tag: 'Natural Curing Benchmark • 14–21 Days Sun Aeration',
    titlePrimary: 'African Raised Drying Beds &',
    titleAccent: 'Parchment Moisture Curing',
    description:
      'Freshly pulped and washed parchment is spread on elevated wooden mesh beds for complete 360-degree ventilation under the African sun. Hand-turned continuously and shaded during peak midday heat, the parchment is slowly cured to an exacting 10.5%–11.5% export equilibrium.',
    badges: [
      'Elevated Wooden Mesh Tables',
      'Continuous Hand Turning & Raking',
      'Strict 10.5%–11.5% Moisture Standard',
      'Hermetic GrainPro Ready',
    ],
  },
];

const ESTATE_SHOWCASE_CARDS = [
  {
    id: 'coffee-terrace',
    image: '/images/our-farm/kenya-coffee-farm-hero.jpg',
    label: 'Kenyan Arabica (SL28 / SL34) Estate Farm',
    elevation: '1,950m ASL Elevation',
    badge: 'Arabica Coffee',
    description:
      'High-elevation volcanic slopes producing dense, slowly ripened crimson cherries on terraced hillsides with full lot traceability.',
  },
  {
    id: 'tea-plucking',
    image: '/images/our-farm/tea-two-leaves-bud.jpg',
    label: 'Highland Orthodox & Purple Tea Garden',
    elevation: '2,200m ASL Elevation',
    badge: 'Specialty Tea',
    description:
      'Hand plucking two leaves and an apical bud in mountain mist estates, capturing the freshest floral polyphenols and brisk liquor.',
  },
  {
    id: 'ripe-cherries',
    image: '/images/our-farm/ripe-coffee-cherries.jpg',
    label: 'Selective Hand-Picked Crimson Cherries',
    elevation: 'Peak Brix Density',
    badge: 'Farm Harvest',
    description:
      'Meticulous multi-pass cherry harvesting ensuring zero green or defect cherries enter the double-fermentation washing cycle.',
  },
  {
    id: 'drying-beds',
    image: '/images/our-farm/drying-parchment-coffee.jpg',
    label: 'Raised Wooden African Drying Tables',
    elevation: '10.5%–11.5% Moisture',
    badge: 'Natural Curing',
    description:
      'Parchment sun-cured over 14 to 21 days with continuous hand raking under mild mountain breezes for flawless cell structure stabilization.',
  },
];

export default function OurFarmPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeEstateCard, setActiveEstateCard] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const totalSlides = FARM_HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Touch Swipe Handlers for mobile & tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div className="min-h-screen bg-white text-[#1f1610] flex flex-col">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Interactive Sliding Hero Section (Continuous Horizontal Slide-Out Track) */}
      <section
        role="region"
        aria-label="Highland Coffee and Tea Farms Showcase"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative min-h-[500px] sm:min-h-[540px] overflow-hidden bg-[#180f08] text-white select-none"
      >
        {/* Horizontal Carousel Track containing all slides side-by-side */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {FARM_HERO_SLIDES.map((s, idx) => (
            <div
              key={s.id}
              className="relative w-full shrink-0 min-h-[500px] sm:min-h-[540px] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
            >
              {/* Background Image of this exact slide extending completely to the top edge */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={s.image}
                  alt={s.tag}
                  fill
                  unoptimized
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>

              {/* Ambient Darkened Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/90 via-[#180f08]/55 to-black/30 z-1" />

              {/* Synchronized Sliding Content of this exact slide */}
              <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
                {/* Provenance Tag */}
                <div className="inline-block text-xs sm:text-sm font-bold uppercase tracking-widest text-[#d8a87b] bg-black/50 px-3.5 py-1.5 rounded-full border border-[#d8a87b]/30 backdrop-blur-md shadow-sm">
                  {s.tag}
                </div>

                {/* Headline with Luxury Editorial Serif */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
                  {s.titlePrimary}{' '}
                  <span className="text-[#d8a87b]">{s.titleAccent}</span>
                </h1>

                {/* Detailed Terroir Description */}
                <p className="text-stone-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto font-normal drop-shadow-sm min-h-[64px] flex items-center justify-center">
                  {s.description}
                </p>

                {/* Agronomic Feature Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-stone-200 font-medium">
                  {s.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-3 py-1.5 rounded-sm bg-stone-900/85 backdrop-blur-md border border-stone-700 text-stone-200 shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Previous Chevron Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous farm slide"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-95 focus:outline-none shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Chevron Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next farm slide"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all active:scale-95 focus:outline-none shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators & Auto-Slide Progress Bar */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {FARM_HERO_SLIDES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIdx === currentSlide ? 'w-8 bg-[#d8a87b]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Estate & Smallholder Partnership Split */}
      <section className="py-12 sm:py-16 bg-[#faf9f7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727] block">
                Ethical Sourcing &amp; Smallholder Empowerment
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#23150c] leading-tight">
                Our Model Estates + <span className="text-[#7a4727]">1,200+ Smallholder Families</span>
              </h2>
              <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                Rovil operates core demonstration coffee and tea estates in Nyeri, Kiambu, and the Great Rift Valley, establishing the highest agronomic benchmarks for varietal purity (SL28, SL34, Batian, and TRFK 306 Purple Tea).
              </p>
              <p className="text-[#574c43] text-sm sm:text-base leading-relaxed">
                To guarantee commercial volume for international buyers, we have formed long-term cooperative partnerships with over 1,200 small-scale farmers owning 1 to 5-acre plots (shambas) across Mount Kenya, Kirinyaga, Murang’a, and Kericho. We provide direct pre-financing, soil analysis, organic compost training, and guaranteed premium purchase contracts above local auction averages.
              </p>

              {/* 3 Quick Partnership Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3.5 rounded-sm bg-white border border-stone-200 shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c]">1,200+</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-0.5">Partner Farmers</div>
                </div>
                <div className="p-3.5 rounded-sm bg-white border border-stone-200 shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c]">2,400m</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-0.5">Peak Tea &amp; Coffee ASL</div>
                </div>
                <div className="p-3.5 rounded-sm bg-white border border-stone-200 shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c]">100%</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-0.5">Origin Traceability</div>
                </div>
              </div>
            </div>

            {/* Interactive Photo Card: Multi-Origin Showcase */}
            <div className="lg:col-span-6 relative rounded-sm overflow-hidden border border-stone-200 shadow-sm bg-white">
              {/* Photo Display */}
              <div className="relative h-[340px] sm:h-[400px] w-full bg-stone-100 overflow-hidden">
                <Image
                  src={ESTATE_SHOWCASE_CARDS[activeEstateCard].image}
                  alt={ESTATE_SHOWCASE_CARDS[activeEstateCard].label}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#23150c]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-sm border border-white/20">
                  {ESTATE_SHOWCASE_CARDS[activeEstateCard].badge}
                </div>
              </div>

              {/* Caption and Switcher Tabs */}
              <div className="p-4 border-t border-stone-200 bg-white space-y-3">
                <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                  <span>{ESTATE_SHOWCASE_CARDS[activeEstateCard].label}</span>
                  <span className="text-stone-900 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-xs text-xs font-semibold">
                    {ESTATE_SHOWCASE_CARDS[activeEstateCard].elevation}
                  </span>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {ESTATE_SHOWCASE_CARDS[activeEstateCard].description}
                </p>

                {/* Micro Origin Selector Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {ESTATE_SHOWCASE_CARDS.map((card, cIdx) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setActiveEstateCard(cIdx)}
                      className={`text-[11px] font-semibold py-1.5 px-1 rounded-xs border text-center transition-all ${
                        cIdx === activeEstateCard
                          ? 'bg-[#23150c] text-white border-[#23150c]'
                          : 'bg-stone-50 text-[#574c43] border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {card.badge}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4 International Standards & Compliance Pillars */}
          <div className="space-y-6 pt-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727]">
                Rigorous International Procedures
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#23150c]">
                Global Compliance, EUDR &amp; Environmental Stewardship
              </h3>
              <p className="text-sm text-[#574c43]">
                Every bag exported by Rovil meets the statutory frameworks of Europe, North America, and East Asia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#23150c] text-base">EUDR GPS Polygon Mapping</h4>
                <p className="text-sm text-[#574c43] leading-relaxed">
                  Every participating farm plot has documented GPS boundary polygon coordinates confirming zero deforestation after December 31, 2020.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                  <Trees className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#23150c] text-base">Native Shade Canopy</h4>
                <p className="text-sm text-[#574c43] leading-relaxed">
                  Coffee trees are cultivated under indigenous African shade trees (Grevillea robusta, Cordia africana) to moderate equatorial sun and support biodiversity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#23150c] text-base">Mountain Water Protection</h4>
                <p className="text-sm text-[#574c43] leading-relaxed">
                  Our wet mills utilize eco-pulpers reducing water usage by 65%. Runoff passes through vetiver grass filtration lagoons protecting local rivers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#ece3db] space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#23150c] text-base">Zero Harmful Runoff</h4>
                <p className="text-sm text-[#574c43] leading-relaxed">
                  Adherence to strict Maximum Residue Limits (MRL) required by the EU and Japan Food Sanitation Act, utilizing organic compost for soil replenishment.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. The 6-Stage Traceable Farm-to-Burlap Lifecycle */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#ece3db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727]">
              Agronomic Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#23150c]">
              The 6-Stage Farm &amp; Processing Cycle
            </h2>
            <p className="text-base text-[#574c43]">
              From fertile volcanic soil through traditional 72-hour double-fermentation and sun-drying on raised African tables.
            </p>
          </div>

          {/* 6 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmStages.map((stage) => (
              <motion.div
                key={stage.step}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-[#ece3db] bg-[#fbf9f6] overflow-hidden hover:border-[#7a4727]/40 transition-all shadow-xs"
                whileHover={{ y: -4 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#23150c] text-white font-bold text-sm">
                      {stage.step}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f4ece4] text-[#7a4727]">
                      {stage.durationOrSeason}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#23150c] text-xl group-hover:text-[#7a4727] transition-colors">
                      {stage.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#7a4727] mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{stage.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[#574c43] leading-relaxed">
                    {stage.summary}
                  </p>

                  <div className="pt-2 border-t border-[#ece3db] space-y-1.5 text-xs">
                    {stage.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[#3e2211]">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4b. Luxury Harvest Almanac & Regional Terroir Showcase */}
      <section className="py-20 bg-gradient-to-b from-[#f9f6f1] via-[#faf7f3] to-[#f4ece4] border-y border-[#ece3db] text-[#23150c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7a4727] bg-[#7a4727]/10 px-3.5 py-1 rounded-full border border-[#7a4727]/20 inline-block">
              Annual Sourcing Almanac
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#23150c] tracking-tight">
              Kenyan Harvest Cycles &amp; Origin Terroirs
            </h2>
            <p className="text-base text-[#574c43] leading-relaxed">
              Equatorial Kenya benefits from dual bimodal rainfall cycles off Mount Kenya and the Aberdare Range, yielding two distinct specialty harvest windows annually.
            </p>
          </div>

          {/* Comparative Dual Harvest Windows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* 1. Main Harvest Window */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d8c2b0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7a4727]" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727] bg-[#f4ece4] px-3 py-1 rounded-full">
                    Primary Sourcing Window
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    70% of Annual Volume
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#23150c]">
                    Main Crop Harvest
                  </h3>
                  <div className="text-sm font-semibold text-[#8c4f2b] mt-0.5">
                    October – February (Peak Picking: Nov–Dec)
                  </div>
                </div>

                <p className="text-sm text-[#574c43] leading-relaxed">
                  Following the long rains, peak elevation cherries ripen slowly in Nyeri and Kirinyaga at 1,800m–2,100m. Produces dense Grade AA lots with intense phosphoric blackcurrant notes.
                </p>

                {/* Technical Highlights */}
                <div className="pt-3 border-t border-[#ece3db] grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#fbf9f6] p-3 rounded-xl border border-[#ece3db]">
                    <span className="text-stone-400 block font-medium text-[10px] uppercase">Flavor Profile</span>
                    <strong className="text-[#23150c] font-semibold text-xs">Blackcurrant, Meyer Lemon, Jasmine</strong>
                  </div>
                  <div className="bg-[#fbf9f6] p-3 rounded-xl border border-[#ece3db]">
                    <span className="text-stone-400 block font-medium text-[10px] uppercase">Ocean Sailings</span>
                    <strong className="text-[#23150c] font-semibold text-xs">December through April (Mombasa)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium">Primary Terroir: Nyeri, Kirinyaga, Kiambu</span>
                <span className="font-bold text-[#7a4727]">Grade AA &amp; AB</span>
              </div>
            </div>

            {/* 2. Fly Crop Harvest Window */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d8c2b0] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#b57a44]" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#b57a44] bg-[#faf5ef] px-3 py-1 rounded-full">
                    Secondary Sourcing Window
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    30% of Annual Volume
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#23150c]">
                    Fly Crop (Early Harvest)
                  </h3>
                  <div className="text-sm font-semibold text-[#b57a44] mt-0.5">
                    May – July (Peak Picking: June)
                  </div>
                </div>

                <p className="text-sm text-[#574c43] leading-relaxed">
                  Generated by the short rains, the fly harvest produces succulent stone fruit and sweet cane caramel profiles from lower and mid-elevation highland slopes.
                </p>

                {/* Technical Highlights */}
                <div className="pt-3 border-t border-[#ece3db] grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#fbf9f6] p-3 rounded-xl border border-[#ece3db]">
                    <span className="text-stone-400 block font-medium text-[10px] uppercase">Flavor Profile</span>
                    <strong className="text-[#23150c] font-semibold text-xs">Stone Fruit, White Peach, Tangerine</strong>
                  </div>
                  <div className="bg-[#fbf9f6] p-3 rounded-xl border border-[#ece3db]">
                    <span className="text-stone-400 block font-medium text-[10px] uppercase">Ocean Sailings</span>
                    <strong className="text-[#23150c] font-semibold text-xs">July through October (Mombasa)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#ece3db] flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium">Primary Terroir: Murang&apos;a, Aberdares, Kisii</span>
                <span className="font-bold text-[#b57a44]">Grade AB &amp; PB</span>
              </div>
            </div>

          </div>

          {/* Four Distinct Micro-Terroir Cards */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#23150c]">
                Key Origin Terroirs &amp; Agronomic Profiles
              </h3>
              <span className="text-xs font-semibold text-[#7a4727] hidden sm:inline-block">
                Direct Outgrower Cooperative Network
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  region: 'Nyeri Highlands',
                  elevation: '1,700m – 2,100m ASL',
                  grades: 'Grade AA & AB',
                  soil: 'Deep Red Volcanic Loam',
                  coops: 'Othaya, Gikanda, Tegu FCS',
                  notes: 'High phosphoric acidity, blackcurrant, ruby grapefruit, jasmine',
                  accent: 'border-t-[#7a4727]',
                },
                {
                  region: 'Kirinyaga Slopes',
                  elevation: '1,600m – 1,950m ASL',
                  grades: 'Grade AA & PB',
                  soil: 'Mount Kenya Volcanic Ash',
                  coops: 'Baragwi, Kibirigwi, Kabare FCS',
                  notes: 'Sweet floral jasmine, damson plum, honeyed apricot, pristine cup',
                  accent: 'border-t-[#8c4f2b]',
                },
                {
                  region: 'Murang\'a Terroir',
                  elevation: '1,500m – 1,850m ASL',
                  grades: 'Grade AB & C',
                  soil: 'Clay Loam with High Minerals',
                  coops: 'Gitugi, Gatomboya, Kangunu FCS',
                  notes: 'Stone fruit, candied citrus peel, round body, toffee finish',
                  accent: 'border-t-[#b57a44]',
                },
                {
                  region: 'Kericho Highland Teas',
                  elevation: '2,100m – 2,400m ASL',
                  grades: 'Royal Purple & Black CTC',
                  soil: 'High UV Great Rift Volcanic',
                  coops: 'TRFK Foundation & Direct Outgrowers',
                  notes: 'Antioxidant anthocyanins, sweet plum, brisk malty copper infusion',
                  accent: 'border-t-purple-800',
                },
              ].map((d) => (
                <div
                  key={d.region}
                  className={`bg-white rounded-2xl p-5 border border-[#ece3db] shadow-xs space-y-3.5 border-t-4 ${d.accent} hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-[#23150c]">{d.region}</span>
                      <span className="text-[10px] font-bold text-[#7a4727] bg-[#f4ece4] px-2 py-0.5 rounded">
                        {d.grades}
                      </span>
                    </div>

                    <div className="text-xs text-[#7a4727] font-semibold">
                      {d.elevation}
                    </div>

                    <p className="text-xs text-[#574c43] leading-relaxed pt-1">
                      <span className="font-semibold text-stone-700">Terroir:</span> {d.soil}
                    </p>

                    <p className="text-xs text-[#574c43] leading-relaxed">
                      <span className="font-semibold text-stone-700">Cooperatives:</span> {d.coops}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ece3db] bg-[#fbf9f6] -mx-5 -mb-5 p-3.5 rounded-b-2xl">
                    <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider mb-0.5">
                      Cupping Notes
                    </span>
                    <p className="text-xs text-[#23150c] font-medium leading-snug">
                      {d.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4B. 100% End-to-End Lot Traceability Pipeline (Farm -> Port/Airport -> Destination) */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#ece3db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 bg-[#f4ece4] border border-[#d8c2b0] rounded-full px-3.5 py-1 text-[#7a4727] text-xs font-bold uppercase tracking-wider">
              <ScanLine className="w-3.5 h-3.5 text-[#7a4727]" />
              Complete Chain of Custody
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#23150c] tracking-tight">
              Tracked from the Farm to the <span className="text-[#7a4727]">Airport, Sea &amp; Exact Destination</span>
            </h2>
            <p className="text-[#574c43] text-base leading-relaxed">
              Every single export consignment is assigned a unique ICO lot tracking identifier. International buyers can trace their coffee and tea through every stage of custody, from specific Mount Kenya harvest blocks right to their exact nominated port, airport, or final warehouse.
            </p>
          </div>

          {/* 4 Interactive Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-[#fbf9f6] border border-[#ece3db] space-y-4 hover:shadow-lg transition-all relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-xs">
                  01
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Farm Harvest Log
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#23150c]">Mount Kenya Farm Origin</h3>
              <p className="text-xs text-[#574c43] leading-relaxed">
                GPS-logged farmer plots in Nyeri, Kirinyaga &amp; Kiambu. Cherries picked at peak Brix sugar density with cooperative batch numbers logged upon wet mill delivery.
              </p>
              <div className="pt-2 border-t border-[#ece3db] text-[11px] font-semibold text-[#7a4727]">
                ✓ SL28 / SL34 / Purple Cultivar Verified
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-[#fbf9f6] border border-[#ece3db] space-y-4 hover:shadow-lg transition-all relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-xs">
                  02
                </span>
                <span className="text-[11px] font-bold text-[#7a4727] bg-[#f4ece4] px-2.5 py-1 rounded-full">
                  Milling &amp; Cupping QC
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#23150c]">Dry Milling &amp; Lab Grading</h3>
              <p className="text-xs text-[#574c43] leading-relaxed">
                Precision screen sizing (Grade AA 17/18, AB, PB) and density sorting. SCA 86+ cupping notes certified with moisture stabilized strictly between 10.5%–11.5%.
              </p>
              <div className="pt-2 border-t border-[#ece3db] text-[11px] font-semibold text-[#7a4727]">
                ✓ GrainPro Hermetic Lined Packaging
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-[#fbf9f6] border border-[#ece3db] space-y-4 hover:shadow-lg transition-all relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#23150c] text-white flex items-center justify-center font-bold text-xs">
                  03
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full">
                  Port / Airport Dispatch
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#23150c]">Airport or Seaport Hub</h3>
              <p className="text-xs text-[#574c43] leading-relaxed">
                <strong>Orders under 1 tonne:</strong> Dispatched via Air Cargo through JKIA Airport, Nairobi.<br />
                <strong>1 tonne and above:</strong> Shipped via Ocean Freight through Port of Mombasa.<br />
                <em>Strict FOB terms (freight paid by buyer).</em>
              </p>
              <div className="pt-2 border-t border-[#ece3db] text-[11px] font-semibold text-[#7a4727]">
                ✓ AWB / Ocean B/L &amp; Container Seal Tracking
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-3xl bg-[#23150c] text-white space-y-4 hover:shadow-xl transition-all relative">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#d89f68] text-[#23150c] flex items-center justify-center font-bold text-xs">
                  04
                </span>
                <span className="text-[11px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-full border border-white/20">
                  Destination Arrival
                </span>
              </div>
              <h3 className="font-bold text-lg text-white">Exact Buyer Destination</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Live flight cargo &amp; vessel satellite GPS tracking directly to your nominated discharge port, international airport, or receiving warehouse across Europe, UK, USA, Asia, and worldwide.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] font-semibold text-[#d89f68]">
                ✓ Official Phytosanitary &amp; ICO Certificate
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Authentic Crop Photography Gallery */}
      <section className="py-16 lg:py-24 bg-[#faf8f5] border-b border-[#ece3db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold text-[#7a4727]">
                Botanical Detail
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#23150c]">
                Crop Close-Ups: Pure Kenyan Terroir
              </h2>
            </div>
            <p className="text-sm text-[#7d7065] max-w-md">
              Authentic photography of our coffee cherry clusters, sun-drying parchment, and highland tea flushes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Image 1: Client's Farm & Ripe Cherries */}
            <div className="group rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/our-farm/kenya-coffee-farm-hero.jpg"
                  alt="Kenyan Highland Coffee Terraces and Crimson Cherries"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Arabica Terraces &amp; Slopes</span>
                  <span className="text-stone-900 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-xs text-xs font-semibold">1,950m ASL</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Hand-tended terraced mountain slopes yielding dense, high-altitude Arabica cherries in volcanic soil under shade trees.
                </p>
              </div>
            </div>

            {/* Image 2: Selective Hand-Harvest (Reincorporated) */}
            <div className="group rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/our-farm/ripe-coffee-cherries.jpg"
                  alt="Selective Hand-Picked Crimson Ripe Coffee Cherries"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Selective Hand Plucking</span>
                  <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold">Peak Brix Density</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Hand-picked across multiple seasonal passes, selecting only uniform crimson cherries at peak natural sugar concentration.
                </p>
              </div>
            </div>

            {/* Image 3: Raised Drying Beds */}
            <div className="group rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/our-farm/drying-parchment-coffee.jpg"
                  alt="Golden Washed Coffee Parchment on African Drying Beds"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Raised Drying Beds</span>
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs font-semibold">10.5%–11.5% Moisture</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Golden washed parchment spread on elevated wooden tables, turned continuously for 14–21 days under mild equatorial sun.
                </p>
              </div>
            </div>

            {/* Image 4: Tea Two Leaves and a Bud */}
            <div className="group rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/our-farm/tea-two-leaves-bud.jpg"
                  alt="Fresh Green Tea Shoot Showing Two Leaves and a Bud"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Two Leaves &amp; A Bud Pluck</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-semibold">Artisan Standard</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Only the tender apical bud and two uppermost leaves are selected in cloud forest gardens, yielding golden brisk liquor.
                </p>
              </div>
            </div>

            {/* Image 5: Purple Tea Shoot */}
            <div className="group rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/our-farm/purple-tea-crop-macro.jpg"
                  alt="High Altitude Kenyan Purple Tea Bush Shoot TRFK 306"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Kenyan Purple Tea TRFK 306</span>
                  <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-xs font-semibold">Anthocyanin Rich</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Grown above 2,100 meters where high UV radiation prompts rich natural anthocyanins, creating a rare violet infusion.
                </p>
              </div>
            </div>

            {/* Image 6: Certified Cupping Lab (Reincorporated) */}
            <div className="group rounded-2xl overflow-hidden border border-[#ece3db] bg-white shadow-xs hover:shadow-md transition-all">
              <div className="relative h-60 w-full bg-stone-100 overflow-hidden">
                <Image
                  src="/images/what-we-do/cupping-lab-qc.jpg"
                  alt="Certified Cupping Laboratory Sensory Quality Control"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Certified Cupping Lab QC</span>
                  <span className="text-[#7a4727] bg-[#f4ece4] px-2 py-0.5 rounded text-xs font-semibold">SCA 86+ Standards</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Rigorous sensory cupping protocols and moisture verification on every lot prior to ocean packaging and export dispatch.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Farm Visit CTA Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#23150c] text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-3.5 py-1 text-[#f4ece4] text-xs font-semibold">
                <Globe2 className="w-3.5 h-3.5 text-[#b57a44]" />
                Direct Importer Farm Visits &amp; Origin Audits Welcome
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Trace Your Coffee &amp; Tea Right Back to the Volcanic Soil
              </h3>

              <p className="text-white/80 text-base leading-relaxed">
                We invite international coffee green buyers, commodity traders, and roaster delegations to tour our Mount Kenya washing stations, inspect our partner smallholder cooperatives, and conduct on-site cupping sessions in Nairobi.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/what-we-do"
                  className="px-6 py-3.5 rounded-xl bg-[#b57a44] hover:bg-[#d89f68] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 text-center"
                >
                  <Coffee className="w-4 h-4" />
                  <span>View Green Coffee &amp; Tea Specs</span>
                </Link>

                <Link
                  href="/#contact"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Schedule an Origin Farm Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Corporate Footer */}
      <Footer />
    </div>
  );
}
