import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, DollarSign, Users, Clock, FileText, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const scholarships = [
  {
    id: 1,
    name: "Chevening Scholarship",
    country: "United Kingdom",
    university: "Multiple Universities across UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
    amount: "$30,000 - $60,000/year",
    description: "Prestigious scholarship for international students offering full tuition and living allowance",
    coverage: ["Tuition", "Living Expenses", "Travel"],
    deadline: "2024-11-01",
    resultsAnnounced: "2024-03-15",
    applicationUrl: "https://www.chevening.org",
    registerUrl: "https://www.chevening.org/apply",
    resultsUrl: "https://www.chevening.org/results",
    eligibility: "Bachelor's degree, Work experience, English language proficiency",
  },
  {
    id: 2,
    name: "Fulbright Scholarship",
    country: "United States",
    university: "Multiple Universities across USA",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=250&fit=crop",
    amount: "$40,000 - $70,000/year",
    description: "Fully-funded scholarship for graduate studies and professional development in the USA",
    coverage: ["Tuition", "Living Expenses", "Travel", "Health Insurance"],
    deadline: "2024-10-15",
    resultsAnnounced: "2024-04-01",
    applicationUrl: "https://www.fulbrightscholars.org",
    registerUrl: "https://www.fulbrightscholars.org/apply",
    resultsUrl: "https://www.fulbrightscholars.org/results",
    eligibility: "Bachelor's degree, Strong academic record, English proficiency, US visa",
  },
  {
    id: 3,
    name: "Vanier Canada Graduate Scholarship",
    country: "Canada",
    university: "Multiple Canadian Universities",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=250&fit=crop",
    amount: "$50,000/year",
    description: "Award for world-class doctoral and master's level students",
    coverage: ["Tuition", "Living Stipend"],
    deadline: "2024-09-30",
    resultsAnnounced: "2024-05-01",
    applicationUrl: "https://www.vanier.gc.ca",
    registerUrl: "https://www.vanier.gc.ca/apply",
    resultsUrl: "https://www.vanier.gc.ca/results",
    eligibility: "Master's or PhD student, Outstanding academic record, Leadership qualities",
  },
  {
    id: 4,
    name: "Australia Awards Scholarship",
    country: "Australia",
    university: "Multiple Australian Universities",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=250&fit=crop",
    amount: "$35,000 - $65,000/year",
    description: "Australian government scholarship for international students from developing nations",
    coverage: ["Tuition", "Living Allowance", "Travel"],
    deadline: "2024-08-15",
    resultsAnnounced: "2024-06-01",
    applicationUrl: "https://www.australiaawards.gov.au",
    registerUrl: "https://www.australiaawards.gov.au/apply",
    resultsUrl: "https://www.australiaawards.gov.au/results",
    eligibility: "High school or bachelor's completion, English language test, Visa requirements",
  },
  {
    id: 5,
    name: "DAAD Scholarship",
    country: "Germany",
    university: "Multiple German Universities",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
    amount: "€934/month",
    description: "German Academic Exchange Service scholarship for international students and researchers",
    coverage: ["Monthly Allowance", "Tuition Waiver", "Health Insurance"],
    deadline: "2024-10-31",
    resultsAnnounced: "2024-07-01",
    applicationUrl: "https://www.daad.de",
    registerUrl: "https://www.daad.de/apply",
    resultsUrl: "https://www.daad.de/results",
    eligibility: "Bachelor's degree, Academic excellence, German or English proficiency",
  },
  {
    id: 6,
    name: "China Government Scholarship",
    country: "China",
    university: "Multiple Chinese Universities",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=250&fit=crop",
    amount: "¥3,000 - ¥8,000/month",
    description: "Chinese government funded scholarship for international students pursuing degrees in China",
    coverage: ["Tuition", "Monthly Stipend", "Health Insurance", "Dormitory"],
    deadline: "2024-05-31",
    resultsAnnounced: "2024-08-15",
    applicationUrl: "https://www.csc.edu.cn",
    registerUrl: "https://www.csc.edu.cn/apply",
    resultsUrl: "https://www.csc.edu.cn/results",
    eligibility: "High school or bachelor's degree, Health certificate, Passport",
  },
];

const countries = [
  { value: "all", label: "All Countries" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "China", label: "China" },
];

export default function Scholarships() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesCountry = selectedCountry === "all" || scholarship.country === selectedCountry;
    const matchesSearch =
      scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholarship.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isDeadlineSoon = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
  };

  const isDeadlinePassed = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return deadlineDate < today;
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="pt-24 pb-16">
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

        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Scholarships</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Explore available scholarships and financial aid opportunities from top universities around the world
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-primary/20 focus:outline-none focus:border-primary/50 bg-card"
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-48 rounded-lg">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {filteredScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="overflow-hidden border-primary/10 hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={scholarship.image}
                    alt={scholarship.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-primary-foreground">{scholarship.name}</h3>
                  </div>
                  {isDeadlineSoon(scholarship.deadline) && (
                    <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600">
                      Deadline Soon
                    </Badge>
                  )}
                  {isDeadlinePassed(scholarship.deadline) && (
                    <Badge className="absolute top-4 right-4 bg-destructive hover:bg-destructive/90">
                      Closed
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{scholarship.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-foreground">{scholarship.amount}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{scholarship.description}</p>

                  {/* Coverage */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-foreground">Coverage</p>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.coverage.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Dates */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-primary/10">
                    <div>
                      <p className="text-xs text-muted-foreground">Application Deadline</p>
                      <p className="text-sm font-semibold text-foreground">{formatDate(scholarship.deadline)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Results Announced</p>
                      <p className="text-sm font-semibold text-foreground">{formatDate(scholarship.resultsAnnounced)}</p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-9"
                      onClick={() => window.open(scholarship.registerUrl, "_blank")}
                      disabled={isDeadlinePassed(scholarship.deadline)}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Register
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-9"
                      onClick={() => window.open(scholarship.resultsUrl, "_blank")}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Results
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="text-xs h-9"
                      onClick={() => window.open(scholarship.applicationUrl, "_blank")}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Details
                    </Button>
                  </div>

                  {/* Status */}
                  {isDeadlineSoon(scholarship.deadline) && !isDeadlinePassed(scholarship.deadline) && (
                    <div className="p-2 rounded bg-orange-500/10 border border-orange-500/20">
                      <p className="text-xs text-orange-700 font-medium">
                        ⏰ Application deadline is approaching. Apply now to avoid missing this opportunity!
                      </p>
                    </div>
                  )}
                  {isDeadlinePassed(scholarship.deadline) && (
                    <div className="p-2 rounded bg-destructive/10 border border-destructive/20">
                      <p className="text-xs text-destructive font-medium">
                        Application deadline has passed. Check back next year.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No scholarships found matching your criteria.</p>
              <Button variant="outline" onClick={() => setSelectedCountry("all")} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
