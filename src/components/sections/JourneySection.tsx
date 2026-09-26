"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FiBriefcase, FiCompass, FiCheck } from "react-icons/fi";

const TIMELINE = [
  {
    year: "2024",
    title: "The Coding Spark",
    company: "Self Taught — Web Foundations",
    description: "Began the engineering journey by mastering web fundamentals. Built HTML structures, designed responsive CSS layouts, and implemented logic flows using vanilla JavaScript. Created first version-controlled repositories on GitHub.",
    skills: ["HTML5", "CSS3", "ES6 JavaScript", "Git"],
  },
  {
    year: "Early 2025",
    title: "Full-Stack Development",
    company: "Product Engineering",
    description: "Expanded into full-stack development. Built RESTful backend APIs with Express and Node.js, optimized relational databases, managed React application state with hooks, and implemented secure JWT token authentication flows.",
    skills: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma"],
  },
  {
    year: "Mid 2025",
    title: "Quantitative Trading Systems",
    company: "Vibe Trading Automation",
    description: "Integrated MetaTrader 5 APIs with Python automation scripts to fetch live market feeds and execute automated trades. Developed custom MQL5 indicators and executed historical backtests across XAUUSD, EURUSD pairs.",
    skills: ["Python", "MQL5", "MetaTrader 5", "NumPy", "Pandas"],
  },
  {
    year: "Early 2026",
    title: "AI & Computer Vision",
    company: "Deep Learning Engineering",
    description: "Trained custom object detection models with YOLOv8 and deployed low-latency inference pipelines via FastAPI endpoints. Optimized model quantization for edge-device deployment and integrated real-time OpenCV video processing.",
    skills: ["Python", "YOLOv8", "OpenCV", "FastAPI", "PyTorch", "Docker"],
  },
  {
    year: "Mid 2026",
    title: "ServiceFinder Platform",
    company: "Flagship Full-Stack Product",
    description: "Engineered a complex multi-party service marketplace connecting customers with verified providers. Designed real-time provider tracking, Stripe Escrow payment sessions, and containerized microservice architectures on Railway and AWS.",
    skills: ["Next.js", "NestJS", "Stripe", "PostgreSQL", "Docker", "Tailwind v4"],
  },
  {
    year: "Late 2026",
    title: "Distributed Architecture & Scale",
    company: "Infrastructure Engineering",
    description: "Engineering distributed backend systems, streaming messaging layers, and caching strategies using Go, Redis, and RabbitMQ. Designing high-availability microservices ready for production-level traffic loads.",
    skills: ["Go", "Kubernetes", "Redis", "RabbitMQ", "AWS", "Docker"],
  },
  {
    year: "NOW →",
    title: "Next Frontier: Autonomous Systems",
    company: "Building the Future",
    description: "Exploring agentic AI architectures, multi-agent reasoning frameworks, and high-performance edge compute. Scroll past the contact section to enter the 3D timeline and experience this journey firsthand.",
    skills: ["LangChain", "Autogen", "Rust", "WebAssembly", "gRPC"],
  },
];

const EXPERIENCE = [
  {
    period: "2026",
    role: "Contract Software Engineer",
    scope: "Independent Client Projects",
    details: [
      "Engineered backend schemas, relational models, and transactional booking systems for local marketplaces.",
      "Configured automated linting, test verification pipelines, and build actions in GitHub CI/CD workflows.",
      "Dockerized backend microservices and deployed reverse proxy maps with Nginx on production servers."
    ]
  },
  {
    period: "2025",
    role: "Full-Stack Developer",
    scope: "Independent Product Iterations",
    details: [
      "Built AI-backed stack advisor parsing OpenAI parameters into Zod schemas for stateless shareable configurations.",
      "Designed quantitative margin exposure logs mapping real-time drawdowns to Discord webhooks.",
      "Integrated Mapbox API geographic query parameters to filter provider listings."
    ]
  },
  {
    period: "2024",
    role: "Independent Developer",
    scope: "Algorithms & Web Automation",
    details: [
      "Wrote Python scripts to scrape endpoints, automate daily workflows, and trigger Discord hooks.",
      "Practiced data structures, object-oriented concepts, and basic RESTful interface designs."
    ]
  }
];

export default function JourneySection() {
  const [activeTab, setActiveTab] = useState<"journey" | "experience">("journey");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-32" ref={containerRef}>
      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between gap-4 flex-wrap"
        >
          <div>
            <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
              <span className="text-zinc-600">04.</span> Growth &{" "}
              <span className="text-cyan-400 text-glow">Engagement</span>
            </h2>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          </div>

          {/* Toggle Tabs */}
          <div className="flex gap-2 bg-zinc-900/50 border border-zinc-800 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveTab("journey")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-space-grotesk text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "journey"
                  ? "bg-zinc-800 text-cyan-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <FiCompass size={14} /> Learning Timeline
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-space-grotesk text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === "experience"
                  ? "bg-zinc-800 text-cyan-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <FiBriefcase size={14} /> Work Experience
            </button>
          </div>
        </motion.div>

        {/* Tab views */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "journey" ? (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative mx-auto mt-16 max-w-4xl"
              >
                {/* Animated Neon Line */}
                <div className="absolute left-8 md:left-1/2 top-4 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2">
                  <motion.div
                    className="absolute left-0 top-0 w-full bg-cyan-400 origin-top shadow-[0_0_15px_#06b6d4]"
                    style={{ height: pathLength }}
                  />
                </div>

                <div className="space-y-12">
                  {TIMELINE.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                      <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                        {/* Timeline Dot */}
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-650 -translate-x-1/2 z-10">
                          <motion.div
                            whileInView={{ backgroundColor: "#06b6d4", scale: [1, 1.4, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="absolute inset-0 rounded-full"
                          />
                        </div>

                        {/* Desktop Layout */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6 }}
                          className={`hidden md:block w-1/2 pl-12 pr-12 ${isEven ? "text-right" : "ml-auto text-left"}`}
                        >
                          <div className="font-space-grotesk text-cyan-400 text-lg font-bold mb-0.5 tracking-widest">{item.year}</div>
                          <h3 className="text-xl font-bold text-white mb-0.5">{item.title}</h3>
                          <div className="text-xs font-mono text-zinc-500 mb-3">{item.company}</div>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                          <div className={`flex flex-wrap gap-1.5 ${isEven ? "justify-end" : "justify-start"}`}>
                            {item.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>

                        {/* Mobile Layout */}
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className="md:hidden w-full pl-16 pr-4 relative"
                        >
                          <div className="font-space-grotesk text-cyan-400 text-base font-bold mb-0.5">{item.year}</div>
                          <h3 className="text-lg font-bold text-white mb-0.5">{item.title}</h3>
                          <div className="text-xs font-mono text-zinc-500 mb-2">{item.company}</div>
                          <p className="text-xs text-zinc-400 leading-relaxed mb-3">{item.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.skills.map((skill, sIdx) => (
                              <span key={sIdx} className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto mt-12 space-y-6"
              >
                {EXPERIENCE.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative rounded-2xl border border-zinc-850 bg-[#18181b]/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
                      <div>
                        <h3 className="font-space-grotesk text-lg font-black text-white group-hover:text-cyan-400 transition-colors">{exp.role}</h3>
                        <p className="font-mono text-xs text-zinc-500">{exp.scope}</p>
                      </div>
                      <span className="font-space-grotesk text-sm font-bold tracking-wider px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-400 bg-cyan-500/5">
                        {exp.period}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {exp.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-3 text-xs text-zinc-400">
                          <FiCheck size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
