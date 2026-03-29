"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About" },
  { id: "tech-stack", label: "Tech" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

export default function NeonStick() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate dot position based on spring-animated scroll progress (0 to 100%)
  const dotY = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    return scaleY.on("change", (latest) => {
      // rough heuristic to light up labels as the dot passes them
      // length is SECTIONS.length
      const segLength = 1 / (SECTIONS.length - 1);
      const activeIdx = Math.round(latest / segLength);
      setActiveSegment(Math.max(0, Math.min(activeIdx, SECTIONS.length - 1)));
    });
  }, [scaleY]);

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden h-[60vh] w-12 xl:flex flex-col items-center">
      
      {/* Container for the line */}
      <div className="relative h-full w-[2px] bg-zinc-800 rounded-full">
        
        {/* Animated growing neon line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-cyan-400 origin-top rounded-full"
          style={{ scaleY, boxShadow: "0 0 15px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.4)" }}
        />

        {/* The moving glowing dot tracker */}
        <motion.div
          className="absolute -left-[5px] h-3 w-3 rounded-full bg-white"
          style={{ top: dotY }}
        >
          {/* Outer glowing aura */}
          <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-50 blur-[8px]" />
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-300 shadow-[0_0_15px_#06b6d4,0_0_30px_#06b6d4]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Section marker nodes along the line */}
        {SECTIONS.map((section, idx) => {
          const isActive = activeSegment >= idx;
          const isCurrent = activeSegment === idx;
          
          return (
            <div 
              key={section.id}
              className="absolute left-[-4px] h-[10px] w-[10px] rounded-full transition-colors duration-500 z-[-1]"
              style={{ top: `${(idx / (SECTIONS.length - 1)) * 100}%`, transform: "translateY(-50%)" }}
            >
              <div 
                className={`h-full w-full rounded-full transition-all duration-300 ${
                  isActive ? "bg-cyan-500 shadow-[0_0_10px_#0ea5e9]" : "bg-zinc-700"
                }`}
              />
              {/* Highlight label when reached */}
              <div
                className={`absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-space-grotesk tracking-widest transition-all duration-500 ${
                  isCurrent ? "text-cyan-400 text-glow opacity-100 font-bold" : "text-zinc-600 opacity-0 group-hover:opacity-50"
                }`}
              >
                {section.label.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
