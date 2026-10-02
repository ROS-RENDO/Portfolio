"use client";

import { useState, useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  FiGitBranch, 
  FiGitPullRequest, 
  FiCheckCircle, 
  FiServer, 
  FiTerminal, 
  FiZap, 
  FiShield, 
  FiCode,
  FiPlay,
  FiActivity,
  FiArrowRight,
  FiCpu,
  FiCheck
} from "react-icons/fi";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTailwindcss
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";

// ─── Real Engineering Pipeline Stages ───
const PIPELINE_STEPS = [
  {
    id: "local",
    step: "01",
    label: "Local Dev",
    tag: "git.commit",
    icon: FiCode,
    cmd: "git commit -m \"feat(core): domain architecture & strict schemas\"",
    desc: "Domain modularity with strict ESLint and pre-commit type verification hooks.",
    accent: "#38bdf8", // cyan
    badge: "HOOKS PASS",
  },
  {
    id: "push",
    step: "02",
    label: "Branch Push",
    tag: "git.push",
    icon: FiGitBranch,
    cmd: "git push origin feat/distributed-pipeline",
    desc: "Isolated branch push triggers cloud CI runner container matrix instantly.",
    accent: "#818cf8", // indigo
    badge: "CI TRIGGERED",
  },
  {
    id: "pr",
    step: "03",
    label: "PR Matrix",
    tag: "gh.pr",
    icon: FiGitPullRequest,
    cmd: "gh pr create --title \"feat: high-voltage workflow release\" --reviewers team",
    desc: "Architecture review, visual diff validation, and collaborative sign-off.",
    accent: "#c084fc", // purple
    badge: "IN REVIEW",
  },
  {
    id: "test",
    step: "04",
    label: "Vitest CI",
    tag: "npm.test",
    icon: FiCheckCircle,
    cmd: "vitest run --coverage --threads=4",
    desc: "100% unit and integration test pass rate with strict branch boundary assertion.",
    accent: "#34d399", // emerald
    badge: "PASS 100%",
  },
  {
    id: "security",
    step: "05",
    label: "Security Scan",
    tag: "trivy.scan",
    icon: FiShield,
    cmd: "trivy fs --severity HIGH,CRITICAL . && codeql analyze",
    desc: "Zero vulnerable dependencies, memory leak inspection, and CVE sanitization.",
    accent: "#f43f5e", // rose
    badge: "0 CVEs FOUND",
  },
  {
    id: "deploy",
    step: "06",
    label: "Zero-Downtime Ship",
    tag: "docker.ship",
    icon: FiServer,
    cmd: "docker compose up -d --build --rolling-update",
    desc: "Containerized multi-stage image deployment with automated reverse proxy reload.",
    accent: "#fbbf24", // amber
    badge: "LIVE 60FPS",
  },
];

// ─── Core Tech Stack Badges (Authentic Icons, No Emojis) ───
const TECH_STACK = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React 19", icon: SiReact, color: "#61dafb" },
  { name: "Three.js", icon: TbBrandThreejs, color: "#ffffff" },
  { name: "NestJS", icon: SiNestjs, color: "#e0234e" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Redis", icon: SiRedis, color: "#dc382d" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06b6d4" },
];

// ─── Personality Stickers (Interactive & Wobbly) ───
const STICKERS = [
  { text: "☕ Espresso Fueled", color: "border-amber-500/40 bg-amber-950/30 text-amber-300", rotate: -3 },
  { text: "✨ 60 FPS Or Bust", color: "border-cyan-500/40 bg-cyan-950/30 text-cyan-300", rotate: 2 },
  { text: "🎧 Synthwave Flow", color: "border-purple-500/40 bg-purple-950/30 text-purple-300", rotate: -2 },
  { text: "🛡️ Type-Safety First", color: "border-blue-500/40 bg-blue-950/30 text-blue-300", rotate: 4 },
  { text: "🧩 Problem Solver", color: "border-emerald-500/40 bg-emerald-950/30 text-emerald-300", rotate: -4 },
  { text: "🌱 Always Learning", color: "border-rose-500/40 bg-rose-950/30 text-rose-300", rotate: 3 },
];

