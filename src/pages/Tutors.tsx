import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, MapPin, BookOpen, Users, ChevronDown, Clock, Award, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tutors = [
  {
    id: 1,
    name: "Dr. Ahmed Khan",
    subjects: ["Physics", "Mathematics"],
    location: "Islamabad",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 2500,
    experience: "10+ years",
    students: 500,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60",
    specialization: "ECAT Preparation",
  },
  {
    id: 2,
    name: "Ms. Sara Ali",
    subjects: ["Biology", "Chemistry"],
    location: "Lahore",
    rating: 4.8,
    reviews: 142,
    hourlyRate: 2000,
    experience: "8 years",
    students: 400,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=60",
    specialization: "MDCAT Expert",
  },
  {
    id: 3,
    name: "Prof. Hassan Raza",
    subjects: ["Computer Science", "Mathematics"],
    location: "Karachi",
    rating: 4.7,
    reviews: 98,
    hourlyRate: 3000,
    experience: "15+ years",
    students: 600,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60",
    specialization: "Programming & DSA",
  },
  {
    id: 4,
    name: "Ms. Fatima Zahra",
    subjects: ["English", "Urdu"],
    location: "Islamabad",
    rating: 4.9,
    reviews: 203,
    hourlyRate: 1500,
    experience: "6 years",
    students: 350,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
    specialization: "IELTS & CSS Prep",
  },
  {
    id: 5,
    name: "Dr. Imran Shah",
    subjects: ["Chemistry", "Physics"],
    location: "Lahore",
    rating: 4.6,
    reviews: 87,
    hourlyRate: 2800,
    experience: "12 years",
    students: 450,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
    specialization: "O/A Level Sciences",
  },
  {
    id: 6,
    name: "Ms. Ayesha Malik",
    subjects: ["Mathematics", "Statistics"],
    location: "Multiple Cities",
    rating: 4.8,
    reviews: 176,
    hourlyRate: 2200,
    experience: "9 years",
    students: 520,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    specialization: "Online Classes Available",
  },
];

const subjects = ["All Subjects", "Physics", "Mathematics", "Chemistry", "Biology", "Computer Science", "English"];
const cities = ["All Cities", "Islamabad", "Lahore", "Karachi", "Multiple Cities"];

export default function Tutors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" || tutor.subjects.includes(selectedSubject);
    const matchesCity = selectedCity === "All Cities" || tutor.location === selectedCity;
    return matchesSearch && matchesSubject && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
            className="mb-6 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Find Tutors
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Expert Tutors
            </h1>
            <p className="text-muted-foreground">
              Connect with qualified tutors for personalized learning
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            
            {/* Subject Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSubjectOpen(!isSubjectOpen);
                  setIsCityOpen(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 h-11 rounded-lg border-2 border-input bg-card hover:border-primary transition-colors min-w-[160px]"
              >
                <span className="text-sm font-medium">{selectedSubject}</span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isSubjectOpen && "rotate-180")} />
              </button>
              {isSubjectOpen && (
                <div className="absolute z-10 w-full mt-2 py-2 rounded-lg border-2 border-border bg-card shadow-lg animate-scale-in">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setIsSubjectOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors",
                        selectedSubject === subject && "bg-primary/10 text-primary"
                      )}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCityOpen(!isCityOpen);
                  setIsSubjectOpen(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2.5 h-11 rounded-lg border-2 border-input bg-card hover:border-primary transition-colors min-w-[140px]"
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
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredTutors.length} tutors
          </p>

          {/* Tutor Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor, index) => (
              <Card
                key={tutor.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {tutor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">{tutor.specialization}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="text-sm font-medium text-foreground">{tutor.rating}</span>
                        <span className="text-sm text-muted-foreground">({tutor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {tutor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {tutor.experience}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {tutor.students}+ students
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      Verified
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-lg font-display font-bold text-foreground">
                        Rs. {tutor.hourlyRate.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                    <Button variant="default" size="sm">
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No tutors found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
