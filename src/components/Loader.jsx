import React from "react";

export default function Loader({ percent, isLoading }) {
  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-in-out ${
        !isLoading ? "opacity-0 pointer-events-none invisible" : "opacity-100"
      }`}
    >
      <div className="font-display text-4xl md:text-[2.6rem] font-semibold tracking-tight text-white select-none">
        <span className="text-blue-500">N</span>
        <span className="opacity-60">anorlab</span>
      </div>
      <div className="w-[240px] h-[1px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-white transition-all duration-100 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="font-display text-xs tracking-widest text-slate-500 select-none">
        {percent}%
      </div>
    </div>
  );
}
