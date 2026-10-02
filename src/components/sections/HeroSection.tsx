// UPDATED HeroSection — human, purposeful copy with real CTAs
"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "@/components/ui/ParticleBackground";
import dynamic from "next/dynamic";
import { FiArrowDown, FiGithub, FiFolder } from "react-icons/fi";

const HeroCyberCompanion = dynamic(() => import("@/components/ui/HeroCyberCompanion"), {
  ssr: false,
  loading: () => (
    <div className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] flex items-center justify-center">
      <div className="w-44 h-44 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-pulse" />
    </div>
  ),
});

const STATUS_ITEMS = [
  { dot: "bg-green-400", label: "Available for work" },
  { dot: "bg-cyan-400", label: "Building ServiceFinder" },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 md:py-24">
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Live status indicators */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              {STATUS_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 font-mono text-xs text-zinc-400 backdrop-blur"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.dot} animate-pulse`} />
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="font-space-grotesk text-sm sm:text-base tracking-widest text-zinc-500 uppercase"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <h1 className="font-space-grotesk text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Ros <span className="text-cyan-400 text-glow">Rendo</span>
            </h1>

            {/* Typing Role */}
            <div className="h-12 text-xl font-medium sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              <TypeAnimation
                sequence={[
                  "Full-Stack Engineer",
                  2000,
                  "Backend Systems Builder",
                  2000,
                  "AI & Automation Engineer",
                  2000,
                  "Quantitative Trading Dev",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed mx-auto lg:mx-0"
            >
              I build systems, products, and automation tools—then ship them.<br />
              <span className="text-zinc-500 text-xs sm:text-sm">Don&apos;t believe me. Look at what I built.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-4 flex-wrap pt-2"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-cyan-500 px-7 py-3 font-space-grotesk font-bold text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
              >
                <FiFolder size={18} />
                <span>See My Work</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/rosrendo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-7 py-3 font-space-grotesk font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
              >
                <FiGithub size={18} />
                <span>GitHub</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive 3D Cyber Companion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center relative order-first lg:order-last"
          >
            <HeroCyberCompanion />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-zinc-600">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="rounded-full border border-zinc-800 p-2 text-zinc-600"
        >
          <FiArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
