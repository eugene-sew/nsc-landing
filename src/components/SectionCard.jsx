import React from "react";

export default function SectionCard({ section }) {
  const {
    id,
    enter,
    leave,
    animation,
    reverse,
    label,
    title,
    body,
    bullets,
    visualType,
    visualSrc,
    visualSrcs,
    visualAlt,
    visualAlts,
    hardwareSrc,
    hardwareAlt,
    isCTA,
    persist,
  } = section;

  return (
    <section
      id={id}
      className={`scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between pointer-events-none invisible ${reverse ? "flex-row-reverse" : ""
        }`}
      data-enter={enter}
      data-leave={leave}
      data-animation={animation}
      {...(persist ? { "data-persist": "true" } : {})}
    >
      {/* Text Card Component */}
      <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
        <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">
          {label}
        </span>
        <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6 whitespace-pre-line">
          {title}
        </h2>
        <p className="section-body text-slate-400 text-sm leading-relaxed mb-6">
          {body}
        </p>

        {bullets && bullets.length > 0 && (
          <ul className="feature-bullets list-none flex flex-col gap-4">
            {bullets.map((bullet, idx) => (
              <li key={idx}>
                <strong className="block text-white text-sm font-semibold mb-1">
                  {bullet.title}
                </strong>
                <span className="text-slate-400 text-xs leading-normal block">
                  {bullet.desc}
                </span>
              </li>
            ))}
          </ul>
        )}

        {isCTA && (
          <div className="cta-actions flex flex-wrap gap-4 mb-10">
            <a
              href="https://nanorlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-blue-500/20"
            >
              Order Your Control Box Today
            </a>
          </div>
        )}

        {isCTA && (
          <div className="cta-footer-brand flex items-center gap-2.5 pt-6 border-t border-white/5 font-display text-xs tracking-wider text-slate-500 uppercase font-semibold">
            <img
              src="assets/logo.jpg"
              alt="Nanorlab Logo"
              className="w-[20px] h-[20px] rounded border border-white/10 object-cover"
            />
            <span>Nanorlab — Precision Engineered</span>
          </div>
        )}
      </div>

      {/* Visual Component depending on configuration */}
      <div className="section-visual w-[50%] flex items-center justify-center">
        {visualType === "phone" && (
          <img
            src={visualSrc}
            alt={visualAlt}
            className="w-[360px] h-auto float-in"
          />
        )}

        {visualType === "double-phone" && (
          <div className="relative w-full h-[540px] flex items-center justify-center">
            <img
              src={visualSrcs[0]}
              alt={visualAlts[0]}
              className="absolute left-[8%] z-10 w-[280px] h-auto float-in"
            />
            <img
              src={visualSrcs[1]}
              alt={visualAlts[1]}
              className="absolute right-[8%] z-20 w-[285px] h-auto float-in"
            />
          </div>
        )}

        {visualType === "hardware-split" && (
          <div className="flex items-center justify-center gap-6 w-full">
            <img
              src={visualSrc}
              alt={visualAlt}
              className="w-[260px] h-auto float-in"
            />
            <div className="hardware-box-wrap relative w-[280px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500 float-in">
              <img
                src={hardwareSrc}
                alt={hardwareAlt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
