import { 
  Calculator, 
  Search, 
  Users, 
  Globe, 
  BarChart3, 
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "University Search",
    description: "Find and compare universities across Pakistan with detailed information on programs, fees, and requirements.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calculator,
    title: "Merit Calculator",
    description: "Calculate your aggregate merit score using various formulas for different universities and programs.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Users,
    title: "Find Tutors",
    description: "Connect with qualified tutors for test preparation, subject help, and academic guidance.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    description: "Explore international education opportunities with scholarships and application guidance.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: BarChart3,
    title: "Compare Programs",
    description: "Side-by-side comparison of programs, fees, eligibility criteria, and career prospects.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    title: "Resources Hub",
    description: "Access past papers, study materials, and guides for entry tests like ECAT, MDCAT, and NET.",
    color: "bg-accent/10 text-accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-gradient">Academic Success</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Edu-360 provides comprehensive tools and resources to help you make informed decisions about your education.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group border-2 border-transparent hover:border-primary/20 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Explore All Features
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
