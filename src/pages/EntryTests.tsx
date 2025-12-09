import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, School, Target, BookOpen, Search, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departments = [
  { value: "all", label: "All Departments" },
  { value: "medical", label: "Medical & Dental" },
  { value: "engineering", label: "Engineering" },
  { value: "computer science", label: "Computer Science & IT" },
  { value: "business", label: "Business & Management" },
  { value: "law", label: "Law" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "social sciences", label: "Social Sciences" },
];

const entryTests = [
  {
    id: "mdcat",
    name: "MDCAT",
    fullName: "Medical & Dental College Admission Test",
    scope: "Medical & Dental (MBBS, BDS)",
    universities: "All Public & Private Medical/Dental Colleges in Pakistan",
    frequency: "Once a year",
    typicalMonth: "August / September",
    description: "Mandatory for admission to medical and dental institutions in Pakistan."
  },
  {
    id: "ecat",
    name: "ECAT",
    fullName: "Engineering College Admission Test",
    scope: "Engineering & Technology",
    universities: "UET Lahore and its affiliated colleges, many other engineering universities in Punjab",
    frequency: "Once a year",
    typicalMonth: "July",
    description: "Required for admission to UET Lahore and accepted by various other engineering institutes."
  },
  {
    id: "nat",
    name: "NTS NAT",
    fullName: "National Aptitude Test",
    scope: "General (Arts, Science, Engineering, Medical, CS)",
    universities: "COMSATS, FAST (some campuses), IST, UMT, and many NTS associated universities",
    frequency: "Monthly (12 times a year)",
    typicalMonth: "Every Month",
    description: "A general aptitude test accepted by a wide range of universities for undergraduate admissions."
  },
  {
    id: "usat",
    name: "HEC USAT",
    fullName: "Undergraduate Studies Admission Test",
    scope: "General Undergraduate Admissions",
    universities: "Accepted by all public sector universities in Pakistan",
    frequency: "Quarterly (4 times a year)",
    typicalMonth: "January, April, July, October",
    description: "Designed by HEC to standardize admissions across public universities."
  },
  {
    id: "lat",
    name: "HEC LAT",
    fullName: "Law Admission Test",
    scope: "Law (LLB 5-Years)",
    universities: "All Public & Private Law Colleges",
    frequency: "3-4 times a year",
    typicalMonth: "Varies",
    description: "Mandatory for admission to any 5-year LLB program in Pakistan."
  },
  {
    id: "nust-net",
    name: "NUST NET",
    fullName: "NUST Entry Test",
    scope: "Engineering, CS, Social Sciences, Architecture, Business",
    universities: "National University of Sciences and Technology (NUST)",
    frequency: "3 Series per year",
    typicalMonth: "Series 1 (Dec), Series 2 (Feb-Mar), Series 3 (Jun-Jul)",
    description: "Exclusive test for admission to NUST Islamabad and its campuses."
  },
  {
    id: "giki",
    name: "GIKI Entry Test",
    fullName: "GIKI Admission Test",
    scope: "Engineering, Computer Science, Management Sciences",
    universities: "Ghulam Ishaq Khan Institute (GIKI)",
    frequency: "Once a year",
    typicalMonth: "July",
    description: "Competitive test for admission to GIKI."
  },
  {
    id: "pieas",
    name: "PIEAS Entry Test",
    fullName: "PIEAS Admission Test",
    scope: "Engineering, Computer Science",
    universities: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    frequency: "Once a year",
    typicalMonth: "June / July",
    description: "Admission test for one of Pakistan's top engineering institutes."
  }
];

const EntryTests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"test" | "university">("test");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredTests = entryTests.filter((test) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = searchType === "test" 
      ? test.name.toLowerCase().includes(query) || test.fullName.toLowerCase().includes(query)
      : test.universities.toLowerCase().includes(query);
    
    const matchesDepartment = selectedDepartment === "all" || 
      test.scope.toLowerCase().includes(selectedDepartment.toLowerCase()) ||
      (selectedDepartment === "general" && test.scope.toLowerCase().includes("general"));

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="pt-24 pb-16">
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
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4">Entry Tests Guide</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Comprehensive details about major entry tests in Pakistan, their scope, accepting universities, and schedules.
            </p>

            {/* Search Section */}
            <div className="max-w-xl mx-auto space-y-6">
              {/* Toggle Slider */}
              <div className="flex justify-center">
                <div className="bg-secondary p-1 rounded-full inline-flex relative">
                  <div
                    className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                      searchType === "test" ? "left-1" : "left-[calc(50%)]"
                    }`}
                  />
                  <button
                    onClick={() => setSearchType("test")}
                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 min-w-[140px] ${
                      searchType === "test" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Search by Test
                  </button>
                  <button
                    onClick={() => setSearchType("university")}
                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 min-w-[140px] ${
                      searchType === "university" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Search by University
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={searchType === "test" ? "Search for a test..." : "Search for a university..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl border-primary/20 focus-visible:ring-primary/20 bg-card shadow-sm"
                  />
                </div>

                {/* Department Select */}
                <div className="w-full sm:w-[200px]">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="h-12 rounded-xl border-primary/20 bg-card shadow-sm">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300 border-primary/10">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-primary">{test.name}</CardTitle>
                      <CardDescription className="text-base font-medium mt-1">{test.fullName}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {test.frequency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm text-foreground">Scope / Field</span>
                      <span className="text-sm text-muted-foreground">{test.scope}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <School className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm text-foreground">Accepted By</span>
                      <span className="text-sm text-muted-foreground">{test.universities}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm text-foreground">Typical Schedule</span>
                      <span className="text-sm text-muted-foreground">{test.typicalMonth}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold block text-sm text-foreground">Description</span>
                      <span className="text-sm text-muted-foreground">{test.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredTests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or switching the search type.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EntryTests;
