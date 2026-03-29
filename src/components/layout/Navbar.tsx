"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech-stack" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active hash based on scroll position safely
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let currentIdx = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 300) {
          currentIdx = i;
        }
      }
      setActiveHash(NAV_LINKS[currentIdx].href);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToHash = (hash: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-cyan-500/10 bg-[#09090b]/80 backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2 font-space-grotesk font-bold text-xl tracking-tighter">
          <span className="text-white">ROS</span>
          <span className="text-cyan-400">RENDO.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden space-x-1 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToHash(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                activeHash === link.href ? "text-cyan-400 text-glow" : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
              {activeHash === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-cyan-400"
                  style={{ boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="text-zinc-400 transition-colors hover:text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[72px] flex flex-col items-center justify-center space-y-6 bg-[#09090b]/95 backdrop-blur-lg md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToHash(link.href)}
                className={`text-2xl font-space-grotesk font-medium ${
                  activeHash === link.href ? "text-cyan-400 text-glow" : "text-zinc-400"
                }`}
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
