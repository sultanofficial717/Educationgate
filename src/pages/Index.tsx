import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { UniversitiesSection } from "@/components/UniversitiesSection";
import { MeritCalculator } from "@/components/MeritCalculator";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <UniversitiesSection />
        <MeritCalculator />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
