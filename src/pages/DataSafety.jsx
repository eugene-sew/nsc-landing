import React from "react";
import LegalLayout from "../components/LegalLayout";
import { Link } from "react-router-dom";

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

export default function DataSafety() {
  return (
    <LegalLayout
      title="Data Safety"
      subtitle="A transparent summary of what data the NanorSmart Home Controller app collects, how it is used, and whether it is shared — as required by Google Play's data safety section."
    >
      {/* Summary table */}
      <div className="mb-10 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-left">
              <th className="px-5 py-3 text-slate-300 font-semibold">Category</th>
              <th className="px-5 py-3 text-slate-300 font-semibold">Collected</th>
              <th className="px-5 py-3 text-slate-300 font-semibold">Shared</th>
              <th className="px-5 py-3 text-slate-300 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["Email address", "Yes", "No", "Account & authentication"],
              ["Device identifiers", "Yes", "No", "Device management"],
              ["App interactions", "Yes", "No", "Analytics & bug fixes"],
              ["Crash logs", "Yes", "No", "Stability improvements"],
              ["Automation rules", "Yes", "No", "Core functionality"],
              ["Local IP address", "Yes", "No", "LAN device discovery"],
              ["Photos / media", "No", "No", "–"],
              ["Contacts", "No", "No", "–"],
              ["Location (precise)", "No", "No", "–"],
              ["SMS / call logs", "No", "No", "–"],
              ["Financial info", "No", "No", "–"],
              ["Health & fitness", "No", "No", "–"],
            ].map(([cat, coll, shared, purpose]) => (
              <tr key={cat} className="hover:bg-white/2 transition-colors">
                <td className="px-5 py-3 text-slate-200">{cat}</td>
                <td className={`px-5 py-3 font-semibold ${coll === "Yes" ? "text-blue-400" : "text-slate-600"}`}>{coll}</td>
                <td className={`px-5 py-3 font-semibold ${shared === "Yes" ? "text-amber-400" : "text-slate-600"}`}>{shared}</td>
                <td className="px-5 py-3 text-slate-500">{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Section title="Data Encryption">
        <p>All data transmitted between the app, NSC hardware, and Firebase servers is encrypted in transit using TLS/HTTPS. Data stored at rest in Firebase is encrypted by Google's infrastructure.</p>
      </Section>

      <Section title="Data Deletion">
        <p>You can request deletion of all your personal data at any time by contacting <a href="mailto:privacy@nanorlab.com" className="text-blue-400 hover:underline">privacy@nanorlab.com</a>. Account deletion will remove your email, devices, automations, and tenant relationships from our systems within 30 days.</p>
        <p>In-app deletion: Profile → Settings → Delete Account (removes all data immediately from the dashboard view; backend purge within 30 days).</p>
      </Section>

      <Section title="Third-Party Data Sharing">
        <p>We do not sell or share your personal data with third parties for marketing purposes. The only data processor we share infrastructure with is <strong className="text-slate-200">Google Firebase</strong>, which hosts the authentication, database, and serverless functions powering the NSC platform.</p>
      </Section>

      <Section title="Security Practices">
        <ul className="list-disc pl-5 space-y-1">
          <li>Firebase Authentication — passwords stored as hashed tokens, never in plain text.</li>
          <li>Firebase Security Rules — restrict database read/write to the authenticated owner only.</li>
          <li>LAN PIN — 6-digit hardware PIN for local network access, stored encrypted in device NVS.</li>
          <li>No third-party analytics SDKs embedded in the app.</li>
        </ul>
      </Section>

      <Section title="More Information">
        <p>For full details, see our <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.</p>
      </Section>
    </LegalLayout>
  );
}
