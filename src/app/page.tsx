import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import ContactQuote from '@/components/ContactQuote';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f1610] flex flex-col font-sans">
      {/* 1. Responsive Navbar with complete menu */}
      <Navbar />

      {/* 2. Hero Section: Split-screen with Text on Left, Real 3D Earth Globe with real continents and animated dots on Right */}
      <Hero />

      {/* 3. What We Do: Simple, direct breakdown of Kenyan Arabica Coffee Grades, Kenyan Teas, and Farm-to-Port process */}
      <WhatWeDo />

      {/* 4. Request a Commercial Quote / B2B Export Contact Form */}
      <ContactQuote />

      {/* 5. Comprehensive Corporate Footer with verified Nairobi details */}
      <Footer />
    </main>
  );
}
