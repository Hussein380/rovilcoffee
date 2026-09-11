'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: 'ROVIL Single Origin Arabica Grade AA',
    customProduct: '',
    quantity: 'Retail / Cafe Carton Order (10 – 200 Packs / Cups)',
    customQuantity: '',
    destinationPort: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left: Contact Info & Export Desk */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-[#7a4727]">
              Nairobi Export Trading Desk
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23150c] tracking-tight">
              Request an Export Quote <span className="text-[#7a4727]">&amp; Samples</span>
            </h2>

            <p className="text-sm text-[#574c43] leading-relaxed">
              Seeking reliable commercial shipments or pre-shipment cupping samples (PSS)? Provide your required grade, volume, and destination port. Our Nairobi trading desk responds within 12 business hours.
            </p>

            <div className="space-y-4 pt-4 border-t border-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-stone-950">Head Office</div>
                  <div className="text-sm text-stone-700">Moi Avenue, P.O. Box 21237-00100</div>
                  <div className="text-sm text-stone-700">Nairobi, Kenya</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-stone-950">Direct Telephone &amp; WhatsApp</div>
                  <div className="text-sm text-stone-700">
                    <a href="tel:+254721487948" className="hover:underline font-medium">+254 721 487 948</a>
                  </div>
                  <div className="text-sm text-stone-700">
                    <a href="tel:+254722661065" className="hover:underline font-medium">+254 722 661 065</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-stone-950">Export Desk Email</div>
                  <a href="mailto:virovillimited@gmail.com" className="text-sm text-stone-700 hover:underline font-medium">
                    virovillimited@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#faf9f7] border border-stone-300 text-sm text-stone-700 space-y-2.5">
              <div className="font-bold text-stone-950 flex items-center justify-between">
                <span>Shipping Policy &amp; Terms:</span>
                <span className="text-[#7a4727] font-bold text-xs uppercase tracking-wider">FOB Only</span>
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div>• <strong className="text-stone-950">Incoterms:</strong> Strict FOB terms (Free On Board).</div>
                <div>• <strong className="text-stone-950">Orders under 1 tonne:</strong> Dispatched by Air Cargo via JKIA Nairobi (freight paid by buyer).</div>
                <div>• <strong className="text-stone-950">1 tonne and above:</strong> Shipped by Sea Freight via Port of Mombasa (freight paid by buyer).</div>
                <div>• <strong className="text-stone-950">Cost Responsibility:</strong> All international shipping and freight costs are paid by the buyer.</div>
                <div>• <strong className="text-stone-950">Licensing:</strong> Regulated Exporter under Kenya Coffee Directorate (AFA).</div>
              </div>
            </div>
          </div>

          {/* Right: Clean B2B Form */}
          <div className="lg:col-span-7 bg-[#faf9f7] p-7 sm:p-9 rounded-sm border border-stone-300">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#7a4727]" />
                <h3 className="text-2xl font-bold text-stone-950">
                  Enquiry Received
                </h3>
                <p className="text-sm text-stone-700 max-w-sm mx-auto leading-relaxed font-normal">
                  Our Nairobi export desk has received your request. We will review your specifications and contact you within <strong>12–24 business hours</strong> with commercial pricing.
                </p>
                <div className="pt-3 border-t border-stone-300 w-full max-w-xs text-sm text-stone-700 space-y-1">
                  <div>Direct Phone: <strong className="text-stone-950">+254 721 487 948</strong></div>
                  <div>Direct Email: <strong className="text-stone-950">virovillimited@gmail.com</strong></div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs font-bold text-stone-950 hover:underline uppercase tracking-wider"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-stone-950">
                  Export Enquiry Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nordic Roasters ApS"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Country of Import *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Germany, USA, Japan"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Destination Port / Airport
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Port of Hamburg / Frankfurt Airport"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Target Commodity / Grade *
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    >
                      <option value="ROVIL Single Origin Arabica Grade AA">ROVIL Arabica Grade AA (Screen 17/18)</option>
                      <option value="ROVIL Arabica Grade AB">ROVIL Arabica Grade AB (Screen 15/16)</option>
                      <option value="ROVIL Arabica Grade PB (Peaberry)">ROVIL Arabica Grade PB (Peaberry)</option>
                      <option value="ROVIL Royal Purple Tea (TRFK 306)">ROVIL Royal Purple Tea (TRFK 306)</option>
                      <option value="ROVIL Black CTC Tea (Bulk / Container)">ROVIL Black CTC Tea (Bulk / Container)</option>
                      <option value="ROVIL Orthodox & Specialty Teas">ROVIL Orthodox &amp; Specialty Teas</option>
                      <option value="ROVIL Packaged Retail Ground Coffee (125g)">ROVIL Packaged Ground Coffee (125g Packs)</option>
                      <option value="ROVIL Packaged Black Orthodox & Purple Tea (150g)">ROVIL Packaged Purple Tea (150g Packs)</option>
                      <option value="ROVIL Highland Pure Green Tea (100g)">ROVIL Highland Green Tea (100g Packs)</option>
                      <option value="ROVIL Roasted Mixed Nuts (Macadamia/Cashew)">ROVIL Roasted Mixed Nuts (150g Packs)</option>
                      <option value="Other">Other (Type custom commodity/grade below)</option>
                    </select>

                    {formData.product === 'Other' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          required
                          placeholder="Type custom product or grade..."
                          value={formData.customProduct}
                          onChange={(e) => setFormData({ ...formData, customProduct: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-400 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                      Estimated Volume *
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-stone-300 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                    >
                      <option value="Cupping Samples Only (PSS 300g)">Cupping Samples Only (PSS 300g by DHL/Courier)</option>
                      <option value="Air Cargo Micro-lot (300kg – 900kg)">Air Cargo Micro-lot (300kg – 900kg via JKIA)</option>
                      <option value="1 × 20ft FCL (320 bags / 19.2 Tonnes)">1 × 20ft FCL Container (320 bags / 19.2 Tonnes)</option>
                      <option value="2 × 20ft FCL (640 bags / 38.4 Tonnes)">2 × 20ft FCL Containers (38.4 Tonnes)</option>
                      <option value="Retail / Cafe Carton Order (10 – 200 Packs)">Retail / Cafe Carton Order (10 – 200 Packs)</option>
                      <option value="Other">Other (Type custom volume/tonnage below)</option>
                    </select>

                    {formData.quantity === 'Other' && (
                      <div className="mt-2">
                        <input
                          type="text"
                          required
                          placeholder="Type custom tonnage or bag quantity..."
                          value={formData.customQuantity}
                          onChange={(e) => setFormData({ ...formData, customQuantity: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-sm border border-stone-400 text-sm text-stone-950 focus:outline-none focus:border-stone-950 bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-stone-900 mb-1.5">
                    Order Details / Specific Packaging Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific grading, moisture targets, sample requests, or delivery timelines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#23150c] bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#23150c] hover:bg-[#382315] text-white py-3 rounded-sm text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Export Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
