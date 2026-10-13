'use client';

import React from 'react';
import { ShieldAlert, RefreshCw, Mail, Phone } from 'lucide-react';
import RovilLogo from '@/components/RovilLogo';

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#23150c] flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="py-6 px-6 sm:px-12 border-b border-[#ece3db] bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <RovilLogo variant="color" size="md" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7a4727] bg-[#f4ece4] px-3 py-1 rounded-full border border-[#d8c2b0]">
            System Notice
          </span>
        </div>
      </header>

      {/* Center Notice */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-[#d8c2b0] p-8 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#7a4727]">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#23150c] tracking-tight">
              Service Temporarily Suspended
            </h1>
            <p className="text-sm sm:text-base text-[#574c43] leading-relaxed">
              This website and its product catalog are currently offline for administrative servicing and system updates. Public access has been temporarily paused.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#faf9f7] border border-[#ece3db] text-xs text-[#7d7065] space-y-2 text-left">
            <div className="flex items-center gap-2 font-semibold text-[#23150c]">
              <RefreshCw className="w-4 h-4 text-[#7a4727] animate-spin" />
              <span>Status: Offline for Scheduled Servicing</span>
            </div>
            <p className="leading-relaxed">
              Full service and commercial access will be restored once administrative maintenance is finalized.
            </p>
          </div>

          <div className="pt-2 border-t border-[#ece3db] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#574c43]">
            <a
              href="mailto:info@rovilcoffee.com"
              className="flex items-center gap-1.5 hover:text-[#23150c] font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#7a4727]" />
              <span>info@rovilcoffee.com</span>
            </a>
            <span className="hidden sm:inline text-stone-300">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#7a4727]" />
              <span>Nairobi, Kenya</span>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 text-center text-xs text-[#7d7065] border-t border-[#ece3db] bg-white">
        &copy; {new Date().getFullYear()} Virovil (K) Co. Ltd. All rights reserved.
      </footer>
    </div>
  );
}
