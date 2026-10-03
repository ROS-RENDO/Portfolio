"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { 
  FiCode, 
  FiDatabase, 
  FiCpu, 
  FiTrendingUp, 
  FiMapPin, 
  FiLayers,
  FiZap
} from "react-icons/fi";

interface CloudData {
  id: number;
  position: [number, number, number];
  speed: number;
  opacity: number;
  color: string;
  scale: [number, number, number];
}

export const MILESTONES = [
  {
    year: "2024",
    title: "First Steps into Code",
    subtitle: "The Coding Spark",
    content: "Began the journey by mastering the building blocks of the web. Built HTML structures, styled pages with CSS, and programmed logic gates in JavaScript.",
    dir: 0, 
    t: 0.17, 
    y: 0,
    icon: FiCode,
    theme: "gold", 
    internalTheme: "gold", 
    tech: ["HTML5", "CSS3", "ES6 JS", "Git"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-3 font-mono text-[10px] text-zinc-400 space-y-1 select-none shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
          <div className="flex space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500/80"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/80"></div>
          </div>
          <span className="text-[9px] text-zinc-500">index.html</span>
        </div>
        <div className="text-zinc-500">&lt;!DOCTYPE html&gt;</div>
        <div>&lt;<span className="text-amber-500">html</span> lang=&quot;en&quot;&gt;</div>
        <div className="pl-3">&lt;<span className="text-amber-500">body</span>&gt;</div>
        <div className="pl-6 text-zinc-200">&lt;<span className="text-amber-400 font-bold">h1</span>&gt;Hello World&lt;/<span className="text-amber-400 font-bold">h1</span>&gt;</div>
        <div className="pl-3">&lt;/<span className="text-amber-500">body</span>&gt;</div>
      </div>
    )
  },
  {
    year: "Early 2025",
    title: "Full-Stack Development",
    subtitle: "Server & Databases",
    content: "Expanded skills into full-stack development. Built backend APIs, optimized databases, managed state in React/Next.js, and implemented secure token authentication.",
    dir: -1, 
    t: 0.43,
    y: -0.4,
    icon: FiDatabase,
    theme: "gold",
    internalTheme: "gold",
    tech: ["React", "Next.js", "Node.js", "Express", "PostgreSQL", "Prisma"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-3 font-mono text-[10px] text-zinc-400 space-y-1 select-none shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
          <div className="flex items-center space-x-2 text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-500">API Server Running</span>
          </div>
          <span className="text-[9px] text-amber-500 font-bold">GET /api/v1/users</span>
        </div>
        <div className="text-emerald-500 font-semibold">[200 OK] <span className="text-zinc-500 font-normal">- 42ms</span></div>
        <div className="text-zinc-500">{`{`}</div>
        <div className="pl-3"><span className="text-amber-400">&quot;status&quot;</span>: <span className="text-zinc-350">&quot;success&quot;</span></div>
        <div className="text-zinc-500">{`}`}</div>
      </div>
    )
  },
  {
    year: "Mid 2025",
    title: "Vibe Trading Systems",
    subtitle: "Quantitative Automations",
    content: "Integrated MetaTrader 5 APIs with Python scripts to automate trading strategies. Programmed custom indicators, executed backtests, and implemented real-time risk trackers.",
    dir: 1, 
    t: 0.43,
    y: 0.4,
    icon: FiTrendingUp,
    theme: "gold",
    internalTheme: "gold",
    tech: ["Python", "MQL5", "MetaTrader 5", "NumPy", "Pandas"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-3 font-mono text-[10px] text-zinc-400 space-y-3 select-none shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
          <span className="text-[9px] text-zinc-400 font-bold">XAUUSD [M15]</span>
          <span className="text-[9px] text-emerald-500 font-bold">+1.24% today</span>
        </div>
        <div className="flex justify-around items-end h-12 pt-2 relative">
          <div className="absolute left-0 right-0 top-1/2 h-[1px] border-t border-dashed border-zinc-850"></div>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-3 bg-red-500"></div>
            <div className="w-2 h-5 bg-red-500/80 rounded-sm"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-2 bg-emerald-500"></div>
            <div className="w-2 h-7 bg-emerald-500/80 rounded-sm"></div>
            <span className="text-[6px] text-emerald-500 font-bold mt-1 absolute -bottom-3">BUY</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-3 bg-red-500"></div>
            <div className="w-2 h-4 bg-red-500/80 rounded-sm"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    year: "Early 2026",
    title: "AI & Computer Vision",
    subtitle: "Detection Pipelines",
    content: "Trained custom object detection models and built low-latency inference pipelines. Deployed YOLO engines via FastAPI endpoints and optimized runtime speeds.",
    dir: -1, 
    t: 0.63,
    y: -0.4,
    icon: FiCpu,
    theme: "gold",
    internalTheme: "gold",
    tech: ["Python", "YOLOv8", "OpenCV", "FastAPI", "PyTorch", "Docker"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-2 font-mono text-[9px] text-zinc-400 select-none relative overflow-hidden h-24 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,10,0.5)_100%)] z-10"></div>
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-500/50"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-500/50"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-500/50"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-500/50"></div>
        
        <div className="absolute top-5 left-6 w-14 h-10 border border-emerald-500/80 bg-emerald-500/10 flex items-start z-0">
          <span className="bg-emerald-500/80 text-white px-1 py-0.5 text-[5px] font-bold">person: 98%</span>
        </div>
        
        <div className="absolute bottom-2 left-2 text-[6px] text-amber-500 font-bold z-20">
          CAM01 // DEEP_YOLO
        </div>
      </div>
    )
  },
  {
    year: "Mid 2026",
    title: "ServiceFinder Platform",
    subtitle: "Flagship Marketplace App",
    content: "Engineered a complex multi-party marketplace. Designed provider tracking, Stripe Escrow, and containerized architectures.",
    dir: 1, 
    t: 0.63,
    y: 0.4,
    icon: FiMapPin,
    theme: "gold",
    internalTheme: "gold",
    tech: ["Next.js", "NestJS", "Stripe", "PostgreSQL", "Docker", "Tailwind CSS v4"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-2 font-mono text-[9px] text-zinc-400 select-none relative overflow-hidden h-24 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
          <span className="text-amber-500 font-bold">DISPATCH BOARD</span>
          <span className="text-emerald-500 text-[8px] animate-pulse">● Live Map</span>
        </div>
        
        <div className="relative flex-1 bg-zinc-950/40 rounded border border-zinc-850 my-1 overflow-hidden">
          <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-amber-500 border border-white animate-ping"></div>
          <div className="absolute top-3 left-6 w-1.5 h-1.5 rounded-full bg-amber-500 border border-white"></div>
          <div className="absolute bottom-3 right-8 w-1.5 h-1.5 rounded-full bg-purple-500 border border-white"></div>
          <span className="absolute bottom-1 left-1.5 text-[6px] text-zinc-600">Tracking active</span>
        </div>
      </div>
    )
  },
  {
    year: "Late 2026",
    title: "Distributed Scale",
    subtitle: "Future-Proof Architecture",
    content: "Developed distributed backends, streaming messaging layers, and caching strategies. Designing high-availability microservices ready for production-level traffic.",
    dir: 0, 
    t: 0.78,
    y: 0,
    icon: FiLayers,
    theme: "gold",
    internalTheme: "gold",
    tech: ["Go", "Kubernetes", "Redis", "RabbitMQ", "AWS", "Docker"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-2.5 font-mono text-[9px] text-zinc-400 select-none relative overflow-hidden h-24 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
          <span className="text-amber-500 font-bold">SYSTEM MAP</span>
          <span className="text-emerald-500 font-semibold">HEALTHY</span>
        </div>
        <div className="flex justify-around items-center flex-1 py-1 text-[7px] font-sans">
          <div className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-amber-500 font-mono">Gateway</div>
          <div className="text-zinc-600">&rarr;</div>
          <div className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-purple-400 font-mono">Redis</div>
          <div className="text-zinc-600">&rarr;</div>
          <div className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-500 font-mono">Queue</div>
        </div>
      </div>
    )
  },
  {
    year: "2027 & Beyond",
    title: "Next Frontier: Autonomous Systems",
    subtitle: "Agentic Architectures",
    content: "Exploring the boundary of artificial intelligence, multi-agent frameworks, and high-performance edge compute. Integrating large language models with real-time feedback loops to build autonomous pipelines.",
    dir: 0, 
    t: 0.94,
    y: 0,
    icon: FiZap,
    theme: "gold",
    internalTheme: "gold",
    tech: ["LangChain", "Autogen", "Python", "Rust", "WebAssembly", "gRPC"],
    visual: (
      <div className="w-full bg-zinc-900/60 rounded-lg border border-zinc-800 p-2.5 font-mono text-[9px] text-zinc-400 select-none relative overflow-hidden h-24 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-1">
          <span className="text-amber-500 font-bold">AGENT_LOOP</span>
          <span className="text-emerald-500 font-semibold animate-pulse">● Thinking</span>
        </div>
        <div className="text-[7px] text-zinc-500 space-y-1 py-1">
          <div>[USER]: Build autonomous microservice pipeline.</div>
          <div className="text-amber-500/80 font-bold">[AGENT]: Reasoning: spawn child worker nodes.</div>
        </div>
      </div>
    )
  }
];

