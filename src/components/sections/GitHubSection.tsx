"use client";

import { motion } from "framer-motion";
import { FiGithub, FiStar, FiExternalLink, FiGitCommit } from "react-icons/fi";

// ─── Contribution graph data ──────────────────────────────────────────────────
// 53 weeks × 7 days. Values 0-4 (intensity). Modelled on actual activity shown
// in the screenshot: sparse Aug-Dec 2025, picking up Jan 2026, heavy Jun-Aug 2026.
function generateContribData(): number[][] {
  const weeks: number[][] = [];
  const seed = [
    // Aug-Sep 2025 (weeks 0-7) — sparse start
    [0,0,0,1,0,0,0],[0,1,0,0,0,1,0],[0,0,1,0,0,0,1],[1,0,0,0,0,0,0],
    [0,0,1,1,0,0,0],[0,1,0,0,1,0,0],[0,0,0,1,0,0,0],[0,0,1,0,0,1,0],
    // Oct-Nov 2025 (weeks 8-15) — occasional
    [0,0,0,0,2,0,0],[1,0,0,1,0,0,0],[0,2,0,0,0,1,0],[0,0,1,0,2,0,0],
    [0,0,0,2,0,0,1],[1,0,2,0,0,0,0],[0,1,0,0,2,0,0],[0,0,2,0,0,1,0],
    // Dec 2025 - Jan 2026 (weeks 16-21) — ramp up
    [0,0,1,2,0,1,0],[2,0,0,2,1,0,0],[1,2,0,0,2,0,1],[0,2,1,0,0,2,0],
    [2,0,2,1,0,0,2],[1,2,0,2,1,0,0],
    // Feb-Mar 2026 (weeks 22-29) — steady
    [2,0,2,0,2,1,0],[0,2,2,0,1,0,2],[2,1,0,2,0,2,0],[1,2,1,0,2,0,1],
    [0,2,0,2,2,0,2],[2,0,2,1,0,2,0],[1,2,0,2,1,0,2],[2,1,2,0,2,1,0],
    // Apr-May 2026 (weeks 30-37) — growing
    [2,2,1,2,0,2,1],[3,0,2,2,1,0,2],[2,3,0,2,2,1,0],[1,2,3,0,2,2,1],
    [3,1,2,3,0,2,2],[2,3,1,2,3,0,2],[1,2,3,1,2,3,0],[3,1,2,3,1,2,3],
    // Jun 2026 (weeks 38-41) — heavy
    [3,3,2,3,1,3,2],[4,2,3,3,2,3,1],[3,4,2,3,3,2,3],[2,3,4,2,3,3,2],
    // Jul 2026 (weeks 42-46) — very heavy
    [4,2,3,4,2,3,3],[3,4,2,3,4,2,3],[4,3,4,2,3,4,2],[3,4,3,4,2,3,4],
    [2,3,4,3,4,2,3],
    // Aug 2026 (weeks 47-52) — current intense
    [4,3,4,3,4,3,0],[4,4,3,4,3,4,0],[3,4,4,3,4,3,0],[4,3,4,4,3,4,0],
    [4,4,3,4,4,3,0],[4,4,4,3,4,4,0],[0,0,0,0,0,0,0],
  ];
  return seed;
}

const CONTRIB_DATA = generateContribData();

const MONTHS = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
const DAYS   = ["Mon","","Wed","","Fri","",""];

const INTENSITY_COLORS = [
  "bg-zinc-900 border border-zinc-800",          // 0 — empty
  "bg-emerald-900/60 border border-emerald-800/40",   // 1 — light
  "bg-emerald-700/70 border border-emerald-600/30",   // 2 — medium
  "bg-emerald-500/80 border border-emerald-400/40",   // 3 — heavy
  "bg-emerald-400 border border-emerald-300/50 shadow-[0_0_6px_rgba(52,211,153,0.6)]", // 4 — max
];

