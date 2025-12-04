import { useState } from "react";
import { Search, Filter, MapPin, Users, Star, Building2, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const universities = [
  {
    id: 1,
    name: "NUST",
    fullName: "National University of Sciences and Technology",
    location: "Islamabad",
    ranking: "#1 in Pakistan",
    students: "15,000+",
    rating: 4.8,
    programs: 65,
    type: "Public",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
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
    type: "Private",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60",
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
    type: "Public",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=60",
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
    type: "Public",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "GIKI",
    fullName: "Ghulam Ishaq Khan Institute",
    location: "Topi, KPK",
    ranking: "#4 in Engineering",
    students: "3,000+",
    rating: 4.7,
    programs: 15,
    type: "Private",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "AKU",
    fullName: "Aga Khan University",
    location: "Karachi",
    ranking: "#1 in Medical",
    students: "4,000+",
    rating: 4.9,
    programs: 22,
    type: "Private",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=60",
  },
];

const cities = ["All Cities", "Islamabad", "Lahore", "Karachi", "Multiple Cities", "Topi, KPK"];
const types = ["All Types", "Public", "Private"];

export default function Universities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All Types");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "All Cities" || uni.location === selectedCity;
    const matchesType = selectedType === "All Types" || uni.type === selectedType;
    return matchesSearch && matchesCity && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              University Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Explore Universities
            </h1>
            <p className="text-muted-foreground">
              Browse and compare universities across Pakistan
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            
            {/* City Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCityOpen(!isCityOpen);
                  setIsTypeOpen(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 h-11 rounded-lg border-2 border-input bg-card hover:border-primary transition-colors min-w-[160px]"
              >
                <span className="text-sm font-medium">{selectedCity}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isCityOpen && "rotate-180")} />
              </button>
              {isCityOpen && (
                <div className="absolute z-10 w-full mt-2 py-2 rounded-lg border-2 border-border bg-card shadow-lg animate-scale-in">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors",
                        selectedCity === city && "bg-primary/10 text-primary"
                      )}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsTypeOpen(!isTypeOpen);
                  setIsCityOpen(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 h-11 rounded-lg border-2 border-input bg-card hover:border-primary transition-colors min-w-[140px]"
              >
                <span className="text-sm font-medium">{selectedType}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isTypeOpen && "rotate-180")} />
              </button>
              {isTypeOpen && (
                <div className="absolute z-10 w-full mt-2 py-2 rounded-lg border-2 border-border bg-card shadow-lg animate-scale-in">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setIsTypeOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors",
                        selectedType === type && "bg-primary/10 text-primary"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredUniversities.length} universities
          </p>

          {/* University Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni, index) => (
              <Card
                key={uni.id}
                className="group overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-card/90 text-xs font-semibold text-foreground backdrop-blur-sm">
                      {uni.ranking}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
                      uni.type === "Public" ? "bg-primary/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"
                    )}>
                      {uni.type}
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

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No universities found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
