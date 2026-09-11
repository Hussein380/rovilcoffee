import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Anchor } from 'lucide-react';
import RovilLogo from '@/components/RovilLogo';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-200 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About Rovil */}
          <div className="space-y-4">
            <RovilLogo variant="light" size="md" />
            
            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              Licensed Kenyan export company supplying commercial quantities of high-grown Arabica coffee and specialty teas to international roasters, distributors, and importers worldwide.
            </p>

            <div className="p-3.5 bg-stone-900 rounded-xs border border-stone-800 text-xs text-stone-300 font-medium">
              <span className="font-bold text-white">Regulated Exporter</span> • Kenya Coffee Directorate (AFA) &amp; Agriculture and Food Authority.
            </div>
          </div>

          {/* Col 2: Coffee & Tea Products */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Export Products
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link href="/products" className="text-white font-semibold hover:underline transition-colors">Full Products Catalog</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Kenyan Arabica Grade AA</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Kenyan Arabica Grade AB</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Grade PB (Peaberry)</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Grade C &amp; Machine Hulled (MH)</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Kenyan Purple Tea (TRFK 306)</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Black CTC Tea (BP1, PF1, PD)</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Orthodox Whole-Leaf &amp; Loose Leaf</Link></li>
            </ul>
          </div>

          {/* Col 3: Operations & Markets */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Export Operations
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link href="/our-farm" className="hover:text-white transition-colors">Central Kenya Highlands Farms</Link></li>
              <li><Link href="/what-we-do" className="hover:text-white transition-colors">Wet Milling &amp; Sun-Drying</Link></li>
              <li><Link href="/export-markets" className="hover:text-white transition-colors">Europe, UK &amp; USA Shipping</Link></li>
              <li><Link href="/export-markets" className="hover:text-white transition-colors">Japan &amp; Asia Trade Corridors</Link></li>
              <li><Link href="/export-markets" className="hover:text-white transition-colors">Middle East &amp; African Markets</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Commercial Quotations</Link></li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Nairobi Office &amp; Port
            </h4>
            <div className="space-y-3 text-sm text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-bold">Head Office:</strong>
                  <span>Moi Avenue, P.O. Box 21237-00100</span>
                  <span className="block">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-bold">Direct Telephone:</strong>
                  <a href="tel:+254721487948" className="hover:text-white block font-medium">+254 721 487 948</a>
                  <a href="tel:+254722661065" className="hover:text-white block font-medium">+254 722 661 065</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                <div>
                  <strong className="text-white block font-bold">Export Email:</strong>
                  <a href="mailto:virovillimited@gmail.com" className="hover:text-white block text-xs break-all font-medium">virovillimited@gmail.com</a>
                </div>
              </div>

              <div className="space-y-1.5 pt-1.5 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <Anchor className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">1 tonne or more:</strong> Sea Freight (Port of Mombasa)</span>
                </div>
                <div>
                  <span><strong className="text-white">Under 1 tonne:</strong> Air Freight (JKIA Nairobi)</span>
                </div>
                <div className="text-[11px] text-stone-400 pt-0.5">
                  Strictly FOB terms (all international freight paid by buyer)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Virovil (K) Co. Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Incoterms: FOB Mombasa / JKIA</span>
            <span>•</span>
            <span>Timezone: EAT (UTC+3)</span>
            <span>•</span>
            <Link href="/admin" className="text-stone-400 hover:text-stone-200 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