// Define spline curve coordinates globally (Units scaled by 100, total length is ~ 69 units)
const splinePoints = [
  new THREE.Vector3(0, 0, 0),         
  new THREE.Vector3(0, 0, -6),        
  new THREE.Vector3(0, 0, -12),       
  new THREE.Vector3(1.5, 0, -13.5),   
  new THREE.Vector3(5, 0, -14),       
  new THREE.Vector3(16, 0, -14),      
  new THREE.Vector3(30, 0, -14),      
  new THREE.Vector3(40, 0, -14),      
  new THREE.Vector3(41.5, 0, -15.5),  
  new THREE.Vector3(42, 0, -19),      
  new THREE.Vector3(42, 0, -28),      
];
const splineCurve = new THREE.CatmullRomCurve3(splinePoints, false, "centripetal", 0.5);

// Component to handle R3F camera animation along the spline curve
function CameraController({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const progress = progressRef.current;
    
    let t = 0;
    if (progress > 0.16 && progress < 0.92) {
      t = (progress - 0.16) / 0.76;
    } else if (progress >= 0.92) {
      t = 1;
    }
    t = Math.max(0, Math.min(1, t));

    const pos = splineCurve.getPointAt(t);
    
    let lookTarget: THREE.Vector3;
    if (t < 0.99) {
      const tangent = splineCurve.getTangentAt(t).normalize();
      lookTarget = pos.clone().add(tangent);
    } else {
      lookTarget = new THREE.Vector3(42, 0.2, -38);
    }

    state.camera.position.set(pos.x, pos.y + 0.15, pos.z);
    state.camera.lookAt(lookTarget);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

// Glowing pulses running along the spline track
function PathPulses() {
  const segmentCount = 5;
  const ref0 = useRef<THREE.Group>(null);
  const ref1 = useRef<THREE.Group>(null);
  const ref2 = useRef<THREE.Group>(null);
  const ref3 = useRef<THREE.Group>(null);
  const ref4 = useRef<THREE.Group>(null);
  const refs = [ref0, ref1, ref2, ref3, ref4];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    refs.forEach((ref, idx) => {
      if (!ref.current) return;
      // Fast pacing loop (travels full track in ~ 4 seconds)
      const progress = ((time * 0.24) + (idx / segmentCount)) % 1.0;
      const point = splineCurve.getPointAt(progress);
      ref.current.position.copy(point);
    });
  });

  return (
    <>
      {refs.map((ref, idx) => (
        <group key={idx} ref={ref}>
          <mesh>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshBasicMaterial color="#fbbf24" opacity={0.45} transparent />
          </mesh>
          <pointLight intensity={6.0} distance={5.5} color="#fbbf24" />
        </group>
      ))}
    </>
  );
}



