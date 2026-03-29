"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiRender,
  SiRailway,
  SiPostman,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { BiGitBranch } from "react-icons/bi";

const CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "Deployment"];

const SKILLS = [
  // Frontend
  { name: "React", icon: FaReact, color: "text-[#61DAFB]", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white", category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]", category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]", category: "Frontend" },
  { name: "HTML5", icon: FaHtml5, color: "text-[#E34F26]", category: "Frontend" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-[#1572B6]", category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]", category: "Frontend" },
  // Backend
  { name: "Node.js", icon: FaNodeJs, color: "text-[#339933]", category: "Backend" },
  { name: "Express.js", icon: SiExpress, color: "text-white", category: "Backend" },
  { name: "REST API", icon: BiGitBranch, color: "text-[#00ADD8]", category: "Backend" },
  { name: "JWT Auth", icon: BiGitBranch, color: "text-[#FF0055]", category: "Backend" },
  // Database
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]", category: "Database" },
  { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]", category: "Database" },
  // Tools
  { name: "Git", icon: BiGitBranch, color: "text-[#F05032]", category: "Tools" },
  { name: "GitHub", icon: FaGithub, color: "text-white", category: "Tools" },
  { name: "VS Code", icon: VscVscode, color: "text-[#007ACC]", category: "Tools" },
  { name: "Postman", icon: SiPostman, color: "text-[#FF6C37]", category: "Tools" },
  // Deployment
  { name: "Vercel", icon: SiVercel, color: "text-white", category: "Deployment" },
  { name: "Render", icon: SiRender, color: "text-white", category: "Deployment" },
  { name: "Railway", icon: SiRailway, color: "text-white", category: "Deployment" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const filteredSkills = SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section id="tech-stack" className="relative min-h-screen py-32">
      <div className="container mx-auto px-6 xl:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">02.</span> Tech <span className="text-cyan-400 text-glow">Stack</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 transition-all duration-300 font-space-grotesk text-sm font-medium tracking-wide ${
                activeCategory === category
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          key={activeCategory} // forces re-render/animation on category change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-[#18181b] p-8 transition-all duration-300 hover:border-cyan-500 hover:bg-[#18181b]/80 border-glow-hover hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <div
                className={`mb-4 text-5xl transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor] ${skill.color}`}
              >
                <skill.icon />
              </div>
              <p className="font-space-grotesk text-sm font-medium text-zinc-300 group-hover:text-white">
                {skill.name}
              </p>
              
              {/* Background Glow */}
              <div className="absolute inset-0 z-[-1] rounded-2xl bg-gradient-to-b from-cyan-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:from-cyan-500/10 group-hover:to-transparent group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
