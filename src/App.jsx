import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────
const FRAME_COUNT = 160;
const FRAME_SPEED = 2.0;
const IMAGE_SCALE = 0.86;
const TOTAL_VH = 600;

export default function App() {
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const siteHeaderRef = useRef(null);
  
  // Cache of preloaded Image objects
  const imagesRef = useRef([]);
  
  // State tracking the current scrubbing frame index (for canvas drawing)
  const [frameObj, setFrameObj] = useState({ index: 1 });

  // 1. ASYNC PRELOADER & SCROLL CANVAS
  useEffect(() => {
    // Generate image list
    const pad = (n) => String(n).padStart(4, "0");
    const getFramePath = (idx) => `frames/frame_${pad(idx)}.png`;

    let loadedCount = 0;
    const tempImages = [];

    // Preload loop
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        const prog = Math.round((loadedCount / FRAME_COUNT) * 100);
        setPercent(prog);

        // Save successfully loaded image
        tempImages[i] = img;

        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = tempImages;
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        // Fallback for missing frames (do not save broken Image object)
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          imagesRef.current = tempImages;
          setIsLoading(false);
        }
      };
    }
  }, []);

  // 2. CANVAS SCRUBBING & GSAP ANIMATIONS
  useEffect(() => {
    if (isLoading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Dynamic resize handler in cover mode
    const renderCanvas = () => {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[frameObj.index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      // Padded Cover logic
      const scaleX = w / img.width;
      const scaleY = h / img.height;
      const scale = Math.max(scaleX, scaleY) * IMAGE_SCALE;

      const newW = img.width * scale;
      const newH = img.height * scale;
      const x = (w - newW) / 2;
      const y = (h - newH) / 2;

      ctx.clearRect(0, 0, w, h);
      
      // Edge fill to blend canvas background perfectly into the pure black page
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      ctx.drawImage(img, x, y, newW, newH);
    };

    // Render initially
    renderCanvas();
    window.addEventListener("resize", renderCanvas);

    // Initial Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      infinite: false,
    });

    function scrollFn(time) {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    }
    requestAnimationFrame(scrollFn);

    // Sync GSAP with Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // ─────────────────────────────────────────────────────────
    // GSAP SCROLL SCRUBBING TIMELINE
    // ─────────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Animate the frames index over the timeline scrub
    tl.to(frameObj, {
      index: FRAME_COUNT,
      roundProps: "index",
      ease: "none",
      onUpdate: renderCanvas,
    });

    // Header reveal shadow on scroll
    ScrollTrigger.create({
      start: "top -50px",
      onEnter: () => siteHeaderRef.current?.classList.add("scrolled"),
      onLeaveBack: () => siteHeaderRef.current?.classList.remove("scrolled"),
    });

    // ─────────────────────────────────────────────────────────
    // GSAP SECTION ANIMS & OVERLAPS
    // ─────────────────────────────────────────────────────────
    const sections = gsap.utils.toArray(".scroll-section");
    sections.forEach((section) => {
      const enter = parseFloat(section.getAttribute("data-enter"));
      const leave = parseFloat(section.getAttribute("data-leave"));
      const animType = section.getAttribute("data-animation");

      const startPct = enter / 100;
      const endPct = leave / 100;
      const midPct = (enter + leave) / 200;

      // Position absolute scroll panel vertically in midpoint
      section.style.top = `${midPct * TOTAL_VH}vh`;
      section.style.transform = "translateY(-50%)";

      // Timeline trigger
      const secTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: `${startPct * 100}% top`,
          end: `${endPct * 100}% bottom`,
          scrub: true,
          onEnter: () => section.classList.add("visible"),
          onLeaveBack: () => {
            if (!section.hasAttribute("data-persist")) {
              section.classList.remove("visible");
            }
          },
          onLeave: () => {
            if (!section.hasAttribute("data-persist")) {
              section.classList.remove("visible");
            }
          },
          onEnterBack: () => section.classList.add("visible"),
        },
      });

      // Target children elements inside section card for visual choreography
      const heading = section.querySelector(".section-heading");
      const bodyText = section.querySelector(".section-body");
      const label = section.querySelector(".section-label");
      const bullets = section.querySelectorAll(".feature-bullets li");
      const phoneMockup = section.querySelector(".phone-mockup-wrapper");
      const hardwareBox = section.querySelector(".hardware-box-wrap");
      const ctaBtn = section.querySelector(".cta-actions");
      const brandLogo = section.querySelector(".cta-footer-brand");

      // Custom section entrance animation choreography
      if (animType === "slide-left") {
        secTl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
             .from(heading, { x: -60, opacity: 0, duration: 0.3 }, "<")
             .from(bodyText, { x: -40, opacity: 0, duration: 0.3 }, "-=0.15")
             .from(bullets, { x: -20, opacity: 0, stagger: 0.08, duration: 0.3 }, "-=0.1")
             .from(phoneMockup, { scale: 0.9, opacity: 0, duration: 0.4 }, "<")
             .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } 
      else if (animType === "slide-right") {
        secTl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
             .from(heading, { x: 60, opacity: 0, duration: 0.3 }, "<")
             .from(bodyText, { x: 40, opacity: 0, duration: 0.3 }, "-=0.15")
             .from(bullets, { x: 20, opacity: 0, stagger: 0.08, duration: 0.3 }, "-=0.1")
             .from(phoneMockup, { scale: 0.9, opacity: 0, duration: 0.4 }, "<")
             .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } 
      else if (animType === "fade-up") {
        secTl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
             .from(heading, { y: 40, opacity: 0, duration: 0.3 }, "<")
             .from(bodyText, { y: 30, opacity: 0, duration: 0.3 }, "-=0.15")
             .from(bullets, { y: 20, opacity: 0, stagger: 0.08, duration: 0.3 }, "-=0.1")
             .from(phoneMockup, { y: 40, opacity: 0, duration: 0.4 }, "<")
             .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } 
      else if (animType === "scale-up") {
        secTl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
             .from(heading, { scale: 0.92, opacity: 0, duration: 0.3 }, "<")
             .from(bodyText, { y: 20, opacity: 0, duration: 0.3 }, "-=0.15")
             .from(bullets, { y: 15, opacity: 0, stagger: 0.06, duration: 0.3 }, "-=0.1")
             .from(phoneMockup, { x: -30, opacity: 0, duration: 0.4 }, "<")
             .from(hardwareBox, { x: 30, opacity: 0, duration: 0.4 }, "<")
             .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } 
      else if (animType === "clip-reveal") {
        secTl.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
             .from(heading, { y: 50, opacity: 0, duration: 0.3 }, "<")
             .from(bodyText, { y: 30, opacity: 0, duration: 0.3 }, "-=0.15")
             .from(ctaBtn, { scale: 0.95, opacity: 0, duration: 0.35 }, "-=0.1")
             .from(brandLogo, { y: 15, opacity: 0, duration: 0.25 }, "-=0.05")
             .from(phoneMockup, { y: 50, opacity: 0, duration: 0.4 }, "<");
      }
    });

    // Horizontal Marquee Parallax
    const marquee1 = document.getElementById("marquee-1");
    const marquee2 = document.getElementById("marquee-2");

    if (marquee1 && marquee2) {
      gsap.to(marquee1.querySelector(".marquee-text"), {
        x: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      gsap.to(marquee2.querySelector(".marquee-text"), {
        x: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", renderCanvas);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, frameObj]);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          LOADER PANEL
          ───────────────────────────────────────────────────────── */}
      <div 
        id="loader" 
        className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-in-out ${!isLoading ? "opacity-0 pointer-events-none invisible" : "opacity-100"}`}
      >
        <div className="font-display text-4xl md:text-[2.6rem] font-semibold tracking-tight text-white select-none">
          <span className="text-blue-500">N</span>
          <span className="opacity-60">anorlab</span>
        </div>
        <div className="w-[240px] h-[1px] bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-white transition-all duration-100 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="font-display text-xs tracking-widest text-slate-500 select-none">
          {percent}%
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          FIXED SITE HEADER
          ───────────────────────────────────────────────────────── */}
      <header 
        ref={siteHeaderRef} 
        className="fixed top-0 left-0 right-0 z-[900] px-[6vw] h-[72px] flex items-center border-b border-transparent transition-all duration-400 scrolled:bg-black/85 scrolled:backdrop-blur-md scrolled:border-white/5"
      >
        <nav className="w-full flex items-center justify-between">
          <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-wide text-white hover:opacity-75 transition-opacity">
            <img src="assets/logo.jpg" alt="Nanorlab Logo" className="w-[26px] h-[26px] rounded-md border border-white/12 object-cover" />
            <span>Nanorlab</span>
          </a>
          <ul className="hidden md:flex items-center gap-10 list-none">
            <li><a href="#dashboard" className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors">DASHBOARD</a></li>
            <li><a href="#automation" className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors">AUTOMATION</a></li>
            <li><a href="#access" className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors">ACCESS</a></li>
            <li><a href="#hardware" className="text-xs font-medium tracking-widest text-slate-400 hover:text-white transition-colors">HARDWARE</a></li>
            <li>
              <a 
                href="https://nanorlab.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-[22px] py-[8px] border border-blue-500/30 rounded-md text-blue-500 hover:bg-blue-500/10 text-xs font-semibold tracking-widest transition-all"
              >
                GET STARTED
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* ─────────────────────────────────────────────────────────
          STANDALONE HERO SECTION
          ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-black flex flex-col md:flex-row items-center justify-between px-[6vw] pt-24 pb-12 overflow-hidden z-10">
        <div className="flex-1 flex flex-col items-start text-left max-w-xl pr-4">
          <div className="flex items-center gap-3 mb-6 select-none animate-pulse">
            <span className="w-6 h-[1px] bg-blue-500"></span>
            <span className="text-xs tracking-widest font-display text-blue-500 uppercase">001 / Master Your Space</span>
          </div>
          <h1 className="font-display text-[2.8rem] md:text-[4.2rem] font-bold leading-[1.05] tracking-tight text-white mb-8">
            Master Your <span className="hero-accent">Space. Effortlessly.</span>
          </h1>
          <p className="text-slate-400 text-[1.05rem] leading-relaxed mb-10 max-w-lg">
            Meet the NanorSmart Home Controller (NSC). The harmony of robust hardware and a beautifully intuitive interface. Take absolute control of your lighting, climate, and security from anywhere.
          </p>
          <div className="flex flex-wrap gap-4 w-full">
            <a 
              href="#dashboard" 
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-blue-500/20"
            >
              Get Started
            </a>
            <a 
              href="#dashboard" 
              className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors"
            >
              Explore the App
            </a>
          </div>
        </div>

        {/* Dynamic side-by-side Hero Visual */}
        <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0 max-w-2xl w-full">
          <div className="relative flex items-center justify-center w-full gap-8">
            <img 
              src="assets/nanor-nsc.png" 
              alt="NanorSmart Controller box sleek physical render" 
              className="w-[48%] max-w-[280px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] select-none hover:scale-105 transition-transform duration-700" 
            />
            <div className="relative w-[48%] max-w-[295px] aspect-[1/2.05] rounded-[42px] bg-[#090909] border-[8px] border-[#1a1a1a] p-1.5 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none float-in">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1a1a1a] rounded-b-xl z-20"></div>
              <img 
                src="assets/app_images/Simulator Screenshot - iPhone 17 - 2026-05-19 at 13.02.03.png" 
                alt="iPhone app dashboard mockup" 
                className="w-full h-full object-cover rounded-[34px] z-10" 
              />
            </div>
          </div>
        </div>

        {/* Scroll Hints */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity select-none cursor-pointer z-10">
          <span className="text-[10px] tracking-[0.25em] font-display text-slate-500 uppercase">Scroll to explore</span>
          <div className="w-[16px] h-[24px] border border-slate-600 rounded-full flex justify-center p-1 relative">
            <div className="w-[3px] h-[3px] bg-slate-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SCRUBBING CANVAS ELEMENT (STAYS FIXED IN BACKGROUND)
          ───────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block object-cover" />
      </div>

      {/* Edge blending overlays */}
      <div className="fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] z-1" />

      {/* MARQUEE BACKGROUND PARALLAX EFFECTS */}
      <div id="marquee-1" className="marquee-wrap top-[50%] -translate-y-1/2">
        <div className="marquee-text">
          NanorSmart Home Controller &nbsp;·&nbsp; Robust Hardware &nbsp;·&nbsp; Beautiful Interface &nbsp;·&nbsp; Master Your Space &nbsp;·&nbsp;
        </div>
      </div>
      <div id="marquee-2" className="marquee-wrap top-[calc(50%+14vw)] -translate-y-1/2">
        <div className="marquee-text">
          Nanorlab &nbsp;·&nbsp; Total Control &nbsp;·&nbsp; Zero Clutter &nbsp;·&nbsp; Intelligent Living &nbsp;·&nbsp;
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          SCROLL CONTAINER (TIMELINE PINNING DRIVER)
          ───────────────────────────────────────────────────────── */}
      <div ref={scrollContainerRef} className="relative z-10 h-[600vh] w-full">

        {/* SECTION 1: THE DASHBOARD */}
        <section 
          id="dashboard" 
          className="scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between pointer-events-none invisible"
          data-enter="4" 
          data-leave="28" 
          data-animation="slide-left"
        >
          <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
            <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">001 / Total Control, Zero Clutter</span>
            <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6">A Command Center<br/>in Your Pocket.</h2>
            <p className="section-body text-slate-400 text-sm leading-relaxed mb-6">Say goodbye to complicated menus. The NanorSmart app features a minimalist, distraction-free dashboard that brings your home’s status front and center.</p>
            
            <ul className="feature-bullets list-none flex flex-col gap-4">
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Live Status Monitoring</strong>
                <span className="text-slate-400 text-xs leading-normal block">Instantly see your active channels and overall energy usage at a glance.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Intuitive Room Filters</strong>
                <span className="text-slate-400 text-xs leading-normal block">Switch between your Living Room, Kitchen, or Security perimeters with a single tap.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">One-Touch Scenes</strong>
                <span className="text-slate-400 text-xs leading-normal block">Activate custom environments—like "Chill Zone" or "Movie Night"—the moment you walk in.</span>
              </li>
            </ul>
          </div>
          <div className="section-visual w-[50%] flex items-center justify-center">
            <div className="phone-mockup-wrapper relative w-[295px] aspect-[1/2.05] rounded-[42px] bg-[#090909] border-[8px] border-[#1a1a1a] p-1.5 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none float-in">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1a1a1a] rounded-b-xl z-20"></div>
              <img src="assets/app_images/Simulator Screenshot - iPhone 17 - 2026-05-19 at 13.02.03.png" alt="NanorSmart Dashboard mockup" className="w-full h-full object-cover rounded-[34px] z-10" />
            </div>
          </div>
        </section>

        {/* SECTION 2: AUTOMATION & SCHEDULING */}
        <section 
          id="automation" 
          className="scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between flex-row-reverse pointer-events-none invisible"
          data-enter="24" 
          data-leave="48" 
          data-animation="slide-right"
        >
          <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
            <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">002 / Intelligent Living</span>
            <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6">Set It. Forget It.<br/>Live Better.</h2>
            <p className="section-body text-slate-400 text-sm leading-relaxed mb-6">Your home should work around your schedule, not the other way around. NSC’s granular automation engine lets you build a living space that anticipates your needs.</p>
            
            <ul className="feature-bullets list-none flex flex-col gap-4">
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Precision Scheduling</strong>
                <span className="text-slate-400 text-xs leading-normal block">Program security lights to turn on at 18:00 and off at 06:00, or wake up to raised blinds and freshly brewed coffee.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Custom Presets</strong>
                <span className="text-slate-400 text-xs leading-normal block">Build personalized routines. Group your TV, ambient lamps, and blinds under a custom icon.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Day-by-Day Logic</strong>
                <span className="text-slate-400 text-xs leading-normal block">Tailor your automations to trigger only on specific days of the week to perfectly match your routine.</span>
              </li>
            </ul>
          </div>
          
          <div className="section-visual w-[50%] flex items-center justify-center">
            {/* Double Phone Mockups for S2 */}
            <div className="relative w-full h-[450px] flex items-center justify-center">
              <div className="absolute left-[8%] z-10 w-[240px] aspect-[1/2.05] rounded-[36px] bg-[#090909] border-[6px] border-[#1a1a1a] p-1 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none opacity-80 scale-95">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#1a1a1a] rounded-b-lg z-20"></div>
                <img src="assets/app_images/automation-creation.png" alt="New Schedule UI mockup" className="w-full h-full object-cover rounded-[28px] z-10" />
              </div>
              <div className="absolute right-[8%] z-20 w-[245px] aspect-[1/2.05] rounded-[36px] bg-[#090909] border-[6px] border-[#1a1a1a] p-1 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none float-in">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#1a1a1a] rounded-b-lg z-20"></div>
                <img src="assets/app_images/preset-creation.png" alt="New Preset UI mockup" className="w-full h-full object-cover rounded-[28px] z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ACCESS MANAGEMENT */}
        <section 
          id="access" 
          className="scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between pointer-events-none invisible"
          data-enter="44" 
          data-leave="68" 
          data-animation="fade-up"
        >
          <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
            <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">003 / Access Management</span>
            <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6">Shared Spaces,<br/>Intelligently Managed.</h2>
            <p className="section-body text-slate-400 text-sm leading-relaxed mb-6">Whether you are managing a family home, a rental property, or a shared workspace, NSC makes access delegation seamless and secure.</p>
            
            <ul className="feature-bullets list-none flex flex-col gap-4">
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Role-Based Access</strong>
                <span className="text-slate-400 text-xs leading-normal block">Add tenants and family members with a few taps.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Granular Permissions</strong>
                <span className="text-slate-400 text-xs leading-normal block">Decide exactly who gets to control what. Grant access to specific zones—like living room AC or guest lights.</span>
              </li>
            </ul>
          </div>
          <div className="section-visual w-[50%] flex items-center justify-center">
            <div className="phone-mockup-wrapper relative w-[295px] aspect-[1/2.05] rounded-[42px] bg-[#090909] border-[8px] border-[#1a1a1a] p-1.5 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none float-in">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1a1a1a] rounded-b-xl z-20"></div>
              <img src="assets/app_images/tenancy-management.png" alt="Tenants screen mockup" className="w-full h-full object-cover rounded-[34px] z-10" />
            </div>
          </div>
        </section>

        {/* SECTION 4: THE HARDWARE */}
        <section 
          id="hardware" 
          className="scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between flex-row-reverse pointer-events-none invisible"
          data-enter="64" 
          data-leave="86" 
          data-animation="scale-up"
        >
          <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
            <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">004 / Scalable &amp; Bulletproof</span>
            <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6">Infrastructure<br/>You Can Trust.</h2>
            <p className="section-body text-slate-400 text-sm leading-relaxed mb-6">The brain of the operation is the NSC Control Box. Designed for ultimate reliability and instantaneous response times.</p>
            
            <ul className="feature-bullets list-none flex flex-col gap-4">
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Multi-Hub Ecosystem</strong>
                <span className="text-slate-400 text-xs leading-normal block">Easily pair and manage multiple ControlBoxes across floors or entirely different properties.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Real-Time Diagnostics</strong>
                <span className="text-slate-400 text-xs leading-normal block">Monitor the online status and hardware IDs of all deployed units directly from settings.</span>
              </li>
              <li>
                <strong className="block text-white text-sm font-semibold mb-1">Over-the-Air Ready</strong>
                <span className="text-slate-400 text-xs leading-normal block">Seamlessly integrated to ensure hardware is always running the latest firmware.</span>
              </li>
            </ul>
          </div>
          <div className="section-visual w-[50%] flex items-center justify-center gap-6">
            <div className="phone-mockup-wrapper relative w-[235px] aspect-[1/2.05] rounded-[36px] bg-[#090909] border-[6px] border-[#1a1a1a] p-1 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none opacity-80">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-[#1a1a1a] rounded-b-lg z-20"></div>
              <img src="assets/app_images/settings-page.png" alt="Settings ControlBoxes screen mockup" className="w-full h-full object-cover rounded-[28px] z-10" />
            </div>
            <div className="hardware-box-wrap relative w-[240px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-500 float-in">
              <img src="assets/nanor-nsc.png" alt="NSC Control Box physical hardware sleek render" className="w-full h-auto object-contain" />
            </div>
          </div>
        </section>

        {/* SECTION 5: CTA (PERSISTENT AT BOTTOM) */}
        <section 
          id="cta" 
          className="scroll-section absolute left-0 right-0 w-[88vw] max-w-[1200px] mx-auto flex items-center justify-between pointer-events-none invisible"
          data-enter="82" 
          data-leave="100" 
          data-animation="clip-reveal" 
          data-persist="true"
        >
          <div className="section-inner glass-panel w-[44%] max-w-[520px] p-10 rounded-2xl relative z-10">
            <span className="section-label text-xs tracking-widest font-display text-blue-500 uppercase block mb-3 font-semibold">005 / Upgrade Your Environment</span>
            <h2 className="section-heading font-display text-3xl md:text-4xl font-bold leading-tight text-white mb-6">Ready to upgrade<br/>your environment?</h2>
            <p className="section-body text-slate-400 text-sm leading-relaxed mb-8">Experience the new standard in home automation.</p>
            <div className="cta-actions flex flex-wrap gap-4 mb-10">
              <a 
                href="https://nanorlab.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold tracking-wider transition-colors shadow-lg shadow-blue-500/20"
              >
                Order Your Control Box Today
              </a>
            </div>
            <div className="cta-footer-brand flex items-center gap-2.5 pt-6 border-t border-white/5 font-display text-xs tracking-wider text-slate-500 uppercase font-semibold">
              <img src="assets/logo.jpg" alt="Nanorlab Logo" className="w-[20px] h-[20px] rounded border border-white/10 object-cover" />
              <span>Nanorlab — Precision Engineered</span>
            </div>
          </div>
          <div className="section-visual w-[50%] flex items-center justify-center">
            <div className="phone-mockup-wrapper relative w-[295px] aspect-[1/2.05] rounded-[42px] bg-[#090909] border-[8px] border-[#1a1a1a] p-1.5 overflow-hidden shadow-2xl outline outline-1 outline-white/6 select-none float-in">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-[#1a1a1a] rounded-b-xl z-20"></div>
              <img src="assets/app_images/Simulator Screenshot - iPhone 17 - 2026-05-19 at 13.02.03.png" alt="NanorSmart Dashboard mockup" className="w-full h-full object-cover rounded-[34px] z-10" />
            </div>
          </div>
        </section>

      </div>

      {/* ─────────────────────────────────────────────────────────
          SITE FOOTER
          ───────────────────────────────────────────────────────── */}
      <footer id="site-footer" className="relative z-20 bg-black border-t border-white/5 py-12 px-[6vw]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-display text-base font-semibold text-white">
            <img src="assets/logo.jpg" alt="Nanorlab Logo" className="w-[22px] h-[22px] rounded border border-white/10 object-cover" />
            <span>Nanorlab</span>
          </div>
          <p className="text-xs text-slate-500 tracking-wide text-center">
            &copy; 2026 <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors font-semibold">Nanorlab</a>. All rights reserved. NanorSmart Home Controller (NSC) is a Nanorlab product.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors">PRIVACY</a>
            <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors">TERMS</a>
            <a href="https://nanorlab.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold tracking-wider text-slate-500 hover:text-white transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </>
  );
}
