import React from "react";
import { Link } from "react-router-dom";

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-[6vw] h-[68px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-base font-semibold text-white hover:opacity-80 transition-opacity">
          <img
            src="/assets/logo.jpg"
            alt="Nanorlab"
            className="w-[22px] h-[22px] rounded border border-white/10 object-cover"
          />
          <span>Nanorlab</span>
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold tracking-widest text-slate-400 hover:text-white transition-colors uppercase"
        >
          ← Back to site
        </Link>
      </header>

      {/* Content */}
      <main className="pt-[100px] pb-24 px-[6vw] max-w-[860px] mx-auto">
        {/* Page header */}
        <div className="mb-12 pb-8 border-b border-white/8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">
            Legal · NanorSmart Home Controller
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-slate-400 text-base leading-relaxed max-w-[52ch]">
              {subtitle}
            </p>
          )}
          <p className="text-xs text-slate-600 mt-4">
            Last updated: May 26, 2026 · Effective: May 26, 2026
          </p>
        </div>

        {/* Legal body */}
        <div className="legal-body prose-custom">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-[6vw] text-center">
        <p className="text-xs text-slate-600">
          © 2026 Nanorlab. All rights reserved. NanorSmart Home Controller is a Nanorlab product.
        </p>
        <div className="flex items-center justify-center gap-6 mt-4">
          <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/data-safety" className="text-xs text-slate-500 hover:text-white transition-colors">Data Safety</Link>
        </div>
      </footer>
    </div>
  );
}