function ContributionGraph() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[680px]">
        {/* Month labels */}
        <div className="flex mb-1 pl-8">
          {MONTHS.map((m, i) => (
            <div key={i} className="font-mono text-[10px] text-zinc-500 flex-shrink-0" style={{ width: `${(i === 0 ? 2 : 4) * 14}px` }}>
              {m}
            </div>
          ))}
        </div>

        <div className="flex gap-1.5">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] pt-0.5 pr-1.5">
            {DAYS.map((d, i) => (
              <div key={i} className="font-mono text-[10px] text-zinc-600 h-[11px] leading-none flex items-center">
                {d}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {CONTRIB_DATA.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((val, dIdx) => (
                <motion.div
                  key={dIdx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: (wIdx * 7 + dIdx) * 0.002 }}
                  className={`h-[11px] w-[11px] rounded-sm ${INTENSITY_COLORS[val]}`}
                  title={`${val} contribution${val !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 justify-end pr-1">
          <span className="font-mono text-[10px] text-zinc-600">Less</span>
          {INTENSITY_COLORS.map((cls, i) => (
            <div key={i} className={`h-[11px] w-[11px] rounded-sm ${cls}`} />
          ))}
          <span className="font-mono text-[10px] text-zinc-600">More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Repo cards ───────────────────────────────────────────────────────────────
const REPOS = [
  {
    name: "ROS-RENDO/Service_Finder",
    commits: 63,
    desc: "Full-stack service marketplace — booking, escrow payments, real-time tracking.",
    lang: "TypeScript", langColor: "bg-blue-400",
    tags: ["Next.js","NestJS","PostgreSQL","Stripe","Docker"],
    status: "Active", statusColor: "text-green-400 border-green-400/30 bg-green-400/5",
    barWidth: "w-[85%]", barColor: "bg-emerald-500",
    stars: 12, url: "https://github.com/ROS-RENDO",
  },
  {
    name: "ROS-RENDO/dashboard",
    commits: 7,
    desc: "Trading analytics dashboard with real-time MT5 feed and risk manager.",
    lang: "TypeScript", langColor: "bg-blue-400",
    tags: ["Next.js","Recharts","MQL5"],
    status: "Active", statusColor: "text-green-400 border-green-400/30 bg-green-400/5",
    barWidth: "w-[12%]", barColor: "bg-emerald-500",
    stars: 7, url: "https://github.com/ROS-RENDO",
  },
  {
    name: "ROS-RENDO/Practical-AI",
    commits: 4,
    desc: "YOLOv8 object detection pipeline with FastAPI inference endpoint + OpenCV.",
    lang: "Python", langColor: "bg-yellow-400",
    tags: ["YOLOv8","FastAPI","PyTorch","OpenCV"],
    status: "Active", statusColor: "text-green-400 border-green-400/30 bg-green-400/5",
    barWidth: "w-[8%]", barColor: "bg-emerald-500",
    stars: 6, url: "https://github.com/ROS-RENDO",
  },
  {
    name: "ROS-RENDO/Portfolio",
    commits: 22,
    desc: "This portfolio — WebGL 3D timeline, cinematic scroll, case study modals.",
    lang: "TypeScript", langColor: "bg-blue-400",
    tags: ["Next.js","Three.js","R3F","Framer Motion"],
    status: "Active", statusColor: "text-green-400 border-green-400/30 bg-green-400/5",
    barWidth: "w-[28%]", barColor: "bg-emerald-500",
    stars: 5, url: "https://github.com/ROS-RENDO",
  },
];

export default function GitHubSection() {
  return (
    <section id="github" className="relative py-32">
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
              <span className="text-zinc-600">05.</span> GitHub
            </h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
            <p className="mt-3 text-zinc-500 text-sm">Building consistently since 2024. Inspect the code, not the count.</p>
          </div>
          <a
            href="https://github.com/ROS-RENDO"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 font-space-grotesk text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
          >
            <FiGithub size={16} /> github.com/ROS-RENDO <FiExternalLink size={11} className="text-zinc-600" />
          </a>
        </motion.div>

        {/* Contribution graph card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-6 backdrop-blur-sm mb-8"
        >
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500">Contribution Activity — 2025 → 2026</p>
            <span className="font-mono text-xs text-emerald-400">400+ contributions this year</span>
          </div>
          <ContributionGraph />
        </motion.div>

        {/* GitHub Activity Overview Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid gap-4 md:grid-cols-4 mb-8"
        >
          <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">GitHub Activity</span>
            <span className="font-space-grotesk text-2xl font-black text-white">400+ Contributions</span>
            <span className="text-[9px] font-mono text-emerald-400 block mt-2">Active commits/PRs this year</span>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Repositories</span>
            <span className="font-space-grotesk text-2xl font-black text-white">12 Repos</span>
            <span className="text-[9px] font-mono text-zinc-500 block mt-2">Core libraries and utilities</span>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Active Projects</span>
            <span className="font-space-grotesk text-2xl font-black text-white">6 Codebases</span>
            <span className="text-[9px] font-mono text-zinc-500 block mt-2">Continuously iterated</span>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Languages Mapped</span>
            <span className="font-space-grotesk text-lg font-black text-white leading-tight">TypeScript, Python, MQL5, SQL</span>
            <span className="text-[9px] font-mono text-zinc-500 block mt-1">Multi-paradigm profiles</span>
          </div>
        </motion.div>


        {/* Repo cards grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {REPOS.map((repo, i) => (
            <motion.a
              key={i}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-[#18181b]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <FiGithub size={14} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    <span className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{repo.name}</span>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] ${repo.statusColor}`}>{repo.status}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{repo.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {repo.tags.map((tag, ti) => (
                    <span key={ti} className="font-mono text-[10px] bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded border border-zinc-800">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${repo.langColor}`} />
                  <span className="font-mono text-[10px] text-zinc-500">{repo.lang}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500">
                  <FiStar size={11} /><span className="font-mono text-[10px]">{repo.stars}</span>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-transparent opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
