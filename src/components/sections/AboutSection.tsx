"use client";

import { motion } from "framer-motion";
import { FiCode, FiLayers, FiZap, FiServer } from "react-icons/fi";

const FEATURES = [
  { icon: FiCode, title: "Clean UI Design", desc: "Crafting beautiful, modern interfaces with focus on user experience." },
  { icon: FiServer, title: "Scalable Architecture", desc: "Designing robust backend systems ready for production traffic." },
  { icon: FiLayers, title: "Full-Stack Ops", desc: "End-to-end development from database design to frontend polish." },
  { icon: FiZap, title: "Real-Time Systems", desc: "Building fast, reactive applications with WebSockets & modern frameworks." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-32">
      <div className="container mx-auto px-6 xl:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">01.</span> About <span className="text-cyan-400 text-glow">Me</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6 text-lg text-zinc-400 leading-relaxed"
          >
            <p>
              I&apos;m a passionate <span className="font-medium text-white">Full-Stack Developer</span> focused on building real-world applications, scalable backend systems, and modern user interfaces.
            </p>
            <p>
              I enjoy solving complex problems, designing clean architecture, and building performant applications using modern web technologies. My approach blends technical excellence with a keen eye for premium design.
            </p>
            <p>
              Currently, I am continuously learning and creating projects that simulate production-level environments—integrating complex authentication systems, real-time dashboards, and secure REST APIs.
            </p>
            
            <div className="pt-6">
              <a href="#contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-500/50 bg-cyan-500/10 px-6 py-3 font-space-grotesk font-medium text-cyan-400 transition-all hover:bg-cyan-500/20 hover:text-white">
                <span>Let&apos;s talk architecture</span>
                <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100 mix-blend-overlay"></div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#18181b]/50 p-6 backdrop-blur-sm transition-all border-glow-hover"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:text-glow group-hover:bg-cyan-500/20 transition-all">
                  <feature.icon size={24} />
                </div>
                <h3 className="mb-2 font-space-grotesk text-xl font-semibold text-zinc-200">{feature.title}</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400">{feature.desc}</p>
                
                {/* Subtle corner glow */}
                <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-cyan-500/0 blur-[30px] transition-all duration-500 group-hover:bg-cyan-500/10"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
