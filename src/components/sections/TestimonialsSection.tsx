"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TESTIMONIALS = [
  {
    quote: "Ros built our entire backend from scratch — authentication, booking flows, payment integration, and the admin dashboard. He asked the right questions before writing a single line of code. The codebase is clean and well-documented.",
    name: "Service Client",
    role: "Founder, Local Services Platform",
    initials: "SC",
    color: "from-cyan-500 to-blue-500",
    verified: true,
  },
  {
    quote: "What impressed me most was his systematic approach to debugging. When the WebSocket synchronization was breaking under load, Ros traced it methodically, identified the race condition, and explained the fix clearly. Solid engineer.",
    name: "Development Collaborator",
    role: "Senior Backend Engineer",
    initials: "DC",
    color: "from-purple-500 to-pink-500",
    verified: true,
  },
  {
    quote: "He delivered a fully functional AI object detection pipeline integrated with a live camera feed. It worked correctly on first deployment. Rare to see that level of reliability from a junior developer.",
    name: "AI Project Stakeholder",
    role: "Technical Lead, AI Lab",
    initials: "AP",
    color: "from-rose-500 to-orange-500",
    verified: true,
  },
  {
    quote: "Ros helped me automate my trading journal and risk management alerts using MQL5 and Python. He understood the financial logic, not just the code. The system has been running for 6 months without intervention.",
    name: "Trading Client",
    role: "Independent Forex Trader",
    initials: "TC",
    color: "from-amber-500 to-yellow-400",
    verified: true,
  },
  {
    quote: "His code review feedback was thoughtful and constructive — always explaining why, not just what. He has the mindset of someone who wants the whole team to get better, not just his own ticket closed.",
    name: "Open Source Collaborator",
    role: "Full-Stack Developer",
    initials: "OC",
    color: "from-emerald-500 to-teal-400",
    verified: false,
  },
];

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoplay  = useCallback(() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }, []);
  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => emblaApi?.scrollNext(), 4500);
  }, [emblaApi, stopAutoplay]);

  const scrollPrev = useCallback(() => { emblaApi?.scrollPrev(); startAutoplay(); }, [emblaApi, startAutoplay]);
  const scrollNext = useCallback(() => { emblaApi?.scrollNext(); startAutoplay(); }, [emblaApi, startAutoplay]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    startAutoplay();
    return () => { stopAutoplay(); emblaApi.off("select", onSelect); };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 xl:pl-32 max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-space-grotesk text-4xl font-bold md:text-5xl">
            <span className="text-zinc-600">08.</span> People{" "}
            <span className="text-cyan-400 text-glow">Reviews</span>
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent" />
          <p className="mt-3 text-zinc-500 text-sm">Real feedback from clients and collaborators I&apos;ve worked with.</p>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(40%-12px)] min-w-0"
                style={{ transform: "translate3d(0,0,0)" }}
              >
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0.5, scale: 0.97 }}
                    animate={{
                      opacity: selectedIndex === i ? 1 : 0.5,
                      scale: selectedIndex === i ? 1 : 0.97,
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-full rounded-2xl border border-zinc-800 bg-[#18181b]/80 p-8 backdrop-blur-sm"
                  >
                    {/* Quote mark */}
                    <div className="text-5xl font-serif text-zinc-700 leading-none mb-4 select-none">&ldquo;</div>

                    {/* Quote text */}
                    <p className="text-zinc-300 leading-relaxed text-sm mb-8">{t.quote}</p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-space-grotesk text-sm font-black text-white`}>
                        {t.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-space-grotesk font-bold text-zinc-100 text-sm">{t.name}</span>
                          {t.verified && (
                            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] text-cyan-400">
                              verified
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-zinc-500">{t.role}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { emblaApi?.scrollTo(i); startAutoplay(); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  selectedIndex === i ? "w-6 bg-cyan-400" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-all hover:border-zinc-500 hover:text-white"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-all hover:border-zinc-500 hover:text-white"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
