"use client";

import { motion, useMotionValue, useTransform, AnimatePresence, useScroll } from "framer-motion";
import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  FiGithub, FiExternalLink, FiX, FiZap, FiCheck, FiChevronRight, FiChevronLeft,
  FiActivity, FiCpu, FiDatabase, FiAlertTriangle, FiGitCommit, FiLayers, FiArrowRight
} from "react-icons/fi";
import {
  SiNextdotjs, SiNestjs, SiPostgresql, SiStripe, SiDocker,
  SiPython, SiPytorch, SiFastapi, SiReact, SiNodedotjs,
  SiTypescript, SiTailwindcss, SiMongodb, SiRedis, SiPrisma,
  SiOpenai, SiGithubactions, SiGo, SiKubernetes, SiGrafana,
  SiNumpy,
} from "react-icons/si";
import { FaBrain, FaRobot, FaHome, FaUserMd } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";

// ─── Status config ──────────────────────────────────────────────────────────
const STATUS = {
  completed:  { label: "Completed",   dot: "bg-emerald-400", ring: "border-emerald-400/30 bg-emerald-400/5",  text: "text-emerald-400", glow: "shadow-emerald-400/10" },
  progress:   { label: "In Progress", dot: "bg-amber-400",   ring: "border-amber-400/30  bg-amber-400/5",   text: "text-amber-400",   glow: "shadow-amber-400/10"   },
  planned:    { label: "Planned",     dot: "bg-zinc-500",    ring: "border-zinc-600      bg-zinc-800/50",    text: "text-zinc-400",    glow: ""                      },
} as const;
type StatusKey = keyof typeof STATUS;

// ─── Icon map ───────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON: Record<string, any> = {
  "Next.js": SiNextdotjs, "NestJS": SiNestjs, "PostgreSQL": SiPostgresql,
  "Stripe": SiStripe, "Docker": SiDocker, "Python": SiPython,
  "PyTorch": SiPytorch, "FastAPI": SiFastapi, "React": SiReact,
  "Node.js": SiNodedotjs, "TypeScript": SiTypescript, "Tailwind": SiTailwindcss,
  "MongoDB": SiMongodb, "Redis": SiRedis, "Prisma": SiPrisma,
  "OpenAI": SiOpenai, "GitHub Actions": SiGithubactions, "Go": SiGo,
  "Kubernetes": SiKubernetes, "Grafana": SiGrafana, "NumPy": SiNumpy,
  "Three.js": TbBrandThreejs, "YOLOv8": FaBrain, "LangChain": FaRobot,
  "Real Estate API": FaHome, "HL7/FHIR": FaUserMd,
};

// ─── Project Structure interfaces ───────────────────────────────────────────
interface Metric {
  label: string;
  value: string;
}

interface Decision {
  option: string;
  why: string;
  alternative: string;
  reasonRejected: string;
}

interface TradeOffs {
  optimizedFor: string;
  sacrificed: string;
  rationale: string;
}

