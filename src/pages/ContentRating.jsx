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

export default function ContentRating() {
  return (
    <LegalLayout
      title="Content Rating"
      subtitle="Information about the content rating and nature of material in the NanorSmart Home Controller app."
    >
      {/* Rating badge */}
      <div className="mb-10 flex flex-wrap gap-6">
        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 border-white/20 bg-white/4">
          <span className="text-4xl font-black font-display text-white">E</span>
          <span className="text-xs text-slate-500 mt-1">Everyone</span>
          <span className="text-xs text-slate-600 mt-0.5">Google Play</span>
        </div>
        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-2xl border-2 border-white/20 bg-white/4">
          <span className="text-4xl font-black font-display text-white">4+</span>
          <span className="text-xs text-slate-500 mt-1">Ages 4+</span>
          <span className="text-xs text-slate-600 mt-0.5">App Store</span>
        </div>
      </div>

      <Section title="Content Description">
        <p>NanorSmart Home Controller is a utility application for controlling smart home devices. It contains no:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Violence, graphic content, or disturbing imagery.</li>
          <li>Sexual or suggestive content.</li>
          <li>Drug, alcohol, or tobacco references.</li>
          <li>Profanity or crude language.</li>
          <li>Gambling mechanics or simulated gambling.</li>
          <li>User-generated content open to the public.</li>
          <li>Horror or frightening themes.</li>
        </ul>
      </Section>

      <Section title="Intended Audience">
        <p>This app is designed for home owners and residents who have purchased or installed a NanorSmart Home Controller (NSC) device. Typical users are adults aged 18+ managing home automation for their household.</p>
        <p>Minors may use the app under parental/guardian supervision to control shared home devices. No age-restricted content is present within the app.</p>
      </Section>

      <Section title="Interactive Elements">
        <p><strong className="text-slate-200">Sharing / Interaction:</strong> The app supports sharing device access with other registered users (tenant feature). Communication is limited to account-level sharing invitations sent via email — no open messaging, public chat, or social feed is present.</p>
        <p><strong className="text-slate-200">User-Generated Content:</strong> Users can create custom device labels, group names, and automation names. These are stored privately within their own account and are never shared publicly.</p>
        <p><strong className="text-slate-200">In-App Purchases:</strong> None. The app is free to use and contains no in-app purchase mechanisms.</p>
        <p><strong className="text-slate-200">Location Sharing:</strong> None. No location data is shared between users.</p>
      </Section>

      <Section title="Rating Justification">
        <p>The Everyone / 4+ rating reflects that the app contains no mature content and is purely a utility application for smart home device control. The rating was determined in compliance with the IARC (International Age Rating Coalition) rating guidelines used by Google Play and the Apple App Review process.</p>
      </Section>
    </LegalLayout>
  );
}
