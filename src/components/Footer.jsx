import React from "react";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative z-20 bg-black border-t border-white/5 py-12 px-[6vw]"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 font-display text-base font-semibold text-white">
          <img
            src="assets/logo.jpg"
            alt="Nanorlab Logo"
            className="w-[22px] h-[22px] rounded border border-white/10 object-cover"
          />
          <span>Nanorlab</span>
        </div>
        <p className="text-xs text-slate-500 tracking-wide text-center">
          &copy; 2026{" "}
          <a
            href="https://nanorlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-500 transition-colors font-semibold"
          >
            Nanorlab
          </a>
          . All rights reserved. NanorSmart Home Controller (NSC) is a Nanorlab
          product.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://nanorlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors"
          >
            PRIVACY
          </a>
          <a
            href="https://nanorlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors"
          >
            TERMS
          </a>
          <a
            href="https://nanorlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors"
          >
            CONTACT
          </a>
        </div>
      </div>
    </footer>
  );
}
