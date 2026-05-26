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

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Nanorlab collects, uses, and protects your personal information when you use the NanorSmart Home Controller app and service."
    >
      <Section title="1. Who We Are">
        <p>
          Nanorlab ("we", "our", or "us") develops and operates the NanorSmart Home Controller (NSC) — a smart home automation platform comprising the NSC hardware device, the NSC mobile application, and the NSC web dashboard. Our registered contact is <a href="mailto:privacy@nanorlab.com" className="text-blue-400 hover:underline">privacy@nanorlab.com</a>.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p><strong className="text-slate-200">Account Information:</strong> When you create an account, we collect your email address and password (stored as a cryptographic hash via Firebase Authentication).</p>
        <p><strong className="text-slate-200">Device & Usage Data:</strong> We collect data about the NSC hardware devices you pair — including device IDs, firmware versions, local IP addresses, and relay pin states — to enable remote and local control.</p>
        <p><strong className="text-slate-200">Automation Rules:</strong> Schedules and automation presets you configure are stored in Firebase Realtime Database under your account.</p>
        <p><strong className="text-slate-200">Tenant/Sharing Data:</strong> If you share device access with others, we store their email addresses and assigned permission levels.</p>
        <p><strong className="text-slate-200">Technical Logs:</strong> We may collect crash reports, error logs, and anonymous usage analytics to improve the app. These do not contain personally identifiable information.</p>
        <p><strong className="text-slate-200">Location Data:</strong> We do not collect precise GPS location. Device IP-based approximate location may be stored once during device pairing for diagnostic purposes only.</p>
      </Section>

      <Section title="3. How We Use Your Information">
        <p>We use the collected data to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Authenticate and secure your account.</li>
          <li>Enable remote and local (LAN) control of your NSC devices.</li>
          <li>Execute automation schedules and user-defined presets.</li>
          <li>Send push notifications for device alerts (if enabled).</li>
          <li>Diagnose technical issues and improve app stability.</li>
          <li>Manage multi-user sharing and tenant access permissions.</li>
        </ul>
        <p>We do <strong className="text-slate-200">not</strong> sell your personal data. We do not use your data for advertising profiling.</p>
      </Section>

      <Section title="4. Data Sharing">
        <p>We share data only with the following service providers, solely to operate the NSC platform:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong className="text-slate-200">Google Firebase</strong> — Authentication, Realtime Database, and Cloud Functions (subject to Google's Privacy Policy).</li>
          <li><strong className="text-slate-200">Railway</strong> — Web dashboard hosting.</li>
        </ul>
        <p>We may disclose information if required by law or to protect our legal rights.</p>
      </Section>

      <Section title="5. Data Storage & Security">
        <p>Your data is stored in Google Firebase infrastructure (primarily US-based data centres). We implement security measures including encrypted connections (HTTPS/TLS), Firebase security rules restricting data access to authenticated owners, and hashed password storage.</p>
        <p>Local LAN control uses a 6-digit PIN stored in device NVS flash and Firebase RTDB, transmitted only over your private home network.</p>
      </Section>

      <Section title="6. Data Retention">
        <p>We retain your account data for as long as your account is active. You may request deletion at any time by contacting <a href="mailto:privacy@nanorlab.com" className="text-blue-400 hover:underline">privacy@nanorlab.com</a>. Device logs are retained for a maximum of 90 days.</p>
      </Section>

      <Section title="7. Children's Privacy">
        <p>The NSC app is not directed at children under 13 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us with personal information, contact us immediately.</p>
      </Section>

      <Section title="8. Your Rights">
        <p>Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data. To exercise these rights, contact <a href="mailto:privacy@nanorlab.com" className="text-blue-400 hover:underline">privacy@nanorlab.com</a>.</p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>We may update this Privacy Policy periodically. Changes will be posted at this URL with an updated effective date. Continued use of the app after changes constitutes acceptance.</p>
      </Section>

      <Section title="10. Contact">
        <p>Privacy inquiries: <a href="mailto:privacy@nanorlab.com" className="text-blue-400 hover:underline">privacy@nanorlab.com</a></p>
      </Section>
    </LegalLayout>
  );
}
