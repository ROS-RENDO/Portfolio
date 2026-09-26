"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiExpress, SiNestjs, SiPostgresql, SiMongodb, SiRedis,
  SiDocker, SiPython, SiPytorch, SiFastapi, SiPrisma,
  SiStripe, SiVercel, SiGit, SiGithubactions, SiNginx, SiLinux,
  SiNumpy, SiOpenai, SiGo, SiKubernetes, SiGrafana,
  SiGithub, SiFigma, SiVite, SiOpentelemetry, SiRabbitmq,
  SiGraphql, SiApachekafka,
} from "react-icons/si";
import { FaBrain, FaRobot } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";
import { FiLayers, FiActivity, FiCpu, FiCompass, FiTerminal } from "react-icons/fi";

const ROW_1 = [
  { Icon: SiReact,        name: "React",           color: "#61dafb" },
  { Icon: SiNextdotjs,    name: "Next.js",         color: "#ffffff" },
  { Icon: SiTypescript,   name: "TypeScript",      color: "#3178c6" },
  { Icon: SiTailwindcss,  name: "Tailwind",        color: "#38bdf8" },
  { Icon: SiNodedotjs,    name: "Node.js",         color: "#8cc84b" },
  { Icon: SiNestjs,       name: "NestJS",          color: "#e0234e" },
  { Icon: SiExpress,      name: "Express",         color: "#ffffff" },
  { Icon: SiPostgresql,   name: "PostgreSQL",      color: "#336791" },
  { Icon: SiMongodb,      name: "MongoDB",         color: "#47a248" },
  { Icon: SiRedis,        name: "Redis",           color: "#dc382d" },
  { Icon: SiPrisma,       name: "Prisma",          color: "#2d3748" },
  { Icon: SiStripe,       name: "Stripe",          color: "#635bff" },
  { Icon: SiDocker,       name: "Docker",          color: "#2496ed" },
  { Icon: SiGithubactions,name: "GH Actions",      color: "#2088ff" },
  { Icon: SiVercel,       name: "Vercel",          color: "#ffffff" },
  { Icon: SiVite,         name: "Vite",            color: "#646cff" },
  { Icon: SiFigma,        name: "Figma",           color: "#f24e1e" },
];

