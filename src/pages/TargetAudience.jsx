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

export default function TargetAudience() {
  return (
    <LegalLayout
      title="Target Audience"
      subtitle="Who NanorSmart Home Controller is designed for, and how we ensure the app is appropriate for its intended users."
    >
      {/* Target segments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          {
            icon: "🏠",
            label: "Home Owners",
            desc: "Adults who own or rent property and wish to automate lighting, climate, and security through a single, cohesive interface.",
          },
          {
            icon: "👨‍👩‍👧‍👦",
            label: "Families",
            desc: "Households with multiple members who each control shared devices. Tenant access allows role-based control without sharing credentials.",
          },
          {
            icon: "🏢",
            label: "Small Businesses / Offices",
            desc: "Small workspaces deploying NSC for office automation — conference room lighting, server room climate, or perimeter security.",
          },
          {
            icon: "🔧",
            label: "DIY Enthusiasts",
            desc: "Tech-savvy users who install and manage their own smart home systems and value open, configurable hardware.",
          },
        ].map(({ icon, label, desc }) => (
          <div key={label} className="p-5 rounded-xl border border-white/8 bg-white/2 hover:border-blue-500/30 transition-colors">
            <div className="text-2xl mb-3">{icon}</div>
            <p className="font-semibold text-white text-sm mb-1">{label}</p>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <Section title="Primary Age Range">
        <p>The primary target age range is <strong className="text-slate-200">18–55 years old</strong>. The app does not produce content targeted at children, and we do not knowingly market to users under 18.</p>
        <p>Minors living within a household may use the app to control home devices under adult supervision using the tenant/guest access feature.</p>
      </Section>

      <Section title="Not Directed at Children">
        <p>This app is <strong className="text-slate-200">not directed at children under 13</strong>. In compliance with COPPA (Children's Online Privacy Protection Act) and GDPR-K requirements:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>No child-oriented content, characters, or design elements are present.</li>
          <li>No data is knowingly collected from users under 13.</li>
          <li>Registration requires an email address — accounts are treated as adult accounts.</li>
          <li>No toys, cartoons, or activities appealing specifically to children.</li>
        </ul>
      </Section>

      <Section title="Geographic Target">
        <p>The NSC app is available globally. The primary initial market is <strong className="text-slate-200">West Africa</strong> (particularly Ghana), with expansion plans across Sub-Saharan Africa and international markets. Content and interface language is English.</p>
      </Section>

      <Section title="Technical Audience Requirements">
        <p>Users require a compatible iOS or Android device, a home Wi-Fi network, and an NSC hardware device. No special technical knowledge is required — the app is designed to be intuitive for general consumers.</p>
      </Section>
    </LegalLayout>
  );
}
