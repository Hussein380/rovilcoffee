import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import GlobalTradeCorridors from '@/components/GlobalTradeCorridors';
import ContactQuote from '@/components/ContactQuote';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rovil Coffee & Tea | Licensed Kenyan Exporters | Virovil (K) Co. Ltd',
  description:
    'Licensed Kenyan exporter of single-origin Arabica green coffee (Grades AA, AB, PB), rare Royal Purple Tea (TRFK 306), black orthodox teas, and macadamia nuts from Mount Kenya. Full lot traceability, EUDR compliance, and strict FOB Mombasa Incoterms.',
  alternates: {
    canonical: 'https://rovilcoffee.com',
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1610] flex flex-col">
      {/* 1. Responsive Navbar with complete menu & live contact */}
      <Navbar />

      {/* 2. Hero Section: Luxury FMCG Advertising Stage with 2 Criss-Crossing Flagship Products */}
      <Hero />

      {/* 3. Product Packshot Showcase & Direct Export Dossier */}
      <WhatWeDo />

      {/* 4. Global Trade Corridors & Interactive 3D Trade Earth */}
      <GlobalTradeCorridors />

      {/* 5. Request a Commercial Quote / B2B Export Contact Form */}
      <ContactQuote />

      {/* 6. Comprehensive Corporate Footer with verified Nairobi details */}
      <Footer />
    </main>
  );
}

