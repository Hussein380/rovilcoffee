'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactQuote() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: 'Kenyan Arabica Coffee (Grade AA / AB)',
    quantity: '1 Full Container Load (20ft FCL / 19.2 MT)',
    destinationPort: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#fbf9f6] border-t border-[#ece3db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ece4] text-[#5c351c] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nairobi Export Desk</span>
            </div>

            <h2 className="text-3xl font-extrabold text-[#23150c] tracking-tight">
              Request a Bulk Export Quote
            </h2>

            <p className="text-base text-[#574c43] leading-relaxed">
              Looking for reliable shipments of Kenyan coffee or tea? Tell us your specifications, volume requirements, and destination port. Our export team will respond with a direct commercial quotation.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#ece3db]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#23150c]">Nairobi Headquarters</div>
                  <div className="text-xs text-[#574c43]">Moi Avenue, P.O. Box 21237-00100</div>
                  <div className="text-xs text-[#574c43]">Nairobi, Kenya</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#23150c]">Direct Telephone Lines</div>
                  <div className="text-xs text-[#574c43]">+254 721 487 948</div>
                  <div className="text-xs text-[#574c43]">+254 722 661 065</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#7a4727] shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-[#23150c]">Export Email Desk</div>
                  <a href="mailto:info@rovil.co.ke" className="text-xs text-[#3e2211] font-semibold hover:underline">
                    info@rovil.co.ke
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#ece3db] text-xs text-[#574c43] space-y-1">
              <div className="font-bold text-[#23150c]">Commercial Terms:</div>
              <div>• Incoterms 2020: FOB Mombasa or CIF Destination Port</div>
              <div>• Minimum Order: 1 FCL (19.2 Metric Tonnes) or consolidated LCL pallets</div>
              <div>• Regulated: Licensed Exporter under Kenya Coffee Directorate</div>
            </div>
          </div>

          {/* Right: The Simple B2B Quote Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#ece3db] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#f4ece4] text-[#3e2211] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#7a4727]" />
                </div>
                <h3 className="text-2xl font-bold text-[#23150c]">
                  Enquiry Received
                </h3>
                <p className="text-sm text-[#574c43] max-w-md mx-auto">
                  Thank you. Our Nairobi export team has received your request and will review your specifications and contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#3e2211] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-[#23150c] mb-2">
                  Tell Us What You Need
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Global Roasters Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Buyer Country *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Germany, UK, USA, Japan"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Destination Port *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rotterdam, London, Yokohama"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Product Interested In
                    </label>
                    <select
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    >
                      <option>Kenyan Arabica Coffee Grade AA</option>
                      <option>Kenyan Arabica Coffee Grade AB</option>
                      <option>Kenyan Arabica Coffee Grade PB (Peaberry)</option>
                      <option>Kenyan Arabica Coffee Grade C</option>
                      <option>Kenyan Arabica Coffee Grade MH</option>
                      <option>Kenyan Purple Tea (TRFK 306)</option>
                      <option>Black CTC Tea (BP1 / PF1 / PD)</option>
                      <option>Kenyan Orthodox Whole-Leaf Tea</option>
                      <option>Loose Leaf Specialty Tea</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23150c] mb-1">
                      Estimated Volume
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                    >
                      <option>1 x 20ft Container (~19.2 Metric Tonnes / 320 Bags)</option>
                      <option>2+ Containers (Commercial Bulk Supply)</option>
                      <option>Trial Commercial Pallet (10 – 50 Bags)</option>
                      <option>Specialty Micro-lot Allocation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#23150c] mb-1">
                    Order Details / Specific Packaging Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide any specific grading, moisture targets, sample requests, or delivery timelines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#ece3db] text-sm text-[#23150c] focus:outline-none focus:border-[#7a4727] bg-[#fbf9f6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#3e2211] hover:bg-[#23150c] text-white py-3.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Bulk Export Enquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
