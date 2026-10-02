import NeonStick from "@/components/ui/NeonStick";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import SocialSidebar from "@/components/ui/SocialSidebar";
import GlobalVisualAtmosphere from "@/components/ui/GlobalVisualAtmosphere";

// Sections — evidence-first hiring manager order
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JourneySection from "@/components/sections/JourneySection";
import TechStackSection from "@/components/sections/TechStackSection";
import GitHubSection from "@/components/sections/GitHubSection";
import EngineeringLessonsSection from "@/components/sections/EngineeringLessonsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BeyondCodeSection from "@/components/sections/BeyondCodeSection";
import ContactSection from "@/components/sections/ContactSection";
import Surprise3DSection from "@/components/sections/Surprise3DSection";

export default function Home() {
  return (
    <main className="relative bg-[#070a14] min-h-screen text-white">
      <GlobalVisualAtmosphere />
      <ScrollProgress />
      <SocialSidebar />
      <NeonStick />


      {/*
        01. Hero             — who you are + live status + CTAs
        02. About            — proof-based skills grid + collaboration workflow
        03. Projects         — best work with case study modals
        04. Journey          — growth & engagement timelines
        05. Tech Stack       — visual logo grid (no text bars)
        06. GitHub           — contribution heatmap + real repos
        07. Engineering      — mistakes → fixes → lessons (strongest differentiator)
        08. Testimonials     — client/peer review carousel
        09. Beyond Code      — personality + NOW status
        10. Contact          — CTA + PDF Resume
        11. 3D Surprise      — cinematic WebGL timeline
      */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <JourneySection />
      <TechStackSection />
      <GitHubSection />
      <EngineeringLessonsSection />
      <TestimonialsSection />
      <BeyondCodeSection />
      <ContactSection />
      <Surprise3DSection />
    </main>
  );
}


