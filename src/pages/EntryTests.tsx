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
    id: "nat-im",
    name: "NAT-IM",
    fullName: "National Aptitude Test - Pre-Medical",
    scope: "Pre-Medical (Undergraduate)",
    universities: "NTS Associated Universities",
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "General aptitude test for medical students covering biology, chemistry, verbal, quantitative, and analytical reasoning."
  },
  {
    id: "nat-ie",
    name: "NAT-IE",
    fullName: "National Aptitude Test - Pre-Engineering",
    scope: "Pre-Engineering (Undergraduate)",
    universities: "NTS Associated Universities",
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Engineering aptitude test covering mathematics, physics, verbal, quantitative, and analytical reasoning."
  },
  {
    id: "nat-icom",
    name: "NAT-ICOM",
    fullName: "National Aptitude Test - Commerce",
    scope: "Commerce (Undergraduate)",
    universities: "NTS Associated Universities",
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Commerce aptitude test covering accounting, economics, verbal, quantitative, and analytical reasoning."
  },
  {
    id: "nat-ia",
    name: "NAT-IA",
    fullName: "National Aptitude Test - Arts & Humanities",
    scope: "Arts & Humanities (Undergraduate)",
    universities: "NTS Associated Universities",
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Humanities aptitude test covering verbal, analytical, and quantitative reasoning."
  },
  {
    id: "gat-general",
    name: "GAT-General",
    fullName: "Graduate Aptitude Test - General",
    scope: "MS & MPhil Programs",
    universities: "Most Public Universities",
    frequency: "Multiple times/year",
    typicalMonth: "Jan-Dec (multiple sessions)",
    description: "Graduate aptitude test for MS and MPhil programs covering verbal, quantitative, and analytical reasoning."
  },
  {
    id: "gat-subject",
    name: "GAT-Subject",
    fullName: "Graduate Aptitude Test - Subject",
    scope: "MS & PhD Programs",
    universities: "Graduate Programs",
    frequency: "Multiple times/year",
    typicalMonth: "Jan-Dec (multiple sessions)",
    description: "Subject-specific test for advanced graduate programs including 30% general and 70% subject-specific content."
  },
  {
    id: "ecat",
    name: "ECAT",
    fullName: "Engineering College Admission Test",
    scope: "Engineering (Undergraduate)",
    universities: "UET Lahore, NUST, GIKI, PIEAS, and affiliate colleges",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Major engineering admission test covering mathematics, physics, chemistry/CS, and English with 100 MCQs totaling 400 marks."
  },
  {
    id: "nust-net",
    name: "NUST NET",
    fullName: "NUST Entry Test",
    scope: "All NUST Undergraduate Programs",
    universities: "National University of Sciences and Technology (NUST)",
    frequency: "4 series/year",
    typicalMonth: "Feb (NET-1), Apr (NET-2), Jun (NET-3), Dec (NET-4)",
    description: "NUST's exclusive entry test covering mathematics, physics, English, and intelligence assessment."
  },
  {
    id: "fast-test",
    name: "FAST Admission Test",
    fullName: "FAST Entry Test",
    scope: "Computer Science, Engineering, Business",
    universities: "FAST - National University of Computer & Emerging Sciences",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Test for computer science, engineering, and business programs covering mathematics, English, logic, and physics."
  },
  {
    id: "giki",
    name: "GIKI Entry Test",
    fullName: "Ghulam Ishaq Khan Institute Entry Test",
    scope: "Engineering, Computer Science",
    universities: "Ghulam Ishaq Khan Institute (GIKI)",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Competitive test for GIKI covering mathematics, physics, English, and analytical reasoning."
  },
  {
    id: "pieas",
    name: "PIEAS Entry Test",
    fullName: "Pakistan Institute of Engineering & Applied Sciences Test",
    scope: "Engineering, Computer Science, Physics",
    universities: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Highly selective test for PIEAS including MCQs and interview rounds."
  },
  {
    id: "szabist",
    name: "SZABIST Test",
    fullName: "Suleman Dawood School of Business IT Test",
    scope: "Business, Computer Science, Social Sciences",
    universities: "SZABIST Islamabad",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Test covering English, mathematics, and IQ with no negative marking policy."
  },
  {
    id: "habib",
    name: "Habib University Test",
    fullName: "Habib University Admission Test",
    scope: "Liberal Arts, Computer Science, Electrical Engineering",
    universities: "Habib University",
    frequency: "Once per admission cycle",
    typicalMonth: "January-February",
    description: "Test with MCQs and written components covering English, mathematics, and critical thinking."
  },
  {
    id: "air-uni",
    name: "Air University CBT",
    fullName: "Air University Computer-Based Test",
    scope: "Engineering, Computer Science, Business",
    universities: "Air University Pakistan",
    frequency: "Once per admission cycle",
    typicalMonth: "Mar-Apr, Jun-Jul",
    description: "Computer-based test with 100 MCQs covering mathematics, physics, English, and IQ."
  },
  {
    id: "bahria",
    name: "Bahria University CBT",
    fullName: "Bahria University Computer-Based Test",
    scope: "Engineering, Computer Science, Business, Social Sciences",
    universities: "Bahria University Pakistan",
    frequency: "Once per admission cycle",
    typicalMonth: "Apr-May, Jul-Aug",
    description: "Computer-based test with 100 MCQs covering mathematics, English, IQ, and subject-based content."
  },
  {
    id: "uet-taxila",
    name: "UET Taxila Test",
    fullName: "University of Engineering & Technology Taxila Entry Test",
    scope: "Engineering (Undergraduate)",
    universities: "UET Taxila Campus",
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Engineering test with 100 MCQs totaling 400 marks covering mathematics, physics, chemistry, and English."
  },
  {
    id: "ucp-test",
    name: "UCP Admission Test",
    fullName: "University of Central Punjab Test",
    scope: "Business, Computer Science, Social Sciences",
    universities: "University of Central Punjab",
    frequency: "Once per admission cycle",
    typicalMonth: "May-August",
    description: "Test with 100 MCQs covering English, mathematics, and IQ with no negative marking."
  },
  {
    id: "sat",
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    scope: "International Universities",
    universities: "US and international universities accepting SAT",
    frequency: "Multiple times/year",
    typicalMonth: "Mar, May, Jun, Aug, Oct, Dec",
    description: "Standardized test with 1600 score scale covering reading/writing and mathematics."
  },
  {
    id: "act",
    name: "ACT",
    fullName: "American College Test",
    scope: "International Universities",
    universities: "US and international universities",
    frequency: "Multiple times/year",
    typicalMonth: "Feb, Apr, Jun, Jul, Sep, Oct, Dec",
    description: "Test with composite score (1-36) covering English, mathematics, reading, and science."
  },
  {
    id: "gre",
    name: "GRE General",
    fullName: "Graduate Record Examination",
    scope: "Graduate Programs",
    universities: "International graduate programs",
    frequency: "Multiple times/year",
    typicalMonth: "Year-round (computer-based)",
    description: "Graduate test with scaled scores for verbal, quantitative, and analytical writing."
  },
  {
    id: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    scope: "MBA & Business Graduate Programs",
    universities: "Business schools worldwide",
    frequency: "Multiple times/year",
    typicalMonth: "Year-round",
    description: "Test with scaled scores covering quantitative, verbal, IR, and analytical writing assessment."
  },
  {
    id: "etea",
    name: "ETEA Entry Test",
    fullName: "Engineering, Technical & Educational Admissions Test",
    scope: "Engineering & Computer Science (KPK)",
    universities: "Engineering colleges in KPK",
    frequency: "Once per admission cycle",
    typicalMonth: "July-August",
    description: "Test with 90 MCQs totaling 100 marks covering mathematics, physics, chemistry/CS, and English."
  },
  {
    id: "iba-test",
    name: "IBA Aptitude Test",
    fullName: "Institute of Business Administration Test",
    scope: "Business & Economics",
    universities: "Institute of Business Administration",
    frequency: "Multiple times/year",
    typicalMonth: "January, March-April",
    description: "Test with 150 MCQs covering advanced mathematics and English with sectional cutoffs."
  },
  {
    id: "lums",
    name: "LUMS Test",
    fullName: "Lahore University of Management Sciences Test",
    scope: "Multi-discipline Programs",
    universities: "LUMS (SSE, SDSB, HSS, SAHSOL)",
    frequency: "Once per admission cycle",
    typicalMonth: "February-March",
    description: "Test with 120 MCQs covering mathematics, English, and science aptitude with no negative marking."
  },
  {
    id: "comsats",
    name: "COMSATS Test",
    fullName: "COMSATS University Admission Test",
    scope: "Science, Engineering, Business",
    universities: "COMSATS University Islamabad",
    frequency: "Multiple times/year",
    typicalMonth: "April, June, July",
    description: "Test with 120 MCQs covering mathematics, English, general knowledge, and subject-based content."
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
              <Card
                key={test.id}
                className="hover:shadow-lg transition-shadow duration-300 border-primary/10 cursor-pointer hover:border-primary/30"
                onClick={() => navigate(`/entry-tests/${test.id}`)}
              >
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
