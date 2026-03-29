"use client";

import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiDownload } from "react-icons/fi";

const SOCIALS = [
  { name: "GitHub", icon: FiGithub, href: "#", color: "hover:text-white" },
  { name: "LinkedIn", icon: FiLinkedin, href: "#", color: "hover:text-[#0077B5]" },
  { name: "Email", icon: FiMail, href: "mailto:hello@example.com", color: "hover:text-cyan-400" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-[80vh] py-32 flex flex-col items-center justify-center">
      
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="font-space-grotesk text-cyan-400 font-bold tracking-widest text-glow mb-4">
            05. WHAT&apos;S NEXT?
          </div>
          
          <h2 className="text-5xl md:text-7xl font-space-grotesk font-black text-white tracking-tighter">
            Get In <span className="text-cyan-400 text-glow">Touch</span>
          </h2>
          
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Whether you have a unique product idea, need a scalable backend, or just want to say hi—my inbox is always open. 
            Currently available for freelance opportunities and full-time roles.
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10"
          >
            {/* Resume Button CTA */}
            <a 
              href="#" 
              target="_blank" 
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-space-grotesk font-bold text-white transition-all overflow-hidden rounded-full border border-cyan-500 bg-cyan-500/20 hover:bg-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <FiDownload size={20} className="group-hover:-translate-y-1 transition-transform" />
              <span>Download Resume</span>
              {/* Shine effect */}
              <div className="absolute top-0 -left-[100%] h-full w-[50%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out"></div>
            </a>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`group relative p-4 rounded-full border border-zinc-800 bg-[#18181b] text-zinc-400 transition-all hover:border-zinc-500 ${social.color} hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                  aria-label={social.name}
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full">
         <p className="font-space-grotesk text-sm text-zinc-600">
           Designed & Built by <span className="text-cyan-500/50">Ros Rendo</span> &copy; {new Date().getFullYear()}
         </p>
      </div>
    </section>
  );
}
