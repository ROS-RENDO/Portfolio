"use client";

import { motion } from "framer-motion";
import { FiGitBranch, FiGitPullRequest, FiCheckSquare, FiMessageSquare } from "react-icons/fi";

const PROOF_AREAS = [
  {
    label: "Backend",
    color: "cyan",
    borderClass: "border-cyan-500/30 hover:border-cyan-500/60",
    glowClass: "bg-cyan-500/5 hover:bg-cyan-500/10",
    dotClass: "bg-cyan-400",
    textClass: "text-cyan-400",
    skills: [
      { name: "NestJS", proof: "ServiceFinder, TaskFlow", scope: "API / Auth / Booking / Payments" },
      { name: "Node.js", proof: "5 production projects", scope: "REST APIs, middleware, queue jobs" },
      { name: "PostgreSQL", proof: "3 projects", scope: "Relational data, transactions, migrations" },
      { name: "Redis", proof: "ServiceFinder, TaskFlow", scope: "Session cache, real-time pub/sub" },
    ],
  },
  {
    label: "Frontend",
    color: "purple",
    borderClass: "border-purple-500/30 hover:border-purple-500/60",
    glowClass: "bg-purple-500/5 hover:bg-purple-500/10",
    dotClass: "bg-purple-400",
    textClass: "text-purple-400",
    skills: [
      { name: "React", proof: "ServiceFinder, Portfolio, Trading Dashboard", scope: "Production UIs, component architecture" },
      { name: "Next.js", proof: "4 projects", scope: "SSR, App Router, API routes" },
      { name: "TypeScript", proof: "All current projects", scope: "Type safety, interfaces, generics" },
      { name: "Three.js + R3F", proof: "This portfolio", scope: "3D scenes, camera splines, WebGL" },
    ],
  },
  {
    label: "Automation & AI",
    color: "rose",
    borderClass: "border-rose-500/30 hover:border-rose-500/60",
    glowClass: "bg-rose-500/5 hover:bg-rose-500/10",
    dotClass: "bg-rose-400",
    textClass: "text-rose-400",
    skills: [
      { name: "Python", proof: "YOLOv8 vision system, MT5 automation", scope: "Model inference, script automation" },
      { name: "MQL5", proof: "Vibe Trading Automation", scope: "Custom indicators, EA bots, backtesting" },
      { name: "YOLOv8 / OpenCV", proof: "AI Vision project", scope: "Object detection, real-time inference" },
      { name: "FastAPI", proof: "AI inference service", scope: "Model serving, async endpoints" },
    ],
  },
  {
    label: "Infrastructure",
    color: "amber",
    borderClass: "border-amber-500/30 hover:border-amber-500/60",
    glowClass: "bg-amber-500/5 hover:bg-amber-500/10",
    dotClass: "bg-amber-400",
    textClass: "text-amber-400",
    skills: [
      { name: "Docker", proof: "ServiceFinder, AI service, Trading system", scope: "Containerization, Compose, deployment" },
      { name: "Stripe", proof: "ServiceFinder (Escrow + Connect)", scope: "Payment intents, webhooks, disputes" },
      { name: "Prisma", proof: "ServiceFinder, EcoStore", scope: "ORM, migrations, relations" },
      { name: "GitHub Actions", proof: "This portfolio + ServiceFinder", scope: "CI/CD: lint, test, build, deploy" },
    ],
  },
];

const WORKFLOW_STEPS = [
  { icon: FiGitBranch, label: "Branch", desc: "feature/task-name" },
  { icon: FiCheckSquare, label: "Implement", desc: "code + tests" },
  { icon: FiGitPullRequest, label: "PR", desc: "code review" },
  { icon: FiMessageSquare, label: "Iterate", desc: "feedback loop" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32">
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
            <span className="text-zinc-600">01.</span> About <span className="text-cyan-400 text-glow">Me</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
        </motion.div>

        {/* Bio + Workflow */}
        <div className="grid gap-16 lg:grid-cols-2 mb-24">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5 text-zinc-400 leading-relaxed"
          >
            <p className="text-lg">
              I&apos;m a <span className="text-white font-semibold">software engineer</span> who has spent the last two years building real systems — a service marketplace, a quantitative trading engine, a computer vision pipeline, and the 3D portfolio you&apos;re navigating right now.
            </p>
            <p>
              I don&apos;t build demos. I build things that solve real problems, then I understand every architectural decision behind them. When I pick a technology, I can tell you why — and what the alternative trade-offs were.
            </p>
            <p>
              I&apos;m actively working toward my first team role. I know how to use Git properly, write code that other engineers can review, and ask the right questions.
            </p>
            <blockquote className="mt-6 border-l-2 border-cyan-500/50 pl-4 text-zinc-500 italic text-sm">
              &ldquo;Don&apos;t believe me. Look at what I built.&rdquo;
            </blockquote>
            <div className="pt-4 flex gap-3 flex-wrap">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 font-space-grotesk text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-500/20">
                View Projects →
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2 font-space-grotesk text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-white">
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* How I Work in a team */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-8 backdrop-blur-sm">
              <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Engineering Workflow</p>
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                {WORKFLOW_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-cyan-400">
                        <step.icon size={18} />
                      </div>
                      <span className="font-space-grotesk text-xs font-bold text-zinc-300">{step.label}</span>
                      <span className="font-mono text-[10px] text-zinc-600">{step.desc}</span>
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="w-8 h-[1px] bg-zinc-700 flex-shrink-0 -mt-4" />
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { label: "Version Control", val: "Git — conventional commits, feature branches, rebasing" },
                  { label: "Code Review", val: "Pull requests with description, screenshots, and test notes" },
                  { label: "Documentation", val: "README, inline comments, API contracts (OpenAPI)" },
                  { label: "Communication", val: "Async-first — clear, concise, unblocking others" },
                  { label: "CI/CD", val: "GitHub Actions — lint → typecheck → build → deploy" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <span className="text-zinc-500 min-w-[120px] font-mono text-xs mt-0.5">{item.label}</span>
                    <span className="text-zinc-400">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Evidence-based skill proof grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Skill Evidence</p>
          <p className="text-zinc-600 text-sm">Every technology listed below is attached to a real project where I used it.</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {PROOF_AREAS.map((area, aIdx) => (
            <motion.div
              key={aIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: aIdx * 0.1 }}
              className={`rounded-2xl border ${area.borderClass} ${area.glowClass} p-6 backdrop-blur-sm transition-all duration-300`}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className={`h-2 w-2 rounded-full ${area.dotClass}`} />
                <span className={`font-space-grotesk text-xs font-bold uppercase tracking-widest ${area.textClass}`}>
                  {area.label}
                </span>
              </div>
              <div className="space-y-4">
                {area.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="group">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-space-grotesk text-sm font-semibold text-zinc-200">{skill.name}</span>
                      <span className="font-mono text-[10px] text-zinc-600 text-right leading-4 mt-0.5">{skill.proof}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-0.5">{skill.scope}</p>
                    {sIdx < area.skills.length - 1 && <div className="mt-4 h-[1px] bg-zinc-800" />}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
