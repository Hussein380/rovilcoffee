'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

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
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3e2211] via-[#23150c] to-[#120a06] border border-[#b57a44]/30 flex items-center justify-center shadow-md shadow-[#23150c]/15 group-hover:scale-105 transition-all duration-300">
              <span className="text-white font-serif font-black text-xl tracking-tight">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-black tracking-tight text-[#23150c] group-hover:text-[#7a4727] transition-colors leading-none">
                ROVIL
              </span>
              <span className="text-xs font-semibold tracking-wide text-[#7a4727] uppercase block mt-1">
                Coffee &amp; Tea Exporters Kenya
              </span>
            </div>
          </Link>

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

          {/* Desktop CTA & Admin Entrance */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl border border-[#e4d7ca] bg-[#f9f6f2] hover:bg-[#f1e9df] hover:border-[#b57a44]/60 flex items-center justify-center text-[#5c3a21] hover:text-[#23150c] transition-all duration-200 group relative shadow-xs"
              title="Staff &amp; Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4 text-[#8a5732] group-hover:text-[#23150c] transition-colors" />
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#23150c] px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-50">
                Staff Portal
              </span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#3e2211] hover:bg-[#23150c] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-[#3e2211] hover:bg-[#f4ece4]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 border border-[#e4d7ca] bg-[#f9f6f2] text-[#5c3a21] py-2.5 rounded-xl text-xs font-semibold hover:bg-[#f1e9df] transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-[#8a5732]" />
              <span>Staff Portal</span>
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center flex items-center justify-center gap-2 bg-[#3e2211] text-white py-3 rounded-lg text-sm font-semibold"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
