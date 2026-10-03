"use client";


export default function GlobalVisualAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* 1. Global Subtle Architectural Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #818cf8 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 2. High-performance Static Ambient Glow Blobs (Zero JS CPU/GPU recalculations) */}
      <div className="absolute top-[10%] -left-32 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px] opacity-70" />
      <div className="absolute top-[35%] -right-32 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[110px] opacity-60" />
      <div className="absolute top-[60%] -left-20 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[100px] opacity-60" />
      <div className="absolute top-[85%] right-1/4 h-[550px] w-[550px] rounded-full bg-indigo-500/12 blur-[100px] opacity-70" />

      {/* Top-to-Bottom Subtle Ambient Tint Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060914]/30 to-transparent" />
    </div>
  );
}

