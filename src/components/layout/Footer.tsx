import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Anchor, ArrowUpRight } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';

export default function Footer() {
  return (
    <footer className="bg-[#070503] border-t border-[#d4a373]/20 pt-16 pb-12 text-[#baa99e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Corporate Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a373] to-[#8c5e32] flex items-center justify-center text-black font-bold text-lg tracking-wider">
                R
              </div>
              <div>
                <span className="text-xl font-bold tracking-widest text-white uppercase font-heading block">
                  ROVIL
                </span>
                <span className="text-[10px] tracking-widest text-[#d4a373] uppercase block font-sans">
                  Kenyan Coffee & Tea Exporters
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#baa99e] max-w-sm">
              Connecting premium Arabica coffee and distinct teas grown in Kenya’s fertile highlands to commercial roasters, importers, and distributors across Africa, Europe, the UK, the USA, Asia, and Japan.
            </p>

            {/* Official Licensing Box */}
            <div className="glass-panel p-3.5 rounded-xl border border-[#d4a373]/30 max-w-sm">
              <div className="flex items-center gap-2 text-[#d4a373] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
                <span>{companyInfo.licensing.status}</span>
              </div>
              <div className="text-[11px] text-white/70 mt-1">
                Authorized origin trade under Kenya Coffee Directorate & AFA regulations.
              </div>
            </div>
          </div>

          {/* Column 2: Coffee Export Grades */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Kenyan Arabica Grades
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#coffee" className="hover:text-[#d4a373] transition-colors flex items-center justify-between">
                  <span>Grade AA (Screen 17/18)</span>
                  <span className="text-[10px] text-[#d4a373] font-mono">Flagship</span>
                </a>
              </li>
              <li>
                <a href="#coffee" className="hover:text-[#d4a373] transition-colors flex items-center justify-between">
                  <span>Grade AB (Screen 15/16)</span>
                  <span className="text-[10px] text-white/40 font-mono">High Vol</span>
                </a>
              </li>
              <li>
                <a href="#coffee" className="hover:text-[#d4a373] transition-colors flex items-center justify-between">
                  <span>Grade PB (Peaberry)</span>
                  <span className="text-[10px] text-white/40 font-mono">Specialty</span>
                </a>
              </li>
              <li>
                <a href="#coffee" className="hover:text-[#d4a373] transition-colors flex items-center justify-between">
                  <span>Grade C (Screen 14/15)</span>
                  <span className="text-[10px] text-white/40 font-mono">Blend</span>
                </a>
              </li>
              <li>
                <a href="#coffee" className="hover:text-[#d4a373] transition-colors flex items-center justify-between">
                  <span>Grade MH (Machine Hulled)</span>
                  <span className="text-[10px] text-white/40 font-mono">Commercial</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tea Portfolio & Operations */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Export Tea & Provenance
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tea" className="hover:text-[#d4a373] transition-colors">
                  Kenyan Purple Tea (TRFK 306)
                </a>
              </li>
              <li>
                <a href="#tea" className="hover:text-[#d4a373] transition-colors">
                  Orthodox Whole Leaf Tea
                </a>
              </li>
              <li>
                <a href="#tea" className="hover:text-[#d4a373] transition-colors">
                  Black Tea CTC (BP1 / PF1 / PD)
                </a>
              </li>
              <li>
                <a href="#tea" className="hover:text-[#d4a373] transition-colors">
                  Loose Leaf Specialty
                </a>
              </li>
              <li className="pt-2 border-t border-white/5">
                <a href="#farm" className="hover:text-[#d4a373] transition-colors flex items-center gap-1 text-[#d4a373]">
                  <span>6-Stage Farm Lifecycle</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Nairobi Export Desk */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-white font-semibold mb-4">
              Nairobi Export Desk
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{companyInfo.address.street}</div>
                  <div>{companyInfo.address.poBox}</div>
                  <div>{companyInfo.address.city}, {companyInfo.address.country}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4a373] shrink-0" />
                <div className="space-y-0.5">
                  <a href={`tel:${companyInfo.contacts.phonePrimary}`} className="hover:text-white block">
                    {companyInfo.contacts.phonePrimary}
                  </a>
                  <a href={`tel:${companyInfo.contacts.phoneSecondary}`} className="hover:text-white block">
                    {companyInfo.contacts.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a href={`mailto:${companyInfo.contacts.email}`} className="hover:text-white">
                  {companyInfo.contacts.email}
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#baa99e]">
                <Anchor className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>Ocean Port: Kilindini, Mombasa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786c64]">
          <div>
            © {new Date().getFullYear()} {companyInfo.legalEntity}. All rights reserved. Licensed Kenyan Coffee Exporter.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#d4a373]">Terms of Bulk Supply: Incoterms 2020 (FOB / CIF / CFR)</span>
            <span>Commercial Export Desk: EAT (UTC+3)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
