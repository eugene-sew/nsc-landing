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

export default function TermsOfService() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The terms and conditions governing your use of the NanorSmart Home Controller app, hardware, and associated services."
    >
      <Section title="1. Acceptance of Terms">
        <p>By downloading, installing, or using the NanorSmart Home Controller ("NSC") application or by activating an NSC hardware device, you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use our products or services.</p>
      </Section>

      <Section title="2. Description of Service">
        <p>Nanorlab provides:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The NSC hardware control box — a relay-based smart home controller.</li>
          <li>The NanorSmart mobile app — iOS and Android companion app for remote and local device control.</li>
          <li>The NSC web dashboard — a browser-based management interface.</li>
          <li>Backend services powered by Google Firebase for authentication, data sync, and automation.</li>
        </ul>
      </Section>

      <Section title="3. Account Registration">
        <p>You must register for an account using a valid email address. You are responsible for maintaining the security of your account credentials. Nanorlab is not liable for unauthorised account access resulting from your failure to secure login information.</p>
        <p>You must be at least 18 years old to register an account, or have parental/guardian consent.</p>
      </Section>

      <Section title="4. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Attempt to reverse-engineer, hack, or exploit any part of the NSC platform.</li>
          <li>Use NSC to control devices in a manner that violates local electrical, building, or safety codes.</li>
          <li>Share your account credentials with unauthorised parties (use the tenant feature for legitimate sharing).</li>
          <li>Interfere with the operation of other users' devices or accounts.</li>
          <li>Use NSC to control critical life-safety systems without appropriate professional oversight (medical, fire suppression, etc.).</li>
        </ul>
      </Section>

      <Section title="5. Hardware & Pairing">
        <p>NSC hardware must be installed in accordance with local electrical regulations. Nanorlab recommends professional electrician installation. Improper installation that causes damage, injury, or fire voids any warranty and releases Nanorlab from liability.</p>
        <p>Hardware devices are linked to your account via a one-time pairing code. Ownership transfer of a device requires factory reset of the hardware before pairing to a new account.</p>
      </Section>

      <Section title="6. Service Availability">
        <p>Remote (cloud) control requires internet connectivity and active Firebase services. Nanorlab does not guarantee 100% uptime of cloud services. LAN (local) control is available as a fallback when cloud services are unavailable.</p>
        <p>Nanorlab may modify, suspend, or discontinue features at any time with reasonable notice.</p>
      </Section>

      <Section title="7. Intellectual Property">
        <p>All software, design, trademarks, and hardware designs are the intellectual property of Nanorlab. You are granted a limited, non-exclusive, non-transferable licence to use the app and dashboard solely for personal home automation purposes.</p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>To the maximum extent permitted by applicable law, Nanorlab shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from use of the NSC platform, including but not limited to property damage, loss of data, or personal injury resulting from improper hardware installation or use.</p>
      </Section>

      <Section title="9. Modifications to Terms">
        <p>We may update these Terms periodically. Continued use of the app after notice of changes constitutes acceptance of the revised Terms. We will provide at least 14 days notice before material changes take effect.</p>
      </Section>

      <Section title="10. Governing Law">
        <p>These Terms are governed by the laws of the Republic of Ghana. Any disputes shall be resolved in the courts of Accra, Ghana, unless otherwise required by applicable consumer protection law in your jurisdiction.</p>
      </Section>

      <Section title="11. Contact">
        <p>Legal enquiries: <a href="mailto:legal@nanorlab.com" className="text-blue-400 hover:underline">legal@nanorlab.com</a></p>
      </Section>
    </LegalLayout>
  );
}
