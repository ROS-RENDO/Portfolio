"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  FiGitBranch, FiGitPullRequest, FiPlay, FiShield, FiCheck, FiSettings, FiActivity 
} from "react-icons/fi";
import {
  SiNextdotjs, SiReact, SiTypescript, SiNestjs, SiPostgresql, SiRedis,
  SiDocker, SiPython, SiFastapi, SiStripe, SiGo
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

const PIPELINE_NODES = [
  {
    id: "local",
    label: "Local Dev",
    icon: FiSettings,
    cmd: "git commit -m \"feat: add payments escrow check\"",
    desc: "Develop code locally. Hooks validate lint/types before committing."
  },
  {
    id: "branch",
    label: "Feature Push",
    icon: FiGitBranch,
    cmd: "git push origin feature/payment-escrow",
    desc: "Code pushed triggers automated workflow actions in GitHub runner."
  },
  {
    id: "pr",
    label: "Pull Request",
    icon: FiGitPullRequest,
    cmd: "PR #42 opened to merge to main",
    desc: "Triggers validation matrix (Linting &rarr; Types &rarr; Unit Tests)."
  },
  {
    id: "test",
    label: "Tests Check",
    icon: FiPlay,
    cmd: "npm run test:ci (vitest run --coverage)",
    desc: "Runs backend and frontend test suites to assert coverage."
  },
  {
    id: "security",
    label: "Security Scan",
    icon: FiShield,
    cmd: "CodeQL dependency scanning active",
    desc: "Identifies vulnerable configurations or dependency CVE logs."
  },
  {
    id: "production",
    label: "Production",
    icon: FiCheck,
    cmd: "Merge to main && deploy webhook",
    desc: "Code merged, container rebuilt, reverse proxy reloads automatically."
  }
];

const CONSTELLATION_NODES = [
  { id: "ts", label: "TypeScript", icon: SiTypescript, x: 100, y: 100, color: "#3178c6", project: "All active codebases" },
  { id: "react", label: "React", icon: SiReact, x: 60, y: 60, color: "#61dafb", project: "ServiceFinder, Dashboard" },
  { id: "nextjs", label: "Next.js", icon: SiNextdotjs, x: 140, y: 60, color: "#ffffff", project: "ServiceFinder, StackGen" },
  { id: "three", label: "Three.js", icon: TbBrandThreejs, x: 100, y: 40, color: "#ffffff", project: "Surprise Spline Canvas" },
  { id: "nestjs", label: "NestJS", icon: SiNestjs, x: 60, y: 140, color: "#e0234e", project: "ServiceFinder, Real Estate" },
  { id: "postgres", label: "PostgreSQL", icon: SiPostgresql, x: 140, y: 140, color: "#336791", project: "ServiceFinder, Real Estate" },
  { id: "redis", label: "Redis", icon: SiRedis, x: 100, y: 160, color: "#dc382d", project: "ServiceFinder caches" },
  { id: "docker", label: "Docker", icon: SiDocker, x: 30, y: 100, color: "#2496ed", project: "ServiceFinder, AI Builder" },
  { id: "stripe", label: "Stripe", icon: SiStripe, x: 170, y: 100, color: "#635bff", project: "ServiceFinder Connect" },
  { id: "python", label: "Python", icon: SiPython, x: 35, y: 50, color: "#3776ab", project: "YOLOv8 & Quant feeds" },
  { id: "fastapi", label: "FastAPI", icon: SiFastapi, x: 35, y: 150, color: "#009688", project: "AI Inference Server" },
  { id: "go", label: "Go", icon: SiGo, x: 165, y: 150, color: "#00add8", project: "Distributed Consensus Engine" }
];

const CONSTELLATION_LINKS = [
  { from: "ts", to: "react" },
  { from: "ts", to: "nextjs" },
  { from: "ts", to: "nestjs" },
  { from: "react", to: "nextjs" },
  { from: "nextjs", to: "three" },
  { from: "react", to: "three" },
  { from: "nestjs", to: "postgres" },
  { from: "postgres", to: "redis" },
  { from: "nestjs", to: "redis" },
  { from: "nestjs", to: "docker" },
  { from: "ts", to: "docker" },
  { from: "postgres", to: "stripe" },
  { from: "nextjs", to: "stripe" },
  { from: "python", to: "fastapi" },
  { from: "python", to: "ts" },
  { from: "docker", to: "fastapi" },
  { from: "go", to: "postgres" },
  { from: "go", to: "docker" }
];

export default function AboutSection() {
  const [activePipeline, setActivePipeline] = useState<string>("local");
  const [activeTech, setActiveTech] = useState<string>("ts");

  const currentNode = PIPELINE_NODES.find(n => n.id === activePipeline) || PIPELINE_NODES[0];
  const activeTechObj = CONSTELLATION_NODES.find(n => n.id === activeTech) || CONSTELLATION_NODES[0];

  return (
    <section id="about" className="relative py-32 bg-[#09090b]">
      
      {/* Marching laser lines animation style injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marching-dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .constellation-laser {
          stroke-dasharray: 5, 5;
          animation: marching-dash 1.2s linear infinite;
        }
      `}} />

      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">01.</span> About <span className="text-cyan-400 text-glow">Me</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
        </motion.div>

        {/* Bio + Interactive Pipeline */}
        <div className="grid gap-16 lg:grid-cols-2 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 text-zinc-400 leading-relaxed"
          >
            <p className="text-lg">
              I&apos;m a <span className="text-white font-semibold">software engineer</span> who builds backend services, algorithmic systems, and automation pipelines.
            </p>
            <p>
              I build functional systems rather than templates. When I choose a dependency, I map out its transactions, limits, and operational trade-offs.
            </p>
            <div className="pt-4 flex gap-3 flex-wrap">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 font-space-grotesk text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20">
                View Projects →
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2 font-space-grotesk text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-white">
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Interactive CI/CD Pipeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-6 backdrop-blur-sm">
              <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Pipeline Workflow</p>
              
              {/* Pipeline Nodes Map */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                {PIPELINE_NODES.map((node) => {
                  const Icon = node.icon;
                  const isActive = node.id === activePipeline;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setActivePipeline(node.id)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "border-cyan-500/50 bg-cyan-500/5 text-cyan-400"
                          : "border-zinc-850/80 bg-zinc-900/40 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                      }`}
                    >
                      <Icon size={16} />
                      <span className="font-space-grotesk text-[9px] font-bold text-center tracking-tight leading-none">{node.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Injected terminal panel */}
              <div className="rounded-xl border border-zinc-850 bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed relative min-h-[120px]">
                <div className="absolute top-3 right-4 flex space-x-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                </div>
                <div className="text-zinc-500 mb-2 border-b border-zinc-900 pb-2">Console Output</div>
                <div className="text-cyan-400 mb-2 font-bold">$ {currentNode.cmd}</div>
                <div className="text-zinc-400">{currentNode.desc}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Constellation Map (Skill Evidence) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-zinc-900 pt-16"
        >
          <div className="mb-8">
            <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Stack Connections</p>
            <h3 className="font-space-grotesk text-3xl font-black text-white">Visual Constellation Map</h3>
            <p className="text-zinc-500 text-xs mt-1">Select any tech star node to trace its data relationships and codebase connections.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-12 items-center">
            
            {/* Left: Responsive SVG Constellation */}
            <div className="col-span-12 md:col-span-7 flex justify-center items-center bg-[#111113]/40 border border-zinc-850 rounded-3xl p-6 backdrop-blur-sm min-h-[380px] relative overflow-hidden">
              <svg className="w-full max-w-[400px] h-[320px] overflow-visible" viewBox="0 0 200 200">
                
                {/* Connection paths */}
                {CONSTELLATION_LINKS.map((link, idx) => {
                  const nodeFrom = CONSTELLATION_NODES.find(n => n.id === link.from);
                  const nodeTo = CONSTELLATION_NODES.find(n => n.id === link.to);
                  if (!nodeFrom || !nodeTo) return null;

                  const isConnectedToActive = activeTech === link.from || activeTech === link.to;

                  return (
                    <line
                      key={`link-${idx}`}
                      x1={nodeFrom.x}
                      y1={nodeFrom.y}
                      x2={nodeTo.x}
                      y2={nodeTo.y}
                      stroke={isConnectedToActive ? activeTechObj.color : "#27272a"}
                      strokeWidth={isConnectedToActive ? "1.8" : "0.8"}
                      strokeDasharray={isConnectedToActive ? "5, 5" : "none"}
                      className={isConnectedToActive ? "constellation-laser" : ""}
                      style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                    />
                  );
                })}

                {/* Node Circles */}
                {CONSTELLATION_NODES.map((node) => {
                  const Icon = node.icon;
                  const isActive = node.id === activeTech;

                  return (
                    <g key={node.id} className="cursor-pointer" onClick={() => setActiveTech(node.id)}>
                      {isActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="12"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1"
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="8"
                        fill="#09090b"
                        stroke={isActive ? node.color : "#27272a"}
                        strokeWidth="1.5"
                        style={{ transition: "stroke 0.3s" }}
                      />
                      <g transform={`translate(${node.x - 4}, ${node.y - 4})`}>
                        <Icon size={8} style={{ color: isActive ? node.color : "#71717a" }} />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right: Selected Node Details Display (Compact, visual terminal) */}
            <div className="col-span-12 md:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-zinc-850 bg-zinc-950/60 p-6 backdrop-blur-sm min-h-[220px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: activeTechObj.color }} />
                        <span className="font-space-grotesk text-sm font-black text-white uppercase">{activeTechObj.label} Node</span>
                      </div>
                      <span className="text-[9px] text-zinc-550 flex items-center gap-1"><FiActivity size={10} /> Active Star</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-zinc-600 text-[8px] uppercase tracking-widest block font-space-grotesk font-black mb-1.5">Connected Codebase:</span>
                        <span className="text-cyan-400 font-mono text-xs font-bold">$ {activeTechObj.project}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-zinc-900 text-zinc-500 text-[10px] font-mono">
                    Constellation node traces dependencies across your core production repositories.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
