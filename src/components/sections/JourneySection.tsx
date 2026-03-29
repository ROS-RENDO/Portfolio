"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TIMELINE = [
  {
    year: "Present",
    title: "Full-Stack Developer",
    company: "Freelance / Building Products",
    description: "Developing robust full-stack applications with Next.js, React, Node.js, and scaling backend architecture for real-world traffic.",
    skills: ["Next.js", "TypeScript", "Tailwind", "Node.js"],
  },
  {
    year: "2023",
    title: "Mastering Backend Architecture",
    company: "Advanced Learning",
    description: "Deep dive into secure REST APIs, role-based JWT authentication, middleware architecture, database optimization, and scalable systems.",
    skills: ["Express.js", "MongoDB", "MySQL", "JWT"],
  },
  {
    year: "2022",
    title: "Frontend Engineering focus",
    company: "Project Development",
    description: "Crafting beautiful, reactive, and accessible user interfaces. Expanding knowledge into React hooks, state management, and modern CSS.",
    skills: ["React.js", "Redux", "Framer Motion", "Figma"],
  },
  {
    year: "2021",
    title: "The Beginning",
    company: "Self Taught",
    description: "Started the software engineering journey. Core foundations in algorithms, vanilla JavaScript, HTML5, and CSS3 principles.",
    skills: ["JavaScript", "HTML5", "CSS3", "Git"],
  },
];

export default function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative min-h-screen py-32" ref={containerRef}>
      <div className="container mx-auto px-6 xl:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">04.</span> Developer <span className="text-cyan-400 text-glow">Journey</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        </motion.div>

        <div className="relative mx-auto mt-16 max-w-4xl">
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
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-zinc-600 -translate-x-1/2 z-10 transition-colors duration-500">
                    <motion.div
                      whileInView={{ backgroundColor: "#06b6d4", scale: [1, 1.5, 1], boxShadow: "0 0 20px #06b6d4" }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute inset-0 rounded-full"
                    />
                  </div>

                  {/* Desktop Layout - Alternating sides */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`hidden md:block w-1/2 pl-12 pr-12 ${isEven ? "text-right" : "ml-auto text-left"}`}
                  >
                    <div className="font-space-grotesk text-cyan-400 text-xl font-bold mb-1 text-glow tracking-widest">{item.year}</div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                    <div className="text-sm font-medium text-zinc-500 mb-4">{item.company}</div>
                    <p className="text-zinc-400 leading-relaxed mb-4">{item.description}</p>
                    <div className={`flex flex-wrap gap-2 ${isEven ? "justify-end" : "justify-start"}`}>
                      {item.skills.map((skill, sIdx) => (
                         <span key={sIdx} className="text-xs font-mono bg-zinc-900 text-zinc-300 px-2 py-1 rounded border border-zinc-800">
                           {skill}
                         </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Mobile Layout - Left Aligned */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="md:hidden w-full pl-16 pr-4 relative"
                  >
                    <div className="font-space-grotesk text-cyan-400 text-lg font-bold mb-1 text-glow">{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <div className="text-sm font-medium text-zinc-500 mb-2">{item.company}</div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {item.skills.map((skill, sIdx) => (
                         <span key={sIdx} className="text-xs font-mono bg-zinc-900 text-zinc-300 px-2 py-1 rounded border border-zinc-800">
                           {skill}
                         </span>
                       ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
