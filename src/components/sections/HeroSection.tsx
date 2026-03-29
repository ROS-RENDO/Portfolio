"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { FiArrowDown } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Particles */}
      <ParticleBackground />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-space-grotesk text-xl tracking-widest text-cyan-400 text-glow"
          >
            HELLO, I&apos;M
          </motion.p>

          {/* Name */}
          <h1 className="font-space-grotesk text-6xl font-black uppercase tracking-tighter text-white md:text-8xl lg:text-9xl">
            Ros <span className="text-cyan-400 text-glow">Rendo</span>
          </h1>

          {/* Typing Role */}
          <div className="h-16 text-2xl font-medium text-zinc-300 md:text-4xl text-glow bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 pb-2">
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "Building Scalable Backend Systems",
                2000,
                "Designing Modern UI/UX",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl"
          >
            Building high-performance applications, scalable architecture, and premium user interfaces.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="rounded-full border border-cyan-500/30 p-2 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          <FiArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
