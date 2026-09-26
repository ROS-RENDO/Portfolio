"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiMail, FiGithub, FiLinkedin, FiDownload, FiFileText, FiX, FiCheck } from "react-icons/fi";

const SOCIALS = [
  { name: "GitHub", icon: FiGithub, href: "https://github.com/ROS-RENDO", color: "hover:text-white" },
  { name: "LinkedIn", icon: FiLinkedin, href: "#", color: "hover:text-[#0077B5]" },
  { name: "Email", icon: FiMail, href: "mailto:hello@example.com", color: "hover:text-cyan-400" },
];

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl h-[85vh] bg-[#111113] border border-zinc-800 rounded-2xl overflow-y-auto p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-900 pb-4 mb-6">
            <div>
              <h2 className="font-space-grotesk text-2xl font-black text-white">ROS RENDO</h2>
              <p className="font-mono text-xs text-cyan-400">Software Engineer — Full-Stack & Backend Systems</p>
            </div>
            <button onClick={onClose} className="rounded-full border border-zinc-700 p-2 text-zinc-400 hover:text-white transition-all">
              <FiX size={16} />
            </button>
          </div>

          {/* Document Content */}
          <div className="space-y-6 text-sm text-zinc-300 font-sans leading-relaxed">
            {/* Summary */}
            <section className="space-y-2">
              <h3 className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500">Summary</h3>
              <p className="text-xs text-zinc-400">
                Performance-driven software engineer specialized in building robust REST/WebSocket APIs, relational databases, AI classification pipelines, and containerized deployments. Focused on clean code patterns and empirical test metric coverage.
              </p>
            </section>

            {/* Core Skills */}
            <section className="space-y-2">
              <h3 className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block mb-1">Languages:</span>
                  <span className="text-zinc-300">TypeScript, Go, Python, SQL, MQL5, Bash</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Backend frameworks:</span>
                  <span className="text-zinc-300">Next.js, NestJS, Node.js, Express, FastAPI</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Databases:</span>
                  <span className="text-zinc-300">PostgreSQL, MongoDB, Redis, Prisma ORM</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-1">Cloud / Infra:</span>
                  <span className="text-zinc-300">Docker, Nginx, Kubernetes, Git, CI/CD</span>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <h3 className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500">Experience</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-start text-xs font-bold">
                    <span className="text-white">Contract Software Engineer</span>
                    <span className="font-mono text-zinc-500">2026</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400">Freelance Client Engagements</span>
                  <ul className="list-disc pl-4 space-y-1 mt-1 text-xs text-zinc-400">
                    <li>Engineered multi-party NestJS scheduling and Stripe Connect escrow systems.</li>
                    <li>Built GitHub Actions workflow lints and unit test suites mapping test metrics.</li>
                    <li>Dockerized server scripts mapping Nginx reverse proxy routing.</li>
                  </ul>
                </div>
                <div>
                  <div className="flex justify-between items-start text-xs font-bold">
                    <span className="text-white">Full-Stack Developer</span>
                    <span className="font-mono text-zinc-500">2025</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400">Independent Product Iterations</span>
                  <ul className="list-disc pl-4 space-y-1 mt-1 text-xs text-zinc-400">
                    <li>Designed LLM stack generators using OpenAI and Zod parsing maps.</li>
                    <li>Integrated websocket feeds capturing forex MT5 drawdown logs.</li>
                    <li>Wrote Mapbox geo-query bounds.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-2">
              <h3 className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500">Education</h3>
              <div className="flex justify-between items-start text-xs">
                <div>
                  <span className="text-white font-bold block">Self-Directed Engineering & Algorithms Curriculum</span>
                  <span className="text-zinc-500">Specializations in relational DB engines, web architecture, and computer vision pipelines</span>
                </div>
                <span className="font-mono text-zinc-500">2024 - Present</span>
              </div>
            </section>
          </div>

          {/* Action links */}
          <div className="mt-8 pt-4 border-t border-zinc-900 flex justify-end gap-3">
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-850 px-4 py-2 font-space-grotesk text-xs font-bold text-zinc-300 hover:text-white"
            >
              <FiDownload size={14} /> Download PDF
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ContactSection() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <section id="contact" className="relative min-h-[80vh] py-32 flex flex-col items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="font-space-grotesk text-cyan-400 font-bold tracking-widest text-glow mb-4">
            09. WHAT&apos;S NEXT?
          </div>
          
          <h2 className="text-5xl md:text-7xl font-space-grotesk font-black text-white tracking-tighter">
            Get In <span className="text-cyan-400 text-glow">Touch</span>
          </h2>
          
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Whether you have a unique product idea, need a scalable backend, or just want to say hi—my inbox is always open. 
            Currently available for freelance opportunities and full-time roles.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
          >
            {/* View Resume Button CTA */}
            <button
              onClick={() => setResumeOpen(true)}
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-space-grotesk font-bold text-white transition-all overflow-hidden rounded-full border border-zinc-800 bg-[#18181b] hover:border-zinc-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              <FiFileText size={18} />
              <span>View Resume</span>
            </button>

            {/* Resume Download CTA */}
            <a 
              href="#" 
              target="_blank" 
              className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-space-grotesk font-bold text-white transition-all overflow-hidden rounded-full border border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <FiDownload size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>Download PDF</span>
              <div className="absolute top-0 -left-[100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
            </a>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`group relative p-3.5 rounded-full border border-zinc-800 bg-[#18181b] text-zinc-400 transition-all hover:border-zinc-500 ${social.color} hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]`}
                  aria-label={social.name}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Resume viewer overlay modal */}
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full">
         <p className="font-space-grotesk text-xs text-zinc-650">
           Designed & Built by <span className="text-cyan-500/40">Ros Rendo</span> &copy; {new Date().getFullYear()}
         </p>
      </div>
    </section>
  );
}
