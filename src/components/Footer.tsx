import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Anchor } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#23150c] text-[#ece3db] pt-16 pb-12 border-t border-[#3e2211]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About Rovil */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#b57a44] flex items-center justify-center text-[#23150c] font-bold text-xl">
                R
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  ROVIL
                </span>
                <span className="text-[10px] tracking-wider text-[#d8c2b0] uppercase block">
                  Coffee & Tea Exporters Kenya
                </span>
              </div>
            </div>
            
            <p className="text-xs text-[#d8c2b0] leading-relaxed">
              We are an authorized Kenyan export company supplying commercial quantities of high-grown Arabica coffee and specialty teas to international roasters, distributors, and importers worldwide.
            </p>

            <div className="p-3 bg-[#170e08] rounded-lg border border-white/10 flex items-center gap-2 text-xs text-[#d8c2b0]">
              <ShieldCheck className="w-4 h-4 text-[#b57a44] shrink-0" />
              <span>Licensed Coffee Exporter | Kenya</span>
            </div>
          </div>

          {/* Col 2: Coffee & Tea Products */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Export Products
            </h4>
            <ul className="space-y-2 text-xs text-[#d8c2b0]">
              <li><a href="#coffee" className="hover:text-white transition-colors">Kenyan Arabica Grade AA</a></li>
              <li><a href="#coffee" className="hover:text-white transition-colors">Kenyan Arabica Grade AB</a></li>
              <li><a href="#coffee" className="hover:text-white transition-colors">Grade PB (Peaberry)</a></li>
              <li><a href="#coffee" className="hover:text-white transition-colors">Grade C & Machine Hulled (MH)</a></li>
              <li><a href="#tea" className="hover:text-white transition-colors">Kenyan Purple Tea (TRFK 306)</a></li>
              <li><a href="#tea" className="hover:text-white transition-colors">Black CTC Tea (BP1, PF1, PD)</a></li>
              <li><a href="#tea" className="hover:text-white transition-colors">Orthodox Whole-Leaf & Loose Leaf</a></li>
            </ul>
          </div>

          {/* Col 3: Operations & Markets */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Export Operations
            </h4>
            <ul className="space-y-2 text-xs text-[#d8c2b0]">
              <li><a href="#farm" className="hover:text-white transition-colors">Central Kenya Highlands Farms</a></li>
              <li><a href="#what-we-do" className="hover:text-white transition-colors">Wet Milling & Sun-Drying</a></li>
              <li><a href="#map" className="hover:text-white transition-colors">Europe, UK & USA Shipping</a></li>
              <li><a href="#map" className="hover:text-white transition-colors">Japan & Asia Trade Corridors</a></li>
              <li><a href="#map" className="hover:text-white transition-colors">Middle East & African Markets</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Request a Commercial Quote</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Nairobi Office & Port
            </h4>
            <div className="space-y-3 text-xs text-[#d8c2b0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#b57a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Head Office:</strong>
                  <span>Moi Avenue, P.O. Box 21237-00100</span>
                  <span className="block">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#b57a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Phone Numbers:</strong>
                  <a href="tel:+254721487948" className="hover:text-white block">+254 721 487 948</a>
                  <a href="tel:+254722661065" className="hover:text-white block">+254 722 661 065</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#b57a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Export Email:</strong>
                  <a href="mailto:info@rovil.co.ke" className="hover:text-white block">info@rovil.co.ke</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-[11px]">
                <Anchor className="w-4 h-4 text-[#b57a44] shrink-0 mt-0.5" />
                <span>Ocean Shipments: <strong>Port of Mombasa (Kilindini)</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a4968b]">
          <div>
            © {new Date().getFullYear()} Rovil Enterprises Limited. All rights reserved. Licensed Kenyan Coffee Exporter.
          </div>
          <div className="flex items-center gap-4">
            <span>Incoterms: FOB Mombasa / CIF Target Port</span>
            <span>•</span>
            <span>Operating Timezone: EAT (UTC+3)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
