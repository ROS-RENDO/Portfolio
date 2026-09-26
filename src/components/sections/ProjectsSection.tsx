"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  FiGithub, FiExternalLink, FiX, FiZap, FiCheck, FiChevronRight,
  FiActivity, FiCpu, FiDatabase, FiAlertTriangle, FiGitCommit, FiLayers
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
function ProjectVisualPreview({ type, accent }: { type: string; accent: string }) {
  const getPreview = () => {
    switch (type) {
      case "map":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute left-[25%] top-[50%] -translate-y-1/2 flex items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-cyan-400/40 animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50,56 Q 100,20 150,56" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle r="3" fill="#a855f7" className="animate-pulse">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 50,56 Q 100,20 150,56" />
              </circle>
            </svg>
            <div className="absolute right-[25%] top-[50%] -translate-y-1/2 flex items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-purple-400/40 animate-ping" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-purple-400" />
            </div>
          </div>
        );
      case "chart":
        return (
          <div className="w-full h-full flex flex-col justify-end px-8 pb-3 pt-3">
            <div className="flex items-end justify-between h-16 w-full gap-1">
              {[
                { h: 20, up: true },
                { h: 35, up: true },
                { h: 18, up: false },
                { h: 48, up: true },
                { h: 28, up: false },
                { h: 42, up: true }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative">
                  <div className={`w-[1px] absolute top-1 bottom-1 ${bar.up ? "bg-emerald-500/30" : "bg-rose-500/30"}`} style={{ height: `${bar.h + 6}px` }} />
                  <motion.div
                    animate={{ height: [`${bar.h - 5}px`, `${bar.h + 5}px`, `${bar.h - 5}px`] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.3, ease: "easeInOut" }}
                    className={`w-full max-w-[6px] rounded-sm relative z-10 ${bar.up ? "bg-emerald-500/80 shadow-[0_0_6px_rgba(16,185,129,0.3)]" : "bg-rose-500/80 shadow-[0_0_6px_rgba(239,68,68,0.3)]"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case "nodes":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute h-7 w-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[8px] text-zinc-500 font-mono shadow-inner">
              AI
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="110" y1="56" x2="60" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="110" y1="56" x2="160" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="110" y1="56" x2="110" y2="85" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3" />
            </svg>
            <div className="absolute left-[20%] top-[25%] h-4 px-1 rounded-full border border-cyan-500/10 bg-cyan-500/5 text-[7px] font-mono text-cyan-400/80 flex items-center justify-center">React</div>
            <div className="absolute right-[20%] top-[25%] h-4 px-1 rounded-full border border-purple-500/10 bg-purple-500/5 text-[7px] font-mono text-purple-400/80 flex items-center justify-center">Node</div>
            <div className="absolute bottom-[20%] h-4 px-1 rounded-full border border-rose-500/10 bg-rose-500/5 text-[7px] font-mono text-rose-400/80 flex items-center justify-center">LLM</div>
            <span className="absolute h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
          </div>
        );
      case "yolo":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="border border-rose-500/50 bg-rose-500/5 rounded p-1 w-20 h-12 relative flex flex-col justify-between">
              <span className="absolute top-0 left-0 bg-rose-500/80 text-white font-mono text-[6px] px-1 py-0.5 leading-none rounded-br">Obj: 98%</span>
              <div className="w-full h-full flex items-center justify-center opacity-25">
                <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 14c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z" />
                </svg>
              </div>
            </div>
            <motion.div
              animate={{ top: ["15%", "85%", "15%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[1px] bg-rose-400 shadow-[0_0_6px_#f43f5e] z-10"
            />
          </div>
        );
      case "k8s":
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="w-7 h-9 rounded border border-zinc-800 bg-zinc-900/90 flex flex-col justify-between p-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-0.5 bg-zinc-700 rounded-sm" />
                    <div className="w-1 h-0.5 bg-zinc-700 rounded-sm" />
                  </div>
                  <div className="flex justify-end">
                    {idx === 2 ? (
                      <motion.span
                        animate={{ backgroundColor: ["#f59e0b", "#f43f5e", "#10b981"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="h-1 w-1 rounded-full"
                      />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>
                </div>
                <span className="font-mono text-[7px] text-zinc-600">N {idx+1}</span>
              </div>
            ))}
          </div>
        );
      case "house":
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-1.5 pt-1">
            <svg className="w-9 h-9 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <div className="w-1/2 h-1 bg-zinc-900 rounded-full border border-zinc-800 relative overflow-hidden">
              <motion.div
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-3 bg-sky-500 rounded-full"
              />
            </div>
          </div>
        );
      case "agents":
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="w-full h-full absolute inset-0">
              <polygon points="110,25 75,75 145,75" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </svg>
            <div className="absolute top-[18px] h-4 px-1 rounded border border-purple-500/10 bg-purple-500/5 text-[6px] font-mono text-purple-400">Planner</div>
            <div className="absolute left-[20%] bottom-[20%] h-4 px-1 rounded border border-fuchsia-500/10 bg-fuchsia-500/5 text-[6px] font-mono text-fuchsia-400">Coder</div>
            <div className="absolute right-[20%] bottom-[20%] h-4 px-1 rounded border border-cyan-500/10 bg-cyan-500/5 text-[6px] font-mono text-cyan-400">QA</div>
            <span className="absolute h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          </div>
        );
      case "waveform":
        return (
          <div className="w-full h-full flex items-center justify-center gap-1 px-12">
            {[1, 1.8, 1.4, 2.2, 1.2, 1.6, 2].map((speed, i) => (
              <motion.div
                key={i}
                animate={{ height: ["10%", "80%", "10%"] }}
                transition={{ repeat: Infinity, duration: speed, ease: "easeInOut" }}
                className="w-1 bg-indigo-500 rounded-full"
              />
            ))}
          </div>
        );
      case "path":
        return (
          <div className="relative w-full h-full flex items-center justify-center px-10">
            <div className="w-full h-0.5 bg-zinc-800 rounded-full relative">
              <div className="absolute left-0 right-1/2 h-full bg-lime-500" />
              {[0, 50, 100].map((left, idx) => (
                <div key={idx} className={`absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border flex items-center justify-center text-[6px] font-mono font-bold ${idx <= 1 ? "bg-lime-500 border-lime-400 text-black" : "bg-zinc-950 border-zinc-700 text-zinc-500"}`} style={{ left: `${left}%`, transform: "translate(-50%, -50%)" }}>
                  {idx+1}
                </div>
              ))}
            </div>
          </div>
        );
      case "calendar":
        return (
          <div className="relative w-full h-full flex items-center justify-center gap-3">
            <div className="grid grid-cols-3 gap-0.5 p-1 rounded border border-zinc-800 bg-zinc-900/60 w-16 h-10">
              {[0,1,2,3,4,5].map((idx) => (
                <div key={idx} className={`rounded-sm border border-zinc-900 flex items-center justify-center ${idx === 4 ? "bg-rose-500 border-rose-400 animate-pulse" : "bg-zinc-950"}`} />
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="h-1.5 w-8 bg-zinc-800 rounded-full" />
              <span className="h-1 w-6 bg-zinc-800 rounded-full" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-24 w-full bg-zinc-950/70 border-b border-zinc-900 overflow-hidden flex items-center justify-center">
      {/* Grid line backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px]" />
      {getPreview()}
    </div>
  );
}

// ─── Single project card ─────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const s = STATUS[project.status];
  const { rotateX, rotateY, handleMove, handleLeave } = useTilt();

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${project.glowColor}, transparent 70%)` }}
      />

      <div className="group relative rounded-2xl border border-zinc-800 bg-[#18181b]/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-zinc-600 h-full flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/4 to-transparent opacity-0 group-hover:opacity-100 animate-beam-scan" />
        </div>

        <div className={`h-1 w-full bg-gradient-to-r ${project.accent}`} />

        <ProjectVisualPreview type={project.previewType} accent={project.accent} />

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center gap-2 rounded-full border px-2 py-0.5 ${s.ring}`}>
                <span className="relative flex h-1.5 w-1.5">
                  {project.status !== "planned" && (
                    <span className={`absolute inline-flex h-full w-full rounded-full ${s.dot} animate-status-ping opacity-60`} />
                  )}
                  <span className={`relative h-1.5 w-1.5 rounded-full ${s.dot}`} />
                </span>
                <span className={`font-mono text-[9px] font-bold ${s.text}`}>{s.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-700">#{String(project.id).padStart(2,"0")}</span>
            </div>

            <h3 className="font-space-grotesk text-lg font-black text-white mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
              {project.title}
            </h3>
            <p className={`font-mono text-[10px] mb-2 bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>
              {project.tagline}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 5).map((t) => {
                const Icon = ICON[t] as any;
                return Icon ? (
                  <div key={t} title={t} className="flex h-6.5 w-6.5 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all">
                    <Icon size={12} />
                  </div>
                ) : (
                  <span key={t} className="rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500">{t}</span>
                );
              })}
              {project.tech.length > 5 && (
                <div className="flex h-6.5 items-center px-1.5 rounded-lg border border-zinc-800 bg-zinc-900 font-mono text-[9px] text-zinc-600">
                  +{project.tech.length - 5}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {project.metrics.slice(0,2).map((m, i) => (
                <div key={i} className="rounded-lg bg-zinc-900/80 border border-zinc-800 p-2">
                  <div className="font-space-grotesk text-xs font-black text-white">{m.value}</div>
                  <div className="font-mono text-[9px] text-zinc-600">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 group-hover:text-cyan-400 transition-colors">
              <span>View case study</span>
              <FiChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

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

// ─── Section tabs ─────────────────────────────────────────────────────────────
const TABS: { key: StatusKey | "all"; label: string; count: number }[] = [
  { key: "all",       label: "All",         count: PROJECTS.length },
  { key: "completed", label: "Completed",   count: PROJECTS.filter(p => p.status === "completed").length },
  { key: "progress",  label: "In Progress", count: PROJECTS.filter(p => p.status === "progress").length  },
  { key: "planned",   label: "Planned",     count: PROJECTS.filter(p => p.status === "planned").length   },
];

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<StatusKey | "all">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const selectedWork = PROJECTS.filter(p => p.status === "completed");
  const labExperiments = PROJECTS.filter(p => p.status !== "completed");

  const filteredSelected = activeTab === "all" ? selectedWork : selectedWork.filter(p => p.status === activeTab);
  const filteredLab = activeTab === "all" ? labExperiments : labExperiments.filter(p => p.status === activeTab);

  return (
    <section id="projects" className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-cyan-500/4 blur-[120px]" />
        <div className="absolute -right-40 top-3/4 h-96 w-96 rounded-full bg-purple-500/4 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs text-zinc-600">02.</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>
          <h2 className="font-space-grotesk text-4xl font-bold md:text-6xl">
            Selected{" "}
            <span className="animate-gradient-text bg-gradient-to-r from-cyan-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-lg text-xs font-mono">
            {selectedWork.length} production-grade codebases · {labExperiments.length} experiments in the Lab
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 rounded-full border px-4 py-2 font-space-grotesk text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                activeTab === tab.key ? "bg-cyan-500/20 text-cyan-300" : "bg-zinc-800 text-zinc-600"
              }`}>
                {tab.count}
              </span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-full border border-cyan-500/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ─── Grid 1: Selected Production Work ─── */}
        {filteredSelected.length > 0 && (
          <div className="mb-20">
            <p className="font-space-grotesk text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Production Systems</p>
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredSelected.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <ProjectCard
                      project={project}
                      index={i}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* ─── Grid 2: The Lab (Experiments) ─── */}
        {filteredLab.length > 0 && (
          <div className="border-t border-zinc-900 pt-16">
            <div className="mb-6">
              <h3 className="font-space-grotesk text-2xl font-black text-white">The Lab</h3>
              <p className="text-zinc-500 text-xs mt-1">Experiments, scripts, and in-progress microservices.</p>
            </div>
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredLab.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <ProjectCard
                      project={project}
                      index={i}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

      </div>

      {/* Case study modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}

