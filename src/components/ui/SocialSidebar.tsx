"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const SOCIALS = [
  { name: "GitHub", icon: FiGithub, href: "https://github.com/ROS-RENDO" },
  { name: "LinkedIn", icon: FiLinkedin, href: "#" },
  { name: "Email", icon: FiMail, href: "mailto:hello@example.com" },
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="hidden xl:flex fixed left-8 bottom-0 z-40 flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-6 text-zinc-500">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 hover:-translate-y-1.5 transition-all duration-300 block"
            aria-label={social.name}
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
      <div className="w-[1px] h-28 bg-zinc-850" />
    </motion.div>
  );
}
