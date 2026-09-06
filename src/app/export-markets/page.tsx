'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FlagIcon from '@/components/FlagIcon';
import {
  Anchor,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Send,
  Ship,
  Package,
  CreditCard,
  Building2,
  Coffee,
  Plane,
  Train,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import {
  SlideUp,
  FadeIn,
  motion,
  AnimatePresence,
} from '@/components/motion/MotionWrappers';

interface MarketCard {
  id: string;
  name: string;
  countryCode: 'EU' | 'GB' | 'US' | 'JP' | 'AE';
  region: string;
  ports: string;
  days: string;
  topProducts: string;
  shippingLines: string;
  image: string;
}

const MARKETS: MarketCard[] = [
  {
    id: 'europe',
    name: 'Continental Europe',
    countryCode: 'EU',
    region: 'Germany, Netherlands, Belgium, Scandinavia & Italy',
    ports: 'Rotterdam, Hamburg, Antwerp, Genoa',
    days: '21–26 Days',
    topProducts: 'Grade AA, Grade AB, Kenyan Purple Tea',
    shippingLines: 'Maersk, MSC, CMA CGM, Hapag-Lloyd',
    image: '/images/ports/rotterdam-europe.jpg',
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    countryCode: 'GB',
    region: 'England, Scotland & UK Roasters',
    ports: 'London Gateway, Felixstowe, Southampton',
    days: '22–28 Days',
    topProducts: 'Black CTC Teas (BP1, PF1), Grade AA Coffee',
    shippingLines: 'MSC, Maersk, ONE Line',
    image: '/images/ports/london-uk.jpg',
  },
  {
    id: 'usa',
    name: 'United States & Canada',
    countryCode: 'US',
    region: 'East Coast, West Coast & Gulf Roasters',
    ports: 'New York, Houston, Oakland, Norfolk',
    days: '28–35 Days',
    topProducts: 'Specialty Grade AA, Peaberry (PB), Micro-lots',
    shippingLines: 'Maersk, MSC, Hapag-Lloyd',
    image: '/images/ports/newyork-usa.jpg',
  },
  {
    id: 'japan',
    name: 'Japan & East Asia',
    countryCode: 'JP',
    region: 'Japan, South Korea & Asian Importers',
    ports: 'Yokohama, Kobe, Busan, Shanghai',
    days: '24–30 Days',
    topProducts: 'Specialty Grade AA, Peaberry, Orthodox Teas',
    shippingLines: 'ONE, Evergreen, PIL',
    image: '/images/ports/yokohama-japan.jpg',
  },
  {
    id: 'middle-east',
    name: 'Middle East & Gulf',
    countryCode: 'AE',
    region: 'UAE, Saudi Arabia, Oman & GCC',
    ports: 'Jebel Ali (Dubai), Dammam, Jeddah',
    days: '10–14 Days',
    topProducts: 'Commercial Arabica (AB, C, MH), CTC Black Tea',
    shippingLines: 'Emirates Shipping Line, MSC, DP World',
    image: '/images/ports/jebelali-dubai.jpg',
  },
];

const BUYER_REQUIREMENTS = [
  {
    step: '01',
    title: 'Company & Consignee Details',
    desc: 'Your registered business name, tax/VAT number, destination discharge port, and clearing agent details.',
    icon: Building2,
  },
  {
    step: '02',
    title: 'Product Selection & Volume',
    desc: 'Target coffee grade (AA, AB, PB, C, MH) or tea type + container volume (20ft FCL = 320 bags / 19.2 MT, or pallets).',
    icon: Coffee,
  },
  {
    step: '03',
    title: 'Sample Cupping Approval',
    desc: 'We send a 250g–500g green coffee or tea sample by DHL courier. Once you cup and approve the lot, we lock your contract.',
    icon: Plane,
  },
  {
    step: '04',
    title: 'Contract & Payment Terms',
    desc: 'Standard FOB Mombasa or CIF destination terms. Payment via confirmed Irrevocable Letter of Credit (L/C) or Telegraphic Transfer (T/T).',
    icon: CreditCard,
  },
];

const DOCUMENTS_PROVIDED = [
  {
    title: 'ICO Certificate of Origin',
    desc: 'Official certificate from Kenya Coffee Directorate verifying authentic Kenyan crop and grade.',
  },
  {
    title: 'Phytosanitary Certificate',
    desc: 'Government inspection by KEPHIS confirming clean, pest-free agricultural export status.',
  },
  {
    title: 'EUDR Traceability Data',
    desc: 'Farm GPS polygon coordinates proving deforestation-free sourcing for European regulations.',
  },
  {
    title: 'Cupping & Moisture Lab Report',
    desc: 'Official Q-grader cupping score and certified moisture analysis guaranteed between 10.5%–11.5%.',
  },
  {
    title: 'Ocean Bill of Lading (B/L)',
    desc: 'Clean on-board negotiable original bill of lading for your customs clearance.',
  },
  {
    title: 'Commercial Invoice & Packing List',
    desc: 'Fully certified commercial invoice, packing list, and container bolt seal record.',
  },
];

export default function ExportMarketsPage() {
  const [selectedMarketId, setSelectedMarketId] = useState<string>('europe');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedMarket = MARKETS.find((m) => m.id === selectedMarketId) || MARKETS[0];

  return (
    <div className="min-h-screen bg-white text-[#1f1610] flex flex-col font-sans">
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Visual Hero with Real GrainPro Warehouse Background */}
      <section className="relative min-h-[50vh] sm:min-h-[56vh] flex items-center justify-center overflow-hidden bg-[#180f08] text-white pt-14 pb-18">
        {/* Real Export Photo Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/what-we-do/grainpro-export-bags.jpg"
            alt="GrainPro green coffee bags prepared for export"
            fill
            unoptimized
            priority
            className="object-cover object-center opacity-40 scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#180f08]/85 via-[#180f08]/65 to-[#180f08] z-1" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-[#b57a44]/25 border border-[#b57a44]/40 rounded-full px-4 py-1.5 text-[#f4ece4] text-xs sm:text-sm font-semibold tracking-wide">
              <Anchor className="w-4 h-4 text-[#d89f68]" />
              Port of Mombasa Dispatch • Licenced Exporter in Nairobi
            </span>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Export Markets &amp; <span className="text-[#d89f68]">Global Shipping</span>
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              We export commercial container loads of premium Kenyan Arabica coffee and teas to importers, roasters, and distributors worldwide. Shipped from the Port of Mombasa under standard FOB or CIF terms.
            </p>
          </SlideUp>

          {/* Quick 3-Metric Bar */}
          <SlideUp delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 text-xs sm:text-sm font-medium">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#d89f68]" />
                <span>Port: Port of Mombasa (MBA)</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#d89f68]" />
                <span>20ft FCL = 320 Bags (19.2 MT)</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d89f68]" />
                <span>60kg Sisal + GrainPro Liners</span>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* 3. Interactive Destination Corridors */}
      <section className="py-16 sm:py-20 bg-[#fbf9f6] border-b border-[#ece3db]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a4727]">
              Global Destinations
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#23150c] tracking-tight">
              Where We Ship &amp; Transit Times
            </h2>
            <p className="text-sm sm:text-base text-[#574c43]">
              Select a destination to view typical transit days, main discharge ports, and popular grades.
            </p>
          </div>

          {/* Destination Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {MARKETS.map((m) => {
              const isSelected = m.id === selectedMarketId;
              return (
                <motion.button
                  key={m.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMarketId(m.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#23150c] text-white border-[#23150c] shadow-md ring-2 ring-[#b57a44]'
                      : 'bg-white text-[#23150c] border-[#d8c2b0]/70 hover:bg-[#f4ece4]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <FlagIcon countryCode={m.countryCode} size={22} />
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-[#b57a44] text-white' : 'bg-[#f4ece4] text-[#7a4727]'
                      }`}
                    >
                      {m.days}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-sm block leading-snug">{m.name}</span>
                    <span
                      className={`text-xs block mt-0.5 truncate ${
                        isSelected ? 'text-white/70' : 'text-[#7a4727]'
                      }`}
                    >
                      {m.region}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Destination Specs Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMarket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl border border-[#d8c2b0] p-6 sm:p-8 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Visual Image Banner for Region */}
                <div className="lg:col-span-4 relative h-52 sm:h-60 rounded-xl overflow-hidden border border-[#ece3db]">
                  <Image
                    src={selectedMarket.image}
                    alt={`${selectedMarket.name} maritime container shipping terminal`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <FlagIcon countryCode={selectedMarket.countryCode} size={22} />
                      <span className="font-bold text-base">{selectedMarket.name}</span>
                    </div>
                    <span className="text-xs font-medium text-[#d89f68]">
                      Ocean Lead Time: {selectedMarket.days}
                    </span>
                  </div>
                </div>

                {/* Technical Specs Details */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
                    <div className="p-3.5 bg-[#fbf9f6] rounded-xl border border-[#ece3db]">
                      <span className="text-xs font-bold text-[#7a4727] block mb-1">
                        Main Discharge Ports
                      </span>
                      <strong className="text-[#23150c] text-sm leading-snug block">
                        {selectedMarket.ports}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-[#fbf9f6] rounded-xl border border-[#ece3db]">
                      <span className="text-xs font-bold text-[#7a4727] block mb-1">
                        Regular Shipping Lines
                      </span>
                      <strong className="text-[#23150c] text-sm leading-snug block">
                        {selectedMarket.shippingLines}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-[#fbf9f6] rounded-xl border border-[#ece3db]">
                      <span className="text-xs font-bold text-[#7a4727] block mb-1">
                        Popular Coffee &amp; Tea Grades
                      </span>
                      <strong className="text-[#23150c] text-sm leading-snug block">
                        {selectedMarket.topProducts}
                      </strong>
                    </div>

                    <div className="p-3.5 bg-[#fbf9f6] rounded-xl border border-[#ece3db]">
                      <span className="text-xs font-bold text-[#7a4727] block mb-1">
                        Packaging &amp; Load Units
                      </span>
                      <strong className="text-[#23150c] text-sm leading-snug block">
                        20ft FCL (320 bags / 19.2 MT) • GrainPro Lined
                      </strong>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-sm text-[#574c43]">
                      Standard Terms: <strong className="text-[#23150c]">FOB Mombasa or CIF {selectedMarket.name}</strong>
                    </span>
                    <a
                      href="#quote-form"
                      className="inline-flex items-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-xs"
                    >
                      <span>Inquire for {selectedMarket.name} Rates</span>
                      <ArrowRight className="w-4 h-4 text-[#d89f68]" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4. Kenya Export Infrastructure & Transit Channels */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#ece3db]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a4727]">
              Export Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#23150c] tracking-tight">
              Kenya&apos;s Export &amp; Freight Channels
            </h2>
            <p className="text-sm sm:text-base text-[#574c43]">
              How our commercial shipments move from Central Kenya processing mills to international destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#fbf9f6] border border-[#d8c2b0] space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#23150c] text-[#d89f68] flex items-center justify-center">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23150c]">
                Port of Mombasa (KE MBA) — Ocean Freight
              </h3>
              <p className="text-sm text-[#574c43] leading-relaxed">
                Kenya&apos;s main deepwater seaport handling over 99% of containerized coffee and tea maritime exports. Standard 20ft and 40ft FCL container vessels depart weekly to Europe, the Americas, Asia, and the Middle East.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#fbf9f6] border border-[#d8c2b0] space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#7a4727] text-white flex items-center justify-center">
                <Train className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23150c]">
                Nairobi Dry Port (ICD) — SGR Freight Rail
              </h3>
              <p className="text-sm text-[#574c43] leading-relaxed">
                Coffee is hulled, graded, and customs-sealed in Nairobi, then transported via dedicated Standard Gauge Railway (SGR) cargo trains directly into Mombasa Port within 8 hours.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-[#fbf9f6] border border-[#d8c2b0] space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#3d5a45] text-white flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#23150c]">
                JKIA Nairobi (NBO) — Air Freight &amp; Samples
              </h3>
              <p className="text-sm text-[#574c43] leading-relaxed">
                Used for rapid dispatch of 250g–500g pre-shipment cupping samples (PSS) via DHL/FedEx for laboratory evaluation, as well as time-sensitive micro-lot specialty consignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Kenya / Rovil Requires from Foreign Buyers */}
      <section className="py-16 sm:py-20 bg-[#fbf9f6] border-b border-[#ece3db]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a4727]">
              Order Requirements
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#23150c] tracking-tight">
              What We Need from You to Start Your Shipment
            </h2>
            <p className="text-sm sm:text-base text-[#574c43]">
              To prepare export clearance and book ocean container space from Kenya quickly, here is what we require from your company:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUYER_REQUIREMENTS.map((req) => {
              const IconComp = req.icon;
              return (
                <motion.div
                  key={req.step}
                  whileHover={{ y: -3 }}
                  className="bg-white p-6 rounded-2xl border border-[#d8c2b0] space-y-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#23150c] text-[#d89f68] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#7a4727]">
                        Step {req.step}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#23150c]">
                      {req.title}
                    </h3>

                    <p className="text-sm text-[#574c43] leading-relaxed">
                      {req.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. What Rovil Provides (Kenya Export Documentation) */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#ece3db]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Photo & Verification */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#d8c2b0] shadow-sm">
                <Image
                  src="/images/what-we-do/green-coffee-grading.jpg"
                  alt="Green coffee grading in Kenya"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180f08]/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#d89f68]" />
                    <span className="font-bold text-base">Full Export Clearance</span>
                  </div>
                  <p className="text-sm text-white/85">
                    Regulated by Coffee Directorate &amp; Agriculture and Food Authority (AFA).
                  </p>
                </div>
              </div>
            </div>

            {/* Right Documents List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a4727]">
                  Export Documentation
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#23150c] tracking-tight">
                  Official Documents Included with Every Order
                </h2>
                <p className="text-sm sm:text-base text-[#574c43]">
                  All shipments leave Kenya with complete, legalized government export certificates for seamless customs clearance at your destination port.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOCUMENTS_PROVIDED.map((doc) => (
                  <div
                    key={doc.title}
                    className="p-4 rounded-xl bg-[#fbf9f6] border border-[#ece3db] space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-[#23150c]">
                      <CheckCircle2 className="w-4 h-4 text-[#3d5a45] shrink-0" />
                      <span>{doc.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#574c43] leading-relaxed pl-6">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Quick Quote & Sample Request Form */}
      <section id="quote-form" className="py-16 sm:py-20 bg-[#180f08] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Contact & Sample Policy */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d89f68]">
                Commercial Export Desk
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Request a Container Quote or Cupping Sample
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                Tell us your target destination port and grade requirement. Our Nairobi export desk will respond with current FOB/CIF pricing and vessel schedules within 24 hours.
              </p>

              <div className="space-y-3 pt-2 text-sm text-white/85">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d89f68] shrink-0" />
                  <span>Nairobi HQ: +254 721 487 948 / +254 722 661 065</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#d89f68] shrink-0" />
                  <span>Email: info@rovil.co.ke</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#d89f68] shrink-0" />
                  <span>Office: Moi Avenue, Nairobi, Kenya</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-sm text-white/90 space-y-1.5">
                <strong className="text-[#d89f68] block">Pre-Shipment Samples (PSS):</strong>
                <p className="text-xs sm:text-sm text-white/80">250g–500g green coffee or loose leaf tea sample tins sent via DHL Express worldwide for laboratory cupping.</p>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7 bg-white text-[#1f1610] p-7 sm:p-8 rounded-2xl border border-[#d8c2b0] shadow-xl">
              {formSubmitted ? (
                <div className="py-10 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#3d5a45] mx-auto" />
                  <h3 className="font-bold text-xl text-[#23150c]">Inquiry Received</h3>
                  <p className="text-sm text-[#574c43] max-w-sm mx-auto leading-relaxed">
                    Thank you. Our Nairobi export team has received your request and will contact you directly with current FOB/CIF rates.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4 text-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Company / Roastery</label>
                      <input
                        required
                        type="text"
                        placeholder="Company name"
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Destination Port &amp; Country</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Hamburg, Germany"
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Contact Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="procurement@company.com"
                        className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Target Product</label>
                      <select className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none bg-white">
                        <option>Kenyan Arabica Grade AA</option>
                        <option>Kenyan Arabica Grade AB</option>
                        <option>Kenyan Arabica Grade PB (Peaberry)</option>
                        <option>Kenyan Arabica Grade C</option>
                        <option>Commercial Grade MH</option>
                        <option>Kenyan Purple Tea (TRFK 306)</option>
                        <option>Orthodox Whole Leaf Tea</option>
                        <option>Black CTC Tea (BP1 / PF1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-xs text-[#23150c] block mb-1.5">Order Volume</label>
                      <select className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none bg-white">
                        <option>1 x 20ft FCL (320 bags / 19.2 MT)</option>
                        <option>2+ Full Containers</option>
                        <option>LCL Pallet (10–50 bags)</option>
                        <option>Pre-Shipment Sample Only (250g–500g)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-xs text-[#23150c] block mb-1.5">Commercial Notes / Terms</label>
                    <textarea
                      rows={2}
                      placeholder="Specify FOB Mombasa or CIF rates, target shipping month, or special instructions."
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#d8c2b0] focus:ring-2 focus:ring-[#7a4727] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#d89f68]" />
                    <span>Submit Export Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 8. Global Footer */}
      <Footer />
    </div>
  );
}
