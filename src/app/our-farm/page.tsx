'use client';

import React from 'react';
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
} from 'lucide-react';
import { farmStages } from '@/data/farmStages';
import {
  SlideUp,
  FadeIn,
  motion,
} from '@/components/motion/MotionWrappers';

export default function OurFarmPage() {
  return (
    <div className="min-h-screen bg-white text-[#1f1610] flex flex-col font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-[#180f08] text-white pt-16 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/our-farm/ripe-coffee-cherries.jpg"
            alt="Ripe Crimson Kenyan Arabica Coffee Cherries on Branch"
            fill
            unoptimized
            priority
            className="object-cover object-center opacity-55 scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#180f08]/70 via-[#180f08]/50 to-[#180f08]/95 pointer-events-none z-1" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#b57a44]/20 border border-[#b57a44]/40 rounded-full px-4 py-1.5 text-[#f4ece4] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#b57a44] animate-pulse" />
              Highland Origins (1,700m – 2,200m ASL) • Mount Kenya &amp; Great Rift Valley
            </span>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Our Farms &amp; <span className="text-[#d89f68] italic">Partnered Smallholders</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-white/85 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-light">
              Cultivated in nutrient-dense red volcanic soils under native shade canopies. In addition to our core estate plots, we partner with over 1,200 certified small-scale farming families across Mount Kenya and the Great Rift Valley, operating strictly under international agricultural and environmental standards.
            </p>
          </SlideUp>

          {/* Quick Pillar Badges */}
          <SlideUp delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                EUDR GPS Polygon Verified
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                100% Selective Ripe Cherry Plucking
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                72-Hour Double-Washed Glacial Soak
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[#f4ece4]">
                Sun-Drying on Raised African Beds
              </span>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* 3. Core Estate & Smallholder Partnership Split */}
      <section className="py-16 lg:py-24 bg-[#faf8f5] border-b border-[#ece3db]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727] block">
                Ethical Sourcing &amp; Smallholder Empowerment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23150c] leading-tight">
                Our Model Estates + <span className="text-[#7a4727] italic">1,200+ Smallholder Families</span>
              </h2>
              <p className="text-[#574c43] text-base leading-relaxed">
                Rovil operates core demonstration coffee and tea estates in Nyeri and Kiambu, establishing the highest agronomic benchmarks for varietal purity (SL28, SL34, Batian, and TRFK 306 Purple Tea).
              </p>
              <p className="text-[#574c43] text-base leading-relaxed">
                To guarantee commercial volume for international buyers, we have formed long-term cooperative partnerships with over 1,200 small-scale farmers owning 1 to 5-acre plots (shambas) across Mount Kenya, Kirinyaga, Murang’a, and Kericho. We provide direct pre-financing, soil analysis, organic compost training, and guaranteed premium purchase contracts above local auction averages.
              </p>

              {/* 3 Quick Partnership Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-4 rounded-2xl bg-white border border-[#ece3db] shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c] font-serif">1,200+</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-1">Partner Farmers</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#ece3db] shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c] font-serif">2,100m</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-1">Peak Elevation</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#ece3db] shadow-xs">
                  <div className="text-2xl font-bold text-[#23150c] font-serif">100%</div>
                  <div className="text-xs text-[#7a4727] font-semibold mt-1">Traceability</div>
                </div>
              </div>
            </div>

            {/* Macro Photo Card: Ripe Cherries */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#ece3db] shadow-md group">
              <div className="relative h-[380px] sm:h-[440px] w-full">
                <Image
                  src="/images/our-farm/ripe-coffee-cherries.jpg"
                  alt="Close-up of Ripe Crimson Arabica Coffee Cherries on Branch"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/30 shadow-md">
                <div className="flex items-center justify-between font-bold text-[#23150c] text-sm">
                  <span>Kenyan Arabica (SL28 / SL34) Cherries</span>
                  <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    Brix &gt; 21% Sugar Density
                  </span>
                </div>
                <p className="text-[#574c43] text-xs mt-1">
                  High-elevation volcanic loam soil produces dense, slowly ripened crimson cherries rich in phosphoric and citric acidity.
                </p>
              </div>
            </div>
          </div>

          {/* 4 International Standards & Compliance Pillars */}
          <div className="space-y-6 pt-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a4727]">
                Rigorous International Procedures
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150c]">
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23150c]">
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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#23150c] tracking-tight">
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
                  <h3 className="font-serif text-2xl font-bold text-[#23150c]">
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
                  <h3 className="font-serif text-2xl font-bold text-[#23150c]">
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
              <h3 className="font-serif text-2xl font-bold text-[#23150c]">
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
                      <span className="font-serif font-bold text-lg text-[#23150c]">{d.region}</span>
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
                    <p className="text-xs text-[#23150c] italic font-medium leading-snug">
                      {d.notes}
                    </p>
                  </div>
                </div>
              ))}
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c]">
                Crop Close-Ups: Pure Kenyan Terroir
              </h2>
            </div>
            <p className="text-sm text-[#7d7065] max-w-md">
              Authentic photography of our coffee cherry clusters, sun-drying parchment, and highland tea flushes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Image 1: Ripe Cherries */}
            <div className="group relative rounded-3xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
              <div className="relative h-64 w-full">
                <Image
                  src="/images/our-farm/ripe-coffee-cherries.jpg"
                  alt="Macro of Ripe Crimson Coffee Cherries on Branch"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-[#23150c]">
                  <span>Arabica Crimson Cherries</span>
                  <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded text-xs">SL28 / SL34</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Hand-plucked selectively when sugar Brix density peaks above 21%, ensuring maximum sweetness and clarity.
                </p>
              </div>
            </div>

            {/* Image 2: Raised Drying Beds */}
            <div className="group relative rounded-3xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
              <div className="relative h-64 w-full">
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
                  <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-xs">10.5%–11.5% Moisture</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Golden washed parchment spread on elevated wooden beds, turned continuously for 14–21 days under African sun.
                </p>
              </div>
            </div>

            {/* Image 3: Tea Two Leaves and a Bud */}
            <div className="group relative rounded-3xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
              <div className="relative h-64 w-full">
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
                  <span>Two Leaves &amp; A Bud</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">Prime Flush</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Only the tender apical bud and two uppermost leaves are selected, delivering briskness and golden liquor.
                </p>
              </div>
            </div>

            {/* Image 4: Purple Tea Shoot */}
            <div className="group relative rounded-3xl overflow-hidden border border-[#ece3db] bg-white shadow-xs">
              <div className="relative h-64 w-full">
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
                  <span>Kenyan Purple Tea</span>
                  <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-xs">TRFK 306 Cultivar</span>
                </div>
                <p className="text-[#574c43] text-xs leading-relaxed">
                  Grown above 2,100 meters where high UV radiation prompts rich natural anthocyanins, creating a rare violet infusion.
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
