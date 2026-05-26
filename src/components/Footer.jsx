import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-20 bg-black border-t border-white/5 py-12 px-[6vw]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 font-display text-base font-semibold text-white mb-2">
              <img
                src="assets/logo.jpg"
                alt="Nanorlab Logo"
                className="w-[22px] h-[22px] rounded border border-white/10 object-cover"
              />
              <span>Nanorlab</span>
            </div>
            <p className="text-xs text-slate-600 max-w-[28ch]">
              Precision-engineered smart home automation hardware and software.
            </p>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-2">Legal</p>
              <div className="flex flex-col gap-1.5">
                <Link to="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                <Link to="/legal" className="text-xs text-slate-500 hover:text-white transition-colors">All Legal Docs</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-2">Play Store</p>
              <div className="flex flex-col gap-1.5">
                <Link to="/data-safety" className="text-xs text-slate-500 hover:text-white transition-colors">Data Safety</Link>
                <Link to="/content-rating" className="text-xs text-slate-500 hover:text-white transition-colors">Content Rating</Link>
                <Link to="/app-access" className="text-xs text-slate-500 hover:text-white transition-colors">App Access</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-2">Contact</p>
              <div className="flex flex-col gap-1.5">
                <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 hover:text-white transition-colors">Website</a>
                <a href="mailto:support@nanorlab.com" className="text-xs text-slate-500 hover:text-white transition-colors">Support</a>
                <a href="mailto:privacy@nanorlab.com" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center md:text-left">
            © 2026{" "}
            <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors font-semibold">
              Nanorlab
            </a>
            . All rights reserved. NanorSmart Home Controller (NSC) is a Nanorlab product.
          </p>
          <p className="text-[10px] text-slate-700 tracking-wide">
            v3.0 · Firebase · ESP32 · LAN Control
          </p>
        </div>
      </div>
    </footer>
  );
}
