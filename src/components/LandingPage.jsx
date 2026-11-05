import { HeroSection } from "@/components/hero-section";
import { LeadershipSection } from "@/components/leadership-section";
import { ResultsSection } from "@/components/ResultsSection";

export function LandingPage() {
  return (
    <div className="flex-1">
      <HeroSection />
      <LeadershipSection />
      <ResultsSection />
    </div>
  );
}

export default LandingPage;
