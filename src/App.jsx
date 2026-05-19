import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Custom Subcomponents
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SectionCard from "./components/SectionCard";
import Footer from "./components/Footer";

// Data Configuration
import { sectionsData } from "./data/sectionsData";

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
      const bullets = section.querySelectorAll(".feature-bullets li");
      const phoneMockup = section.querySelector(".phone-mockup-wrapper");
      const hardwareBox = section.querySelector(".hardware-box-wrap");
      const ctaBtn = section.querySelector(".cta-actions");
      const brandLogo = section.querySelector(".cta-footer-brand");

      // Custom section entrance animation choreography
      if (animType === "slide-left") {
        secTl
          .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
          .from(heading, { x: -60, opacity: 0, duration: 0.3 }, "<")
          .from(bodyText, { x: -40, opacity: 0, duration: 0.3 }, "-=0.15")
          .from(
            bullets,
            { x: -20, opacity: 0, stagger: 0.08, duration: 0.3 },
            "-=0.1"
          )
          .from(phoneMockup, { scale: 0.9, opacity: 0, duration: 0.4 }, "<")
          .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } else if (animType === "slide-right") {
        secTl
          .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
          .from(heading, { x: 60, opacity: 0, duration: 0.3 }, "<")
          .from(bodyText, { x: 40, opacity: 0, duration: 0.3 }, "-=0.15")
          .from(
            bullets,
            { x: 20, opacity: 0, stagger: 0.08, duration: 0.3 },
            "-=0.1"
          )
          .from(phoneMockup, { scale: 0.9, opacity: 0, duration: 0.4 }, "<")
          .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } else if (animType === "fade-up") {
        secTl
          .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
          .from(heading, { y: 40, opacity: 0, duration: 0.3 }, "<")
          .from(bodyText, { y: 30, opacity: 0, duration: 0.3 }, "-=0.15")
          .from(
            bullets,
            { y: 20, opacity: 0, stagger: 0.08, duration: 0.3 },
            "-=0.1"
          )
          .from(phoneMockup, { y: 40, opacity: 0, duration: 0.4 }, "<")
          .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } else if (animType === "scale-up") {
        secTl
          .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
          .from(heading, { scale: 0.92, opacity: 0, duration: 0.3 }, "<")
          .from(bodyText, { y: 20, opacity: 0, duration: 0.3 }, "-=0.15")
          .from(
            bullets,
            { y: 15, opacity: 0, stagger: 0.06, duration: 0.3 },
            "-=0.1"
          )
          .from(phoneMockup, { x: -30, opacity: 0, duration: 0.4 }, "<")
          .from(hardwareBox, { x: 30, opacity: 0, duration: 0.4 }, "<")
          .to(section, { opacity: 0, duration: 0.15 }, "+=0.3");
      } else if (animType === "clip-reveal") {
        secTl
          .fromTo(section, { opacity: 0 }, { opacity: 1, duration: 0.15 })
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
        },
      });

      gsap.to(marquee2.querySelector(".marquee-text"), {
        x: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
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
      {/* Dynamic Loader Panel */}
      <Loader percent={percent} isLoading={isLoading} />

      {/* Navigation Header */}
      <Header siteHeaderRef={siteHeaderRef} />

      {/* Standalone Hero Area */}
      <Hero />

      {/* Background Frame scrubbing Canvas */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block object-cover" />
      </div>

      {/* Edge blending vignette */}
      <div className="fixed inset-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] z-1" />

      {/* Marquee texts flows */}
      <Marquee />

      {/* Scrollable container managing timeline pin depth */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 h-[600vh] w-full bg-transparent"
      >
        {sectionsData.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>

      {/* Footer Links */}
      <Footer />
    </>
  );
}
