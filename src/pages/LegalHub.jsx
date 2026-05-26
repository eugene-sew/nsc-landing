import React from "react";
import { Link } from "react-router-dom";

const pages = [
  {
    to: "/privacy",
    icon: "🔒",
    title: "Privacy Policy",
    desc: "How we collect, use, and protect your personal information.",
    tag: "Required by Play Store",
  },
  {
    to: "/terms",
    icon: "📄",
    title: "Terms of Service",
    desc: "The rules governing your use of the NSC app and hardware.",
    tag: null,
  },
  {
    to: "/app-access",
    icon: "🛂",
    title: "App Access & Permissions",
    desc: "What device permissions the NSC app requests and why.",
    tag: "Play Store · App Access",
  },
  {
    to: "/ads",
    icon: "🚫",
    title: "Ads Policy",
    desc: "Confirmation that NanorSmart contains no advertising.",
    tag: "Play Store · Ads",
  },
  {
    to: "/content-rating",
    icon: "⭐",
    title: "Content Rating",
    desc: "IARC / Google Play content rating: Everyone (E).",
    tag: "Play Store · Content Rating",
  },
  {
    to: "/target-audience",
    icon: "👥",
    title: "Target Audience",
    desc: "Who NanorSmart is designed for and our age policy.",
    tag: "Play Store · Target Audience",
  },
  {
    to: "/data-safety",
    icon: "🛡️",
    title: "Data Safety",
    desc: "What data is collected, shared, and how it's secured.",
    tag: "Play Store · Data Safety",
  },
  {
    to: "/government-apps",
    icon: "🏛️",
    title: "Government Apps",
    desc: "Declaration that NSC is not a government application.",
    tag: "Play Store · Gov Apps",
  },
  {
    to: "/financial-features",
    icon: "💳",
    title: "Financial Features",
    desc: "Disclosure of payment and financial feature status (none).",
    tag: "Play Store · Financial",
  },
  {
    to: "/health-features",
    icon: "🏥",
    title: "Health Features",
    desc: "Disclosure of health-related features and data handling (none).",
    tag: "Play Store · Health",
  },
];

export default function LegalHub() {
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
        <Link to="/" className="text-xs font-semibold tracking-widest text-slate-400 hover:text-white transition-colors uppercase">
          ← Back to site
        </Link>
      </header>

      <main className="pt-[100px] pb-24 px-[6vw] max-w-[1000px] mx-auto">
        <div className="mb-12 pb-8 border-b border-white/8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">
            Legal & Compliance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Legal Information
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-[52ch]">
            All legal documentation for the NanorSmart Home Controller — including policies required for the Google Play Store listing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pages.map(({ to, icon, title, desc, tag }) => (
            <Link
              key={to}
              to={to}
              className="group flex gap-4 items-start p-5 rounded-xl border border-white/8 bg-white/2 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200"
            >
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm mb-1 group-hover:text-blue-300 transition-colors">
                  {title}
                </p>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                {tag && (
                  <span className="inline-block mt-2 text-[10px] font-semibold tracking-wider uppercase text-blue-500/70 bg-blue-500/10 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                )}
              </div>
              <span className="text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5">→</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/5 py-8 px-[6vw] text-center">
        <p className="text-xs text-slate-600">
          © 2026 Nanorlab. All rights reserved. Questions? <a href="mailto:legal@nanorlab.com" className="text-blue-400 hover:underline">legal@nanorlab.com</a>
        </p>
      </footer>
    </div>
  );
}
