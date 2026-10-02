"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiArrowUp,
  FiChevronRight
} from "react-icons/fi";
import dynamic from "next/dynamic";
import { MILESTONES } from "./SurpriseCanvas";

// Dynamic load of WebGL Canvas with ssr: false to prevent Next.js SSR compilation issues
const SurpriseCanvas = dynamic(() => import("./SurpriseCanvas"), { ssr: false });

export default function Surprise3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [use2DFallback, setUse2DFallback] = useState(false);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // Detect if WebGL context is available in client browser
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    };

    // Detect prefers-reduced-motion media query trigger
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!checkWebGL() || motionQuery.matches) {
      setUse2DFallback(true);
    }

    const handleError = (e: ErrorEvent) => {
      setErrorLog(`Error: ${e.message}\nFile: ${e.filename}:${e.lineno}\nStack: ${e.error?.stack || ""}`);
    };
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", (e) => {
      setErrorLog(`Promise Rejection: ${e.reason}`);
    });

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll metrics to prevent visual jerkiness
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 45,
    stiffness: 70,
    mass: 1.0,
  });

  // 1. Transition Screen Metrics (0.0 -> 0.15 of section scroll)
  const transitionOpacity = useTransform(smoothProgress, [0, 0.04, 0.11, 0.16], [0, 1, 1, 0]);
  const transitionScale = useTransform(smoothProgress, [0, 0.10, 0.16], [0.9, 1, 3.5]);

  // Initial entry dark overlay: fades from 1.0 down to 0.0 between [0.08, 0.16] to reveal normal sky background
  const entryDarkOpacity = useTransform(smoothProgress, [0.08, 0.16], [1, 0]);

  // Scroll-following black background fade: begins at 0.32 and smoothly deepens into black by 0.72
  const scrollBlackOpacity = useTransform(smoothProgress, [0.32, 0.72], [0, 1]);

  // 3. Fading grid scene opacity
  const spaceOpacity = useTransform(smoothProgress, [0.12, 0.18, 0.95, 0.98], [0, 1, 1, 0]);

  // 4. Final Section Reveal (0.95 -> 0.98 of section scroll to allow resting on Card 6)
  const finalOpacity = useTransform(smoothProgress, [0.95, 0.98], [0, 1]);
  const finalY = useTransform(smoothProgress, [0.95, 0.98], [100, 0]);

  // 5. Hide Navbar (z-50) and NeonStick (z-40) dynamically when Surprise starts
  const zIndex = useTransform(smoothProgress, (p) => p > 0.01 ? 60 : 40);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── 2D Timeline Fallback Render ───
  if (use2DFallback) {
    return (
      <section id="timeline-2d" className="relative py-32 bg-[#09090b]">
        <div className="container mx-auto px-6 xl:pl-32 max-w-5xl">
          <div className="mb-16">
            <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              Timeline Fallback (2D / Motion Reduced Accessible Mode)
            </p>
            <h2 className="font-space-grotesk text-3xl font-black text-white">Engineering Journey Milestones</h2>
          </div>

          <div className="space-y-6">
            {MILESTONES.map((ms, index) => (
              <div key={index} className="rounded-2xl border border-zinc-850 bg-zinc-950/70 p-6 backdrop-blur-sm flex flex-col md:flex-row gap-6 hover:border-zinc-700 transition-all duration-300">
                <div className="md:w-1/3">
                  <span className="font-mono text-cyan-400 font-bold block mb-1 text-xs">{ms.year}</span>
                  <h3 className="font-space-grotesk text-lg font-bold text-white">{ms.title}</h3>
                  <p className="text-zinc-550 text-[10px] mt-1">{ms.subtitle}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {ms.tech.map((t, ti) => (
                      <span key={ti} className="bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded text-[9px] font-mono">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/3 text-zinc-400 text-xs leading-relaxed self-center">
                  {ms.content}
                </div>
                <div className="md:w-1/3 flex items-center justify-center bg-zinc-900/10 p-2 rounded-xl border border-zinc-900">
                  {ms.visual}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Outro display */}
          <div className="mt-24 border-t border-zinc-900 pt-16 text-center space-y-6">
            <span className="font-mono text-pink-600 text-xs font-bold tracking-widest uppercase">06. NEXT ADVENTURE</span>
            <h2 className="text-4xl md:text-5xl font-space-grotesk font-black text-white leading-tight">
              Let&apos;s Build Something Extraordinary
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed">
              I am always looking for challenging architectures, innovative AI projects, and opportunities to scale production setups. Let&apos;s turn complex ideas into refined code.
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <a 
                href="mailto:hello@example.com" 
                className="bg-white hover:bg-slate-100 text-black px-6 py-3 rounded-full font-space-grotesk font-bold text-xs transition-colors flex items-center gap-2"
              >
                <FiMail size={14} /> Shoot an Email
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-[650vh] w-full"
      id="timeline-3d"
    >
      {/* Sticky Frame Wrapper */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ zIndex }}
      >
        
        {/* Layer 0: Normal Base Background (Dreamy pastel sky: soft pink/lavender/sky gradient) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-100 via-purple-50 to-sky-100 z-0" />

        {/* Layer 1: Scroll-following Black Fade Overlay (Fades in to deep #09090b as user scrolls along track) */}
        {/* Layer 1: Cosmic Space Background Fade with Rich Nebulae */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-[#050818] via-[#090d28] to-[#050716] z-[5] pointer-events-none"
          style={{ opacity: scrollBlackOpacity }}
        >
          {/* Vivid Cosmic Radial Nebulae */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.25),transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(245,158,11,0.22),transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(168,85,247,0.2),transparent_60%)] pointer-events-none" />
          {/* Subtle Cyber Perspective Grid for ground orientation */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </motion.div>

        {/* Layer 2: Initial Glitch Dark Overlay (Fades out at entry to reveal the normal background) */}
        <motion.div 
          className="absolute inset-0 bg-[#09090b] z-10 pointer-events-none"
          style={{ opacity: entryDarkOpacity }}
        />

        {/* Phase 1: Glitch Surprise Reveal Overlay (Dark background) */}
        <motion.div
          className="absolute inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center px-6 pointer-events-none"
          style={{ opacity: transitionOpacity, scale: transitionScale }}
        >
          <div className="text-center space-y-4">
            <h2 className="font-space-grotesk text-3xl md:text-5xl font-black text-rose-400 tracking-wider animate-glitch text-glow">
              WAIT...
            </h2>
            <p className="font-mono text-sm md:text-base text-zinc-500 uppercase tracking-widest">
              IT IS NOT THE END YET.
            </p>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4 animate-pulse"></div>
            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest pt-12 animate-pulse flex items-center justify-center gap-2">
              <span>Scroll down to explore the timeline</span>
              <FiChevronRight size={10} className="rotate-90" />
            </div>
          </div>
        </motion.div>

        {/* Phase 2: The WebGL 3D Cloud Career Space */}
        <motion.div 
          className="absolute inset-0 z-20 w-full h-full overflow-hidden"
          style={{ opacity: spaceOpacity }}
        >
          {isMounted && <SurpriseCanvas scrollProgress={smoothProgress} />}
        </motion.div>

        {/* Phase 3: Outro Screen & Contact Form (Dark Cyberpunk Theme) */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#09090b]/85 via-[#0c0d12]/95 to-[#09090b] backdrop-blur-xl"
          style={{ 
            opacity: finalOpacity, 
            y: finalY,
            pointerEvents: useTransform(smoothProgress, (p) => p > 0.96 ? "auto" : "none")
          }}
        >
          {/* Subtle cyan glow line at bottom of Outro */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none -z-10"></div>
          
          <div className="max-w-3xl text-center space-y-6 md:space-y-8 relative z-10">
            <div className="font-mono text-cyan-400 text-xs md:text-sm font-bold tracking-widest uppercase">
              06. NEXT ADVENTURE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-space-grotesk font-black text-white tracking-tighter leading-none">
              Let&apos;s Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400">Something</span> Extraordinary
            </h2>
            
            <p className="text-sm md:text-base text-zinc-400 font-medium leading-relaxed max-w-xl mx-auto">
              I am always looking for challenging architectures, innovative AI projects, and opportunities to scale production setups. Let&apos;s turn complex ideas into refined code.
            </p>

            {/* Contact Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="mailto:contact@rosrendo.dev"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-space-grotesk font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
              >
                <FiMail size={18} />
                <span>Shoot an Email</span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/ROS-RENDO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors shadow-sm"
                  aria-label="GitHub"
                >
                  <FiGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/ROS-RENDO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-[#06b6d4] hover:border-zinc-600 transition-colors shadow-sm"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={20} />
                </a>
                
                {/* Back to Top CTA */}
                <button
                  onClick={scrollToTop}
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors flex items-center justify-center shadow-sm cursor-pointer group"
                  title="Scroll to Top"
                >
                  <FiArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Final Footer Credits */}
            <div className="pt-20 text-center">
              <p className="font-space-grotesk text-xs text-zinc-500 font-semibold">
                Designed & Built by <span className="text-white font-bold">Ros Rendo</span> &copy; {new Date().getFullYear()}
              </p>
              <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-1">
                SYSTEM_END // PORTAL_IDLE
              </p>
            </div>

          </div>
        </motion.div>

      </motion.div>

      {/* Debug Error overlay to display any javascript crash details directly in browser viewport */}
      {errorLog && (
        <div className="fixed bottom-4 right-4 bg-red-600/90 text-white font-mono text-[10px] p-4 rounded-xl border border-red-400 max-w-[80vw] max-h-[40vh] overflow-auto z-[9999] shadow-2xl select-text">
          <div className="font-bold border-b border-white/20 pb-1 mb-2">⚠️ LIVE PORTFOLIO JS RUNTIME ERROR</div>
          <pre className="whitespace-pre-wrap">{errorLog}</pre>
        </div>
      )}
    </section>
  );
}
