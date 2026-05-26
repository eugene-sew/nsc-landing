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

export default function FinancialFeatures() {
  return (
    <LegalLayout
      title="Financial Features"
      subtitle="Disclosure of financial features and payment mechanisms in the NanorSmart Home Controller app."
    >
      {/* Big NO callout */}
      <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/3">
        <div className="space-y-3">
          {[
            ["In-app purchases", false],
            ["Subscription payments", false],
            ["One-time premium upgrades", false],
            ["Virtual currency / tokens", false],
            ["Cryptocurrency transactions", false],
            ["Payment card / banking features", false],
            ["Loans, credit, or financial products", false],
            ["Insurance products", false],
            ["Investment or trading features", false],
            ["Money transfer / remittance", false],
          ].map(([feature, active]) => (
            <div key={feature} className="flex items-center justify-between py-2.5 px-4 rounded-lg border border-white/5">
              <span className="text-slate-300 text-sm">{feature}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-500">
                NOT APPLICABLE
              </span>
            </div>
          ))}
        </div>
      </div>

      <Section title="Business Model">
        <p>NanorSmart Home Controller is a hardware-first product. Revenue is generated exclusively through the sale of physical NSC hardware units. The companion mobile and web applications are provided free of charge to device owners.</p>
        <p>There are no subscription fees, tiered plans, or paywall-gated features within the NSC app ecosystem.</p>
      </Section>

      <Section title="No Financial Data Collected">
        <p>The NSC app does not collect, transmit, or process any financial data. No credit card numbers, bank account details, or payment information of any kind passes through our systems. All device purchases are handled by third-party retail or direct sales channels entirely outside the app.</p>
      </Section>

      <Section title="Future Plans">
        <p>If a premium tier or subscription feature is introduced in the future, it will be disclosed via an updated version of this policy, app store listing, and in-app notification prior to implementation. No such features are planned at this time.</p>
      </Section>
    </LegalLayout>
  );
}
