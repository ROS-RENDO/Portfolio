"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: -1000, y: -1000, active: false };

    // Colors: vibrant cyan, indigo, purple, teal
    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#2dd4bf"];

    // Initialize 60 smooth particles
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45 - 0.15, // gentle upward drift
      radius: Math.random() * 2.2 + 1.2,
      baseAlpha: Math.random() * 0.4 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Update cursor spotlight via direct DOM transform (zero React re-renders)
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
        spotlightRef.current.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Continuous 60fps render loop — completely seamless, NO video loop blink, NO frame drop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse if nearby
        if (mouse.active) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const mAlpha = (1 - mdist / 140) * 0.35;
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges seamlessly (zero blinking)
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.save();
        ctx.globalAlpha = p.baseAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* 1. Deep Midnight Cosmic Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a17] via-[#090d1f] to-[#09090b]" />

      {/* 2. Soft Ambient Aurora Nebulae (Stable, no strobe / no blink) */}
      <div className="absolute -top-32 -left-32 h-[650px] w-[650px] rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/20 blur-[130px] opacity-70 animate-pulse-slow" />
      <div className="absolute top-1/4 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-to-bl from-purple-600/25 via-indigo-600/20 to-pink-500/15 blur-[140px] opacity-65" />
      <div className="absolute -bottom-24 left-1/3 h-[550px] w-[550px] rounded-full bg-teal-500/20 blur-[130px] opacity-60" />

      {/* 3. Interactive Cursor Spotlight (GPU-positioned, zero React state re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute -top-[250px] -left-[250px] h-[500px] w-[500px] rounded-full bg-radial from-cyan-400/20 via-blue-500/10 to-transparent blur-[75px] opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform"
      />

      {/* 4. Architectural Cyber Grid (Clean, non-aliasing, no moire shimmer) */}
      <div 
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #818cf8 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />

      {/* 5. Glowing Cyber Horizon Beam */}
      <div className="absolute top-[68%] inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent shadow-[0_0_15px_#06b6d4]" />
        <div className="absolute w-[350px] h-[25px] rounded-full bg-cyan-400/15 blur-[25px]" />
      </div>

      {/* 6. High-Performance Seamless 60fps HTML5 Canvas Particle Engine */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* 7. Soft Vignette Edge for Contrast & Sharp Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a17]/10 via-transparent to-[#09090b]/80" />
    </div>
  );
}
