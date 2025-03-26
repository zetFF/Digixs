import HeroSection from "@/components/HeroSection";
import WorkShowcaseSection from "@/components/WorkShowcaseSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TeamSection from "@/components/TeamSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <HeroSection />
        <WorkShowcaseSection />
        <ProcessSection />
        <TestimonialsSection />
        <TeamSection />
        <FooterSection />
      </div>
    </main>
  );
}
