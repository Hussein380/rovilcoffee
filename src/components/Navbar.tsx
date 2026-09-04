'use client';

import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Home', href: '/#home' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Our Farm', href: '/#farm' },
  { label: 'Export Markets', href: '/#map' },
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
            <span className="font-medium text-[#f4ece4]">Licensed Coffee Exporter | Kenya</span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/70">Commercial Bulk Shipments from Port of Mombasa</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-xs">
            <span>Nairobi HQ: <strong className="text-white font-normal">+254 721 487 948</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/#home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3e2211] flex items-center justify-center text-white font-bold text-xl shadow-xs">
              R
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-[#23150c] block leading-none">
                ROVIL
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#7a4727] uppercase block mt-1">
                Coffee & Tea Exporters Kenya
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-[#574c43] hover:text-[#23150c] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#3e2211] hover:bg-[#23150c] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-[#23150c] hover:bg-[#f4ece4] transition-colors"
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
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-[#3e2211] hover:bg-[#f4ece4]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 bg-[#3e2211] text-white py-3 rounded-lg text-sm font-semibold"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
