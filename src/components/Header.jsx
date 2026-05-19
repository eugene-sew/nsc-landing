import React from "react";

export default function Header({ siteHeaderRef }) {
  return (
    <header
      ref={siteHeaderRef}
      className="fixed top-0 left-0 right-0 z-[900] px-[6vw] h-[72px] flex items-center border-b border-transparent transition-all duration-400 scrolled:bg-black/85 scrolled:backdrop-blur-md scrolled:border-white/5"
    >
      <nav className="w-full flex items-center justify-between">
        <a
          href="https://nanorlab.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-wide text-white hover:opacity-75 transition-opacity"
        >
          <img
            src="assets/logo.jpg"
            alt="Nanorlab Logo"
            className="w-[26px] h-[26px] rounded-md border border-white/12 object-cover"
          />
          <span>Nanorlab</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li>
            <a
              href="#dashboard"
              className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              DASHBOARD
            </a>
          </li>
          <li>
            <a
              href="#automation"
              className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              AUTOMATION
            </a>
          </li>
          <li>
            <a
              href="#access"
              className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              ACCESS
            </a>
          </li>
          <li>
            <a
              href="#hardware"
              className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              HARDWARE
            </a>
          </li>
          <li>
            <a
              href="https://nanorlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[22px] py-[8px] border border-blue-500/30 rounded-md text-blue-500 hover:bg-blue-500/10 text-xs font-semibold tracking-widest transition-all"
            >
              GET STARTED
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