const ROW_2 = [
  { Icon: SiPython,       name: "Python",          color: "#3776ab" },
  { Icon: SiPytorch,      name: "PyTorch",         color: "#ee4c2c" },
  { Icon: SiFastapi,      name: "FastAPI",         color: "#009688" },
  { Icon: SiOpenai,       name: "OpenAI",          color: "#412991" },
  { Icon: SiNumpy,        name: "NumPy",           color: "#4dabcf" },
  { Icon: FaBrain,        name: "YOLOv8",          color: "#f59e0b" },
  { Icon: FaRobot,        name: "LangChain",       color: "#1c3c5e" },
  { Icon: SiGo,           name: "Go",              color: "#00add8" },
  { Icon: SiKubernetes,   name: "Kubernetes",      color: "#326ce5" },
  { Icon: SiGrafana,      name: "Grafana",         color: "#f46800" },
  { Icon: SiNginx,        name: "Nginx",           color: "#009639" },
  { Icon: SiLinux,        name: "Linux",           color: "#fcc624" },
  { Icon: TbBrandThreejs, name: "Three.js",        color: "#ffffff" },
  { Icon: SiOpentelemetry,name: "OpenTelemetry",   color: "#f5a800" },
  { Icon: SiRabbitmq,     name: "RabbitMQ",        color: "#ff6600" },
  { Icon: SiApachekafka,  name: "Kafka",           color: "#231f20" },
  { Icon: SiGraphql,      name: "GraphQL",         color: "#e10098" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TechChip({ Icon, name, color }: { Icon: any; name: string; color: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 rounded-full border border-zinc-800 bg-[#18181b]/80 px-4 py-2.5 mx-2 backdrop-blur-sm hover:border-zinc-650 transition-all duration-200 group cursor-default">
      <Icon size={18} style={{ color }} className="transition-all duration-200 group-hover:scale-110" />
      <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-200 whitespace-nowrap transition-colors">{name}</span>
    </div>
  );
}

const CATEGORIES = [
  {
    label: "Frontend",
    accent: "#06b6d4",
    border: "border-cyan-500/30 hover:border-cyan-500/60",
    bg: "hover:bg-cyan-500/5",
    text: "text-cyan-400",
    dot: "bg-cyan-400",
    items: [
      { Icon: SiReact,        name: "React"      },
      { Icon: SiNextdotjs,    name: "Next.js"    },
      { Icon: SiTypescript,   name: "TypeScript" },
      { Icon: SiTailwindcss,  name: "Tailwind"   },
      { Icon: TbBrandThreejs, name: "Three.js"   },
      { Icon: SiVite,         name: "Vite"       },
      { Icon: SiFigma,        name: "Figma"      },
    ],
  },
  {
    label: "Backend",
    accent: "#a855f7",
    border: "border-purple-500/30 hover:border-purple-500/60",
    bg: "hover:bg-purple-500/5",
    text: "text-purple-400",
    dot: "bg-purple-400",
    items: [
      { Icon: SiNodedotjs,  name: "Node.js"    },
      { Icon: SiNestjs,     name: "NestJS"     },
      { Icon: SiExpress,    name: "Express"    },
      { Icon: SiPrisma,     name: "Prisma"     },
      { Icon: SiPostgresql, name: "PostgreSQL" },
      { Icon: SiMongodb,    name: "MongoDB"    },
      { Icon: SiRedis,      name: "Redis"      },
    ],
  },
  {
    label: "AI / Automation",
    accent: "#f43f5e",
    border: "border-rose-500/30 hover:border-rose-500/60",
    bg: "hover:bg-rose-500/5",
    text: "text-rose-400",
    dot: "bg-rose-400",
    items: [
      { Icon: SiPython,  name: "Python"     },
      { Icon: SiPytorch, name: "PyTorch"    },
      { Icon: SiFastapi, name: "FastAPI"    },
      { Icon: SiOpenai,  name: "OpenAI"     },
      { Icon: SiNumpy,   name: "NumPy"      },
      { Icon: FaBrain,   name: "YOLOv8"     },
      { Icon: FaRobot,   name: "LangChain"  },
    ],
  },
  {
    label: "Infrastructure",
    accent: "#f59e0b",
    border: "border-amber-500/30 hover:border-amber-500/60",
    bg: "hover:bg-amber-500/5",
    text: "text-amber-400",
    dot: "bg-amber-400",
    items: [
      { Icon: SiDocker,        name: "Docker"      },
      { Icon: SiGithubactions, name: "GH Actions"  },
      { Icon: SiVercel,        name: "Vercel"       },
      { Icon: SiNginx,         name: "Nginx"        },
      { Icon: SiLinux,         name: "Linux"        },
      { Icon: SiKubernetes,    name: "Kubernetes"   },
      { Icon: SiGrafana,       name: "Grafana"      },
    ],
  },
  {
    label: "Tools",
    accent: "#10b981",
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    bg: "hover:bg-emerald-500/5",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    items: [
      { Icon: SiGit,          name: "Git"          },
      { Icon: SiGithub,       name: "GitHub"       },
      { Icon: SiStripe,       name: "Stripe"       },
      { Icon: SiGo,           name: "Go"           },
      { Icon: SiGraphql,      name: "GraphQL"      },
      { Icon: SiRabbitmq,     name: "RabbitMQ"     },
      { Icon: SiOpentelemetry,name: "OpenTelemetry"},
    ],
  },
];

// Visual mapping nodes
const TECH_NODES = [
  { id: "typescript", name: "TypeScript", icon: SiTypescript, color: "#3178c6", index: 0, alt: "Vanilla JS" },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs, color: "#ffffff", index: 1, alt: "CRA SPA" },
  { id: "nestjs", name: "NestJS", icon: SiNestjs, color: "#e0234e", index: 2, alt: "Express.js" },
  { id: "postgresql", name: "Postgres", icon: SiPostgresql, color: "#336791", index: 3, alt: "MongoDB" },
  { id: "docker", name: "Docker", icon: SiDocker, color: "#2496ed", index: 4, alt: "Host Scripts" },
  { id: "python", name: "Python", icon: SiPython, color: "#3776ab", index: 5, alt: "Node.js" }
];

const PROJECT_NODES = [
  { id: "servicefinder", name: "ServiceFinder", desc: "Escrow Marketplace", yPos: 12 },
  { id: "dashboard", name: "Dashboard", desc: "Quant Analytics", yPos: 38 },
  { id: "stackgen", name: "StackGen", desc: "LLM Configs Builder", yPos: 63 },
  { id: "aibuilder", name: "AI Builder", desc: "Vision Pipeline", yPos: 88 }
];

const CONNECTIONS: Record<string, string[]> = {
  typescript: ["servicefinder", "dashboard", "stackgen"],
  nextjs: ["servicefinder", "dashboard", "stackgen"],
  nestjs: ["servicefinder"],
  postgresql: ["servicefinder"],
  docker: ["servicefinder", "aibuilder"],
  python: ["dashboard", "aibuilder"]
};

const TECH_CONCEPTS: Record<string, { concept: string; metric: string }[]> = {
  typescript: [
    { concept: "Interface Contracts", metric: "Strict checks" },
    { concept: "Generics Mapping", metric: "Safe DTO models" }
  ],
  nextjs: [
    { concept: "SSR rendering", metric: "SEO optimized" },
    { concept: "App Router layouts", metric: "Zero startup lag" }
  ],
  nestjs: [
    { concept: "Dependency Injection", metric: "Domain isolated" },
    { concept: "Interceptors mapping", metric: "Unified errors" }
  ],
  postgresql: [
    { concept: "ACID transactions", metric: "Zero double bookings" },
    { concept: "Foreign keys limits", metric: "Data consistency" }
  ],
  docker: [
    { concept: "Multi-stage builds", metric: "90% image reduction" },
    { concept: "Compose orchestration", metric: "Locked environments" }
  ],
  python: [
    { concept: "OpenCV operations", metric: "Low latency frame read" },
    { concept: "NumPy integrations", metric: "Matrix operations" }
  ]
};

export default function TechStackSection() {
  const doubled1 = [...ROW_1, ...ROW_1];
  const doubled2 = [...ROW_2, ...ROW_2];
  const [activeTech, setActiveTech] = useState<string>("typescript");

  const activeTechObj = TECH_NODES.find(n => n.id === activeTech) || TECH_NODES[0];
  const connectedProjects = CONNECTIONS[activeTech] || [];
  const activeConcepts = TECH_CONCEPTS[activeTech] || [];

  return (
    <section id="tech-stack" className="relative py-32 overflow-hidden">
      
      {/* Laser beam stylesheet injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes beam-march {
          to {
            stroke-dashoffset: -20;
          }
        }
        .laser-beam {
          stroke-dasharray: 6, 4;
          animation: beam-march 0.8s linear infinite;
        }
      `}} />

      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">03.</span> Tech{" "}
            <span className="text-cyan-400 text-glow">Stack</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
          <p className="mt-3 text-zinc-500 text-sm">Every tool below is mapped to its implementations.</p>
        </motion.div>
      </div>

      {/* ── Marquee rows ─────────────────────────────────────────── */}
      <div className="pause-on-hover mb-4 relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-left">
            {doubled1.map(({ Icon, name, color }, i) => (
              <TechChip key={`r1-${i}`} Icon={Icon} name={name} color={color} />
            ))}
          </div>
        </div>
      </div>

      <div className="pause-on-hover mb-20 relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-right">
            {doubled2.map(({ Icon, name, color }, i) => (
              <TechChip key={`r2-${i}`} Icon={Icon} name={name} color={color} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Category icon grids ───────────────────────────────────── */}
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl mb-24">
        <div className="space-y-6">
          {CATEGORIES.map((cat, cIdx) => (
            <motion.div
              key={cIdx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: cIdx * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.accent }} />
                <span className="font-space-grotesk text-xs font-bold uppercase tracking-widest" style={{ color: cat.accent }}>
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(({ Icon, name }, tIdx) => (
                  <motion.div
                    key={tIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: cIdx * 0.04 + tIdx * 0.04 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    className={`group flex flex-col items-center gap-1.5 rounded-xl border ${cat.border} ${cat.bg} bg-[#18181b]/60 p-3.5 w-[72px] cursor-default transition-all duration-200`}
                  >
                    <Icon
                      size={26}
                      className="text-zinc-400 group-hover:text-white transition-colors duration-200"
                    />
                    <span className="font-mono text-[9px] text-zinc-650 group-hover:text-zinc-400 text-center leading-tight transition-colors">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Visual Connectivity Evidence Graph ────────────────────── */}
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">
        <div className="mb-12 border-t border-zinc-900 pt-16">
          <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Interactive Mapping</p>
          <h3 className="font-space-grotesk text-2xl font-black text-white">Visual Dependency Radar</h3>
          <p className="text-zinc-555 text-xs mt-1">Tap a core language to shoot glowing data streams directly to its production targets.</p>
        </div>

        {/* Central interactive matrix wrapper */}
        <div className="grid gap-6 md:grid-cols-12 items-center bg-[#111113]/40 border border-zinc-850 rounded-3xl p-6 relative overflow-hidden backdrop-blur-sm min-h-[380px]">
          
          {/* Column 1: Tech Nodes (Left) */}
          <div className="col-span-12 md:col-span-4 space-y-2.5 z-10">
            {TECH_NODES.map((node) => {
              const Icon = node.icon;
              const isActive = node.id === activeTech;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveTech(node.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 group ${
                    isActive
                      ? "border-cyan-500/50 bg-cyan-500/5 text-cyan-400"
                      : "border-zinc-850 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} style={{ color: isActive ? node.color : "#71717a" }} className="transition-transform group-hover:scale-110 duration-300" />
                    <span className="font-space-grotesk text-xs font-bold uppercase tracking-wider">{node.name}</span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-650 group-hover:text-zinc-400 transition-colors">vs {node.alt}</span>
                </button>
              );
            })}
          </div>

          {/* Column 2: Animated SVG Connector Lines (Center - Hidden on Mobile) */}
          <div className="hidden md:block md:col-span-4 h-full relative self-stretch z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              <AnimatePresence>
                {PROJECT_NODES.map((proj) => {
                  const isConnected = connectedProjects.includes(proj.id);
                  if (!isConnected) return null;

                  const startY = 8 + (activeTechObj.index * 16.5);
                  const endY = proj.yPos;

                  return (
                    <motion.path
                      key={`${activeTech}-${proj.id}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      d={`M 0 ${startY} C 50 ${startY}, 50 ${endY}, 100 ${endY}`}
                      fill="none"
                      stroke={activeTechObj.color}
                      strokeWidth="2.5"
                      className="laser-beam shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                    />
                  );
                })}
              </AnimatePresence>
            </svg>
          </div>

          {/* Column 3: Connected Project Cards (Right) */}
          <div className="col-span-12 md:col-span-4 space-y-3 z-10">
            {PROJECT_NODES.map((proj) => {
              const isConnected = connectedProjects.includes(proj.id);
              return (
                <div
                  key={proj.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-500 flex justify-between items-center ${
                    isConnected
                      ? "border-cyan-500/50 bg-[#161b22]/40 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                      : "border-zinc-850/50 bg-zinc-950/20 opacity-30 scale-95"
                  }`}
                >
                  <div>
                    <h4 className={`font-space-grotesk text-xs font-black transition-colors ${isConnected ? "text-white" : "text-zinc-650"}`}>
                      {proj.name}
                    </h4>
                    <span className="font-mono text-[9px] text-zinc-550 block mt-0.5">{proj.desc}</span>
                  </div>
                  {isConnected && (
                    <div className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Concept metrics row at bottom */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {activeConcepts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-zinc-850 bg-[#18181b]/30 p-4 flex items-center justify-between"
            >
              <div>
                <span className="text-zinc-650 text-[8px] uppercase tracking-widest block font-space-grotesk font-black mb-1">Concept</span>
                <span className="font-space-grotesk text-xs font-bold text-zinc-200">{item.concept}</span>
              </div>
              <span className="font-mono text-[9px] text-cyan-400 bg-cyan-500/5 border border-cyan-500/10 px-2 py-0.5 rounded-full">{item.metric}</span>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-zinc-850 bg-[#18181b]/30 p-4 flex items-center gap-3.5 col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500">
              <FiCompass size={14} />
            </div>
            <div>
              <span className="text-zinc-650 text-[8px] uppercase tracking-widest block font-space-grotesk font-black">Trade-off rejected</span>
              <span className="font-mono text-[10px] text-zinc-500 leading-none font-bold">Replaced: {activeTechObj.alt}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
