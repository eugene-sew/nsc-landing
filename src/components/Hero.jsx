import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-[6vw] pt-24 pb-12 overflow-hidden z-10">
      <div className="flex-1 flex flex-col items-start text-left max-w-xl pr-4">
        <div className="flex items-center gap-3 mb-6 select-none animate-pulse">
          <span className="w-6 h-[1px] bg-blue-500"></span>
          <span className="text-xs tracking-widest font-display text-blue-500 uppercase">
            001 / Master Your Space
          </span>
        </div>
        <h1 className="font-display text-[2.8rem] md:text-[4.2rem] font-bold leading-[1.05] tracking-tight text-white mb-8">
          Master Your <span className="hero-accent">Space. Effortlessly.</span>
        </h1>
        <p className="text-slate-400 text-[1.05rem] leading-relaxed mb-10 max-w-lg">
          Meet the NanorSmart Home Controller (NSC). The harmony of robust
          hardware and a beautifully intuitive interface. Take absolute control
          of your lighting, climate, and security from anywhere.
        </p>
        <div className="flex flex-wrap gap-4 w-full">
          <a
            href="#dashboard"
            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-blue-500/20"
          >
            Get Started
          </a>
          <a
            href="#dashboard"
            className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors"
          >
            Explore the App
          </a>
        </div>
      </div>

      {/* Dynamic Hero Visual (Preserving user's gorgeous scale asset updates!) */}
      <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0 max-w-3xl w-full">
        <div className="relative flex items-center justify-center w-full gap-8">
          <img
            src="assets/hero.png"
            alt="NanorSmart Controller box sleek physical render"
            className="w-[800px] object-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Scroll Hints */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity select-none cursor-pointer z-10">
        <span className="text-[10px] tracking-[0.25em] font-display text-slate-500 uppercase">
          Scroll to explore
        </span>
        <div className="w-[16px] h-[24px] border border-slate-600 rounded-full flex justify-center p-1 relative">
          <div className="w-[3px] h-[3px] bg-slate-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
