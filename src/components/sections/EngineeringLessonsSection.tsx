"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiAlertTriangle, FiCheckCircle, FiCpu, FiDatabase, FiLock, FiZap } from "react-icons/fi";

const LESSONS = [
  {
    id: "architecture",
    phase: "Monolith Architecture",
    tech: "Express / Layered MVC",
    problem: "Tangled controller routes and database calls in single files.",
    consequence: "Regression bugs rose. Unit testing code modules was blocked.",
    fix: "Decoupled logic patterns into separated Routing &rarr; Controller &rarr; Service domains.",
    lesson: "Design layered boundaries from day one.",
    icon: FiCpu,
    color: "#06b6d4",
    x: 40,
    y: 130,
    branchPath: "M 100 160 Q 70 160, 40 130"
  },
  {
    id: "database",
    phase: "Database Selection",
    tech: "NoSQL vs RDBMS",
    problem: "Used NoSQL MongoDB for highly relational provider timeslot schedules.",
    consequence: "Joined collection logic bloated backend controller script files.",
    fix: "Re-engineered schemas into PostgreSQL tables using Prisma constraints.",
    lesson: "Query relations define the database choice.",
    icon: FiDatabase,
    color: "#f59e0b",
    x: 160,
    y: 100,
    branchPath: "M 100 130 Q 130 130, 160 100"
  },
  {
    id: "auth",
    phase: "Session Security",
    tech: "JWT / Storage",
    problem: "Stored JWT authorization session tokens inside localStorage.",
    consequence: "Client-side privilege escalation risks remained active.",
    fix: "Re-routed auth payloads into httpOnly secure server cookies.",
    lesson: "Client runtimes are insecure boundaries.",
    icon: FiLock,
    color: "#a855f7",
    x: 30,
    y: 70,
    branchPath: "M 100 100 Q 60 100, 30 70"
  },
  {
    id: "caching",
    phase: "Early Caching",
    tech: "Redis / Queue",
    problem: "Built BullMQ Redis buffers before implementing checkout bookings.",
    consequence: "Invested engineering velocity in scaling idle, zero-traffic structures.",
    fix: "Swapped priorities: establish verified logic loops before caching optimization.",
    lesson: "Make it work, right, then fast.",
    icon: FiZap,
    color: "#f43f5e",
    x: 170,
    y: 40,
    branchPath: "M 100 70 Q 140 70, 170 40"
  }
];

export default function EngineeringLessonsSection() {
  const [activeNode, setActiveNode] = useState<string>("architecture");
  const currentLesson = LESSONS.find(l => l.id === activeNode) || LESSONS[0];

  return (
    <section id="lessons" className="relative py-32 overflow-hidden bg-[#09090b]">
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">06.</span> Engineering <span className="text-cyan-400 text-glow">Lessons</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
          <p className="mt-3 text-zinc-500 text-sm">Tap the nodes of the decision tree to inspect key architectural lessons.</p>
        </motion.div>

        {/* Literal Interactive Tree Layout */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Column: Literal SVG Tree Diagram */}
          <div className="lg:col-span-6 flex justify-center items-center bg-[#111113]/40 border border-zinc-850 rounded-3xl p-6 backdrop-blur-sm relative min-h-[360px]">
            <svg className="w-full max-w-[320px] h-[360px] overflow-visible" viewBox="0 0 200 200">
              
              {/* Core Trunk */}
              <line x1="100" y1="190" x2="100" y2="30" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
              
              {/* Branch lines */}
              {LESSONS.map((node) => {
                const isActive = node.id === activeNode;
                return (
                  <path
                    key={`branch-${node.id}`}
                    d={node.branchPath}
                    fill="none"
                    stroke={isActive ? node.color : "#27272a"}
                    strokeWidth={isActive ? "2.5" : "1.5"}
                    className={isActive ? "laser-beam" : ""}
                    style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                  />
                );
              })}

              {/* Clickable Leaf Nodes */}
              {LESSONS.map((node) => {
                const Icon = node.icon;
                const isActive = node.id === activeNode;
                
                return (
                  <g key={`node-${node.id}`} className="cursor-pointer" onClick={() => setActiveNode(node.id)}>
                    {/* Glowing active pulse circle */}
                    {isActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="14"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        className="animate-ping"
                        style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                      />
                    )}
                    {/* Node base circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="10"
                      fill="#09090b"
                      stroke={isActive ? node.color : "#27272a"}
                      strokeWidth="2"
                      style={{ transition: "stroke 0.3s" }}
                    />
                    {/* Tiny Icon inside circle */}
                    <g transform={`translate(${node.x - 5}, ${node.y - 5})`}>
                      <Icon size={10} style={{ color: isActive ? node.color : "#71717a" }} />
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right Column: Node Details Panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-zinc-850 bg-zinc-950/70 p-6 backdrop-blur-sm relative overflow-hidden min-h-[300px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 flex-wrap gap-2">
                    <div>
                      <span className="font-space-grotesk text-sm font-black text-white uppercase">{currentLesson.phase}</span>
                      <span className="font-mono text-[9px] text-zinc-550 block mt-0.5">Stack: {currentLesson.tech}</span>
                    </div>
                    <span 
                      className="px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider bg-opacity-10" 
                      style={{ borderColor: currentLesson.color, color: currentLesson.color, backgroundColor: `${currentLesson.color}10` }}
                    >
                      Lesson Node
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-zinc-600 text-[8px] uppercase tracking-widest block font-space-grotesk font-black mb-1.5 flex items-center gap-1.5">
                        <FiAlertTriangle className="text-rose-400" size={10} /> The Mistake & Impact
                      </span>
                      <p className="text-zinc-350 text-xs leading-relaxed">{currentLesson.problem}</p>
                      <p className="text-zinc-550 text-[10px] leading-relaxed font-mono mt-1 font-bold">Consequence: {currentLesson.consequence}</p>
                    </div>

                    <div>
                      <span className="text-zinc-650 text-[8px] uppercase tracking-widest block font-space-grotesk font-black mb-1.5 flex items-center gap-1.5">
                        <FiCheckCircle className="text-emerald-400" size={10} /> Refactoring Fix
                      </span>
                      <p className="text-zinc-350 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: currentLesson.fix }}></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-zinc-900 pt-4 text-cyan-400 text-xs font-bold italic font-space-grotesk">
                  &ldquo;{currentLesson.lesson}&rdquo;
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
