import NeonStick from "@/components/ui/NeonStick";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TechStackSection from "@/components/sections/TechStackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import JourneySection from "@/components/sections/JourneySection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative bg-[#09090b]">
      {/* Global animated trackers */}
      <ScrollProgress />
      <NeonStick />
      
      {/* Sections */}
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
