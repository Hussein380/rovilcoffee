'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Coffee, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('rovil_admin_token', data.token);
        window.location.href = '/admin';
      } else {
        setError('Incorrect phone number. Please try again.');
      }
    } catch {
      setError('Connection error. Please check your internet and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#23150c] flex items-center justify-center px-4">
      {/* Background ambient gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b57a44]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3d6852]/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#b57a44]/20 border border-[#b57a44]/30 flex items-center justify-center mb-4">
              <Coffee className="w-7 h-7 text-[#d89f68]" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">ROVIL Admin</h1>
            <p className="text-xs text-white/50 mt-1">Product Catalog Management</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/60 mb-2 uppercase tracking-wider">
                Admin Phone Number
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="tel"
                  id="admin-phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError('');
                  }}
                  placeholder="07XXXXXXXX"
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/8 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#b57a44]/60 focus:ring-1 focus:ring-[#b57a44]/40 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !phone}
              className="w-full py-3 rounded-xl bg-[#b57a44] hover:bg-[#d89f68] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#b57a44]/20"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Enter Admin Area</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/8 text-center">
            <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              ← Back to Rovil website
            </a>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-6">
          Authorised personnel only. Session expires in 24 hours.
        </p>
      </div>
    </div>
  );
}
