'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

import RovilLogo from '@/components/RovilLogo';

const MENU_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'Products', href: '/products' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Our Farm', href: '/our-farm' },
  { label: 'Export Markets', href: '/export-markets' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ece3db] shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#23150c] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#b57a44]" />
            <span className="font-medium tracking-wide">
              Official Kenya Coffee &amp; Tea Board Licensed Exporters
            </span>
          </div>
          <div className="text-[#d8cbbe] text-[11px] hidden md:block">
            Direct Port Dispatch: Mombasa Port &bull; Worldwide Air &amp; Ocean Freight
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <RovilLogo variant="color" size="md" />

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-[#574c43] hover:text-[#23150c] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#23150c] hover:bg-[#3e2211] text-white px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded text-[#23150c] hover:bg-[#f4ece4] transition-colors"
            aria-label="Open navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#ece3db] px-4 pt-3 pb-6 space-y-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-[#23150c] hover:bg-[#f4ece4]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 bg-[#23150c] text-white py-3 rounded-sm text-xs font-semibold uppercase tracking-wider"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
