"use client";

import { motion, easeOut } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import Image from "next/image";

const PROJECTS = [
  {
    id: 1,
    title: "EcoStore Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, complete checkout flow, and a comprehensive admin dashboard.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Stripe"],
    github: "#",
    demo: "#",
    color: "from-cyan-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "TaskFlow Pro",
    description:
      "Real-time project management and task tracking application featuring WebSockets for instant updates, role-based access, and Kanban boards.",
    tech: ["React", "Express.js", "Socket.io", "MySQL", "JWT Auth"],
    github: "#",
    demo: "#",
    color: "from-purple-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    title: "CryptoTracker",
    description:
      "Financial dashboard tracking real-time cryptocurrency markets, utilizing external REST APIs, responsive charting, and personalized watchlists.",
    tech: ["Next.js", "Tailwind", "Chart.js", "Node.js", "Redis API"],
    github: "#",
    demo: "#",
    color: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    id: 4,
    title: "DevConnect Social",
    description:
      "A dedicated social network for developers to share code snippets, find collaborators, and participate in community-driven technical discussions.",
    tech: ["MERN Stack", "GraphQL", "AWS S3", "Redux Toolkit"],
    github: "#",
    demo: "#",
    color: "from-purple-500/20 to-zinc-900/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOut } },
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative min-h-screen py-32">
      <div className="container mx-auto px-6 xl:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-500">03.</span> Featured{" "}
            <span className="text-cyan-400 text-glow">Projects</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181b] transition-all duration-300 hover:border-cyan-500/50 border-glow-hover hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
            >
              {/* Image Placeholder / Banner */}
              <div
                className={`h-48 w-full bg-gradient-to-br ${project.color} relative overflow-hidden flex items-center justify-center p-6`}
              >
                {/* Decorative elements for placeholder */}
                <div className="absolute inset-0 bg-[#09090b]/40 backdrop-blur-[2px] z-0"></div>
                <h3 className="relative z-10 font-space-grotesk text-3xl font-bold text-white/80 tracking-tighter opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                  {project.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-space-grotesk text-2xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex space-x-3 text-zinc-400">
                    <a
                      href={project.github}
                      className="hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_8px_#06b6d4]"
                    >
                      <FiGithub size={22} />
                    </a>
                    <a
                      href={project.demo}
                      className="hover:text-cyan-400 transition-colors hover:drop-shadow-[0_0_8px_#06b6d4]"
                    >
                      <FiExternalLink size={22} />
                    </a>
                  </div>
                </div>

                <p className="mb-6 flex-1 text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs font-mono text-cyan-500 transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-space-grotesk text-cyan-400 hover:text-cyan-300 transition-all text-glow border-b border-cyan-500/30 pb-1 hover:border-cyan-400"
          >
            View full project archive <FiExternalLink />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
