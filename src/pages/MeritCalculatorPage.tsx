import { Navbar } from "@/components/Navbar";
import { MeritCalculator } from "@/components/MeritCalculator";
import { Footer } from "@/components/Footer";

export default function MeritCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <MeritCalculator />
      </main>
      <Footer />
    </div>
  );
}
