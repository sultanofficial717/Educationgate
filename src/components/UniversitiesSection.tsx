import { MapPin, Users, Star, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const featuredUniversities = [
  {
    id: 1,
    name: "NUST",
    fullName: "National University of Sciences and Technology",
    location: "Islamabad",
    ranking: "#1 in Pakistan",
    students: "15,000+",
    rating: 4.8,
    programs: 65,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
    color: "from-primary to-primary/80",
  },
  {
    id: 2,
    name: "LUMS",
    fullName: "Lahore University of Management Sciences",
    location: "Lahore",
    ranking: "#2 in Pakistan",
    students: "5,000+",
    rating: 4.9,
    programs: 35,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60",
    color: "from-accent to-accent/80",
  },
  {
    id: 3,
    name: "FAST-NUCES",
    fullName: "FAST National University",
    location: "Multiple Cities",
    ranking: "#5 in Pakistan",
    students: "12,000+",
    rating: 4.6,
    programs: 28,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60",
    color: "from-primary to-accent",
  },
  {
    id: 4,
    name: "UET Lahore",
    fullName: "University of Engineering & Technology",
    location: "Lahore",
    ranking: "#3 in Engineering",
    students: "10,000+",
    rating: 4.5,
    programs: 42,
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=60",
    color: "from-accent to-primary",
  },
];

export function UniversitiesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Top Universities
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Featured Universities
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Explore Pakistan's top-ranked universities and find the perfect fit for your academic journey.
            </p>
          </div>
          <Link to="/universities">
            <Button variant="outline" className="group">
              View All Universities
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredUniversities.map((uni, index) => (
            <Card
              key={uni.id}
              className="group overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${uni.color} opacity-60`} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-card/90 text-xs font-semibold text-foreground backdrop-blur-sm">
                    {uni.ranking}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-display font-bold text-primary-foreground mb-1">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 line-clamp-1">
                    {uni.fullName}
                  </p>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {uni.location}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-secondary">
                    <div className="flex items-center justify-center gap-1 text-accent">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-semibold text-sm">{uni.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary">
                    <div className="font-semibold text-sm text-foreground">{uni.programs}</div>
                    <div className="text-xs text-muted-foreground">Programs</div>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary">
                    <div className="flex items-center justify-center gap-1">
                      <Users className="w-3 h-3 text-primary" />
                      <span className="font-semibold text-sm text-foreground">
                        {uni.students.replace("+", "")}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
