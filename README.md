# NanorSmart Home Controller (NSC) — Landing Page

A premium, high-performance, and beautifully engineered single-page product landing page for the **NanorSmart Home Controller (NSC)**, built with **Vite React**, styled using **Tailwind CSS v4**, and driven by synchronized GSAP-scroll canvas scrubbing.

---

## 🎨 Design & Aesthetic Foundations

- **Black Canvas Integration:** Designed entirely in dark mode with a solid `#000000` canvas backdrop, allowing product renders and device shells to blend seamlessly into a single fluid page.
- **NanorLab Branding & Colors:** Fully aligned with the authentic NanorLab visual identity using **Electric Royal Blue (`#3b82f6`)** and **Deep Slate (`#080e1a`)** design tokens.
- **Glassmorphism Panels:** Content sections are wrapped in custom glass overlays (`backdrop-filter: blur(12px)`) to guarantee crystal-clear text readability over moving background canvases.
- **Symmetric Centering:** Perfectly balanced grids (`44%` text card / `50%` graphical columns) constrained to a maximum centered container width of `1200px` for gorgeous rendering on wide desktop monitors.

---

## ⚙️ Core Technical Features

### 🎞️ Synchronized Frame Scrubbing Engine
The core background is driven by a custom, edge-feathered `<canvas>` scrubbing engine synchronizing **160 high-fidelity video rendering frames** (.png) to the user's scroll depth via **GSAP ScrollTrigger**.

- **Async Frame Preloader:** Preloads all 160 frames into memory sequentially upon initial page entry, showing a clean, modern loading progress bar.
- **Aspect Ratio Cover Fitting:** The canvas dynamically handles responsive viewport updates on window resize, utilizing cover mode bounds to center-crop frames.
- **Broken Frame Protection:** Built-in safeguards check element completeness (`complete`) and natural dimensions (`naturalWidth > 0`) before drawing to the context, completely eliminating browser rendering runtime exceptions.

### 📜 Lenis Smooth Scrolling Integration
Configures Lenis to deliver ultra-fluid, natural scroll dynamics synchronized perfectly with GSAP ticker triggers.

### 📱 Responsive Device Mockups
High-fidelity side-by-side flex headers, overlapping iPhone dashboard models, and settings panel mockups that collapse responsively into clean stack layouts on mobile.

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vite.dev/)
- **Styling Utility:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Orchestration:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll Engine:** [Lenis Scroll](https://lenis.darkroom.engineering/)
- **Icons Pack:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### 📥 Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone git@github.com:eugene-sew/nsc-landing.git
   cd nsc-landing
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:5173`** in your browser to view the page.

### 📦 Building for Production
To compile and optimize the application for production deployment, run:
   ```bash
   npm run build
   ```
   The compiled static distribution files will be generated inside the `/dist` directory.

---

## 📂 Project Architecture

```txt
NSC-landing/
├── public/                # Static assets served from root
│   ├── assets/            # Official brand logos & mobile screenshots
│   └── frames/            # 160 video render PNG assets (frame_0001.png - frame_0160.png)
├── src/
│   ├── App.jsx            # Main app entry (GSAP logic, preloader, layout structure)
│   ├── index.css          # Tailwind CSS imports & custom float animations
│   └── main.jsx           # React app mount bootstrap
├── index.html             # SEO meta description, preconnects & Google fonts
├── vite.config.js         # Vite configuration with Tailwind CSS compiler plugin
└── package.json           # Scripts & package manifests
```

---

## 🔒 License
Distributed under the MIT License. Developed with precision by [Nanorlab](https://nanorlab.com).
