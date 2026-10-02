"use client";

import { motion } from "framer-motion";

export default function GlobalVisualAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Global Subtle Architectural Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #818cf8 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. Floating Ambient Glow Blobs across sections */}
      {/* Top / About Section Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[12%] -left-32 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[150px]"
      />

      {/* Projects Section Glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 0.95, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[35%] -right-32 h-[750px] w-[750px] rounded-full bg-purple-600/15 blur-[160px]"
      />

      {/* Journey & Tech Stack Glow */}
      <motion.div
        animate={{
          scale: [0.95, 1.2, 0.95],
          opacity: [0.1, 0.22, 0.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[58%] -left-20 h-[650px] w-[650px] rounded-full bg-teal-500/15 blur-[150px]"
      />

      {/* Contact Section Beacon */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[85%] right-1/4 h-[700px] w-[700px] rounded-full bg-indigo-500/20 blur-[140px]"
      />

      {/* Top-to-Bottom Subtle Ambient Tint Gradient (Rich Midnight Indigo rather than flat black) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060914]/40 to-transparent" />
    </div>
  );
}