// Projected 3D Milestone Card using Drei's HTML portal wrapper
function ThreeDCard({ 
  milestone, 
  progressRef, 
  slideDistance 
}: { 
  milestone: typeof MILESTONES[0]; 
  progressRef: React.MutableRefObject<number>;
  slideDistance: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = milestone.icon;
  const isBigHorizontal = milestone.dir === 0;

  const P = splineCurve.getPointAt(milestone.t);
  const T = splineCurve.getTangentAt(milestone.t);
  const N = new THREE.Vector3(-T.z, 0, T.x).normalize(); 

  const targetOffset = milestone.dir * slideDistance;

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;

    const progress = progressRef.current;
    let t_cam = 0;
    if (progress > 0.16 && progress < 0.92) {
      t_cam = (progress - 0.16) / 0.76;
    } else if (progress >= 0.92) {
      t_cam = 1;
    }
    t_cam = Math.max(0, Math.min(1, t_cam));

    const currentCamPos = splineCurve.getPointAt(t_cam);
    const dist = (t_cam - milestone.t) * 69;

    let currentOffset = 0;
    if (milestone.t >= 0.20 && milestone.t < 0.75) {
      if (dist < -14) {
        currentOffset = 0;
      } else if (dist > -8.5) {
        currentOffset = targetOffset;
      } else {
        const pct = (dist - (-14)) / 5.5; 
        currentOffset = pct * targetOffset;
      }
    }

    let currentYOffset = 0;
    const distToCam = currentCamPos.distanceTo(groupRef.current?.position || P);

    if (isBigHorizontal) {
      if (distToCam > 12) {
        currentYOffset = -1.5; 
      } else if (distToCam > 3.0) {
        const pct = (12 - distToCam) / 9.0;
        currentYOffset = -1.5 + pct * 1.5;
      } else {
        currentYOffset = 0;
      }
    }

    groupRef.current.position.copy(P).addScaledVector(N, currentOffset);
    groupRef.current.position.y = P.y + currentYOffset;

    const targetCamHeight = currentCamPos.clone();
    targetCamHeight.y = P.y; 
    groupRef.current.lookAt(targetCamHeight);

    let currentOpacity = 0;
    let currentScale = 0.85;
    let currentBlur = 8;

    const isMobile = slideDistance === 0;
    const desktopBase = isBigHorizontal ? 0.72 : 0.85; 
    const targetBaseScale = isMobile ? 0.65 : desktopBase; 

    let currentScreenScale = targetBaseScale;

    if (distToCam > 18) {
      currentOpacity = 0;
      currentScreenScale = 0.5;
      currentBlur = 8;
    } else if (distToCam > 11) {
      const pct = (18 - distToCam) / 7;
      currentOpacity = pct;
      currentScreenScale = 0.5 + pct * (targetBaseScale - 0.5);
      currentBlur = 8 - pct * 8;
    } else if (distToCam > 2.2) {
      currentOpacity = 1.0;
      currentScreenScale = targetBaseScale;
      currentBlur = 0;
    } else if (distToCam > 0.5) {
      const pct = (2.2 - distToCam) / 1.7;
      currentOpacity = 1.0 - pct;
      currentScreenScale = targetBaseScale + pct * 0.15;
      currentBlur = pct * 8;
    } else {
      currentOpacity = 0;
    }

    if (milestone.t < 0.20) {
      if (t_cam < 0.05) {
        currentOpacity = 0;
        currentScreenScale = 0.4;
        currentBlur = 8;
      } else if (t_cam < 0.12) {
        const factor = (t_cam - 0.05) / 0.07;
        currentOpacity = currentOpacity * factor;
        currentScreenScale = 0.4 + factor * (targetBaseScale - 0.4);
        currentBlur = 8 - factor * 8;
      }
    }

    currentScale = currentScreenScale * (distToCam / 10);

    if (cardRef.current) {
      cardRef.current.style.opacity = `${currentOpacity}`;
      cardRef.current.style.filter = `blur(${currentBlur}px)`;
      cardRef.current.style.transform = `scale(${currentScale})`;
      cardRef.current.style.pointerEvents = currentOpacity > 0.1 ? "auto" : "none";
    }
  });

  return (
    <group ref={groupRef} position={P} name={`card-${milestone.year}`}>
      <Html transform distanceFactor={10}>
        <div 
          ref={cardRef}
          style={{
            opacity: 0,
            filter: "blur(8px)",
            transform: "scale(0.85)",
            pointerEvents: "none",
            transition: "filter 0.05s linear",
          }}
          className={`border-lightning-outer theme-lightning-gold p-[1.5px] rounded-2xl transition-all duration-300 relative group
            ${isBigHorizontal ? "w-[340px] md:w-[700px]" : "w-[340px] md:w-[380px]"}`}
        >
          {/* Inner card container - premium dark glass with warm/golden details */}
          <div className="w-full h-full rounded-[14px] p-6 backdrop-blur-xl bg-zinc-950/80 border border-zinc-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.6)] select-none text-zinc-300">
            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 mb-3 tracking-widest border-b border-zinc-900 pb-2">
              <span>SYS_STATUS: ACTIVE_NODE</span>
              <span>COORD: [{(P.x).toFixed(1)}, {milestone.y.toFixed(1)}, {(P.z).toFixed(1)}]</span>
            </div>

            <div className={isBigHorizontal ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-400 shadow-[0_4px_12px_rgba(234,179,8,0.1)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-space-grotesk text-sm font-bold tracking-wider px-3 py-1 rounded-full border border-amber-500/25 text-amber-400 bg-amber-500/5">
                    {milestone.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-space-grotesk text-xl md:text-2xl font-black text-white mb-1 group-hover:text-amber-400 transition-colors leading-none">
                    {milestone.title}
                  </h3>
                  <h4 className="text-[11px] font-mono text-amber-500 font-bold uppercase tracking-wide">
                    {milestone.subtitle}
                  </h4>
                </div>

                <p className="text-zinc-400 font-medium text-xs leading-relaxed group-hover:text-zinc-200 transition-colors">
                  {milestone.content}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {milestone.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="text-[9px] font-mono px-2 py-0.5 rounded border bg-amber-500/5 text-amber-400/90 border-amber-500/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                {milestone.visual}
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

// ─── 3D Heavenly Gates Model ─────────────────────────────────────────────────
// ─── 3D Cyber Guardian / Explorer Character at Heavenly Gates ──────────────
function CyberGuardianFigure() {
  const figureRef = useRef<THREE.Group>(null);
  const staffLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (figureRef.current) {
      figureRef.current.position.y = Math.sin(t * 2) * 0.05;
      figureRef.current.rotation.y = Math.sin(t * 1) * 0.08;
    }
    if (staffLightRef.current) {
      staffLightRef.current.intensity = 2.5 + Math.sin(t * 3.5) * 1.0;
    }
  });

  return (
    <group ref={figureRef} scale={[0.85, 0.85, 0.85]}>
      {/* Head with glowing cyan visor */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Glowing Visor */}
      <mesh position={[0, 0.86, 0.16]}>
        <boxGeometry args={[0.22, 0.09, 0.12]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={3.0} />
      </mesh>

      {/* Torso & Armor */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.36, 0.48, 0.24]} />
        <meshStandardMaterial color="#27272a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Golden Chest Core */}
      <mesh position={[0, 0.52, 0.13]}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3.0} />
      </mesh>

      {/* Left Arm & Staff of Code */}
      <group position={[-0.26, 0.45, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.38, 12]} />
          <meshStandardMaterial color="#18181b" metalness={0.8} />
        </mesh>
        {/* Glowing Golden Staff */}
        <mesh position={[-0.08, 0.1, 0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 1.3, 12]} />
          <meshStandardMaterial color="#fbbf24" emissive="#d97706" emissiveIntensity={2.0} metalness={0.9} />
        </mesh>
        <mesh position={[-0.08, 0.75, 0.1]}>
          <octahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3.5} />
        </mesh>
        <pointLight ref={staffLightRef} position={[-0.08, 0.75, 0.1]} intensity={2.5} distance={5} color="#38bdf8" />
      </group>

      {/* Right Arm */}
      <group position={[0.26, 0.45, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.38, 12]} />
          <meshStandardMaterial color="#18181b" metalness={0.8} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.1, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.16]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.16]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} />
      </mesh>

      {/* Floating Hologram Halo above Head */}
      <mesh position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.015, 12, 32]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2.5} />
      </mesh>
    </group>
  );
}

