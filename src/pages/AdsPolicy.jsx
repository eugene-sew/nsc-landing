import React from "react";
import LegalLayout from "../components/LegalLayout";

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold font-display text-white mb-4 pb-2 border-b border-white/8">
        {title}
      </h2>
      <div className="text-slate-400 text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function AdsPolicy() {
  return (
    <LegalLayout
      title="Ads Policy"
      subtitle="Information about advertising practices in the NanorSmart Home Controller app."
    >
      {/* Big callout */}
      <div className="mb-10 p-6 rounded-2xl border border-blue-500/30 bg-blue-500/8 flex gap-4 items-start">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
          ✓
        </div>
        <div>
          <p className="font-semibold text-white text-base mb-1">No Advertisements</p>
          <p className="text-slate-400 text-sm">
            The NanorSmart Home Controller app contains <strong className="text-white">no advertisements</strong> of any kind. We do not show banner ads, interstitial ads, rewarded video ads, or any other form of in-app advertising.
          </p>
        </div>
      </div>

      <Section title="No Third-Party Ad Networks">
        <p>We do not integrate any third-party advertising SDKs (such as Google AdMob, Meta Audience Network, or similar). No advertising identifiers (IDFA, GAID) are collected or transmitted.</p>
      </Section>

      <Section title="No Behavioural Targeting">
        <p>We do not profile your usage behaviour for the purpose of delivering targeted advertising. App interaction data collected for crash analytics is not shared with advertising networks.</p>
      </Section>

      <Section title="Business Model">
        <p>Nanorlab is a hardware company. Revenue is generated through the sale of NanorSmart Home Controller hardware devices. The companion app is provided free of charge to device owners and is not monetised through advertising.</p>
      </Section>

      <Section title="Future Changes">
        <p>If we ever introduce optional sponsored content or a premium tier in the future, this policy will be updated and users will be notified before any changes take effect.</p>
      </Section>
    </LegalLayout>
  );
}
