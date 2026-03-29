"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400"
      style={{
        scaleX: scrollYProgress,
        boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)",
      }}
    />
  );
}