// ─── 3D Heavenly Gates Model ─────────────────────────────────────────────────
function HeavenlyGates() {
  const gatesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gatesRef.current) {
      const rays = gatesRef.current.getObjectByName("sunRays");
      if (rays) {
        rays.rotation.z = state.clock.getElapsedTime() * 0.05;
      }
    }
  });

  return (
    <group ref={gatesRef} position={[42, -0.5, -32]}>
      {/* 1. Obsidian Stairs leading up */}
      {[0, 1, 2, 3, 4, 5].map((step) => (
        <mesh key={step} position={[0, step * 0.15 - 0.2, step * -0.3 + 2]}>
          <boxGeometry args={[6 - step * 0.4, 0.16, 0.6]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
      ))}

      {/* 2. Left Column */}
      <group position={[-2.2, 1.5, 0]}>
        <mesh position={[0, -1.4, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.5]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 2.8, 16]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <torusGeometry args={[0.22, 0.04, 8, 24]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <torusGeometry args={[0.24, 0.04, 8, 24]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
      </group>

      {/* 3. Right Column */}
      <group position={[2.2, 1.5, 0]}>
        <mesh position={[0, -1.4, 0]}>
          <boxGeometry args={[0.5, 0.3, 0.5]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.22, 2.8, 16]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <torusGeometry args={[0.22, 0.04, 8, 24]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, -1.2, 0]}>
          <torusGeometry args={[0.24, 0.04, 8, 24]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[0.5, 0.2, 0.5]} />
          <meshStandardMaterial color="#27272a" roughness={0.2} metalness={0.4} />
        </mesh>
      </group>

      {/* 4. Golden Arch Beam */}
      <mesh position={[0, 2.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 4.4, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* 5. Left Gate Door (rotated open) */}
      <group position={[-2.0, 1.4, 0]} rotation={[0, Math.PI / 3, 0]}>
        <mesh position={[1.0, 0, 0]}>
          <boxGeometry args={[2.0, 2.4, 0.04]} />
          <meshStandardMaterial color="#d97706" roughness={0.1} metalness={0.95} transparent opacity={0.8} />
        </mesh>
        <mesh position={[1.0, 0, 0]}>
          <boxGeometry args={[1.8, 2.2, 0.06]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} wireframe />
        </mesh>
      </group>

      {/* 6. Right Gate Door (rotated open) */}
      <group position={[2.0, 1.4, 0]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh position={[-1.0, 0, 0]}>
          <boxGeometry args={[2.0, 2.4, 0.04]} />
          <meshStandardMaterial color="#d97706" roughness={0.1} metalness={0.95} transparent opacity={0.8} />
        </mesh>
        <mesh position={[-1.0, 0, 0]}>
          <boxGeometry args={[1.8, 2.2, 0.06]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.1} metalness={0.95} wireframe />
        </mesh>
      </group>

      {/* 7. 3D Cyber Guardian standing atop the stairs at the portal */}
      <group position={[0, 0.72, 0.4]}>
        <CyberGuardianFigure />
      </group>

      {/* 8. Volumetric Sun behind the gates */}
      <group position={[0, 2.2, -4.5]}>
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial color="#fffbeb" />
        </mesh>
        <pointLight intensity={10.0} distance={35} color="#fffdf5" />
        
        {/* Volumetric Sun Rays - Cone spread shooting outwards */}
        <group name="sunRays">
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 18;
            const tilt = 0.2 + (i % 3) * 0.1;
            return (
              <mesh key={i} position={[0, 0, 0]} rotation={[tilt, 0, angle]}>
                <cylinderGeometry args={[0.01, 3.8, 30, 8]} />
                <meshBasicMaterial color="#fff0d0" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}

// ─── Dynamic Atmosphere (Syncs Three.js Fog & Lighting with Scroll Background Fade) ─
function DynamicAtmosphere({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { scene } = useThree();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Pre-allocated colors to avoid GC pauses during scroll
  const skyFog = React.useMemo(() => new THREE.Color("#f0e9f7"), []);
  const darkFog = React.useMemo(() => new THREE.Color("#070b24"), []); // Rich cosmic navy instead of flat black
  const currentFog = React.useMemo(() => new THREE.Color("#f0e9f7"), []);

  const skyAmbient = React.useMemo(() => new THREE.Color("#e6e9fc"), []);
  const darkAmbient = React.useMemo(() => new THREE.Color("#38bdf8"), []); // Luminous cyan ambient in space
  const currentAmbient = React.useMemo(() => new THREE.Color("#e6e9fc"), []);

  useFrame(() => {
    const progress = progressRef.current;
    
    // Smooth factor between 0.32 and 0.72 (matches Surprise3DSection scrollBlackOpacity)
    let factor = 0;
    if (progress > 0.32 && progress < 0.72) {
      factor = (progress - 0.32) / (0.72 - 0.32);
    } else if (progress >= 0.72) {
      factor = 1;
    }

    // Blend fog color and depth distances
    currentFog.lerpColors(skyFog, darkFog, factor);
    if (scene.fog) {
      scene.fog.color.copy(currentFog);
      if (scene.fog instanceof THREE.Fog) {
        scene.fog.near = 8 - 2 * factor; // 8 in sky -> 6 in dark
        scene.fog.far = 48 - 6 * factor; // 48 in sky -> 42 in dark
      }
    }

    // Blend ambient light
    if (ambientRef.current) {
      currentAmbient.lerpColors(skyAmbient, darkAmbient, factor);
      ambientRef.current.color.copy(currentAmbient);
      ambientRef.current.intensity = 1.6 - 0.4 * factor; // 1.6 in sky -> 1.2 in space
    }

    // Blend directional light
    if (dirLightRef.current) {
      dirLightRef.current.intensity = 6.0 - 1.2 * factor; // 6.0 in sky -> 4.8 in space
    }
  });

  return (
    <>
      <fog attach="fog" args={["#f0e9f7", 8, 48]} />
      <ambientLight ref={ambientRef} intensity={1.6} color="#e6e9fc" />
      <directionalLight ref={dirLightRef} position={[42, 8, -38]} intensity={6.0} color="#ffe29d" />
    </>
  );
}

// ─── Cosmic Starfield (Twinkling star cluster in 3D depth) ───────────────────
function CosmicStarfield({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 140;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = -Math.random() * 85 - 5;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    // Fade in stars as scroll moves into cosmic space
    const progress = progressRef.current;
    const starOpacity = Math.max(0, Math.min(0.9, (progress - 0.28) * 2.2));
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (mat) {
      mat.opacity = starOpacity;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.7}
        color="#7dd3fc"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Dynamic Clouds (Morphs from Heavenly Sunset into Cosmic Nebulae) ─────────
function DynamicClouds({ 
  cloudsData, 
  progressRef 
}: { 
  cloudsData: CloudData[]; 
  progressRef: React.MutableRefObject<number>;
}) {
  const lightColor = React.useMemo(() => new THREE.Color("#ffffff"), []);
  const darkColor = React.useMemo(() => new THREE.Color("#1e1b4b"), []); // Cosmic indigo instead of flat gray
  const currentColor = React.useMemo(() => new THREE.Color("#ffffff"), []);

  const lightEmissive = React.useMemo(() => new THREE.Color("#e5b180"), []);
  const darkEmissive = React.useMemo(() => new THREE.Color("#0284c7"), []); // Luminous cosmic blue glow
  const currentEmissive = React.useMemo(() => new THREE.Color("#e5b180"), []);

  // Shared material for high performance batching
  const sharedMaterial = React.useMemo(() => new THREE.MeshStandardMaterial({
    color: "#ffffff",
    opacity: 0.65,
    transparent: true,
    roughness: 0.85,
    metalness: 0.1,
    emissive: "#e5b180",
    emissiveIntensity: 0.07,
  }), []);

  useEffect(() => {
    return () => {
      sharedMaterial.dispose();
    };
  }, [sharedMaterial]);

  useFrame(() => {
    const progress = progressRef.current;
    let factor = 0;
    if (progress > 0.32 && progress < 0.72) {
      factor = (progress - 0.32) / (0.72 - 0.32);
    } else if (progress >= 0.72) {
      factor = 1;
    }

    currentColor.lerpColors(lightColor, darkColor, factor);
    sharedMaterial.color.copy(currentColor);

    currentEmissive.lerpColors(lightEmissive, darkEmissive, factor);
    sharedMaterial.emissive.copy(currentEmissive);
    sharedMaterial.emissiveIntensity = 0.07 + 0.35 * factor; // Glows brightly in space!

    sharedMaterial.opacity = 0.65 - 0.15 * factor; // 0.65 -> 0.50
  });

  return (
    <group>
      {cloudsData.map((c) => (
        <mesh 
          key={c.id} 
          position={c.position} 
          scale={c.scale}
          material={sharedMaterial}
        >
          <sphereGeometry args={[2.2, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}

export default function SurpriseCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const [slideDistance, setSlideDistance] = useState(5.5); 
  const [cloudsData, setCloudsData] = useState<CloudData[]>([]);

  const progressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      progressRef.current = latest;
    });

    // Populate static cloud coordinate parameters - Clustered heavily around final gates
    const generated: CloudData[] = Array.from({ length: 45 }).map((_, i) => {
      const isNearEnd = i > 25;
      const x = isNearEnd ? 42 + (Math.random() - 0.5) * 20 : (Math.random() - 0.5) * 120;
      const y = isNearEnd ? -1.0 + (Math.random() - 0.5) * 3 : (Math.random() - 0.5) * 25 - 5;
      const z = isNearEnd ? -28 + (Math.random() - 0.5) * 18 : -Math.random() * 60 - 5;

      return {
        id: i,
        position: [x, y, z],
        speed: Math.random() * 0.05 + 0.02,
        opacity: Math.random() * 0.3 + 0.2,
        color: Math.random() > 0.65 ? "#fffbeb" : "#ffffff", 
        scale: [
          Math.random() * 3 + 3,
          Math.random() * 2 + 2,
          Math.random() * 3 + 3
        ],
      };
    });
    setCloudsData(generated);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlideDistance(0);
      } else {
        setSlideDistance(5.5); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [scrollProgress]);

  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 0], fov: 60, near: 1, far: 1000 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        {/* Dynamic Atmosphere syncs fog and key lights to the scroll progress */}
        <DynamicAtmosphere progressRef={progressRef} />

        {/* Dynamic point lights positioned along the journey */}
        <pointLight position={[0, 0, -10]} intensity={2.0} distance={20} color="#fbcfe8" />
        <pointLight position={[20, 0, -14]} intensity={2.8} distance={20} color="#fef08a" />
        <pointLight position={[40, 2, -28]} intensity={7.0} distance={30} color="#ffbe3b" />

        {/* Dynamic clouds that shift with the sky-to-dark transition */}
        <DynamicClouds cloudsData={cloudsData} progressRef={progressRef} />

        {/* 3D Cosmic Starfield that illuminates deep space */}
        <CosmicStarfield progressRef={progressRef} />

        {/* Main Golden Spline Curve Track (Rendered as glowing golden energy line) */}
        <mesh>
          <tubeGeometry args={[splineCurve, 100, 0.09, 8, false]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            emissive="#fbbf24" 
            emissiveIntensity={2.2} 
            roughness={0.1} 
            metalness={0.9} 
          />
        </mesh>


        {/* Traveling lightning/pulse animation running down the pipeline track */}
        <PathPulses />

        {/* 3D Heavenly Gates Model at the end of the timeline */}
        <HeavenlyGates />

        {/* R3F Camera controller mapping scroll progress to spline */}
        <CameraController progressRef={progressRef} />

        {/* Projected Milestone Cards */}
        {MILESTONES.map((milestone, idx) => (
          <ThreeDCard 
            key={idx}
            milestone={milestone}
            progressRef={progressRef}
            slideDistance={slideDistance}
          />
        ))}
      </Canvas>
    </div>
  );
}