interface QualitySignal {
  typescript: boolean;
  eslint: boolean;
  unit: string;
  integration: string;
  e2e: string;
  security: boolean;
  coverage: {
    backend: string;
    frontend: string;
  };
}

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  status: StatusKey;
  accent: string;          
  glowColor: string;       
  tech: string[];
  github: string;
  demo: string;
  metrics: Metric[];
  what: string[];
  contributions: string[];
  decisions: Decision[];
  tradeoffs: TradeOffs;
  quality: QualitySignal;
  learned: string;
  previewType: "map" | "chart" | "nodes" | "yolo" | "k8s" | "house" | "agents" | "waveform" | "path" | "calendar";
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "ServiceFinder",
    tagline: "Service marketplace with escrow payments",
    description: "Multi-party marketplace connecting customers with verified local service providers. Real-time provider tracking, Stripe Escrow sessions, dispute management, and containerised microservice architecture.",
    status: "completed",
    accent: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6,182,212,0.15)",
    tech: ["Next.js","NestJS","PostgreSQL","Prisma","Redis","Stripe","Docker","GitHub Actions"],
    github: "https://github.com/ROS-RENDO",
    demo: "#",
    metrics: [
      { label: "API Endpoints", value: "42" },
      { label: "DB Models",     value: "14"  },
      { label: "Active Nodes",  value: "3"   },
      { label: "CI/CD Tests",   value: "184 passing" },
    ],
    what: ["Booking & dispatch architecture","Stripe Connect + Escrow flow","Real-time provider tracking","Admin dashboard + CMS","Containerised Railway deployment"],
    contributions: [
      "Designed backend schema and relational models in Prisma/PostgreSQL.",
      "Implemented Stripe Connect payment flow holding funds in escrow until provider checks out.",
      "Built WebSockets provider tracking feed caching coordinates in Redis.",
      "Dockerized development and set up automated linting and build checks in GitHub Actions."
    ],
    decisions: [
      {
        option: "PostgreSQL & Prisma ORM",
        why: "ACID transactions are essential to prevent double-booking slot reservations.",
        alternative: "MongoDB",
        reasonRejected: "Relational joins on bookings, providers and timeslots are brittle without constraints."
      },
      {
        option: "Redis Caching",
        why: "Avoids high-frequency DB queries during real-time provider coordinate dispatch updates.",
        alternative: "In-memory variables",
        reasonRejected: "State breaks immediately if the API backend container restarts or scales horizontally."
      }
    ],
    tradeoffs: {
      optimizedFor: "Data consistency & transaction safety.",
      sacrificed: "Premature distributed database sharding.",
      rationale: "MVP status does not warrant database sharding. Relational constraints and simplicity mattered more."
    },
    quality: {
      typescript: true,
      eslint: true,
      unit: "142 tests",
      integration: "24 tests",
      e2e: "18 scenarios",
      security: true,
      coverage: { backend: "78%", frontend: "64%" }
    },
    learned: "Designed payment escrow logic from scratch — understood when to capture vs. hold funds and how to handle dispute reversals safely.",
    previewType: "map",
    image: "/images/projects/servicefinder.jpg",
  },
  {
    id: 2,
    title: "Dashboard",
    tagline: "Trading analytics & risk management",
    description: "Real-time trading analytics dashboard connected to MetaTrader 5 live feeds. Includes risk exposure calculator, position P&L tracker, and alert system for threshold breaches.",
    status: "completed",
    accent: "from-amber-500 to-orange-600",
    glowColor: "rgba(245,158,11,0.15)",
    tech: ["Next.js","TypeScript","Node.js","MongoDB","Python","NumPy"],
    github: "https://github.com/ROS-RENDO",
    demo: "#",
    metrics: [
      { label: "Update Interval", value: "200ms" },
      { label: "Pairs Tracked",   value: "12"   },
      { label: "Risk Modules",    value: "4"      },
      { label: "Active Alerts",   value: "8"      },
    ],
    what: ["MT5 WebSocket feed integration","P&L + drawdown calculator","Position size & risk engine","Alert notification pipeline"],
    contributions: [
      "Constructed Python script to pull logs from MT5 Terminal API and push to WebSockets server.",
      "Developed modular risk engine mapping position margins against equity drawdowns.",
      "Designed dashboard charts layout using responsive canvas nodes.",
      "Configured automated notification hooks sending margin alerts directly to Discord."
    ],
    decisions: [
      {
        option: "MongoDB",
        why: "High-frequency unstructured ticker log frames fit document structures with no migration blockers.",
        alternative: "PostgreSQL",
        reasonRejected: "Strict relational structures add overhead with zero transactional benefit for log streams."
      }
    ],
    tradeoffs: {
      optimizedFor: "Low ingestion latency & rapid layout charts mapping.",
      sacrificed: "Strict multi-table query locks.",
      rationale: "Live market ticks are write-heavy and don't require complex relational table integrity locks."
    },
    quality: {
      typescript: true,
      eslint: true,
      unit: "88 tests",
      integration: "12 tests",
      e2e: "6 scenarios",
      security: true,
      coverage: { backend: "82%", frontend: "70%" }
    },
    learned: "Working with financial data taught me to never trust latency — I built an optimistic UI layer that pre-calculates next state while waiting for confirmation.",
    previewType: "chart",
    image: "/images/projects/trading-dashboard.jpg",
  },
  {
    id: 3,
    title: "StackGen",
    tagline: "AI-powered tech stack generator",
    description: "Input a project description, get a full recommended tech stack with architecture rationale. Uses OpenAI to reason about scale, team size, and budget constraints.",
    status: "completed",
    accent: "from-purple-500 to-violet-600",
    glowColor: "rgba(168,85,247,0.15)",
    tech: ["Next.js","TypeScript","OpenAI","Node.js","Tailwind"],
    github: "https://github.com/ROS-RENDO",
    demo: "#",
    metrics: [
      { label: "Response Time", value: "< 3s"  },
      { label: "Stack Profiles", value: "40+" },
      { label: "Factors Mapped",  value: "12"  },
      { label: "Output Format",  value: "MDX" },
    ],
    what: ["Prompt engineering for structured output","Stack reasoning engine","MDX rendered architecture diagrams","Shareable output links"],
    contributions: [
      "Structured system instructions and prompt chains returning strictly typed JSON.",
      "Built Zod schemas mapping output constraints directly to prevent parser failures.",
      "Implemented sharing layout encoding the state into the URL window location hash.",
      "Crafted interactive diagrams rendering dynamic component nodes."
    ],
    decisions: [
      {
        option: "Zod Schema Parser",
        why: "Bypasses JSON parse breaks by enforcing and correcting structural output formats.",
        alternative: "Regex parsing checks",
        reasonRejected: "Brittle regex checks break if the LLM adds markdown wrappers or slight output variations."
      }
    ],
    tradeoffs: {
      optimizedFor: "Serverless stateless execution.",
      sacrificed: "Persistent user dashboard profiles database.",
      rationale: "By storing state in encoded URL hashes, the app remains serverless and hosts for free."
    },
    quality: {
      typescript: true,
      eslint: true,
      unit: "42 tests",
      integration: "6 tests",
      e2e: "N/A",
      security: true,
      coverage: { backend: "75%", frontend: "60%" }
    },
    learned: "Prompt chaining with structured JSON output taught me how to constrain LLM responses reliably without rigid parsing hacks.",
    previewType: "nodes",
  },
  {
    id: 4,
    title: "AI Builder",
    tagline: "YOLOv8 object detection pipeline",
    description: "Custom YOLOv8 object detection model trained on domain-specific data. FastAPI inference endpoint with real-time OpenCV video stream processing and live confidence overlays.",
    status: "completed",
    accent: "from-rose-500 to-pink-600",
    glowColor: "rgba(244,63,94,0.15)",
    tech: ["Python","PyTorch","YOLOv8","FastAPI","Docker","NumPy"],
    github: "https://github.com/ROS-RENDO/Practical-AI",
    demo: "#",
    metrics: [
      { label: "Inference Speed", value: "28ms"  },
      { label: "mAP Score",       value: "0.87"  },
      { label: "Training Epochs",  value: "120"   },
      { label: "Dataset Size",    value: "4.2k img" },
    ],
    what: ["Custom dataset labelling & augmentation","YOLOv8 fine-tuning pipeline","FastAPI async inference endpoint","OpenCV video frame overlay","Docker containerised service"],
    contributions: [
      "Curated, labelled, and augmented custom images inside Roboflow.",
      "Trained model parameters on local GPU and exported optimized weights.",
      "Built async FastAPI streaming endpoint handling video frame capture inputs.",
      "Packaged runtime libraries into Docker container supporting GPU passthrough."
    ],
    decisions: [
      {
        option: "FastAPI Async Routing",
        why: "Handles concurrent video stream client connections without locking the server loop.",
        alternative: "Flask",
        reasonRejected: "Flask lacks native async support, blocking when multiple streams read endpoints."
      }
    ],
    tradeoffs: {
      optimizedFor: "Low latency frame inference rates.",
      sacrificed: "General classification capability.",
      rationale: "Optimizing strictly for targeted hardware parts detection ensures faster inference loops."
    },
    quality: {
      typescript: false,
      eslint: false,
      unit: "24 tests",
      integration: "N/A",
      e2e: "N/A",
      security: true,
      coverage: { backend: "70%", frontend: "N/A" }
    },
    learned: "Model quantisation for INT8 reduced memory 4× with only 2% mAP loss — crucial for edge deployment viability.",
    previewType: "yolo",
    image: "/images/projects/ai-builder.jpg",
  },
  {
    id: 5,
    title: "TechTune Healer",
    tagline: "Kubernetes self-healing node manager",
    description: "Kubernetes operator that monitors cluster health, detects degraded nodes, and autonomously triggers remediation workflows. Exposes Prometheus metrics and Grafana dashboards.",
    status: "progress",
    accent: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.15)",
    tech: ["Go","Kubernetes","Grafana","Docker","Python"],
    github: "https://github.com/ROS-RENDO",
    demo: "#",
    metrics: [
      { label: "Heal Time",    value: "<90s" },
      { label: "Operators",    value: "2"    },
      { label: "Alert Rules",  value: "14"   },
      { label: "Completion Status", value: "60%" },
    ],
    what: ["Custom Kubernetes operator in Go","Node health scoring algorithm","Auto-remediation workflow","Prometheus metric exporter","Grafana alert dashboards"],
    contributions: ["Developing Go custom controller structures", "Configuring prometheus metrics exporters"],
    decisions: [],
    tradeoffs: { optimizedFor: "Node reliability", sacrificed: "None", rationale: "Infrastructure monitoring" },
    quality: { typescript: false, eslint: false, unit: "Pending", integration: "Pending", e2e: "Pending", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "Understanding Go operators and API controller loops.",
    previewType: "k8s",
  },
  {
    id: 6,
    title: "Real Estate Platform",
    tagline: "Property listing & AI valuation",
    description: "Full-stack real estate marketplace with ML-powered property valuation, interactive map search, mortgage calculator, and agent booking system.",
    status: "progress",
    accent: "from-sky-500 to-blue-600",
    glowColor: "rgba(14,165,233,0.15)",
    tech: ["Next.js","NestJS","PostgreSQL","Python","Prisma","Stripe"],
    github: "#",
    demo: "#",
    metrics: [
      { label: "Valuation Accuracy", value: "~91%" },
      { label: "Listing Fields",     value: "28"   },
      { label: "Map Integration",    value: "Mapbox" },
      { label: "Completion Status",  value: "40%" },
    ],
    what: ["Property valuation ML model","Mapbox map search + filters","Agent booking + calendar system","Mortgage calculator engine"],
    contributions: ["Setting up postgresql schemas", "Training price model in python"],
    decisions: [],
    tradeoffs: { optimizedFor: "Data validation", sacrificed: "None", rationale: "E-Listing checks" },
    quality: { typescript: true, eslint: true, unit: "Pending", integration: "Pending", e2e: "Pending", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "Map integration coordinates calculations.",
    previewType: "house",
  },
  {
    id: 7,
    title: "AI Agent Management",
    tagline: "Multi-agent orchestration platform",
    description: "Visual platform for building, deploying, and monitoring LangChain / LangGraph multi-agent pipelines. Drag-and-drop agent workflow builder with real-time execution logs.",
    status: "progress",
    accent: "from-fuchsia-500 to-purple-700",
    glowColor: "rgba(217,70,239,0.15)",
    tech: ["Next.js","Python","LangChain","FastAPI","Redis","PostgreSQL"],
    github: "#",
    demo: "#",
    metrics: [
      { label: "Agent Types",    value: "6+"  },
      { label: "Tool Plugins",   value: "12"  },
      { label: "Execution Logs", value: "Live" },
      { label: "Completion Status", value: "30%" },
    ],
    what: ["Visual drag-and-drop agent builder","LangGraph pipeline executor","Real-time execution trace viewer","Plugin tool registry","Agent performance analytics"],
    contributions: ["Structuring FastAPI nodes logic"],
    decisions: [],
    tradeoffs: { optimizedFor: "Task orchestration", sacrificed: "None", rationale: "Automation flow" },
    quality: { typescript: true, eslint: true, unit: "Pending", integration: "Pending", e2e: "Pending", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "LangGraph workflows execution.",
    previewType: "agents",
  },
  {
    id: 8,
    title: "JARVIS",
    tagline: "Personal AI voice assistant",
    description: "Always-on local AI assistant with voice activation, context memory, browser control, code execution, and n8n workflow automation integration.",
    status: "progress",
    accent: "from-indigo-500 to-blue-700",
    glowColor: "rgba(99,102,241,0.15)",
    tech: ["Python","OpenAI","FastAPI","Node.js","LangChain"],
    github: "#",
    demo: "#",
    metrics: [
      { label: "Response Latency", value: "<800ms" },
      { label: "Memory Window",    value: "32k tok" },
      { label: "Skill Modules",    value: "8"       },
      { label: "Completion Status", value: "25%"    },
    ],
    what: ["Wake word voice activation","Context-aware conversation memory","Browser & desktop automation","Code execution sandbox","n8n workflow trigger integration"],
    contributions: ["Configuring local mic handler scripts"],
    decisions: [],
    tradeoffs: { optimizedFor: "Speech latency", sacrificed: "None", rationale: "Live interface loop" },
    quality: { typescript: false, eslint: false, unit: "Pending", integration: "Pending", e2e: "Pending", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "Handling low latency audio feed logs.",
    previewType: "waveform",
  },
  {
    id: 9,
    title: "Guide Student Online",
    tagline: "AI-tutored e-learning platform",
    description: "Adaptive e-learning platform where an AI tutor adjusts curriculum pacing based on student performance. Includes live quiz engine, progress heatmaps, and tutor booking.",
    status: "planned",
    accent: "from-lime-500 to-green-600",
    glowColor: "rgba(132,204,22,0.12)",
    tech: ["Next.js","NestJS","PostgreSQL","OpenAI","Prisma","Stripe"],
    github: "#",
    demo: "#",
    metrics: [
      { label: "Curriculum Nodes", value: "TBD" },
      { label: "Adaptive Engine",  value: "Planned" },
      { label: "Quiz Types",       value: "5+"      },
      { label: "Completion Status", value: "Design"  },
    ],
    what: ["Adaptive learning path engine","AI tutor response grader","Live quiz + scoring system","Student progress heatmap","Tutor marketplace + booking"],
    contributions: [],
    decisions: [],
    tradeoffs: { optimizedFor: "Curriculum pacing", sacrificed: "None", rationale: "Planned" },
    quality: { typescript: true, eslint: true, unit: "N/A", integration: "N/A", e2e: "N/A", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "",
    previewType: "path",
  },
  {
    id: 10,
    title: "DoctorMeetup",
    tagline: "Healthcare appointment platform",
    description: "HIPAA-aware healthcare booking platform connecting patients with verified doctors. Includes teleconsultation video sessions, e-prescriptions, and medical record management.",
    status: "planned",
    accent: "from-red-500 to-rose-600",
    glowColor: "rgba(239,68,68,0.12)",
    tech: ["Next.js","NestJS","PostgreSQL","Stripe","Docker","Python"],
    github: "#",
    demo: "#",
    metrics: [
      { label: "Consultation Types", value: "TBD"     },
      { label: "Video SDK",          value: "Planned" },
      { label: "Record Compliance",  value: "HIPAA"   },
      { label: "Completion Status",  value: "Design"  },
    ],
    what: ["Doctor verification & onboarding","Video teleconsultation","E-prescription generation","Medical record vault","Insurance claim data export"],
    contributions: [],
    decisions: [],
    tradeoffs: { optimizedFor: "HIPAA Compliance", sacrificed: "None", rationale: "Planned" },
    quality: { typescript: true, eslint: true, unit: "N/A", integration: "N/A", e2e: "N/A", security: true, coverage: { backend: "0%", frontend: "0%" } },
    learned: "",
    previewType: "calendar",
  },
];

// ─── 3D tilt card hook ───────────────────────────────────────────────────────
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { rotateX, rotateY, handleMove, handleLeave };
}

// ─── Dynamic Visual Preview Component ───────────────────────────────────────
const ProjectVisualPreview = React.memo(function ProjectVisualPreview({ type, accent }: { type: string; accent: string }) {
  const getPreview = () => {
    switch (type) {
      case "map":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none">
            {/* Map Street Grid Backdrop */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-[size:12px_12px]" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
              <path d="M 20,20 L 120,45 L 240,30 L 340,75" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <path d="M 60,110 L 160,80 L 280,100" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
              <path d="M 120,45 L 160,80" stroke="#38bdf8" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
            </svg>

            {/* Top Telemetry Bar */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>PHNOM PENH // DISPATCH ACTIVE</span>
              </span>
              <span className="text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                ETA: 4 MIN
              </span>
            </div>

            {/* Interactive Map Visual with Animated Vehicle Route */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-between px-6">
              {/* Customer Pin */}
              <div className="flex flex-col items-center">
                <span className="text-rose-400 text-sm animate-bounce">📍</span>
                <span className="text-[7px] font-mono text-zinc-400 bg-zinc-900/90 px-1 rounded border border-zinc-800">Customer</span>
              </div>

              {/* Animated Route Line */}
              <div className="flex-1 mx-3 relative h-6 flex items-center">
                <div className="w-full h-0.5 border-t-2 border-dashed border-cyan-500/40" />
                <motion.div
                  animate={{ x: [0, 140, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-2 flex items-center gap-1 bg-cyan-500/20 border border-cyan-400/50 px-1.5 py-0.5 rounded-full"
                >
                  <span className="text-xs">🚗</span>
                  <span className="text-[7px] font-mono text-cyan-300 font-bold hidden sm:inline">1.2km</span>
                </motion.div>
              </div>

              {/* Provider Destination Node */}
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-xs">
                  🧹
                </div>
                <span className="text-[7px] font-mono text-emerald-400 bg-zinc-900/90 px-1 rounded border border-zinc-800 mt-0.5">CleanPro</span>
              </div>
            </div>

            {/* Bottom Status Pill */}
            <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-zinc-500 pt-1 border-t border-zinc-900">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                Stripe Escrow Locked
              </span>
              <span>WS_COORDS: [11.5564, 104.9282]</span>
            </div>
          </div>
        );

      case "chart":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none">
            {/* Top Market Bar */}
            <div className="flex items-center justify-between text-[9px] font-mono border-b border-zinc-900 pb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">XAUUSD</span>
                <span className="text-amber-500 text-[8px] bg-amber-500/10 border border-amber-500/20 px-1 rounded">M15</span>
                <span className="text-emerald-400 font-bold">$2,348.60</span>
              </div>
              <span className="text-emerald-400 text-[8px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                ▲ +2.48%
              </span>
            </div>

            {/* Candlestick Visualization */}
            <div className="flex items-end justify-between h-14 w-full gap-1.5 px-2 relative my-1">
              {/* Dotted Take-Profit Line */}
              <div className="absolute left-0 right-0 top-3 border-t border-dashed border-emerald-500/30 flex justify-end">
                <span className="text-[7px] font-mono text-emerald-500 bg-zinc-950 px-1">TP 2,352.00</span>
              </div>

              {[
                { h: 24, up: true, wick: 32 },
                { h: 18, up: false, wick: 28 },
                { h: 36, up: true, wick: 44 },
                { h: 22, up: false, wick: 30 },
                { h: 42, up: true, wick: 50 },
                { h: 30, up: true, wick: 38 },
                { h: 48, up: true, wick: 54 },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative">
                  {/* Candle Wick */}
                  <div 
                    className={`w-[1px] absolute ${c.up ? "bg-emerald-500/50" : "bg-rose-500/50"}`} 
                    style={{ height: `${c.wick}px`, bottom: "4px" }} 
                  />
                  {/* Candle Body - GPU scaleY (zero layout reflow) */}
                  <motion.div
                    animate={{ scaleY: [0.85, 1.15, 0.85] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.25, ease: "easeInOut" }}
                    style={{ height: `${c.h}px`, transformOrigin: "bottom" }}
                    className={`w-full max-w-[8px] rounded-[1px] relative z-10 ${
                      c.up 
                        ? "bg-emerald-500 border border-emerald-400" 
                        : "bg-rose-500 border border-rose-400"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Volume Indicator */}
            <div className="flex items-center justify-between text-[7px] font-mono text-zinc-500 border-t border-zinc-900 pt-1">
              <span>VOL: 14.8K LOTS</span>
              <span className="text-cyan-400 font-bold">ALGO_STRATEGY // ACTIVE BUY</span>
            </div>
          </div>
        );

      case "yolo":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            {/* Viewfinder Corner Reticles */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-500" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-rose-500" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-rose-500" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-500" />

            {/* Sweeping Laser Scanner - GPU translateY (zero layout reflow) */}
            <motion.div
              animate={{ y: [0, 100, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute top-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_6px_#f43f5e] z-20 pointer-events-none"
            />

            {/* Top Status */}
            <div className="relative z-10 flex items-center justify-between text-[8px]">
              <span className="text-rose-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                CAM_01 // LIVE INFERENCE
              </span>
              <span className="text-zinc-500">60.2 FPS</span>
            </div>

            {/* Object Detection Target Bounding Boxes */}
            <div className="relative z-10 flex items-center justify-around py-1">
              {/* Target 1 */}
              <div className="border border-rose-500/80 bg-rose-500/10 rounded p-1 w-28 h-14 relative flex flex-col justify-between shadow-[0_0_12px_rgba(244,63,94,0.15)]">
                <span className="absolute -top-2 left-1 bg-rose-600 text-white text-[7px] font-bold px-1 rounded">
                  person: 98.4%
                </span>
                <div className="w-full flex-1 flex items-center justify-center text-rose-300/40 text-xs">
                  👤
                </div>
                <span className="text-[6px] text-zinc-400 text-right">BBOX [142, 88]</span>
              </div>

              {/* Target 2 */}
              <div className="border border-cyan-500/80 bg-cyan-500/10 rounded p-1 w-20 h-12 relative flex flex-col justify-between shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                <span className="absolute -top-2 left-1 bg-cyan-600 text-white text-[7px] font-bold px-1 rounded">
                  tool: 94.1%
                </span>
                <div className="w-full flex-1 flex items-center justify-center text-cyan-300/40 text-xs">
                  🔧
                </div>
                <span className="text-[6px] text-zinc-400 text-right">24ms</span>
              </div>
            </div>

            {/* Bottom Telemetry */}
            <div className="relative z-10 flex items-center justify-between text-[7px] text-zinc-500 border-t border-zinc-900 pt-1">
              <span>YOLOv8x // TENSORRT FP16</span>
              <span className="text-emerald-400">STATUS: ZERO_DROP</span>
            </div>
          </div>
        );

      case "k8s":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            {/* Top Cluster Header */}
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                K8S CLUSTER // AUTONOMOUS OPERATOR
              </span>
              <span className="text-zinc-500">PROMETHEUS 2.45</span>
            </div>

            {/* 3 Server Blades Simulation */}
            <div className="grid grid-cols-3 gap-2 my-1">
              {[
                { name: "node-01", status: "HEALTHY", cpu: "38%", color: "text-emerald-400", border: "border-emerald-500/30" },
                { name: "node-02", status: "HEALTHY", cpu: "44%", color: "text-emerald-400", border: "border-emerald-500/30" },
                { name: "node-03", status: "AUTO-HEALED", cpu: "29%", color: "text-cyan-400", border: "border-cyan-500/30" },
              ].map((n, idx) => (
                <div key={idx} className={`p-1.5 rounded-lg border ${n.border} bg-zinc-900/80 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between text-[7px]">
                    <span className="text-white font-bold">{n.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="w-full bg-zinc-950 h-1 rounded-full my-1 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: n.cpu }} />
                  </div>
                  <div className="flex items-center justify-between text-[6px] text-zinc-500">
                    <span className={n.color}>{n.status}</span>
                    <span>{n.cpu}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Health Signal */}
            <div className="flex items-center justify-between text-[7px] text-zinc-500 border-t border-zinc-900 pt-1">
              <span>CONTROLLER_LOOP: 50ms</span>
              <span className="text-emerald-400 font-bold">REMEDIATION: &lt; 90s</span>
            </div>
          </div>
        );

      case "agents":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            {/* Top Multi-Agent Header */}
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-fuchsia-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                LANGGRAPH PIPELINE // 3 AGENTS
              </span>
              <span className="text-zinc-500">EXEC_ID #892</span>
            </div>

            {/* Agent Directed Graph Nodes */}
            <div className="flex items-center justify-between px-2 my-1 relative">
              {/* Connector SVG Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="rgba(217,70,239,0.3)" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" strokeDasharray="3,3" />
              </svg>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-purple-500 bg-purple-950/80 flex items-center justify-center text-xs shadow-md">
                  🧠
                </div>
                <span className="text-[7px] text-purple-300 font-bold mt-1">Planner</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-fuchsia-500 bg-fuchsia-950/80 flex items-center justify-center text-xs shadow-md">
                  🔍
                </div>
                <span className="text-[7px] text-fuchsia-300 font-bold mt-1">Research</span>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border border-cyan-500 bg-cyan-950/80 flex items-center justify-center text-xs shadow-md">
                  💻
                </div>
                <span className="text-[7px] text-cyan-300 font-bold mt-1">Coder</span>
              </div>
            </div>

            {/* Bottom Log Feed */}
            <div className="text-[7px] text-zinc-500 border-t border-zinc-900 pt-1 flex items-center justify-between">
              <span className="text-fuchsia-400">[ORCHESTRATION] State verified</span>
              <span>TOKEN_USE: 4.2k</span>
            </div>
          </div>
        );

      case "waveform":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            {/* Top AI Audio Header */}
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-indigo-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                JARVIS CORE // VOICE SYNTHESIS
              </span>
              <span className="text-emerald-400 font-semibold">ALWAYS-ON</span>
            </div>

            {/* Voice Waveform Centerpiece - GPU scaleY (zero layout reflow) */}
            <div className="flex items-center justify-center gap-1.5 h-12 my-1">
              {[12, 28, 42, 18, 52, 34, 46, 20, 38, 14].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [0.35, 1, 0.35] }}
                  transition={{ repeat: Infinity, duration: 0.8 + (i % 3) * 0.2, ease: "easeInOut" }}
                  style={{ height: `${h}px`, transformOrigin: "center" }}
                  className="w-1.5 bg-gradient-to-t from-indigo-600 via-sky-400 to-cyan-300 rounded-full"
                />
              ))}
            </div>

            {/* Bottom Voice Command Transcription */}
            <div className="text-[7px] text-zinc-400 border-t border-zinc-900 pt-1 flex items-center justify-between">
              <span className="text-cyan-400">&ldquo;Hey JARVIS, deploy production cluster&rdquo;</span>
              <span className="text-emerald-400 font-bold">200 OK</span>
            </div>
          </div>
        );

      case "house":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            {/* Top Real Estate Header */}
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-sky-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                ESTATE AI // VALUATION MODEL
              </span>
              <span className="text-zinc-500">MAPBOX GL</span>
            </div>

            {/* Architecture Card with AI Valuation */}
            <div className="flex items-center justify-between px-3 my-1">
              <div className="text-3xl">🏡</div>
              <div className="space-y-0.5 text-right">
                <div className="text-[11px] font-bold text-white font-space-grotesk">$425,000</div>
                <div className="text-[7px] text-emerald-400 font-bold">AI VALUATION: 94% ACCURACY</div>
                <div className="text-[7px] text-zinc-500">4 Bed · 3 Bath · 2,400 sqft</div>
              </div>
            </div>

            {/* Bottom Telemetry */}
            <div className="text-[7px] text-zinc-500 border-t border-zinc-900 pt-1 flex items-center justify-between">
              <span>MORTGAGE_CALC: $2,180/MO</span>
              <span className="text-sky-400 font-bold">ES-LISTING VERIFIED</span>
            </div>
          </div>
        );

      case "nodes":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-cyan-400 font-bold">DISTRIBUTED BACKEND ARCHITECTURE</span>
              <span className="text-emerald-400">HEALTHY</span>
            </div>
            <div className="flex items-center justify-around py-2">
              <div className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800 text-[8px] text-white">Next.js</div>
              <span className="text-cyan-500">&rarr;</span>
              <div className="px-2 py-1 bg-zinc-900 rounded border border-cyan-800 text-[8px] text-cyan-400">NestJS</div>
              <span className="text-purple-500">&rarr;</span>
              <div className="px-2 py-1 bg-zinc-900 rounded border border-purple-800 text-[8px] text-purple-400">Redis</div>
              <span className="text-emerald-500">&rarr;</span>
              <div className="px-2 py-1 bg-zinc-900 rounded border border-emerald-800 text-[8px] text-emerald-400">PostgreSQL</div>
            </div>
            <div className="text-[7px] text-zinc-500 border-t border-zinc-900 pt-1 flex justify-between">
              <span>LATENCY: 24ms</span>
              <span className="text-cyan-400">HTTP/2 STREAMING</span>
            </div>
          </div>
        );

      case "path":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-lime-400 font-bold">PORTFOLIO OPTIMIZATION CURVE</span>
              <span className="text-zinc-500">MONTE CARLO</span>
            </div>
            <div className="flex items-center justify-center h-12 relative">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10,40 Q 80,45 150,20 T 320,10" fill="none" stroke="#84cc16" strokeWidth="2" />
                <path d="M 10,40 Q 80,30 150,35 T 320,25" fill="none" stroke="rgba(132,204,22,0.3)" strokeWidth="1" strokeDasharray="3,3" />
              </svg>
              <span className="absolute right-4 top-2 text-[8px] font-bold text-lime-400 bg-lime-950/80 px-1 rounded border border-lime-800">
                SHARPE: 2.84
              </span>
            </div>
            <div className="text-[7px] text-zinc-500 border-t border-zinc-900 pt-1 flex justify-between">
              <span>SIMULATIONS: 10,000 RUNS</span>
              <span className="text-lime-400">MAX_DRAWDOWN: 4.1%</span>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="relative w-full h-full flex flex-col justify-between p-3 overflow-hidden select-none font-mono">
            <div className="flex items-center justify-between text-[8px] border-b border-zinc-900 pb-1">
              <span className="text-rose-400 font-bold">HL7 / FHIR SCHEDULER</span>
              <span className="text-emerald-400">SLOT_LOCKED</span>
            </div>
            <div className="grid grid-cols-4 gap-1 py-1">
              {["09:00", "10:30", "13:00", "14:30"].map((slot, i) => (
                <div key={i} className={`p-1 rounded text-center text-[7px] border ${i === 1 ? "bg-rose-500/20 border-rose-500 text-rose-300 font-bold" : "bg-zinc-900/60 border-zinc-800 text-zinc-500"}`}>
                  {slot}
                </div>
              ))}
            </div>
            <div className="text-[7px] text-zinc-500 border-t border-zinc-900 pt-1 flex justify-between">
              <span>SYNC: APPOINTMENT_CONFIRMED</span>
              <span className="text-rose-400">HIPAA_ENCRYPTED</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[220px] max-h-[360px] bg-zinc-950/90 rounded-xl border border-zinc-800/70 overflow-hidden flex flex-col justify-between shadow-inner">
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />
      {getPreview()}
    </div>
  );
});

// ─── Horizontal Showcase Card ────────────────────────────────────────────────
const HorizontalProjectCard = React.memo(function HorizontalProjectCard({
  project,
  index,
  total,
  onSelect,
}: {
  project: Project;
  index: number;
  total: number;
  onSelect: (p: Project) => void;
}) {
  const s = STATUS[project.status];

  return (
    <div
      onClick={() => onSelect(project)}
      className="relative shrink-0 w-[86vw] sm:w-[80vw] md:w-[75vw] lg:w-[70vw] xl:w-[880px] h-[64vh] min-h-[480px] max-h-[580px] rounded-2xl md:rounded-3xl border border-zinc-800 bg-[#0c0e17] hover:border-zinc-700 transition-colors duration-200 cursor-pointer group flex flex-col justify-between overflow-hidden"
    >
      {/* Top accent line */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.accent}`} />

      {/* Desktop 2-column, mobile stacked layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 h-full overflow-hidden">
        {/* Left column: Info, tech, metrics, action buttons */}
        <div className="md:col-span-7 p-5 md:p-7 flex flex-col justify-between h-full border-b md:border-b-0 md:border-r border-zinc-800/60 overflow-y-auto">
          <div>
            {/* Top row: Project index + status */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl md:text-3xl font-extrabold text-zinc-500/80 group-hover:text-white transition-colors">
                  #{String(project.id).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-zinc-600">/ {String(total).padStart(2, "0")}</span>
              </div>

              <div className={`flex items-center gap-2 rounded-full border px-2.5 py-0.5 ${s.ring}`}>
                <span className="relative flex h-1.5 w-1.5">
                  {project.status !== "planned" && (
                    <span className={`absolute inline-flex h-full w-full rounded-full ${s.dot} animate-status-ping opacity-60`} />
                  )}
                  <span className={`relative h-1.5 w-1.5 rounded-full ${s.dot}`} />
                </span>
                <span className={`font-mono text-[10px] font-bold ${s.text}`}>{s.label}</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-space-grotesk text-2xl md:text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all">
              {project.title}
            </h3>
            <p className={`font-mono text-xs font-semibold bg-gradient-to-r ${project.accent} bg-clip-text text-transparent mt-1 mb-2.5`}>
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-4">
              {project.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.metrics.slice(0, 2).map((m, i) => (
                <div key={i} className="rounded-xl bg-zinc-900/90 border border-zinc-800/80 p-2.5">
                  <div className="font-space-grotesk text-sm font-bold text-white">{m.value}</div>
                  <div className="font-mono text-[9px] text-zinc-500 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.tech.slice(0, 6).map((t) => {
                const Icon = ICON[t] as any;
                return Icon ? (
                  <div
                    key={t}
                    title={t}
                    className="flex h-7 px-2 items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-all text-xs"
                  >
                    <Icon size={13} />
                    <span className="font-mono text-[10px]">{t}</span>
                  </div>
                ) : (
                  <span
                    key={t}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-2 py-1 font-mono text-[10px] text-zinc-500"
                  >
                    {t}
                  </span>
                );
              })}
              {project.tech.length > 6 && (
                <div className="flex h-7 items-center px-2 rounded-lg border border-zinc-800 bg-zinc-900/90 font-mono text-[10px] text-zinc-500">
                  +{project.tech.length - 6} more
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-3 border-t border-zinc-800/80 mt-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 font-space-grotesk text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-95 active:scale-[0.98] transition-all"
            >
              <FiZap size={13} />
              <span>Deep Dive Case Study</span>
            </button>

            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                title="View GitHub Repository"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
              >
                <FiGithub size={15} />
              </a>
            )}

            {project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                title="Live Demo"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all"
              >
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Right column: Interactive Visual Simulation */}
        <div className="md:col-span-5 bg-zinc-950/80 p-4 md:p-5 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-900">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              LIVE TELEMETRY HUD
            </span>
            <span className="font-mono text-[9px] text-zinc-600">SYS://0{project.id}</span>
          </div>

          <div className="flex-1 w-full flex items-center justify-center overflow-hidden py-1">
            {project.image ? (
              <div className="relative w-full h-full min-h-[220px] max-h-[360px] rounded-xl overflow-hidden border border-zinc-800/80 group/img">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-zinc-700/80 font-mono text-[8px] text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>HD UI MOCKUP</span>
                </div>
              </div>
            ) : (
              <ProjectVisualPreview type={project.previewType} accent={project.accent} />
            )}
          </div>

          <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
            <span className="font-mono text-[8px] text-zinc-600 uppercase">
              {project.status === "completed" ? "PRODUCTION CERTIFIED" : "LAB PROTOTYPE"}
            </span>
            <button
              onClick={() => onSelect(project)}
              className="flex items-center gap-1 font-mono text-[9px] text-zinc-400 hover:text-cyan-300 transition-colors"
            >
              <span>Architecture Map</span>
              <FiChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── End-of-Track Card ("The Lab & Beyond") ──────────────────────────────────
const EndTrackCard = React.memo(function EndTrackCard({ total }: { total: number }) {
  return (
    <div className="relative shrink-0 w-[80vw] sm:w-[60vw] md:w-[48vw] lg:w-[42vw] xl:w-[460px] h-[64vh] min-h-[480px] max-h-[580px] rounded-2xl md:rounded-3xl border border-dashed border-zinc-800 bg-[#0c0e17] p-6 md:p-8 flex flex-col justify-between text-center overflow-hidden group hover:border-zinc-600 transition-colors">

      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
          TRACK COMPLETE // {total} OF {total}
        </span>
        <span className="font-mono text-[9px] text-cyan-400 font-bold">NEXT HORIZON</span>
      </div>

      {/* Middle Content */}
      <div className="my-auto py-6">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <FiLayers size={26} />
        </div>
        <h3 className="font-space-grotesk text-2xl md:text-3xl font-black text-white mb-2">
          The Lab & Beyond
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-sm mx-auto mb-6">
          Looking for open-source AI pipelines, backend experiments, or want to discuss an architecture?
        </p>

        <div className="flex flex-col gap-2.5 max-w-xs mx-auto">
          <a
            href="https://github.com/ROS-RENDO"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700/80 px-4 py-2.5 font-space-grotesk text-xs font-bold text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all"
          >
            <FiGithub size={15} />
            <span>Explore GitHub Repositories</span>
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2.5 font-space-grotesk text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all"
          >
            <FiZap size={14} />
            <span>Initiate Collaboration</span>
          </a>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="pt-3 border-t border-zinc-900 text-zinc-500 font-mono text-[9px] flex items-center justify-center gap-1.5">
        <span>Scroll down to continue to Journey & Tech Stack</span>
        <FiArrowRight size={10} className="rotate-90" />
      </div>
    </div>
  );
});

// ─── Custom Vector Architecture Viewer ───────────────────────────────────────
function ArchitectureViewer({ projectId }: { projectId: number }) {
  // ServiceFinder
  if (projectId === 1) {
    return (
      <div className="border border-zinc-800 bg-zinc-950/60 rounded-xl p-5 font-mono text-[11px] text-zinc-400">
        <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Interactive System Map</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center rounded border border-zinc-800 bg-zinc-900 p-2 text-zinc-300">
            <span>Next.js Frontend</span>
            <span className="text-[9px] text-cyan-400">Client UI Layer</span>
          </div>
          <div className="text-center text-zinc-600 leading-none">&darr; websocket & HTTP API</div>
          <div className="flex justify-between items-center rounded border border-zinc-800 bg-zinc-900 p-2 text-zinc-300">
            <span>NestJS Microservice API</span>
            <span className="text-[9px] text-purple-400">Gateway + Router</span>
          </div>
          <div className="text-center text-zinc-600 leading-none">&darr; relational operations / cache</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded border border-zinc-800 bg-zinc-900 p-2 flex flex-col gap-1">
              <span className="text-zinc-300">Redis Cache</span>
              <span className="text-[9px] text-amber-500">Live coordinates cache</span>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900 p-2 flex flex-col gap-1">
              <span className="text-zinc-300">Prisma / PostgreSQL</span>
              <span className="text-[9px] text-rose-500">Relational bookings db</span>
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-zinc-900 pt-3 text-[10px] text-zinc-500 leading-relaxed">
          <p className="font-bold text-zinc-400 mb-1">Architecture Note:</p>
          Constructed as a modular monolith. NestJS encapsulates logical domains (Auth, Booking, Payments) in separated folders, keeping DB schema mutations centralized and transactional.
        </div>
      </div>
    );
  }
  // Trading Dashboard
  if (projectId === 2) {
    return (
      <div className="border border-zinc-800 bg-zinc-950/60 rounded-xl p-5 font-mono text-[11px] text-zinc-400">
        <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Trading Ingestion Pipeline</p>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center rounded border border-zinc-800 bg-zinc-900 p-2 text-zinc-300">
            <span>MetaTrader 5 Terminal</span>
            <span className="text-[9px] text-amber-500">Market Data Feed</span>
          </div>
          <div className="text-center text-zinc-600 leading-none">&darr; local python script logs</div>
          <div className="flex justify-between items-center rounded border border-zinc-800 bg-zinc-900 p-2 text-zinc-300">
            <span>Node.js / Express socket.io</span>
            <span className="text-[9px] text-purple-400">WS Event Broadcaster</span>
          </div>
          <div className="text-center text-zinc-600 leading-none">&darr; broadcasts live ticks</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded border border-zinc-800 bg-zinc-900 p-2 flex flex-col gap-1">
              <span className="text-zinc-300">React Client UI</span>
              <span className="text-[9px] text-cyan-400">P&L live rendering</span>
            </div>
            <div className="rounded border border-zinc-800 bg-zinc-900 p-2 flex flex-col gap-1">
              <span className="text-zinc-300">MongoDB Storage</span>
              <span className="text-[9px] text-rose-500">High-frequency logs</span>
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-zinc-900 pt-3 text-[10px] text-zinc-500 leading-relaxed">
          <p className="font-bold text-zinc-400 mb-1">Architecture Note:</p>
          Tick data streams continuously at sub-200ms intervals. Ingestion relies on non-blocking WebSockets to buffer state mutations client-side rather than polling SQL APIs.
        </div>
      </div>
    );
  }
  // default placeholder
  return (
    <div className="border border-zinc-800 bg-zinc-950/60 rounded-xl p-5 font-mono text-[11px] text-zinc-400 text-center py-10">
      <FiCpu className="mx-auto text-zinc-600 mb-3 animate-pulse" size={24} />
      Architecture mapping is active for Completed tier projects.
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const s = STATUS[project.status];
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "decisions">("overview");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-end bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="relative h-full w-full max-w-2xl bg-[#111113] border-l border-zinc-800 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`h-1 w-full bg-gradient-to-r ${project.accent} sticky top-0 z-10`} />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className={`flex items-center gap-2 rounded-full border px-2.5 py-1 mb-3 w-fit ${s.ring}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                  <span className={`font-mono text-[10px] font-bold ${s.text}`}>{s.label}</span>
                </div>
                <h2 className="font-space-grotesk text-3xl font-black text-white">{project.title}</h2>
                <p className={`font-mono text-sm mt-1 bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>{project.tagline}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-zinc-700 p-2 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all">
                <FiX size={18} />
              </button>
            </div>

            {/* Tabs selector */}
            <div className="flex gap-2 border-b border-zinc-900 pb-4 mb-6">
              {(["overview", "architecture", "decisions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-space-grotesk text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-zinc-900 text-white border border-zinc-800"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab === "decisions" ? "Decisions & Trade-offs" : tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {project.image && (
                    <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden border border-zinc-800 mb-6 group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div>
                    <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Description</p>
                    <p className="text-zinc-400 leading-relaxed text-sm">{project.description}</p>
                  </div>

                  {/* Metrics grid */}
                  <div>
                    <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Project Metrics</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-center">
                          <div className="font-space-grotesk text-base font-black text-white">{m.value}</div>
                          <div className="font-mono text-[9px] text-zinc-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contributions checks */}
                  {project.contributions.length > 0 && (
                    <div>
                      <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">My Contributions</p>
                      <div className="space-y-2">
                        {project.contributions.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs text-zinc-300">
                            <FiCheck size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Testing / Quality metrics */}
                  {project.status === "completed" && (
                    <div>
                      <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Quality & Testing verification</p>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 font-mono text-[10px] space-y-2">
                        <div className="flex justify-between border-b border-zinc-900 pb-1.5 text-zinc-400 font-bold">
                          <span>Verification Checklist</span>
                          <span>Status</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TypeScript Strict Verification</span>
                          <span className="text-emerald-400">✓ Strict checks enabled</span>
                        </div>
                        <div className="flex justify-between">
                          <span>ESLint Linter Quality checks</span>
                          <span className="text-emerald-400">✓ ESLint clean</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Unit Test Suite metrics</span>
                          <span className="text-zinc-300">{project.quality.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Integration Test scenarios</span>
                          <span className="text-zinc-300">{project.quality.integration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>E2E Playwright verification</span>
                          <span className="text-zinc-300">{project.quality.e2e}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Security CodeQL Dependency scan</span>
                          <span className="text-emerald-400">✓ Dependabot active</span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-900 pt-2 text-zinc-400">
                          <span>Measured Code Coverage</span>
                          <span>Backend: {project.quality.coverage.backend} / Frontend: {project.quality.coverage.frontend}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech stack icons */}
                  <div>
                    <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Technology Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => {
                        const Icon = ICON[t] as any;
                        return (
                          <div key={t} className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 transition-all">
                            {Icon && <Icon size={14} className="text-zinc-400" />}
                            <span className="font-mono text-[10px] text-zinc-300">{t}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "architecture" && (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ArchitectureViewer projectId={project.id} />
                </motion.div>
              )}

              {activeTab === "decisions" && (
                <motion.div
                  key="decisions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Decisions mapping */}
                  {project.decisions.length > 0 ? (
                    <div>
                      <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Engineering Judgments</p>
                      <div className="space-y-4">
                        {project.decisions.map((dec, idx) => (
                          <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3 font-mono text-[11px]">
                            <div className="flex justify-between items-start gap-2 border-b border-zinc-800 pb-2">
                              <span className="text-zinc-100 font-bold uppercase text-xs">Choice: {dec.option}</span>
                              <span className="text-[10px] text-zinc-500">Decision #{idx+1}</span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <span className="text-zinc-500 block text-[9px] uppercase font-space-grotesk font-black">Why selected:</span>
                                <span className="text-zinc-350">{dec.why}</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 block text-[9px] uppercase font-space-grotesk font-black">Alternative considered:</span>
                                <span className="text-zinc-500">{dec.alternative}</span>
                              </div>
                              <div>
                                <span className="text-zinc-500 block text-[9px] uppercase font-space-grotesk font-black">Reason rejected:</span>
                                <span className="text-zinc-500 italic">{dec.reasonRejected}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center text-xs font-mono text-zinc-500">
                      Decisions mapping is currently in progress for this node.
                    </div>
                  )}

                  {/* Trade-offs mapping */}
                  {project.status === "completed" && (
                    <div>
                      <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Architectural Trade-offs</p>
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-[11px] space-y-3">
                        <div>
                          <span className="text-cyan-400 block font-bold text-xs mb-1">Optimized For:</span>
                          <span className="text-zinc-300">{project.tradeoffs.optimizedFor}</span>
                        </div>
                        <div>
                          <span className="text-rose-400 block font-bold text-xs mb-1">Sacrificed:</span>
                          <span className="text-zinc-500">{project.tradeoffs.sacrificed}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block font-bold text-xs mb-1">Trade-off Rationale:</span>
                          <span className="text-zinc-400">{project.tradeoffs.rationale}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Links footer */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-900">
              {project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 font-space-grotesk text-sm text-zinc-300 transition-all hover:border-zinc-500 hover:text-white">
                  <FiGithub size={16} /> GitHub
                </a>
              )}
              {project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noreferrer"
                  className={`flex items-center gap-2 rounded-full bg-gradient-to-r ${project.accent} px-5 py-2.5 font-space-grotesk text-sm font-bold text-black transition-all hover:opacity-90`}>
                  <FiExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main horizontal scroll section ──────────────────────────────────────────
export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "lab">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const displayProjects = useMemo(() => {
    if (activeTab === "completed") return PROJECTS.filter((p) => p.status === "completed");
    if (activeTab === "lab") return PROJECTS.filter((p) => p.status !== "completed");
    return PROJECTS;
  }, [activeTab]);

  // Recalculate track width on mount, resize, and project filter change
  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const range = totalWidth - viewportWidth + 80;
        setScrollRange(Math.max(0, range));
      }
    };

    updateScrollRange();
    const handleResize = () => updateScrollRange();
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => updateScrollRange());
    if (trackRef.current) observer.observe(trackRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [displayProjects]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Direct 1:1 hardware-accelerated transform without laggy spring physics
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const progressPercent = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Track active card index based on scroll position - ONLY update state when index changes
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const total = displayProjects.length + 1; // including end card
      const idx = Math.min(total - 1, Math.floor(latest * total));
      setCurrentCardIndex((prev) => (prev !== idx ? idx : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress, displayProjects.length]);

  const scrollToProject = (index: number) => {
    if (!sectionRef.current) return;
    const total = displayProjects.length + 1;
    const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const targetY = sectionTop + (index / (total - 1)) * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    // Translate horizontal trackpad swipes into vertical scroll ticks
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      window.scrollBy({ top: e.deltaX * 1.5, behavior: "auto" });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#070a14]"
      style={{ height: `calc(100vh + ${displayProjects.length * 48}vh)` }}
    >
      {/* Visual Ambient Backdrops */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-[550px] w-[550px] rounded-full bg-cyan-500/12 blur-[140px]" />
        <div className="absolute -right-32 top-2/3 h-[600px] w-[600px] rounded-full bg-purple-600/12 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-blue-900/10 blur-[180px]" />
        
        {/* Subtle Tech Grid Accent */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Pinned Sticky Viewport */}
      <div 
        onWheel={handleWheel}
        className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 md:py-6 overflow-hidden z-10 select-none"
      >
        {/* Top HUD Header */}
        <div className="w-full px-6 md:px-12 lg:px-20 z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-zinc-500 font-bold">02.</span>
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  // SELECTED WORK & ARCHITECTURES
                </span>
              </div>
              <h2 className="font-space-grotesk text-2xl md:text-4xl font-black text-white">
                Featured{" "}
                <span className="animate-gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  Systems & Works
                </span>
              </h2>
            </div>

            {/* Filter Tabs & Navigation Controls */}
            <div className="flex items-center flex-wrap gap-3">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800">
                {(
                  [
                    { key: "all", label: "All Works", count: PROJECTS.length },
                    { key: "completed", label: "Production", count: PROJECTS.filter((p) => p.status === "completed").length },
                    { key: "lab", label: "The Lab", count: PROJECTS.filter((p) => p.status !== "completed").length },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-3 py-1 rounded-lg font-space-grotesk text-xs font-semibold transition-all ${
                      activeTab === tab.key
                        ? "bg-zinc-800 text-cyan-300 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-1.5 font-mono text-[10px] text-zinc-400 opacity-70">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Progress counter & mini bar */}
              <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs">
                <span className="text-zinc-400">
                  <span className="text-white font-bold">
                    {String(Math.min(displayProjects.length, currentCardIndex + 1)).padStart(2, "0")}
                  </span>
                  {" / "}
                  <span className="text-zinc-600">
                    {String(displayProjects.length).padStart(2, "0")}
                  </span>
                </span>
                <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    style={{ width: progressPercent }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                  />
                </div>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Previous Project"
                  onClick={() => scrollToProject(Math.max(0, currentCardIndex - 1))}
                  disabled={currentCardIndex === 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  title="Next Project"
                  onClick={() => scrollToProject(Math.min(displayProjects.length, currentCardIndex + 1))}
                  disabled={currentCardIndex >= displayProjects.length}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-400 hover:text-white hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Cards Track */}
        <div className="w-full flex-1 flex items-center overflow-visible my-auto py-2">
          <motion.div
            ref={trackRef}
            style={{ x, willChange: "transform", transform: "translateZ(0)" }}
            className="flex gap-6 md:gap-8 items-center pl-6 md:pl-16 lg:pl-24 pr-12 md:pr-24"
          >
            {displayProjects.map((project, idx) => (
              <HorizontalProjectCard
                key={project.id}
                project={project}
                index={idx}
                total={displayProjects.length}
                onSelect={handleSelectProject}
              />
            ))}

            {/* End of Track Showcase Card */}
            <EndTrackCard total={displayProjects.length} />
          </motion.div>
        </div>

        {/* Bottom Navigation & Scroll Indicator HUD */}
        <div className="w-full px-6 md:px-12 lg:px-20 z-20">
          <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
            {/* Left status telemetry */}
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-zinc-500">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>SCROLL INTERFACE ACTIVE // {displayProjects.length} PIPELINES</span>
            </div>

            {/* Center dots navigation */}
            <div className="flex items-center gap-1.5 mx-auto md:mx-0">
              {displayProjects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  title={`Jump to ${p.title}`}
                  onClick={() => scrollToProject(i)}
                  className={`h-1.5 transition-all rounded-full ${
                    currentCardIndex === i
                      ? "w-6 bg-gradient-to-r from-cyan-400 to-purple-400"
                      : "w-1.5 bg-zinc-800 hover:bg-zinc-600"
                  }`}
                />
              ))}
              <button
                type="button"
                title="Jump to The Lab"
                onClick={() => scrollToProject(displayProjects.length)}
                className={`h-1.5 transition-all rounded-full ${
                  currentCardIndex === displayProjects.length
                    ? "w-6 bg-cyan-400"
                    : "w-1.5 bg-zinc-800 hover:bg-zinc-600"
                }`}
              />
            </div>

            {/* Right Scroll hint */}
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
              <span className="hidden sm:inline">VERTICAL SCROLL CONTROLS HORIZONTAL TRACK</span>
              <span className="text-cyan-400 font-bold">⇄</span>
            </div>
          </div>
        </div>
      </div>

      {/* Case study modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