// ─── Staggered Container for Fade-One-By-One Animation ───
const staggeredContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger high-voltage pipeline simulation (Steps light up one by one!)
  const runPipelineSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let current = 0;
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    simulationIntervalRef.current = setInterval(() => {
      current += 1;
      if (current >= PIPELINE_STEPS.length) {
        if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
        setIsSimulating(false);
      } else {
        setActiveStep(current);
      }
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    };
  }, []);

  const currentStepData = PIPELINE_STEPS[activeStep];

  return (
    <section id="about" className="relative py-28 overflow-hidden select-none bg-[#07090e]">
      
      {/* Background Atmosphere Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-1/3 -right-40 h-[550px] w-[550px] rounded-full bg-purple-600/10 blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl relative z-10 space-y-16">

        {/* ─── 1. Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-b border-zinc-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                01. ABOUT ME // IDENTITY & CRAFT
              </span>
            </div>
            <h2 className="font-space-grotesk text-4xl md:text-5xl font-black text-white tracking-tight">
              Engineering <span className="text-cyan-400 text-glow">Profile</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/30 text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM STATUS: READY
            </span>
          </div>
        </motion.div>

        {/* ─── 2. Profile Dossier (Clean, Authentic, No Generic Emojis) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Holographic Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-cyan-500/30 bg-[#0b0f1d]/90 p-7 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(6,182,212,0.12)]"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Badge & Role */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center font-space-grotesk text-xl font-bold text-cyan-300">
                    R
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0b0f1d]" />
                  </div>
                  <div>
                    <h3 className="font-space-grotesk text-xl font-black text-white">
                      Rendo
                    </h3>
                    <p className="font-mono text-xs text-cyan-400">
                      Full-Stack & 3D Interactive Systems
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[10px] px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300">
                  UTC+7 &bull; AVAILABLE FOR ROLES
                </div>
              </div>

              {/* Bio Narrative (Direct & Professional) */}
              <div className="space-y-4 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 pt-5">
                <p>
                  I build functional distributed systems, microservices, and immersive 60fps web experiences. Rather than adopting dependencies blindly, I architect for operational resilience, strict type contracts, and deterministic performance.
                </p>
                <p className="text-zinc-400 text-xs">
                  From sub-millisecond in-memory cache layers with Redis and PostgreSQL to custom Three.js WebGL shaders, every line of code is structured for clarity, scalability, and maintainability.
                </p>
              </div>
            </div>

            {/* Stack Badges with Authentic Brand Icons */}
            <div className="mt-6 pt-5 border-t border-zinc-800">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-3">
                PRIMARY WEAPONS OF CHOICE
              </span>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/70 text-zinc-300 font-mono text-xs hover:border-cyan-500/40 hover:text-white transition-colors"
                    >
                      <Icon size={13} style={{ color: tech.color }} />
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right: Real Dev Telemetry / Specs Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl border border-zinc-800 bg-[#0a0d18]/90 p-7 backdrop-blur-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <FiTerminal className="text-cyan-400" size={16} />
                  <span className="font-space-grotesk text-xs font-bold text-white uppercase tracking-wider">
                    Execution Telemetry
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-500">LIVE SPECS</span>
              </div>

              {/* Spec Rows */}
              <div className="space-y-4 font-mono text-xs">
                {[
                  { label: "Rendering Budget", value: "60 FPS (16.6ms / frame)", color: "text-cyan-300", bar: 95 },
                  { label: "Type Contract Strictness", value: "100% Strict Null Checks", color: "text-emerald-300", bar: 100 },
                  { label: "CI Pipeline Speed", value: "< 45s Total Cycle", color: "text-amber-300", bar: 88 },
                  { label: "Architecture Style", value: "Domain-Driven & Modular", color: "text-purple-300", bar: 92 },
                ].map((spec, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-400">{spec.label}</span>
                      <span className={`font-bold ${spec.color}`}>{spec.value}</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-850 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                        style={{ width: `${spec.bar}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-6 border-t border-zinc-800/80 flex items-center gap-3">
              <a
                href="#projects"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2.5 font-space-grotesk text-xs font-bold text-cyan-400 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <span>Explore Projects</span>
                <FiArrowRight size={13} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 font-space-grotesk text-xs font-bold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
              >
                Connect
              </a>
            </div>
          </motion.div>

        </div>

        {/* ─── 3. CENTERPIECE: The High-Voltage Lightning Workflow ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-amber-500/30 bg-[#0a0e1c]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(245,158,11,0.12)] relative overflow-hidden"
        >
          {/* Header & Interactive Play Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <FiZap className="text-amber-400 animate-bounce" size={14} />
                  PIPELINE WORKFLOW
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="font-mono text-xs text-zinc-400">HIGH-VOLTAGE AUTOMATION</span>
              </div>
              <h3 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-white mt-1">
                From Branch Commit to Zero-Downtime Release
              </h3>
            </div>

            {/* The Simulation Trigger: Cards will illuminate and fade one by one! */}
            <button
              onClick={runPipelineSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all shadow-lg self-start sm:self-auto ${
                isSimulating
                  ? "bg-amber-500/20 border border-amber-400 text-amber-300 animate-pulse cursor-wait"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
              }`}
            >
              {isSimulating ? (
                <>
                  <FiActivity className="animate-spin" size={15} />
                  <span>SURGING VOLTAGE...</span>
                </>
              ) : (
                <>
                  <FiPlay size={14} />
                  <span>⚡ RUN LIVE PIPELINE</span>
                </>
              )}
            </button>
          </div>

          {/* ─── SVG Electric Lightning Pipeline Track ─── */}
          <div className="my-10 relative">
            
            {/* Desktop Horizontal Lightning Line */}
            <div className="hidden lg:block absolute top-[42px] inset-x-8 h-12 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 40">
                <defs>
                  {/* Plasma Lightning Gradient */}
                  <linearGradient id="plasmaBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="35%" stopColor="#818cf8" />
                    <stop offset="65%" stopColor="#c084fc" />
                    <stop offset="85%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>

                  <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Underlying Base Power Rail */}
                <path
                  d="M 20 20 L 980 20"
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />

                {/* 2. Crackling Zigzag Electric Lightning Arc */}
                <motion.path
                  d="M 20 20 L 80 14 L 140 25 L 220 15 L 300 24 L 380 16 L 460 25 L 540 15 L 620 24 L 700 16 L 780 24 L 860 15 L 930 23 L 980 20"
                  fill="none"
                  stroke="url(#plasmaBeam)"
                  strokeWidth="2.8"
                  filter="url(#electricGlow)"
                  strokeDasharray="30, 45"
                  animate={{
                    strokeDashoffset: [0, -320],
                    opacity: [0.75, 1, 0.8, 1, 0.9],
                  }}
                  transition={{
                    strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.15, repeat: Infinity },
                  }}
                />

                {/* 3. Pure White High-Voltage Core Filament */}
                <motion.path
                  d="M 20 20 L 75 23 L 150 17 L 230 22 L 320 17 L 410 23 L 500 17 L 590 23 L 680 17 L 770 23 L 860 17 L 940 22 L 980 20"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  className="filter drop-shadow-[0_0_12px_#ffffff]"
                  strokeDasharray="12, 60"
                  animate={{
                    strokeDashoffset: [0, -360],
                  }}
                  transition={{
                    duration: 1.0,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* 4. Active Surge Node Pulse */}
                <motion.circle
                  cx={20 + (activeStep / (PIPELINE_STEPS.length - 1)) * 960}
                  cy={20}
                  r={8}
                  fill="#ffffff"
                  stroke="#fbbf24"
                  strokeWidth={3}
                  className="filter drop-shadow-[0_0_15px_#fbbf24]"
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                />
              </svg>
            </div>

            {/* 6 Pipeline Cards (Staggered fade one by one!) */}
            <motion.div
              variants={staggeredContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10"
            >
              {PIPELINE_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStep === idx;

                return (
                  <motion.div
                    key={step.id}
                    variants={fadeItem}
                    onClick={() => setActiveStep(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all flex flex-col justify-between select-none ${
                      isActive
                        ? "border-amber-400 bg-amber-950/40 shadow-[0_0_30px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50"
                        : "border-zinc-800 bg-[#0d1122]/80 hover:border-zinc-700"
                    }`}
                  >
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-xs font-black ${isActive ? "text-amber-400" : "text-zinc-500"}`}>
                          {step.step}
                        </span>
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                            isActive
                              ? "bg-amber-400 text-black shadow-[0_0_15px_#fbbf24]"
                              : "bg-zinc-850 text-zinc-300"
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                      </div>

                      {/* Step Title & Tag */}
                      <p className={`font-space-grotesk text-sm font-bold tracking-tight ${isActive ? "text-amber-300" : "text-white"}`}>
                        {step.label}
                      </p>
                      <span className="font-mono text-[9px] text-zinc-400 block mt-0.5">
                        {step.tag}
                      </span>
                    </div>

                    {/* Step Status Badge */}
                    <div className="mt-4 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[9px] font-mono">
                      <span className={isActive ? "text-amber-400 font-bold" : "text-zinc-500"}>
                        {step.badge}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-amber-400 animate-ping" : "bg-zinc-700"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>

          {/* Injected Live Terminal Console (Authentic Developer Shell) */}
          <div className="rounded-2xl border border-zinc-800 bg-[#05070e] p-5 font-mono text-xs relative overflow-hidden">
            {/* Terminal Window Chrome */}
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-3 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-zinc-500 ml-2 font-mono text-[10px]">
                  bash - pipeline-runner // stage-{currentStepData.step}
                </span>
              </div>
              <span className="text-emerald-400 font-bold text-[10px] flex items-center gap-1.5">
                <FiCheck size={12} />
                EXIT: 0 (OK)
              </span>
            </div>

            {/* Command and Output */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="text-zinc-500">$</span>
                <span>{currentStepData.cmd}</span>
                <span className="w-2 h-4 bg-cyan-400 animate-pulse ml-1 inline-block" />
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed pl-4 border-l border-zinc-800">
                {currentStepData.desc}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── 4. Creative Personality Badges (The ones the user screenshotted!) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-zinc-850 pt-10"
        >
          <div className="text-center mb-5">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              DEVELOPER SIGNATURE & PASSIONS
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {STICKERS.map((stk, sIdx) => (
              <motion.div
                key={sIdx}
                whileHover={{ scale: 1.1, rotate: 0 }}
                style={{ rotate: stk.rotate }}
                className={`px-4 py-2 rounded-2xl border font-mono text-xs font-bold shadow-md cursor-pointer transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] ${stk.color}`}
              >
                {stk.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
