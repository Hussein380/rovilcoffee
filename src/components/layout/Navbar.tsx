'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, ArrowUpRight, PhoneCall } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';

const NAV_ITEMS = [
  { label: 'Origin', href: '#hero' },
  { label: 'What We Export', href: '#products' },
  { label: 'Coffee Grades', href: '#coffee' },
  { label: 'Tea Portfolio', href: '#tea' },
  { label: 'Our Farm', href: '#farm' },
  { label: 'Quality & Port', href: '#quality-logistics' },
  { label: 'Global Markets', href: '#markets' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Credibility Announcement Bar */}
      <div className="bg-[#120e0a] border-b border-[#d4a373]/15 text-[11px] text-[#baa99e] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[#d4a373] font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{companyInfo.licensing.status}</span>
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Port of Mombasa (Kilindini Harbour) Commercial Shipments</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${companyInfo.contacts.phonePrimary}`}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-[#d4a373]" />
              <span className="hidden md:inline">{companyInfo.contacts.phonePrimary}</span>
            </a>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="text-xs text-[#d4a373] hidden md:inline">Nairobi: EAT (UTC+3)</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphism Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090705]/90 backdrop-blur-md border-b border-[#d4a373]/20 shadow-xl py-3'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Corporate Identifier */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a373] to-[#8c5e32] flex items-center justify-center text-black font-bold text-lg tracking-wider shadow-md group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="text-xl font-bold tracking-widest text-white uppercase font-heading block leading-tight">
                ROVIL
              </span>
              <span className="text-[10px] tracking-wider text-[#d4a373] uppercase block font-sans font-medium">
                Kenyan Coffee & Tea Exporters
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-[#d4a373] bg-[#d4a373]/10 font-semibold'
                      : 'text-[#baa99e] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#rfq-quote"
              className="gold-button px-4 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              <span>Request Bulk Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#baa99e] hover:text-white hover:bg-white/5 border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0a07] border-b border-[#d4a373]/20 px-4 pt-3 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm text-[#baa99e] hover:text-white hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10">
              <a
                href="#rfq-quote"
                onClick={() => setMobileMenuOpen(false)}
                className="gold-button w-full py-2.5 rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <span>Request a Bulk Export Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
