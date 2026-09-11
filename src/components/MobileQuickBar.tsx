'use client';

import React from 'react';
import { MessageCircle, FileText, Phone } from 'lucide-react';

export default function MobileQuickBar() {
  return (
    <aside aria-label="Mobile quick trade actions" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#1f140d]/95 backdrop-blur-lg border-t border-[#d8c2b0]/30 px-3 py-2.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* WhatsApp Direct Chat */}
        <a
          href="https://wa.me/254721487948?text=Hello%20Rovil%20Coffee%20%26%20Tea%20Team%2C%20I%20am%20inquiring%20about%20an%20export%20quotation."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp Chat</span>
        </a>

        {/* Request FOB Quote */}
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 bg-[#d89f68] hover:bg-[#c48e58] text-[#1f140d] py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98"
        >
          <FileText className="w-4 h-4" />
          <span>Request Quote</span>
        </a>

      </div>
    </aside>
  );
}
