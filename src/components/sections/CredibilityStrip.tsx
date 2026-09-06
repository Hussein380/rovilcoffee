import React from 'react';
import { ShieldCheck, Layers, Globe2, Award } from 'lucide-react';

const CREDENTIALS = [
  {
    icon: ShieldCheck,
    title: 'Licensed Exporter',
    highlight: 'Operating from Kenya',
    detail: 'Officially certified under Kenya Coffee Directorate & AFA export standards.',
  },
  {
    icon: Layers,
    title: 'Bulk Supply',
    highlight: 'Commercial Quantities',
    detail: 'Full Container Loads (20ft / 40ft FCL) & consolidated commercial consignments.',
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    highlight: 'International Markets',
    detail: 'Supplying buyers in Europe, UK, USA, Japan, Asia, and regional African ports.',
  },
  {
    icon: Award,
    title: 'Quality Focused',
    highlight: 'SCA Grading Protocol',
    detail: 'Tested for strict moisture (<12%), precise screen sizing, and high cupping scores.',
  },
];

export default function CredibilityStrip() {
  return (
    <section id="credibility" className="relative z-20 -mt-4 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#d4a373]/25 shadow-2xl backdrop-blur-xl">
          <div className="text-xs uppercase tracking-wider text-[#d4a373] mb-6 text-center lg:text-left font-semibold">
            Institutional Verification &amp; Compliance Standards
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {CREDENTIALS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="relative group flex flex-col justify-between p-4 rounded-xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-[#d4a373]/20"
                >
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#d4a373]/10 border border-[#d4a373]/30 flex items-center justify-center text-[#d4a373] group-hover:scale-110 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-wide">
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#d4a373] font-medium mt-0.5">
                        {item.highlight}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#baa99e] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
