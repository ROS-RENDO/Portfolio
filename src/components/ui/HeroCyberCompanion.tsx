"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// ─── 3D Real Animated Robot Character (downloaded from internet) ────────────
function RealAnimatedRobot({ 
  activeAnimation, 
  setActiveAnimation,
  isHovered 
}: { 
  activeAnimation: string; 
  setActiveAnimation: (anim: string) => void;
  isHovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Load the downloaded GLB 3D model
  const { scene, animations } = useGLTF("/models/robot.glb");
  const { actions } = useAnimations(animations, groupRef);

  // Spark particle coordinates
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      pos: [
        (Math.random() - 0.5) * 3.8,
        (Math.random() - 0.5) * 3.8,
        (Math.random() - 0.5) * 3.0,
      ] as [number, number, number],
      size: Math.random() * 0.04 + 0.02,
    }));
  }, []);

  // Initial greeting animation: Wave first, then Idle
  useEffect(() => {
    if (!actions) return;

    if (actions["Wave"]) {
      actions["Wave"].reset().fadeIn(0.4).play();
      const timer = setTimeout(() => {
        actions["Wave"]?.fadeOut(0.4);
        if (actions["Idle"]) {
          actions["Idle"].reset().fadeIn(0.4).play();
          setActiveAnimation("Idle");
        }
      }, 3400);
      return () => clearTimeout(timer);
    } else if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.4).play();
    }
  }, [actions, setActiveAnimation]);

  // Handle manual animation triggers from action buttons or hover
  useEffect(() => {
    if (!actions) return;

    // Cross-fade all currently running actions into the target activeAnimation
    Object.keys(actions).forEach((key) => {
      if (key !== activeAnimation) {
        actions[key]?.fadeOut(0.3);
      }
    });

    const targetAction = actions[activeAnimation];
    if (targetAction) {
      targetAction.reset().fadeIn(0.3).play();
      // If it's a one-shot action like ThumbsUp or Jump or Wave, auto-return to Idle after duration
      if (activeAnimation === "ThumbsUp" || activeAnimation === "Jump" || activeAnimation === "Wave") {
        const timeout = activeAnimation === "ThumbsUp" ? 2200 : activeAnimation === "Jump" ? 1800 : 3200;
        const timer = setTimeout(() => {
          targetAction.fadeOut(0.4);
          actions["Idle"]?.reset().fadeIn(0.4).play();
          setActiveAnimation("Idle");
        }, timeout);
        return () => clearTimeout(timer);
      }
    }
  }, [activeAnimation, actions, setActiveAnimation]);

  // Pointer tracking & ring animations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    if (groupRef.current) {
      // Smooth body rotation tracking user cursor
      const targetRotY = pointer.x * 0.75;
      const targetRotX = -pointer.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    }

    // Holographic Orbital Rings Rotation
    const speed = isHovered ? 2.2 : 1.0;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.7 * speed;
      ring1Ref.current.rotation.y = time * 0.4 * speed;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.6 * speed;
      ring2Ref.current.rotation.z = time * 0.8 * speed;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* ─── Glowing Holographic Orbital Rings ─── */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.75, 0.02, 16, 64]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4" 
          emissiveIntensity={isHovered ? 3.0 : 1.8} 
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.95, 0.016, 16, 64]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24" 
          emissiveIntensity={isHovered ? 2.5 : 1.4} 
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* ─── The Real 3D Animated Robot Model ─── */}
      <group ref={groupRef} position={[0, -1.2, 0]}>
        <primitive object={scene} scale={[0.65, 0.65, 0.65]} />
      </group>

      {/* ─── Ambient Orbiting Data Sparks ─── */}
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#38bdf8" : "#fbbf24"} 
            transparent 
            opacity={0.65} 
          />
        </mesh>
      ))}
    </group>
  );
}

// Preload the GLB model in browser memory
useGLTF.preload("/models/robot.glb");

// ─── Main Exported Container ────────────────────────────────────────────────
export default function HeroCyberCompanion() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState("Wave");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-[320px] h-[360px] sm:w-[380px] sm:h-[400px] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-cyan-500/20 bg-cyan-500/5 animate-pulse" />
      </div>
    );
  }

  const animOptions = [
    { label: "Wave 👋", anim: "Wave" },
    { label: "Thumbs Up 👍", anim: "ThumbsUp" },
    { label: "Dance 💃", anim: "Dance" },
    { label: "Jump ✨", anim: "Jump" },
    { label: "Idle 🤖", anim: "Idle" },
  ];

  return (
    <div 
      className="relative w-[320px] sm:w-[380px] md:w-[420px] flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.22)_0%,transparent_70%)] pointer-events-none -z-10 animate-pulse" />

      {/* WebGL 3D Canvas with Real Model */}
      <div className="w-full h-[330px] sm:h-[370px] cursor-grab active:cursor-grabbing">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.4} color="#f8fafc" />
          <directionalLight position={[5, 8, 5]} intensity={3.5} color="#e0f2fe" />
          <pointLight position={[-4, 2, 2]} intensity={2.5} color="#06b6d4" />
          <pointLight position={[4, -1, 2]} intensity={2.2} color="#fbbf24" />

          <RealAnimatedRobot 
            activeAnimation={activeAnimation} 
            setActiveAnimation={setActiveAnimation}
            isHovered={isHovered} 
          />
        </Canvas>
      </div>

      {/* Interactive Animation Control Bar */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1 z-20">
        {animOptions.map((opt) => (
          <button
            key={opt.anim}
            onClick={() => setActiveAnimation(opt.anim)}
            className={`px-2.5 py-1 rounded-full font-mono text-[10px] transition-all cursor-pointer border ${
              activeAnimation === opt.anim
                ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600 hover:bg-zinc-800"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* System Status Pill */}
      <div className="mt-2 px-3 py-0.5 rounded-full border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md font-mono text-[9px] text-zinc-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>3D RIGGED MODEL //</span>
        <span className="text-cyan-400 font-bold">{activeAnimation.toUpperCase()}</span>
      </div>
    </div>
  );
}
