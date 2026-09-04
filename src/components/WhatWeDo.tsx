import React from 'react';
import { Coffee, Leaf, Sprout, CheckCircle2, ArrowRight } from 'lucide-react';

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-[#7a4727] font-bold mb-2 font-mono">
            Direct Kenyan Origin Supply
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23150c] tracking-tight">
            What We Do
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#574c43] leading-relaxed">
            We supply international buyers with authentic Kenyan coffee and tea in commercial bulk quantities. We take care of everything from farm harvesting and processing to grading, quality testing, and international shipping.
          </p>
        </div>

        {/* The Two Main Export Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Kenyan Arabica Coffee */}
          <div id="coffee" className="bg-[#fbf9f6] border border-[#ece3db] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#3e2211]">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7a4727] font-semibold">
                    Core Product
                  </span>
                  <h3 className="text-2xl font-bold text-[#23150c]">
                    Kenyan Arabica Coffee
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#574c43] leading-relaxed">
                Kenyan Arabica is world-famous for its bright citrus acidity, rich body, and intense blackcurrant sweetness. We supply raw green coffee beans sorted to standard Kenyan export grades:
              </p>

              {/* Coffee Grades List */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white rounded-lg border border-[#ece3db] flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#3e2211] text-white font-bold text-xs font-mono">
                    AA
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#23150c]">Grade AA (Screen 17/18)</div>
                    <div className="text-xs text-[#574c43]">Large, dense beans. Flagship premium export grade with exceptional flavor clarity.</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db] flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#5c351c] text-white font-bold text-xs font-mono">
                    AB
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#23150c]">Grade AB (Screen 15/16)</div>
                    <div className="text-xs text-[#574c43]">The highest volume commercial export grade. Consistent density and balanced cup.</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db] flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#7a4727] text-white font-bold text-xs font-mono">
                    PB
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#23150c]">Grade PB (Peaberry)</div>
                    <div className="text-xs text-[#574c43]">Rare single round beans (~5% of harvest) with concentrated sweetness and uniform roasting.</div>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db] flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#b57a44] text-white font-bold text-xs font-mono">
                    C & MH
                  </span>
                  <div>
                    <div className="text-sm font-bold text-[#23150c]">Grade C & Machine Hulled (MH)</div>
                    <div className="text-xs text-[#574c43]">Smaller beans and commercial grades, ideal for roasting blends and commercial food service.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ece3db] flex items-center justify-between">
              <span className="text-xs text-[#574c43]">Packaging: 60kg Sisal Bags + GrainPro Liner</span>
              <a href="#contact" className="text-xs font-bold text-[#3e2211] hover:text-[#7a4727] flex items-center gap-1">
                <span>Inquire Coffee</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Kenyan Tea */}
          <div id="tea" className="bg-[#fbf9f6] border border-[#ece3db] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f4ece4] border border-[#d8c2b0] flex items-center justify-center text-[#3e2211]">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#7a4727] font-semibold">
                    Core Product
                  </span>
                  <h3 className="text-2xl font-bold text-[#23150c]">
                    Kenyan Teas
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#574c43] leading-relaxed">
                Kenya is one of the world's leading tea producers. Grown in high-altitude volcanic soils with abundant rainfall, our teas offer distinctive briskness, amber color, and high antioxidant levels.
              </p>

              {/* Tea Varieties List */}
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-white rounded-lg border border-[#ece3db]">
                  <div className="text-sm font-bold text-[#23150c]">Kenyan Purple Tea (TRFK 306)</div>
                  <div className="text-xs text-[#574c43]">A rare cultivar rich in anthocyanins, producing a light violet liquor with a smooth, sweet taste.</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db]">
                  <div className="text-sm font-bold text-[#23150c]">Black CTC Tea (BP1, PF1, PD, D1)</div>
                  <div className="text-xs text-[#574c43]">High commercial demand export tea. Rich amber color, robust malty flavor, perfect for tea bags and milk.</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db]">
                  <div className="text-sm font-bold text-[#23150c]">Orthodox Whole-Leaf Tea</div>
                  <div className="text-xs text-[#574c43]">Artisanal rolled whole leaf with golden tips and floral aroma, selected for specialty tea merchants.</div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#ece3db]">
                  <div className="text-sm font-bold text-[#23150c]">Loose Leaf Specialty</div>
                  <div className="text-xs text-[#574c43]">Carefully hand-plucked top leaves and buds for premium blending and private labels.</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#ece3db] flex items-center justify-between">
              <span className="text-xs text-[#574c43]">Packaging: 25kg & 50kg Multi-Wall Paper Sacks</span>
              <a href="#contact" className="text-xs font-bold text-[#3e2211] hover:text-[#7a4727] flex items-center gap-1">
                <span>Inquire Tea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Section 3: Farm to Port Operations */}
        <div id="farm" className="pt-8 border-t border-[#ece3db]">
          <div className="max-w-2xl mb-8">
            <div className="text-xs uppercase tracking-widest text-[#7a4727] font-bold mb-1 font-mono">
              Direct Transparency
            </div>
            <h3 className="text-2xl font-bold text-[#23150c]">
              How We Handle Your Order (From Farm to Port)
            </h3>
            <p className="text-sm text-[#574c43] mt-2">
              We are not just a middleman. We manage the agricultural and export process directly in Kenya:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
              <div className="w-9 h-9 rounded-lg bg-[#3e2211] text-white flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h4 className="text-base font-bold text-[#23150c]">Cultivation & Selective Harvest</h4>
              <p className="text-xs text-[#574c43] mt-2 leading-relaxed">
                Coffee and tea are grown in the Central Kenya highlands at 1,700m to 2,100m elevation. Only ripe red cherries are handpicked to protect bean quality.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
              <div className="w-9 h-9 rounded-lg bg-[#5c351c] text-white flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h4 className="text-base font-bold text-[#23150c]">Washing, Sun-Drying & Grading</h4>
              <p className="text-xs text-[#574c43] mt-2 leading-relaxed">
                Cherries undergo wet pulping and natural sun-drying on raised African beds. Dry mills mechanically sort beans by screen size (AA, AB, PB, C).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#fbf9f6] border border-[#ece3db]">
              <div className="w-9 h-9 rounded-lg bg-[#7a4727] text-white flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h4 className="text-base font-bold text-[#23150c]">Export Clearance & Port Shipping</h4>
              <p className="text-xs text-[#574c43] mt-2 leading-relaxed">
                We handle export documentation (Phytosanitary, Certificate of Origin, Bill of Lading) and load containers for ocean transit through the Port of Mombasa.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
