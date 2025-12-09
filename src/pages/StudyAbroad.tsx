import { useNavigate } from "react-router-dom";
import { Globe, MapPin, GraduationCap, DollarSign, Clock, ArrowRight, ArrowLeft, Plane } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpenseCalculator } from "@/components/ExpenseCalculator";

const countries = [
  {
    id: 1,
    name: "United Kingdom",
    flag: "🇬🇧",
    universities: 150,
    avgTuition: "$20,000 - $40,000",
    visaTime: "2-4 weeks",
    scholarships: 500,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60",
    popular: ["Oxford", "Cambridge", "Imperial College"],
  },
  {
    id: 2,
    name: "United States",
    flag: "🇺🇸",
    universities: 300,
    avgTuition: "$25,000 - $55,000",
    visaTime: "4-8 weeks",
    scholarships: 800,
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&auto=format&fit=crop&q=60",
    popular: ["MIT", "Stanford", "Harvard"],
  },
  {
    id: 3,
    name: "Canada",
    flag: "🇨🇦",
    universities: 100,
    avgTuition: "$15,000 - $35,000",
    visaTime: "4-6 weeks",
    scholarships: 400,
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&auto=format&fit=crop&q=60",
    popular: ["UofT", "McGill", "UBC"],
  },
  {
    id: 4,
    name: "Australia",
    flag: "🇦🇺",
    universities: 45,
    avgTuition: "$20,000 - $45,000",
    visaTime: "2-4 weeks",
    scholarships: 300,
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format&fit=crop&q=60",
    popular: ["Melbourne", "Sydney", "ANU"],
  },
  {
    id: 5,
    name: "Germany",
    flag: "🇩🇪",
    universities: 80,
    avgTuition: "Free - $3,000",
    visaTime: "6-8 weeks",
    scholarships: 600,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=60",
    popular: ["TUM", "LMU", "Heidelberg"],
  },
  {
    id: 6,
    name: "China",
    flag: "🇨🇳",
    universities: 200,
    avgTuition: "$3,000 - $10,000",
    visaTime: "2-4 weeks",
    scholarships: 700,
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop&q=60",
    popular: ["Tsinghua", "Peking", "Fudan"],
  },
];

export default function StudyAbroad() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Back Button */}
        <div className="container px-4 sm:px-6 lg:px-8 mb-8">
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
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 mb-12">
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Study Abroad
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Your Gateway to{" "}
                <span className="text-gradient">Global Education</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore international universities, scholarships, and visa requirements. 
                Start your journey to studying abroad today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Plane className="w-5 h-5" />
                  Find Scholarships
                </Button>
                <Button variant="outline" size="lg">
                  Talk to Advisor
                </Button>
                <ExpenseCalculator />
              </div>
            </div>
          </div>
        </section>

        {/* Countries Grid */}
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground">
              Explore top countries for Pakistani students
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <Card
                key={country.id}
                className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-4xl">{country.flag}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-display font-bold text-primary-foreground">
                      {country.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{country.universities}+</div>
                        <div className="text-xs text-muted-foreground">Universities</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{country.scholarships}+</div>
                        <div className="text-xs text-muted-foreground">Scholarships</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Tuition/Year</span>
                      <span className="font-medium text-foreground">{country.avgTuition}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Visa Processing</span>
                      <span className="font-medium text-foreground">{country.visaTime}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Top Universities</div>
                    <div className="flex flex-wrap gap-1">
                      {country.popular.map((uni) => (
                        <span
                          key={uni}
                          className="px-2 py-1 rounded-md bg-secondary text-xs font-medium text-foreground"
                        >
                          {uni}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group/btn">
                    Explore {country.name}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <section className="container px-4 sm:px-6 lg:px-8 mt-20">
          <Card className="bg-gradient-hero border-0 overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-foreground mb-4">
                  Need Help with Your Application?
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Our expert counselors can guide you through the entire process—from university selection to visa application.
                </p>
                <Button variant="glass" size="lg">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
