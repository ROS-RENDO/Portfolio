"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
import { 
  FiCrosshair, 
  FiRadio, 
  FiShield, 
  FiCpu, 
  FiActivity, 
  FiZap, 
  FiTarget, 
  FiTerminal, 
  FiLayers, 
  FiCompass, 
  FiCheck, 
  FiArrowRight,
  FiLock
} from "react-icons/fi";

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

// ─── Tactical Radar HUD Targets ───
export interface RadarTarget {
  id: string;
  name: string;
  code: string;
  orbit: number; // 1, 2, 3, 4
  orbitLabel: string;
  angle: number; // degrees
  radius: number; // SVG px
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  role: string;
  latency: string;
  telemetry: string;
  tradeoff: string;
  production: string[];
}

const RADAR_TARGETS: RadarTarget[] = [
  // ── Orbit 1: Core Runtime & Languages (R = 70) ──
  {
    id: "ts",
    name: "TypeScript",
    code: "TS-01",
    orbit: 1,
    orbitLabel: "ORBIT 01 // CORE CONTRACTS",
    angle: 45,
    radius: 70,
    color: "#38bdf8",
    icon: SiTypescript,
    role: "Zero runtime overhead, strict compilation boundaries, mapped DTOs",
    latency: "0.2ms compile-check",
    telemetry: "Strict Null Checks: 100% Active",
    tradeoff: "Replaced untyped JavaScript to eliminate production runtime exceptions",
    production: ["ServiceFinder Marketplace", "Quant Analytics Dashboard", "Microservice RPCs"],
  },
  {
    id: "python",
    name: "Python 3.12",
    code: "PY-02",
    orbit: 1,
    orbitLabel: "ORBIT 01 // CORE CONTRACTS",
    angle: 165,
    radius: 70,
    color: "#fbbf24",
    icon: SiPython,
    role: "Algorithmic pipelines, vectorized tensor computations, vision models",
    latency: "1.4ms batch inference",
    telemetry: "NumPy / OpenCV Hardware Acceleration",
    tradeoff: "Vectorized C-extensions chosen over slow nested interpreted loops",
    production: ["YOLOv8 Vision Scanner", "Market Data Ingestion Pipeline"],
  },
  {
    id: "go",
    name: "Go Engine",
    code: "GO-03",
    orbit: 1,
    orbitLabel: "ORBIT 01 // CORE CONTRACTS",
    angle: 285,
    radius: 70,
    color: "#00add8",
    icon: SiGo,
    role: "High-throughput asynchronous event ingestion, goroutine concurrency",
    latency: "0.4ms event dispatch",
    telemetry: "Zero Garbage-Collection Pauses",
    tradeoff: "Minimalist concurrency model prioritized over bloated thread pools",
    production: ["Distributed WebSocket Broker", "Telemetry Scraper"],
  },

  // ── Orbit 2: Application Frameworks (R = 120) ──
  {
    id: "nextjs",
    name: "Next.js 16",
    code: "NX-04",
    orbit: 2,
    orbitLabel: "ORBIT 02 // FRAMEWORKS",
    angle: 20,
    radius: 120,
    color: "#ffffff",
    icon: SiNextdotjs,
    role: "App Router layouts, streaming server components, dynamic edge caching",
    latency: "8.2ms edge render",
    telemetry: "Turbopack Engine Enabled",
    tradeoff: "Server Components prevent client-side waterfall bundle bloat",
    production: ["High-Conversion Portfolio", "ServiceFinder Web Platform"],
  },
  {
    id: "react",
    name: "React 19",
    code: "RC-05",
    orbit: 2,
    orbitLabel: "ORBIT 02 // FRAMEWORKS",
    angle: 85,
    radius: 120,
    color: "#61dafb",
    icon: SiReact,
    role: "Concurrent scheduling, tactile micro-animations, server actions",
    latency: "60 FPS steady frame-rate",
    telemetry: "React Fiber Concurrent Mode",
    tradeoff: "Declarative reactive graphs over brittle imperative DOM mutations",
    production: ["Real Estate Marketplace", "Interactive Spline 3D Portal"],
  },
  {
    id: "nestjs",
    name: "NestJS",
    code: "NT-06",
    orbit: 2,
    orbitLabel: "ORBIT 02 // FRAMEWORKS",
    angle: 140,
    radius: 120,
    color: "#f43f5e",
    icon: SiNestjs,
    role: "Enterprise dependency injection, domain boundary isolation, interceptors",
    latency: "3.2ms gateway latency",
    telemetry: "Domain-Driven Modularity",
    tradeoff: "Strict DI architectures prevent tangled unmaintainable spaghetti code",
    production: ["Escrow Payment Backend", "ServiceFinder Core API"],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    code: "FA-07",
    orbit: 2,
    orbitLabel: "ORBIT 02 // FRAMEWORKS",
    angle: 225,
    radius: 120,
    color: "#2dd4bf",
    icon: SiFastapi,
    role: "Asynchronous ASGI endpoints, automated OpenAPI generation, Pydantic schemas",
    latency: "4.8ms response time",
    telemetry: "Async UVLoop Runtime",
    tradeoff: "Type-validated async ASGI over legacy synchronous WSGI servers",
    production: ["AI Model Server", "Quant Inference Engine"],
  },

  // ── Orbit 3: Storage & Data Engine (R = 170) ──
  {
    id: "postgres",
    name: "PostgreSQL",
    code: "PG-08",
    orbit: 3,
    orbitLabel: "ORBIT 03 // STORAGE & DATA",
    angle: 60,
    radius: 170,
    color: "#60a5fa",
    icon: SiPostgresql,
    role: "ACID transactional consistency, row-level locks, foreign key integrity",
    latency: "1.1ms indexed queries",
    telemetry: "Zero Phantom Reads & Isolation",
    tradeoff: "Strict relational ACID chosen over schema-less data corruption risks",
    production: ["Escrow Ledger", "ServiceFinder Core DB", "User State"],
  },
  {
    id: "redis",
    name: "Redis Cache",
    code: "RD-09",
    orbit: 3,
    orbitLabel: "ORBIT 03 // STORAGE & DATA",
    angle: 195,
    radius: 170,
    color: "#ef4444",
    icon: SiRedis,
    role: "Sub-millisecond session state, token bucket rate limiting, pub/sub streams",
    latency: "0.3ms memory read",
    telemetry: "99.8% Cache Hit Ratio",
    tradeoff: "In-memory caching absorbs 95% of read-heavy traffic off PostgreSQL",
    production: ["Realtime Geo-Dispatch", "Session Cache", "WebSocket Rooms"],
  },
  {
    id: "docker",
    name: "Docker Engine",
    code: "DK-10",
    orbit: 3,
    orbitLabel: "ORBIT 03 // STORAGE & DATA",
    angle: 325,
    radius: 170,
    color: "#38bdf8",
    icon: SiDocker,
    role: "Hermetic multi-stage container builds, reproducible runtime parity",
    latency: "92% image size reduction",
    telemetry: "Alpine Multi-Stage Isolated",
    tradeoff: "Containerized isolation eliminates 'works on my machine' drift",
    production: ["Production Deploy Fleet", "GitHub Actions CI Runner"],
  },

  // ── Orbit 4: Graphics & Infrastructure (R = 215) ──
  {
    id: "three",
    name: "Three.js WebGL",
    code: "3D-11",
    orbit: 4,
    orbitLabel: "ORBIT 04 // 3D & INFRA",
    angle: 110,
    radius: 215,
    color: "#c084fc",
    icon: TbBrandThreejs,
    role: "GPU-accelerated procedural shaders, interactive 3D camera controls",
    latency: "16.6ms frame budget",
    telemetry: "WebGL 2.0 GPU Pipeline",
    tradeoff: "Native GLSL shaders deliver 60fps where heavy DOM elements choke",
    production: ["Starfield Hero Canvas", "Surprise 3D Showcase"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    code: "TW-12",
    orbit: 4,
    orbitLabel: "ORBIT 04 // 3D & INFRA",
    angle: 255,
    radius: 215,
    color: "#22d3ee",
    icon: SiTailwindcss,
    role: "Deterministic atomic design tokens, zero CSS runtime overhead",
    latency: "0ms runtime overhead",
    telemetry: "Just-In-Time Purged CSS",
    tradeoff: "Utility-first design tokens guarantee zero CSS specificity wars",
    production: ["All Web Interfaces", "Design Token Atmosphere"],
  },
];

export default function TechStackSection() {
  const doubled1 = [...ROW_1, ...ROW_1];
  const doubled2 = [...ROW_2, ...ROW_2];

  // Radar State
  const [activeTargetId, setActiveTargetId] = useState<string>("ts");
  const [selectedOrbitFilter, setSelectedOrbitFilter] = useState<number>(0); // 0 = all
  const [sweepAngle, setSweepAngle] = useState(0);

  // Sweep rotation ticker for live angle indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setSweepAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const activeTarget = RADAR_TARGETS.find(t => t.id === activeTargetId) || RADAR_TARGETS[0];
  const ActiveIcon = activeTarget.icon;

  const cycleNextTarget = () => {
    const currentIndex = RADAR_TARGETS.findIndex(t => t.id === activeTargetId);
    const nextIndex = (currentIndex + 1) % RADAR_TARGETS.length;
    setActiveTargetId(RADAR_TARGETS[nextIndex].id);
  };

  return (
    <section id="tech-stack" className="relative py-32 overflow-hidden bg-[#07090f]">
      
      {/* ── CSS Animation for 360° Radar Sweep ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes cyber-radar-sweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-radar-sweep {
          transform-origin: 250px 250px;
          animation: cyber-radar-sweep 4s linear infinite;
        }
        @keyframes radar-reticle-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        .radar-reticle {
          animation: radar-reticle-pulse 2s ease-in-out infinite;
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
          <p className="mt-3 text-zinc-400 text-sm font-mono">
            Deterministic tools, zero-runtime frameworks, and scalable infrastructure.
          </p>
        </motion.div>
      </div>

      {/* ── Marquee rows ─────────────────────────────────────────── */}
      <div className="pause-on-hover mb-4 relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07090f] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07090f] to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-left">
            {doubled1.map(({ Icon, name, color }, i) => (
              <TechChip key={`r1-${i}`} Icon={Icon} name={name} color={color} />
            ))}
          </div>
        </div>
      </div>

      <div className="pause-on-hover mb-20 relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07090f] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07090f] to-transparent z-10" />
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

      {/* ── CYBER TACTICAL RADAR HUD ────────────────────────────── */}
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-cyan-500/30 bg-[#070b16]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.12)] relative overflow-hidden"
        >
          {/* Ambient Cyber Mesh Background */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* HUD Top Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-zinc-800 gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FiCrosshair className="text-cyan-400 animate-spin" size={15} style={{ animationDuration: "12s" }} />
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  TACTICAL RADAR HUD // 360° SENSOR SWEEP
                </span>
                <span className="text-zinc-600">&bull;</span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  AZIMUTH: {sweepAngle}°
                </span>
              </div>
              <h3 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-white">
                Live Architecture & Dependency Radar
              </h3>
            </div>

            {/* Orbit Filter Badges */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto bg-[#0a0f20] p-1.5 rounded-2xl border border-zinc-800">
              {[
                { label: "ALL ORBITS", orbit: 0 },
                { label: "CORE (L1)", orbit: 1 },
                { label: "FRAMEWORKS (L2)", orbit: 2 },
                { label: "DATA (L3)", orbit: 3 },
                { label: "INFRA (L4)", orbit: 4 },
              ].map((f) => (
                <button
                  key={f.orbit}
                  onClick={() => setSelectedOrbitFilter(f.orbit)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all ${
                    selectedOrbitFilter === f.orbit
                      ? "bg-cyan-500 text-black shadow-[0_0_12px_#06b6d4]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-850"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Radar HUD Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-8 relative z-10">

            {/* ─── Column 1: The 360° Circular Radar Screen (7 cols) ─── */}
            <div className="lg:col-span-7 flex justify-center items-center relative">
              <div className="w-full max-w-[480px] aspect-square relative select-none">
                
                {/* SVG Radar Canvas */}
                <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  <defs>
                    {/* Radar Sweep Gradient Wedge */}
                    <radialGradient id="radarSweepGradient" cx="250" cy="250" r="230" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>

                    <linearGradient id="laserBeamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
                    </linearGradient>

                    <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Outer Dark Circular Backdrop */}
                  <circle cx="250" cy="250" r="235" fill="#040711" stroke="#0e172a" strokeWidth="2" />
                  <circle cx="250" cy="250" r="230" fill="#050a16" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />

                  {/* 2. Concentric Distance Orbit Rings */}
                  {/* Orbit 4 (R = 215) */}
                  <circle
                    cx="250" cy="250" r="215"
                    fill="none"
                    stroke={selectedOrbitFilter === 0 || selectedOrbitFilter === 4 ? "rgba(6, 182, 212, 0.35)" : "rgba(39, 39, 42, 0.3)"}
                    strokeWidth={selectedOrbitFilter === 4 ? "2" : "1"}
                    strokeDasharray="4, 4"
                  />
                  {/* Orbit 3 (R = 170) */}
                  <circle
                    cx="250" cy="250" r="170"
                    fill="none"
                    stroke={selectedOrbitFilter === 0 || selectedOrbitFilter === 3 ? "rgba(6, 182, 212, 0.35)" : "rgba(39, 39, 42, 0.3)"}
                    strokeWidth={selectedOrbitFilter === 3 ? "2" : "1"}
                    strokeDasharray="4, 4"
                  />
                  {/* Orbit 2 (R = 120) */}
                  <circle
                    cx="250" cy="250" r="120"
                    fill="none"
                    stroke={selectedOrbitFilter === 0 || selectedOrbitFilter === 2 ? "rgba(6, 182, 212, 0.4)" : "rgba(39, 39, 42, 0.3)"}
                    strokeWidth={selectedOrbitFilter === 2 ? "2" : "1"}
                    strokeDasharray="5, 5"
                  />
                  {/* Orbit 1 (R = 70) */}
                  <circle
                    cx="250" cy="250" r="70"
                    fill="none"
                    stroke={selectedOrbitFilter === 0 || selectedOrbitFilter === 1 ? "rgba(6, 182, 212, 0.5)" : "rgba(39, 39, 42, 0.3)"}
                    strokeWidth={selectedOrbitFilter === 1 ? "2.5" : "1.5"}
                    strokeDasharray="6, 4"
                  />

                  {/* 3. Hairline Crosshairs & Azimuth Grids */}
                  <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />
                  <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="3, 3" />
                  
                  {/* Diagonal Guidelines */}
                  <line x1="88" y1="88" x2="412" y2="412" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />
                  <line x1="412" y1="88" x2="88" y2="412" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />

                  {/* Range Labels on Rings */}
                  <text x="254" y="184" fill="#06b6d4" opacity="0.6" fontSize="8" fontFamily="monospace">R-70 [CORE]</text>
                  <text x="254" y="134" fill="#06b6d4" opacity="0.6" fontSize="8" fontFamily="monospace">R-120 [FRAMEWORKS]</text>
                  <text x="254" y="84" fill="#06b6d4" opacity="0.6" fontSize="8" fontFamily="monospace">R-170 [DATA]</text>
                  <text x="254" y="38" fill="#06b6d4" opacity="0.6" fontSize="8" fontFamily="monospace">R-215 [INFRA]</text>

                  {/* Compass Cardinal Points */}
                  <text x="250" y="15" fill="#38bdf8" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold">000° N</text>
                  <text x="490" y="254" fill="#38bdf8" textAnchor="start" fontSize="10" fontFamily="monospace" fontWeight="bold">090° E</text>
                  <text x="250" y="495" fill="#38bdf8" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="bold">180° S</text>
                  <text x="5" y="254" fill="#38bdf8" textAnchor="end" fontSize="10" fontFamily="monospace" fontWeight="bold">270° W</text>

                  {/* 4. THE 360° ROTATING RADAR SWEEP BEAM */}
                  <g className="animate-radar-sweep pointer-events-none">
                    {/* Trailing Sector Wedge (90 degree sweep fan) */}
                    <path
                      d="M 250 250 L 250 20 A 230 230 0 0 0 87 87 Z"
                      fill="url(#radarSweepGradient)"
                      opacity="0.7"
                    />
                    {/* Leading High-Voltage Laser Beam */}
                    <line
                      x1="250" y1="250" x2="250" y2="20"
                      stroke="url(#laserBeamGrad)"
                      strokeWidth="2.5"
                      filter="url(#radarGlow)"
                    />
                    {/* Tip Laser Sparkle */}
                    <circle cx="250" cy="20" r="3" fill="#ffffff" filter="url(#radarGlow)" />
                  </g>

                  {/* 5. Center Radar Hub */}
                  <circle cx="250" cy="250" r="14" fill="#090d1a" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="250" cy="250" r="5" fill="#22d3ee" className="animate-ping" />
                  <circle cx="250" cy="250" r="3" fill="#ffffff" />

                  {/* 6. INTERACTIVE TARGET BLIPS */}
                  {RADAR_TARGETS.map((target) => {
                    const isVisible = selectedOrbitFilter === 0 || selectedOrbitFilter === target.orbit;
                    const isSelected = activeTargetId === target.id;

                    // Polar to Cartesian Math (0 deg is top)
                    const rad = ((target.angle - 90) * Math.PI) / 180;
                    const x = 250 + target.radius * Math.cos(rad);
                    const y = 250 + target.radius * Math.sin(rad);

                    if (!isVisible) return null;

                    return (
                      <g
                        key={target.id}
                        onClick={() => setActiveTargetId(target.id)}
                        className="cursor-pointer group"
                        style={{ transition: "all 0.3s ease" }}
                      >
                        {/* Target Reticle Halo when Active / Hovered */}
                        {isSelected && (
                          <>
                            <circle
                              cx={x} cy={y} r="18"
                              fill="none"
                              stroke={target.color}
                              strokeWidth="1.2"
                              className="animate-ping"
                              style={{ transformOrigin: `${x}px ${y}px` }}
                            />
                            <circle
                              cx={x} cy={y} r="13"
                              fill="none"
                              stroke="#ffffff"
                              strokeWidth="1"
                              strokeDasharray="3, 3"
                            />
                            {/* Reticle Brackets */}
                            <path
                              d={`M ${x - 9} ${y - 4} L ${x - 9} ${y - 9} L ${x - 4} ${y - 9}`}
                              fill="none" stroke={target.color} strokeWidth="1.5"
                            />
                            <path
                              d={`M ${x + 9} ${y - 4} L ${x + 9} ${y - 9} L ${x + 4} ${y - 9}`}
                              fill="none" stroke={target.color} strokeWidth="1.5"
                            />
                            <path
                              d={`M ${x - 9} ${y + 4} L ${x - 9} ${y + 9} L ${x - 4} ${y + 9}`}
                              fill="none" stroke={target.color} strokeWidth="1.5"
                            />
                            <path
                              d={`M ${x + 9} ${y + 4} L ${x + 9} ${y + 9} L ${x + 4} ${y + 9}`}
                              fill="none" stroke={target.color} strokeWidth="1.5"
                            />
                          </>
                        )}

                        {/* Blip Outer Glow Ring */}
                        <circle
                          cx={x} cy={y} r={isSelected ? 7 : 5}
                          fill={target.color}
                          fillOpacity={isSelected ? 0.3 : 0.15}
                          stroke={isSelected ? "#ffffff" : target.color}
                          strokeWidth={isSelected ? 2 : 1.2}
                          className="group-hover:scale-125 transition-transform"
                        />

                        {/* Blip Solid Core Node */}
                        <circle
                          cx={x} cy={y} r={isSelected ? 4 : 3}
                          fill={isSelected ? "#ffffff" : target.color}
                          className="drop-shadow-[0_0_8px_currentColor]"
                        />

                        {/* High-Tech Tactical Tag */}
                        <text
                          x={x + 10}
                          y={y + 3}
                          fill={isSelected ? "#ffffff" : "#94a3b8"}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight={isSelected ? "bold" : "normal"}
                          className="group-hover:fill-cyan-300 transition-colors pointer-events-none"
                        >
                          {target.code}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Corner Tech Reticle Elements */}
                <div className="absolute top-2 left-2 font-mono text-[9px] text-cyan-500/70">
                  LAT: 11.5564° N &bull; LON: 104.9282° E
                </div>
                <div className="absolute bottom-2 left-2 font-mono text-[9px] text-zinc-500">
                  RANGE: 215 KM &bull; GAIN: +18dB
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-[9px] text-emerald-400">
                  SYSTEM READY &bull; ONLINE
                </div>
              </div>
            </div>

            {/* ─── Column 2: Target Lock Telemetry & Combat Dossier (5 cols) ─── */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTarget.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl border border-zinc-800 bg-[#060913]/90 p-6 backdrop-blur-xl space-y-6 shadow-2xl relative overflow-hidden"
                >
                  {/* Subtle Target Color Underglow */}
                  <div
                    className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ backgroundColor: activeTarget.color }}
                  />

                  {/* Header: Target ID & Status */}
                  <div>
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          [{activeTarget.code}]
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {activeTarget.orbitLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        LOCKED
                      </div>
                    </div>

                    {/* Target Brand Title & Icon */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg flex-shrink-0"
                        style={{
                          backgroundColor: `${activeTarget.color}15`,
                          borderColor: `${activeTarget.color}50`,
                          boxShadow: `0 0 20px ${activeTarget.color}25`
                        }}
                      >
                        <ActiveIcon size={30} style={{ color: activeTarget.color }} />
                      </div>

                      <div>
                        <h4 className="font-space-grotesk text-2xl font-black text-white">
                          {activeTarget.name}
                        </h4>
                        <p className="font-mono text-xs text-zinc-400 mt-0.5">
                          {activeTarget.latency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Core Telemetry Specs */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-2xl border border-zinc-850 bg-zinc-950/60">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                        Operational Architecture Role
                      </span>
                      <p className="text-zinc-200 text-xs leading-relaxed">
                        {activeTarget.role}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-850 bg-zinc-950/60 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                        Telemetry Metric
                      </span>
                      <span className="text-cyan-400 font-bold text-xs">
                        {activeTarget.telemetry}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl border border-zinc-850 bg-zinc-950/60">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                        Architectural Trade-Off
                      </span>
                      <p className="text-amber-400/90 text-[11px] leading-relaxed">
                        &bull; {activeTarget.tradeoff}
                      </p>
                    </div>
                  </div>

                  {/* Integrated Repositories */}
                  <div className="pt-2">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
                      Connected Production Fleet
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeTarget.production.map((repo, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2.5 py-1 rounded-xl border border-zinc-800 bg-zinc-900/80 font-mono text-[10px] text-zinc-300"
                        >
                          &check; {repo}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* HUD Action Footer */}
                  <div className="pt-4 border-t border-zinc-850 flex items-center justify-between gap-3">
                    <button
                      onClick={cycleNextTarget}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-mono text-xs font-bold text-cyan-400 transition-all hover:bg-cyan-500/25 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    >
                      <FiTarget size={14} />
                      <span>LOCK NEXT TARGET</span>
                    </button>
                    <a
                      href="#projects"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900/60 px-3.5 py-2 font-mono text-xs text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
                    >
                      <span>Explore</span>
                      <FiArrowRight size={13} />
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom HUD Sensor Log Ticker */}
          <div className="mt-8 pt-4 border-t border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SENSOR LOG: 12 TRACKED TARGETS &bull; MULTI-SPECTRAL TELEMETRY &bull; 0 COMPROMISED NODES</span>
            </div>
            <div className="text-zinc-600">
              POLAR GRID v2.6 // 60 FPS CONTINUOUS SWEEP
            </div>
          </div>

        </motion.div>
      </div>

    </section>
  );
}
