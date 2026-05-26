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

function DeclarationCard({ icon, title, value }) {
  return (
    <div className={`flex gap-4 items-center p-4 rounded-xl border ${value ? "border-slate-700 bg-white/2" : "border-white/6 bg-white/2"}`}>
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div className="flex-1">
        <p className="text-slate-200 text-sm font-semibold">{title}</p>
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${value ? "bg-blue-500/20 text-blue-400" : "bg-slate-800 text-slate-500"}`}>
        {value ? "YES" : "NO"}
      </span>
    </div>
  );
}

export default function GovernmentApps() {
  return (
    <LegalLayout
      title="Government Apps"
      subtitle="Declarations regarding government app status and official government affiliation of the NanorSmart Home Controller."
    >
      {/* Clear declaration */}
      <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/3">
        <p className="text-base text-white font-semibold mb-4">Government App Status</p>
        <div className="space-y-3">
          <DeclarationCard
            icon="🏛️"
            title="Developed by or on behalf of a government entity"
            value={false}
          />
          <DeclarationCard
            icon="📜"
            title="Provides official government services or functions"
            value={false}
          />
          <DeclarationCard
            icon="🔒"
            title="Handles classified or restricted government data"
            value={false}
          />
          <DeclarationCard
            icon="🌍"
            title="Targeting government employees or agencies"
            value={false}
          />
          <DeclarationCard
            icon="💼"
            title="Partnered with any government institution"
            value={false}
          />
        </div>
      </div>

      <Section title="Developer Status">
        <p><strong className="text-slate-200">Nanorlab</strong> is a private technology company. We are not a government agency, government contractor, or public sector organisation. The NanorSmart Home Controller is a consumer product developed entirely by Nanorlab.</p>
      </Section>

      <Section title="Data Sovereignty">
        <p>The NSC app uses Google Firebase infrastructure, which is not a government-operated cloud. User data is not shared with any government body unless compelled by valid legal process (e.g. court order). See our <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a> for full details on data sharing.</p>
      </Section>

      <Section title="Regulatory Compliance">
        <p>Nanorlab complies with applicable national and regional laws in the markets where the NSC is sold and the app is available. If you have questions regarding our compliance with a specific jurisdiction, contact <a href="mailto:legal@nanorlab.com" className="text-blue-400 hover:underline">legal@nanorlab.com</a>.</p>
      </Section>
    </LegalLayout>
  );
}
