export const sectionsData = [
  {
    id: "dashboard",
    enter: 4,
    leave: 28,
    animation: "slide-left",
    label: "001 / Total Control, Zero Clutter",
    title: "A Command Center\nin Your Pocket.",
    body: "Say goodbye to complicated menus. The NanorSmart app features a minimalist, distraction-free dashboard that brings your home’s status front and center.",
    bullets: [
      {
        title: "Live Status Monitoring",
        desc: "Instantly see your active channels and overall energy usage at a glance."
      },
      {
        title: "Intuitive Room Filters",
        desc: "Switch between your Living Room, Kitchen, or Security perimeters with a single tap."
      },
      {
        title: "One-Touch Scenes",
        desc: "Activate custom environments—like \"Chill Zone\" or \"Movie Night\"—the moment you walk in."
      }
    ],
    visualType: "phone",
    visualSrc: "assets/app_images/Simulator Screenshot - iPhone 17 - 2026-05-19 at 13.02.03.png",
    visualAlt: "NanorSmart Dashboard mockup"
  },
  {
    id: "automation",
    enter: 24,
    leave: 48,
    animation: "slide-right",
    reverse: true,
    label: "002 / Intelligent Living",
    title: "Set It. Forget It.\nLive Better.",
    body: "Your home should work around your schedule, not the other way around. NSC’s granular automation engine lets you build a living space that anticipates your needs.",
    bullets: [
      {
        title: "Precision Scheduling",
        desc: "Program security lights to turn on at 18:00 and off at 06:00, or wake up to raised blinds and freshly brewed coffee."
      },
      {
        title: "Custom Presets",
        desc: "Build personalized routines. Group your TV, ambient lamps, and blinds under a custom icon."
      },
      {
        title: "Day-by-Day Logic",
        desc: "Tailor your automations to trigger only on specific days of the week to perfectly match your routine."
      }
    ],
    visualType: "double-phone",
    visualSrcs: [
      "assets/app_images/automation-creation.png",
      "assets/app_images/preset-creation.png"
    ],
    visualAlts: ["New Schedule UI mockup", "New Preset UI mockup"]
  },
  {
    id: "access",
    enter: 44,
    leave: 68,
    animation: "fade-up",
    label: "003 / Access Management",
    title: "Shared Spaces,\nIntelligently Managed.",
    body: "Whether you are managing a family home, a rental property, or a shared workspace, NSC makes access delegation seamless and secure.",
    bullets: [
      {
        title: "Role-Based Access",
        desc: "Add tenants and family members with a few taps."
      },
      {
        title: "Granular Permissions",
        desc: "Decide exactly who gets to control what. Grant access to specific zones—like living room AC or guest lights."
      }
    ],
    visualType: "phone",
    visualSrc: "assets/app_images/tenancy-management.png",
    visualAlt: "Tenants screen mockup"
  },
  {
    id: "hardware",
    enter: 64,
    leave: 86,
    animation: "scale-up",
    reverse: true,
    label: "004 / Scalable & Bulletproof",
    title: "Infrastructure\nYou Can Trust.",
    body: "The brain of the operation is the NSC Control Box. Designed for ultimate reliability and instantaneous response times.",
    bullets: [
      {
        title: "Multi-Hub Ecosystem",
        desc: "Easily pair and manage multiple ControlBoxes across floors or entirely different properties."
      },
      {
        title: "Real-Time Diagnostics",
        desc: "Monitor the online status and hardware IDs of all deployed units directly from settings."
      },
      {
        title: "Over-the-Air Ready",
        desc: "Seamlessly integrated to ensure hardware is always running the latest firmware."
      }
    ],
    visualType: "hardware-split",
    visualSrc: "assets/app_images/settings-page.png",
    visualAlt: "Settings ControlBoxes screen mockup",
    hardwareSrc: "assets/nanor-nsc.png",
    hardwareAlt: "NSC Control Box render"
  },
  {
    id: "cta",
    enter: 82,
    leave: 100,
    animation: "clip-reveal",
    persist: true,
    label: "005 / Upgrade Your Environment",
    title: "Ready to upgrade\nyour environment?",
    body: "Experience the new standard in home automation.",
    visualType: "phone",
    visualSrc: "assets/app_images/Simulator Screenshot - iPhone 17 - 2026-05-19 at 13.02.03.png",
    visualAlt: "NanorSmart Dashboard mockup",
    isCTA: true
  }
];
