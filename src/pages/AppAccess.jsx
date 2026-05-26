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

export default function AppAccess() {
  return (
    <LegalLayout
      title="App Access"
      subtitle="Information about how NanorSmart Home Controller handles device permissions and what access the app requires to function."
    >
      <Section title="Required Permissions">
        <p>The NanorSmart Home Controller app requests only the minimum permissions necessary for its core functionality. Below is an explanation of each permission:</p>

        <div className="space-y-4 mt-4">
          {[
            {
              permission: "Internet Access",
              required: true,
              reason: "Required to connect to Firebase Realtime Database for remote device control, authentication, and automation syncing.",
            },
            {
              permission: "Local Network Access",
              required: true,
              reason: "Required for LAN (local network) control of NSC hardware devices when the internet is unavailable. The app communicates with the NSC device over HTTP on your home Wi-Fi.",
            },
            {
              permission: "Wi-Fi Network State",
              required: true,
              reason: "Used to detect whether your device is on a Wi-Fi network, enabling automatic switching between Cloud and Local control modes.",
            },
            {
              permission: "Push Notifications",
              required: false,
              reason: "Optional. Used to send device status alerts and automation completion notifications. You can enable or disable this at any time in system settings.",
            },
            {
              permission: "Camera",
              required: false,
              reason: "Not requested.",
            },
            {
              permission: "Microphone",
              required: false,
              reason: "Not requested.",
            },
            {
              permission: "Contacts",
              required: false,
              reason: "Not requested.",
            },
            {
              permission: "Location",
              required: false,
              reason: "Not requested. Approximate location is never tracked by the app.",
            },
            {
              permission: "Storage / Files",
              required: false,
              reason: "Not requested.",
            },
          ].map(({ permission, required, reason }) => (
            <div key={permission} className="flex gap-4 p-4 rounded-lg border border-white/6 bg-white/2">
              <div className="flex-shrink-0 mt-0.5">
                <span className={`inline-block w-2 h-2 rounded-full mt-1 ${required ? "bg-blue-500" : "bg-slate-700"}`} />
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-sm">{permission}</p>
                <p className="text-slate-500 text-xs mt-0.5">{required ? "Required" : "Not used"} — {reason}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Account Registration">
        <p>Creating an account requires a valid email address. No phone number, credit card, or social profile is required to register.</p>
        <p>Authentication is provided by Google Firebase, using email/password login. No OAuth/social login is required.</p>
      </Section>

      <Section title="Hardware Pairing">
        <p>Pairing an NSC device requires a one-time pairing code displayed on the device. After pairing, the device is linked to your account in Firebase. No root access or advanced device permissions are needed.</p>
      </Section>

      <Section title="Guest / Tenant Access">
        <p>The primary account owner may invite tenant users by email. Tenants receive limited, read-only control access to specified device channels. Tenant access can be revoked at any time by the account owner.</p>
      </Section>

      <Section title="Revoking Access">
        <p>You can revoke all app permissions at any time through your device's system settings (iOS: Settings → NanorSmart → Permissions; Android: Settings → Apps → NanorSmart → Permissions).</p>
      </Section>
    </LegalLayout>
  );
}
