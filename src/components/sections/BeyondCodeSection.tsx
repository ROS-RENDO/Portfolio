"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiCompass, FiCpu, FiTerminal, FiGlobe, FiRadio } from "react-icons/fi";

const WORKFLOW_NODES = [
  {
    id: "curiosity",
    label: "Explore",
    icon: FiCompass,
    color: "#06b6d4",
    x: 100,
    y: 45,
    title: "Curiosity",
    input: "Manual labor anomalies / inefficiency",
    action: "Dissecting open endpoints, scraping schemas, and tracking trade anomalies.",
  },
  {
    id: "dissect",
    label: "Dissect",
    icon: FiTerminal,
    color: "#a855f7",
    x: 152,
    y: 83,
    title: "Tear Apart API",
    input: "Tangled codebase controllers / logs",
    action: "Inspecting SQL query logs, checking indices, mapping controller routes.",
  },
  {
    id: "automate",
    label: "Automate",
    icon: FiCpu,
    color: "#f43f5e",
    x: 132,
    y: 145,
    title: "Script Automation",
    input: "Cron jobs / microservices script",
    action: "Assembling Node endpoints, Cron scripts, and YOLO visual overlays.",
  },
  {
    id: "deploy",
    label: "Deploy",
    icon: FiGlobe,
    color: "#f59e0b",
    x: 68,
    y: 145,
    title: "Production Release",
    input: "Raw code modules / configs",
    action: "Dockerizing modules, creating Nginx maps, pushing to production.",
  },
  {
    id: "optimize",
    label: "Observe",
    icon: FiRadio,
    color: "#10b981",
    x: 48,
    y: 83,
    title: "Metrics Profiling",
    input: "Bottlenecks / frame execution rates",
    action: "Profiling memory heaps, database slow-queries, and API latencies.",
  }
];

const NOW_ITEMS = [
  { label: "BUILDING", val: "ServiceFinder — service marketplace escrow system", color: "text-emerald-400" },
  { label: "LEARNING", val: "Distributed Systems — consensus, fault tolerance, replication", color: "text-cyan-400" },
  { label: "EXPLORING", val: "AI Agents — LangGraph, multi-agent reasoning loops", color: "text-purple-400" },
  { label: "EXPERIMENTING", val: "3D Web — WebGL, custom R3F camera spline curves", color: "text-amber-400" },
  { label: "STATUS", val: "Available for engineering roles", color: "text-emerald-400 animate-pulse" },
];

export default function BeyondCodeSection() {
  const [activeStep, setActiveStep] = useState<string>("curiosity");

  const currentStep = WORKFLOW_NODES.find(n => n.id === activeStep) || WORKFLOW_NODES[0];

  return (
    <section id="beyond" className="relative py-32 bg-[#09090b]">
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-600">07.</span> Beyond <span className="text-cyan-400 text-glow">Code</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Left Column: Visual Creator Loop Graph */}
          <div className="flex flex-col gap-6 items-center bg-[#111113]/40 border border-zinc-850 rounded-3xl p-6 backdrop-blur-sm min-h-[380px] justify-center">
            
            {/* SVG Circle Graph */}
            <div className="relative w-full max-w-[240px] h-[200px] flex items-center justify-center">
              <svg className="absolute w-full h-full overflow-visible" viewBox="0 0 200 200">
                {/* Connector Circle Track */}
                <circle cx="100" cy="100" r="55" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="5, 3" />
                
                {/* Active connecting segment */}
                <circle
                  cx="100"
                  cy="100"
                  r="55"
                  fill="none"
                  stroke={currentStep.color}
                  strokeWidth="2"
                  className="laser-beam shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  style={{ transition: "stroke 0.3s" }}
                />
                
                {/* Interactive Nodes */}
                {WORKFLOW_NODES.map((node) => {
                  const Icon = node.icon;
                  const isActive = node.id === activeStep;
                  return (
                    <g key={node.id} className="cursor-pointer" onClick={() => setActiveStep(node.id)}>
                      {isActive && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="12"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="1.5"
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="9"
                        fill="#09090b"
                        stroke={isActive ? node.color : "#27272a"}
                        strokeWidth="2"
                        style={{ transition: "stroke 0.3s" }}
                      />
                      <g transform={`translate(${node.x - 5}, ${node.y - 5})`}>
                        <Icon size={10} style={{ color: isActive ? node.color : "#71717a" }} />
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Injected step details */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-zinc-850 bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed w-full"
                >
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2 mb-3">
                    <span className="font-space-grotesk text-xs font-black text-white uppercase">{currentStep.title} Loop</span>
                    <span className="text-[9px] text-zinc-550">STAGE // 0{WORKFLOW_NODES.findIndex(n => n.id === activeStep) + 1}</span>
                  </div>
                  <div className="text-zinc-500 mb-1.5 uppercase font-bold text-[9px]">Input Target:</div>
                  <div className="text-cyan-400 mb-3">$ {currentStep.input}</div>
                  <div className="text-zinc-400 font-sans text-xs leading-relaxed">{currentStep.action}</div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: NOW Status Panel */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8"
            >
              Now — August 2026
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-7 backdrop-blur-sm"
            >
              <div className="space-y-5">
                {NOW_ITEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className={`font-mono text-xs font-bold min-w-[110px] mt-0.5 ${item.color}`}>
                      {item.label}
                    </span>
                    <span className="text-xs text-zinc-400 leading-relaxed">{item.val}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-600 font-mono">
                  This page updates as I build. Last updated: August 2026.
                </p>
              </div>
            </motion.div>

            {/* CTA block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-5"
            >
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                I&apos;m actively looking for my first engineering team role — internship, junior, or project collaboration.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2 font-space-grotesk text-xs font-bold text-black transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Let&apos;s build something →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
