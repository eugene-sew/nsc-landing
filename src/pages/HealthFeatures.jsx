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

export default function HealthFeatures() {
  return (
    <LegalLayout
      title="Health Features"
      subtitle="Disclosure of any health-related features, data collection, or health service functionality in the NanorSmart Home Controller app."
    >
      <div className="mb-10 p-6 rounded-2xl border border-white/10 bg-white/3">
        <div className="space-y-3">
          {[
            "Health or fitness tracking",
            "Medical device integration",
            "Heart rate / biometric monitoring",
            "Sleep or activity tracking",
            "Medication reminders",
            "Mental health features",
            "Calorie or nutrition tracking",
            "Connection to health platforms (Apple Health, Google Fit, etc.)",
            "Collection or processing of health data",
            "Claims of medical benefits",
          ].map((feature) => (
            <div key={feature} className="flex items-center justify-between py-2.5 px-4 rounded-lg border border-white/5">
              <span className="text-slate-300 text-sm">{feature}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-500">
                NOT APPLICABLE
              </span>
            </div>
          ))}
        </div>
      </div>

      <Section title="No Health Data Collected">
        <p>NanorSmart Home Controller is a smart home automation platform. It does not collect, process, or store any health or fitness-related data of any kind. The app has no integration with Apple HealthKit, Google Fit, or any other health data platform.</p>
      </Section>

      <Section title="Indirect Wellness Benefits">
        <p>While smart home automation (such as automated lighting and climate control) may indirectly contribute to user comfort and well-being, NSC makes no medical or therapeutic claims. The app is classified purely as a home utility application.</p>
      </Section>

      <Section title="Environmental Sensors">
        <p>Future NSC hardware iterations may include environmental monitoring sensors (e.g. temperature, humidity, air quality) for home comfort management. Any such features will be for home environment awareness only — not for medical diagnostics — and this policy will be updated accordingly.</p>
      </Section>

      <Section title="Regulatory Note">
        <p>NSC is not a medical device and is not regulated as such. It is not intended to diagnose, treat, cure, or prevent any disease or health condition. Do not rely on NSC for medical decision-making.</p>
      </Section>
    </LegalLayout>
  );
}
