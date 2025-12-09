import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { MeritCalculator } from "@/components/MeritCalculator";
import { Footer } from "@/components/Footer";

export default function MeritCalculatorPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <div className="px-4 sm:px-6 lg:px-8 mb-4 container">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        <MeritCalculator />
      </main>
      <Footer />
    </div>
  );
}
