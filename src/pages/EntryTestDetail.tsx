import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Target, School, Clock, Users, AlertCircle, CheckCircle2, Calendar, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Test data with topics by qualification
const testData: Record<string, any> = {
  "nat-im": {
    name: "NAT-IM",
    fullName: "National Aptitude Test - Pre-Medical",
    banner: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&h=400&fit=crop",
    scope: "Pre-Medical (Undergraduate)",
    universities: "NTS Associated Universities",
    acceptingUniversitiesList: [
      "COMSATS University Islamabad",
      "FAST - National University of Computer & Emerging Sciences",
      "Isra University",
      "University of Management and Technology (UMT)",
      "University of Central Punjab",
      "SZABIST Islamabad",
      "BNU - Bahauddin Zakariya University",
      "Riphah International University",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "National Aptitude Test for pre-medical students covering biology, chemistry, and reasoning.",
    importance: "Accepted by multiple universities offering medical programs. Valid for 1 year.",
    whatToDo: "Prepare 4-6 months with focus on biology and chemistry concepts from FSc level.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "Biology", marks: 30, time: "45 minutes" },
      { name: "Chemistry", marks: 30, time: "45 minutes" },
      { name: "Verbal & Reasoning", marks: 40, time: "90 minutes" },
    ],
    topics: {
      medical: [
        "Cell Biology",
        "Genetics",
        "Ecology",
        "Human Body Systems",
        "Organic Chemistry",
        "Inorganic Chemistry",
        "Analytical Reasoning",
        "Verbal Comprehension",
      ],
    },
  },
  "nat-ie": {
    name: "NAT-IE",
    fullName: "National Aptitude Test - Pre-Engineering",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Pre-Engineering (Undergraduate)",
    universities: "NTS Associated Universities",
    acceptingUniversitiesList: [
      "COMSATS University Islamabad",
      "FAST - National University of Computer & Emerging Sciences",
      "University of Management and Technology (UMT)",
      "Riphah International University",
      "University of Central Punjab",
      "SZABIST Islamabad",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Aptitude test for engineering students covering mathematics, physics, and analytical reasoning.",
    importance: "Widely accepted engineering aptitude test. Valid for 1 year.",
    whatToDo: "Prepare 4-6 months focusing on FSc mathematics and physics.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "Mathematics", marks: 35, time: "60 minutes" },
      { name: "Physics", marks: 35, time: "60 minutes" },
      { name: "Verbal & Reasoning", marks: 30, time: "40 minutes" },
    ],
    topics: {
      engineering: [
        "Algebra",
        "Calculus",
        "Trigonometry",
        "Mechanics",
        "Electricity",
        "Magnetism",
        "Waves",
        "Analytical Reasoning",
      ],
    },
  },
  "nat-icom": {
    name: "NAT-ICOM",
    fullName: "National Aptitude Test - Commerce",
    banner: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=400&fit=crop",
    scope: "Commerce (Undergraduate)",
    universities: "NTS Associated Universities",
    acceptingUniversitiesList: [
      "COMSATS University Islamabad",
      "Lahore School of Economics",
      "University of Central Punjab",
      "SZABIST Islamabad",
      "University of Management and Technology (UMT)",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Aptitude test for commerce students covering accounting, economics, and reasoning.",
    importance: "Standard aptitude test for commerce admissions. Valid for 1 year.",
    whatToDo: "Prepare 4-6 months with focus on FSc accounting and economics concepts.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "Accounting", marks: 35, time: "50 minutes" },
      { name: "Economics", marks: 35, time: "50 minutes" },
      { name: "Verbal & Reasoning", marks: 30, time: "40 minutes" },
    ],
    topics: {
      business: [
        "Financial Accounting",
        "Business Economics",
        "Microeconomics",
        "Macroeconomics",
        "Quantitative Reasoning",
        "Critical Thinking",
      ],
    },
  },
  "nat-ia": {
    name: "NAT-IA",
    fullName: "National Aptitude Test - Arts & Humanities",
    banner: "https://images.unsplash.com/photo-1546410531-bb4caa6b0872?w=1200&h=400&fit=crop",
    scope: "Arts & Humanities (Undergraduate)",
    universities: "NTS Associated Universities",
    acceptingUniversitiesList: [
      "University of the Punjab",
      "Government College University",
      "National University of Modern Languages (NUML)",
      "Lahore College for Women University",
      "COMSATS University Islamabad",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Feb-Mar, May-Jun, Aug, Oct-Nov",
    description: "Aptitude test for humanities students covering verbal skills, analytical, and quantitative reasoning.",
    importance: "Accepted by universities offering arts and humanities programs. Valid for 1 year.",
    whatToDo: "Prepare 4-6 months with focus on reading comprehension and analytical thinking.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "Verbal Reasoning", marks: 40, time: "80 minutes" },
      { name: "Analytical Reasoning", marks: 30, time: "50 minutes" },
      { name: "Quantitative Reasoning", marks: 30, time: "50 minutes" },
    ],
    topics: {
      arts: [
        "Critical Reading",
        "Comprehension",
        "Grammar & Vocabulary",
        "Logical Reasoning",
        "Pattern Recognition",
        "Quantitative Analysis",
      ],
    },
  },
  "gat-general": {
    name: "GAT-General",
    fullName: "Graduate Aptitude Test - General",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop",
    scope: "MS & MPhil Programs",
    universities: "Most Public Universities",
    acceptingUniversitiesList: [
      "Quaid-i-Azam University",
      "University of Punjab",
      "National University of Sciences & Technology (NUST)",
      "Pakistan Institute of Engineering & Applied Sciences (PIEAS)",
      "University of Engineering & Technology (UET) Lahore",
      "COMSATS University",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Jan-Dec (multiple sessions)",
    description: "Graduate-level aptitude test for MS and MPhil programs covering verbal, quantitative, and analytical reasoning.",
    importance: "Essential for graduate admissions in Pakistan. Scores valid for 3 years.",
    whatToDo: "Prepare 2-3 months. Focus on analytical reasoning and graduate-level quantitative concepts.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "Verbal", marks: 30, time: "50 minutes" },
      { name: "Quantitative", marks: 35, time: "60 minutes" },
      { name: "Analytical", marks: 35, time: "50 minutes" },
    ],
    topics: {
      graduate: [
        "Advanced Reasoning",
        "Data Interpretation",
        "Mathematical Analysis",
        "Critical Reading",
        "Logical Deduction",
      ],
    },
  },
  "gat-subject": {
    name: "GAT-Subject",
    fullName: "Graduate Aptitude Test - Subject",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "MS & PhD Programs",
    universities: "Graduate Programs",
    acceptingUniversitiesList: [
      "Quaid-i-Azam University",
      "University of Engineering & Technology (UET) Lahore",
      "PIEAS",
      "NUST",
      "University of Punjab",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Jan-Dec (multiple sessions)",
    description: "Subject-specific graduate test with 30% general and 70% subject-specific content.",
    importance: "Mandatory for many PhD programs. Requires advanced subject knowledge.",
    whatToDo: "Prepare 3-4 months. Study your field extensively and practice past papers.",
    duration: "3 hours",
    totalMarks: 100,
    sections: [
      { name: "General", marks: 30, time: "50 minutes" },
      { name: "Subject-Specific", marks: 70, time: "130 minutes" },
    ],
    topics: {
      graduate: [
        "Field-Specific Advanced Topics",
        "Research Methodology",
        "Critical Analysis",
        "Subject Expertise",
        "Analytical Thinking",
      ],
    },
  },
  mdcat: {
    name: "MDCAT",
    fullName: "Medical & Dental College Admission Test",
    banner: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=1200&h=400&fit=crop",
    scope: "Medical & Dental (MBBS, BDS)",
    universities: "All Public & Private Medical/Dental Colleges in Pakistan",
    acceptingUniversitiesList: [
      "Aga Khan University Hospital (AKUH)",
      "Armed Forces Medical College (AFMC)",
      "Bahria University Medical & Dental College",
      "Benazir Bhutto Shaheed Medical University",
      "CMH Lahore Medical College",
      "College of Physicians and Surgeons Pakistan (CPSP)",
      "Dow University of Health Sciences",
      "Fatima Jinnah Medical University",
      "Federal Medical and Dental College",
      "Foundation University Medical College",
      "Faisalabad Medical University",
      "Ghulam Muhammad Maqdoom Medical College",
      "Hamdard College of Medicine & Dentistry",
      "Health Sciences Academy",
      "Holy Family Hospital Medical College",
      "King Edward Medical University",
      "Khyber Medical University",
      "Liaquat University of Medical & Health Sciences",
      "Multan Medical & Dental College",
      "Pakhtunkhwa Medical College",
      "Pakistan Medical College",
      "Rawalpindi Medical University",
      "Shaheed Zulfiqar Ali Bhutto Medical University",
      "Sindh Medical University",
      "Ziauddin University",
    ],
    frequency: "Once a year",
    typicalMonth: "August / September",
    description: "Mandatory test for admission to medical and dental institutions in Pakistan.",
    importance: "Critical for medical aspirants. Your MDCAT score determines admission to all medical and dental colleges.",
    whatToDo: "Prepare for 9-12 months, focus on Biology (60%), Chemistry (20%), Physics (20%). Take multiple practice tests.",
    duration: "3 hours 45 minutes",
    totalMarks: 300,
    sections: [
      { name: "Biology", marks: 180, time: "100 minutes" },
      { name: "Chemistry", marks: 60, time: "50 minutes" },
      { name: "Physics", marks: 60, time: "50 minutes" },
    ],
    topics: {
      medical: [
        "Cell Biology & Genetics",
        "Ecology & Evolution",
        "Human Physiology",
        "Biochemistry",
        "Pharmacology",
        "Microbiology",
        "Pathology",
        "Organic Chemistry (Biochemistry focus)",
        "Inorganic Chemistry",
        "Physical Chemistry",
      ],
      dental: [
        "Oral Biology",
        "General Biology",
        "Inorganic Chemistry",
        "Organic Chemistry",
        "Physical Chemistry",
        "General Physics",
        "Basic Physiology",
      ],
    },
  },
  ecat: {
    name: "ECAT",
    fullName: "Engineering College Admission Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Engineering (Undergraduate)",
    universities: "UET Lahore, NUST, GIKI, PIEAS, and affiliate colleges",
    acceptingUniversitiesList: [
      "University of Engineering & Technology (UET) Lahore",
      "UET Taxila",
      "UET Peshawar",
      "National University of Sciences & Technology (NUST)",
      "Ghulam Ishaq Khan Institute (GIKI)",
      "Pakistan Institute of Engineering & Applied Sciences (PIEAS)",
      "FAST - National University of Computer & Emerging Sciences",
      "NED University of Engineering & Technology",
      "COMSATS University Islamabad",
      "Air University",
      "Institute of Space Technology (IST)",
      "Bahria University Engineering Campus",
      "Abasyn University",
      "PAF Kiet Engineering College",
      "Iqra University",
      "Dawood University of Engineering & Technology",
      "Ziauddin University (Engineering)",
      "FFC Engineering College",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Engineering admission test covering mathematics, physics, chemistry/CS, and English with 100 MCQs.",
    importance: "Essential for engineering aspirants. Score determines admission to top engineering institutes.",
    whatToDo: "Prepare 6-9 months with focus on Physics and Mathematics. Solve previous papers and take mock tests regularly.",
    duration: "3 hours",
    totalMarks: 400,
    sections: [
      { name: "Mathematics", marks: 100, time: "60 minutes" },
      { name: "Physics", marks: 100, time: "60 minutes" },
      { name: "Chemistry/CS", marks: 100, time: "40 minutes" },
      { name: "English", marks: 100, time: "20 minutes" },
    ],
    topics: {
      computer_engineering: [
        "Applied Mathematics",
        "Digital Systems",
        "Programming Fundamentals",
        "Electromagnetic Theory",
        "Circuit Analysis",
        "Quantum Mechanics basics",
      ],
      mechanical_engineering: [
        "Mechanics",
        "Thermodynamics",
        "Applied Mathematics",
        "Materials Science",
        "Calculus",
        "Physics (Motion & Forces)",
      ],
      civil_engineering: [
        "Applied Mathematics",
        "Structural Analysis basics",
        "Physics (Forces & Motion)",
        "Chemistry (Materials)",
        "Calculus",
      ],
      electrical_engineering: [
        "Electromagnetic Theory",
        "Circuit Analysis",
        "Applied Mathematics",
        "Physics (Electricity & Magnetism)",
        "Advanced Calculus",
      ],
    },
  },
  nat: {
    name: "NTS NAT",
    fullName: "National Aptitude Test",
    banner: "https://images.unsplash.com/photo-1507842331343-583f20270319?w=1200&h=400&fit=crop",
    scope: "General (Arts, Science, Engineering, Medical, CS)",
    universities: "COMSATS, FAST, IST, UMT, and many NTS associated universities",
    acceptingUniversitiesList: [
      "COMSATS University Islamabad",
      "FAST - NUCES",
      "Institute of Space Technology (IST)",
      "University of Management & Technology (UMT)",
      "National University of Modern Languages (NUML)",
      "Iqra University",
      "University of Wah",
      "Shaheed Zulfiqar Ali Bhutto Institute of Science & Technology (SZABIST)",
      "Bahria University",
      "Air University",
      "University of Central Punjab",
      "Abasyn University",
      "Capital University of Science & Technology (CUST)",
      "Preston University",
      "International Islamic University (IIUI)",
      "Department of Commerce University of Punjab",
      "Pakistan Institute of Fashion Design",
    ],
    frequency: "Monthly",
    typicalMonth: "Every Month",
    description: "General aptitude test accepted by a wide range of universities for undergraduate admissions.",
    importance: "Flexible test option for various disciplines. Gives multiple attempts throughout the year.",
    whatToDo: "Prepare for aptitude, reasoning, and English. Focus on time management in multiple mock tests.",
    duration: "2 hours 45 minutes",
    totalMarks: 200,
    sections: [
      { name: "Quantitative Reasoning", marks: 70, time: "60 minutes" },
      { name: "Verbal Reasoning", marks: 70, time: "60 minutes" },
      { name: "English", marks: 60, time: "45 minutes" },
    ],
    topics: {
      engineering: [
        "Mathematical Reasoning",
        "Problem Solving",
        "Spatial Reasoning",
        "Logic",
        "English Grammar",
        "Comprehension",
      ],
      computer_science: [
        "Analytical Reasoning",
        "Mathematical Problem Solving",
        "Logic & Patterns",
        "English Communication",
        "Comprehension",
      ],
      business: [
        "Quantitative Analysis",
        "Logical Reasoning",
        "Critical Thinking",
        "English (Business Communication)",
        "Data Interpretation",
      ],
      arts: [
        "Analytical Skills",
        "Critical Reading",
        "English Comprehension",
        "Logic & Reasoning",
        "Verbal Analysis",
      ],
    },
  },
  usat: {
    name: "HEC USAT",
    fullName: "Undergraduate Studies Admission Test",
    banner: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=400&fit=crop",
    scope: "General Undergraduate Admissions",
    universities: "All public sector universities in Pakistan",
    acceptingUniversitiesList: [
      "University of Punjab",
      "University of Engineering & Technology (UET) Lahore",
      "Lahore College for Women University",
      "Government College University",
      "Quaid-i-Azam University",
      "Peshawar University",
      "Sindh University",
      "University of Karachi",
      "Balochistan University",
      "Khyber Pakhtunkhwa University",
      "Agriculture University Peshawar",
      "University of Veterinary & Animal Sciences",
      "Faisalabad Agricultural University",
      "Arid Agriculture University",
      "University of Okara",
      "University of Sargodha",
      "University of Gujrat",
      "University of Sahiwal",
      "The Islamia University Bahawalpur",
      "Hazara University",
    ],
    frequency: "Quarterly",
    typicalMonth: "January, April, July, October",
    description: "Designed by HEC to standardize admissions across public universities.",
    importance: "Required by all public universities. Fair platform for merit-based admissions.",
    whatToDo: "Prepare for domain-specific tests. Choose subjects according to your desired program.",
    duration: "2 hours 30 minutes",
    totalMarks: 200,
    sections: [
      { name: "Domain Knowledge", marks: 140, time: "120 minutes" },
      { name: "General Knowledge", marks: 60, time: "30 minutes" },
    ],
    topics: {
      engineering: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Applied Mathematics",
        "Engineering Fundamentals",
      ],
      computer_science: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Basic Programming Concepts",
      ],
      business: [
        "Mathematics",
        "Economics",
        "Business Studies",
        "English",
      ],
      sciences: [
        "Biology",
        "Chemistry",
        "Physics",
        "Mathematics",
      ],
    },
  },
  "nust-net": {
    name: "NUST NET",
    fullName: "NUST Entry Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "All NUST Undergraduate Programs",
    universities: "National University of Sciences and Technology (NUST)",
    acceptingUniversitiesList: [
      "National University of Sciences and Technology (NUST) Islamabad",
      "NUST Peshawar Campus",
      "NUST Karachi Campus",
      "NUST Multan Campus",
    ],
    frequency: "4 series/year",
    typicalMonth: "Feb (NET-1), Apr (NET-2), Jun (NET-3), Dec (NET-4)",
    description: "NUST's exclusive entry test covering mathematics, physics, English, and intelligence with 200 MCQs.",
    importance: "Only way to gain admission to NUST. Multiple attempts available annually.",
    whatToDo: "Prepare 3-4 months. Focus on analytical and reasoning skills. Practice with NUST sample papers.",
    duration: "3 hours",
    totalMarks: 200,
    sections: [
      { name: "Mathematics", marks: 60, time: "60 minutes" },
      { name: "Physics", marks: 60, time: "60 minutes" },
      { name: "English & Intelligence", marks: 80, time: "60 minutes" },
    ],
    topics: {
      engineering: [
        "Algebra & Calculus",
        "Mechanics",
        "Electromagnetism",
        "English Grammar",
        "Logical Reasoning",
      ],
      computer_science: [
        "Discrete Mathematics",
        "Physics Fundamentals",
        "Critical Thinking",
        "English Communication",
        "Pattern Recognition",
      ],
    },
  },
  "fast-test": {
    name: "FAST Admission Test",
    fullName: "FAST Entry Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Computer Science, Engineering, Business",
    universities: "FAST - National University of Computer & Emerging Sciences",
    acceptingUniversitiesList: [
      "FAST Islamabad Campus",
      "FAST Lahore Campus",
      "FAST Karachi Campus",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "FAST entry test covering mathematics, English, logic, and physics for CS/engineering programs.",
    importance: "Required for FAST admission. Highly competitive test.",
    whatToDo: "Prepare 5-6 months. Focus on logic and discrete mathematics. Practice programming basics.",
    duration: "3 hours",
    totalMarks: 200,
    sections: [
      { name: "Mathematics", marks: 60, time: "60 minutes" },
      { name: "English & Logic", marks: 60, time: "60 minutes" },
      { name: "Physics (if Engineering)", marks: 80, time: "60 minutes" },
    ],
    topics: {
      computer_science: [
        "Discrete Mathematics",
        "Logic & Proofs",
        "English Grammar",
        "Analytical Thinking",
        "Basic Programming Concepts",
      ],
      engineering: [
        "Applied Mathematics",
        "Physics",
        "Logic",
        "English Communication",
        "Problem Solving",
      ],
    },
  },
  giki: {
    name: "GIKI Entry Test",
    fullName: "Ghulam Ishaq Khan Institute Entry Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Engineering, Computer Science",
    universities: "Ghulam Ishaq Khan Institute (GIKI)",
    acceptingUniversitiesList: [
      "Ghulam Ishaq Khan Institute (GIKI) Topi",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "GIKI entry test covering mathematics, physics, English, and analytical reasoning.",
    importance: "Highly competitive test for one of Pakistan's top engineering institutes.",
    whatToDo: "Prepare 6-9 months. Emphasis on analytical and reasoning skills. Regular practice papers essential.",
    duration: "3 hours",
    totalMarks: 200,
    sections: [
      { name: "Mathematics", marks: 70, time: "60 minutes" },
      { name: "Physics", marks: 70, time: "60 minutes" },
      { name: "English & Analytical", marks: 60, time: "40 minutes" },
    ],
    topics: {
      engineering: [
        "Advanced Algebra",
        "Calculus",
        "Mechanics",
        "Waves & Optics",
        "Analytical Reasoning",
      ],
      computer_science: [
        "Discrete Mathematics",
        "Physics Fundamentals",
        "Logical Reasoning",
        "English Comprehension",
        "Pattern Analysis",
      ],
    },
  },
  pieas: {
    name: "PIEAS Entry Test",
    fullName: "Pakistan Institute of Engineering & Applied Sciences Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Engineering, Computer Science, Physics",
    universities: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
    acceptingUniversitiesList: [
      "Pakistan Institute of Engineering and Applied Sciences (PIEAS) Islamabad",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "June-July",
    description: "Highly selective PIEAS test with MCQs and interview rounds covering mathematics, physics, and English.",
    importance: "Most selective engineering institute in Pakistan. Requires exceptional academic performance.",
    whatToDo: "Prepare 9-12 months. Secure >85% in PIEAS test. Strong academic record required for interview.",
    duration: "3 hours (written) + interview",
    totalMarks: 300,
    sections: [
      { name: "Mathematics", marks: 100, time: "75 minutes" },
      { name: "Physics", marks: 100, time: "75 minutes" },
      { name: "English", marks: 100, time: "30 minutes" },
      { name: "Interview", marks: 0, time: "Later rounds" },
    ],
    topics: {
      engineering: [
        "Advanced Algebra",
        "Trigonometry",
        "Calculus",
        "Mechanics",
        "Thermodynamics",
        "Electromagnetic Theory",
      ],
      computer_science: [
        "Discrete Mathematics",
        "Quantum Mechanics basics",
        "Physics",
        "Analytical Thinking",
      ],
    },
  },
  "sat": {
    name: "SAT",
    fullName: "Scholastic Assessment Test",
    banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
    scope: "International Universities",
    universities: "US and international universities accepting SAT",
    acceptingUniversitiesList: [
      "US Universities (MIT, Stanford, Harvard, Princeton, Yale, etc.)",
      "Canadian Universities",
      "UK Universities (alternative to IELTS/TOEFL)",
      "Australian Universities",
      "International schools and universities worldwide",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Mar, May, Jun, Aug, Oct, Dec",
    description: "Standardized test for international university admissions with 1600 score scale.",
    importance: "Essential for US university admissions. Widely accepted globally.",
    whatToDo: "Prepare 3-4 months. Use official CollegeBoard materials. Take practice tests regularly.",
    duration: "3 hours",
    totalMarks: 1600,
    sections: [
      { name: "Reading & Writing", marks: 800, time: "94 minutes" },
      { name: "Mathematics", marks: 800, time: "80 minutes" },
    ],
    topics: {
      international: [
        "Reading Comprehension",
        "Grammar & Vocabulary",
        "Algebra",
        "Advanced Mathematics",
        "Word Problems",
      ],
    },
  },
  "act": {
    name: "ACT",
    fullName: "American College Test",
    banner: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=400&fit=crop",
    scope: "International Universities",
    universities: "US and international universities",
    acceptingUniversitiesList: [
      "US Universities",
      "Canadian Universities",
      "International universities worldwide",
      "Some UK universities",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Feb, Apr, Jun, Jul, Sep, Oct, Dec",
    description: "American college test with composite score (1-36) covering English, mathematics, reading, and science.",
    importance: "Alternative to SAT for US university admissions. Growing international acceptance.",
    whatToDo: "Prepare 3-4 months. Practice with official ACT materials. Understand timing and pacing.",
    duration: "2 hours 55 minutes",
    totalMarks: 36,
    sections: [
      { name: "English", marks: 36, time: "45 minutes" },
      { name: "Mathematics", marks: 36, time: "60 minutes" },
      { name: "Reading", marks: 36, time: "35 minutes" },
      { name: "Science", marks: 36, time: "35 minutes" },
    ],
    topics: {
      international: [
        "Grammar & Usage",
        "Rhetorical Skills",
        "Pre-algebra to Trigonometry",
        "Reading Comprehension",
        "Scientific Reasoning",
      ],
    },
  },
  "gre": {
    name: "GRE General",
    fullName: "Graduate Record Examination",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop",
    scope: "Graduate Programs",
    universities: "International graduate programs",
    acceptingUniversitiesList: [
      "US graduate schools",
      "Canadian universities",
      "UK universities",
      "Australian universities",
      "Universities worldwide for graduate programs",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Year-round (computer-based)",
    description: "Graduate test with scaled scores for verbal, quantitative, and analytical writing for MS/PhD programs.",
    importance: "Standard requirement for graduate programs worldwide. Valid for 5 years.",
    whatToDo: "Prepare 2-3 months. Strong vocabulary and mathematical reasoning important.",
    duration: "3 hours 45 minutes",
    totalMarks: 340,
    sections: [
      { name: "Verbal Reasoning", marks: 170, time: "60 minutes" },
      { name: "Quantitative Reasoning", marks: 170, time: "70 minutes" },
      { name: "Analytical Writing", marks: 0, time: "60 minutes" },
    ],
    topics: {
      graduate: [
        "Advanced Vocabulary",
        "Reading Comprehension",
        "Arithmetic",
        "Algebra",
        "Geometry",
        "Data Analysis",
        "Essay Writing",
      ],
    },
  },
  "gmat": {
    name: "GMAT",
    fullName: "Graduate Management Admission Test",
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop",
    scope: "MBA & Business Graduate Programs",
    universities: "Business schools worldwide",
    acceptingUniversitiesList: [
      "Top MBA programs globally",
      "Business school graduate programs",
      "International management programs",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "Year-round",
    description: "Graduate business test with scaled scores covering quantitative, verbal, IR, and analytical writing.",
    importance: "Essential for top MBA programs worldwide. Valid for 5 years.",
    whatToDo: "Prepare 2-3 months. Focus on business-oriented questions. Practice with official GMAC materials.",
    duration: "3 hours 30 minutes",
    totalMarks: 800,
    sections: [
      { name: "Quantitative", marks: 0, time: "62 minutes" },
      { name: "Verbal", marks: 0, time: "65 minutes" },
      { name: "Integrated Reasoning", marks: 0, time: "30 minutes" },
      { name: "Analytical Writing", marks: 0, time: "30 minutes" },
    ],
    topics: {
      graduate: [
        "Business Mathematics",
        "Business English",
        "Data Analysis",
        "Logical Reasoning",
        "Essay Writing",
      ],
    },
  },
  "etea": {
    name: "ETEA Entry Test",
    fullName: "Engineering, Technical & Educational Admissions Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Engineering & Computer Science (KPK)",
    universities: "Engineering colleges in KPK",
    acceptingUniversitiesList: [
      "UET Peshawar",
      "Peshawar University Engineering",
      "Abasyn University Engineering",
      "Engineering colleges across KPK",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "July-August",
    description: "Engineering test with 90 MCQs totaling 100 marks for KPK region.",
    importance: "Required for engineering admission in KPK. 1 mark per MCQ, no negative marking.",
    whatToDo: "Prepare 4-6 months. Focus on mathematics and physics. Time management crucial.",
    duration: "2 hours",
    totalMarks: 100,
    sections: [
      { name: "Mathematics", marks: 35, time: "45 minutes" },
      { name: "Physics", marks: 35, time: "45 minutes" },
      { name: "Chemistry/CS & English", marks: 30, time: "30 minutes" },
    ],
    topics: {
      engineering: [
        "Calculus",
        "Algebra",
        "Mechanics",
        "Electricity & Magnetism",
        "Chemistry",
        "English Basics",
      ],
    },
  },
  "iba-test": {
    name: "IBA Aptitude Test",
    fullName: "Institute of Business Administration Test",
    banner: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=400&fit=crop",
    scope: "Business & Economics",
    universities: "Institute of Business Administration",
    acceptingUniversitiesList: [
      "Institute of Business Administration (IBA) Karachi",
      "IBA Lahore",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "January, March-April",
    description: "Business aptitude test with 150 MCQs covering advanced mathematics and English.",
    importance: "Highly competitive. IBA is among Pakistan's top business schools.",
    whatToDo: "Prepare 3-4 months. Strong mathematics and English required. Sectional cutoffs apply.",
    duration: "2 hours",
    totalMarks: 100,
    sections: [
      { name: "Quantitative (Math)", marks: 60, time: "80 minutes" },
      { name: "Verbal (English)", marks: 40, time: "40 minutes" },
    ],
    topics: {
      business: [
        "Advanced Algebra",
        "Mathematical Problem Solving",
        "English Grammar",
        "Business English",
        "Comprehension",
      ],
    },
  },
  "lums": {
    name: "LUMS Test",
    fullName: "Lahore University of Management Sciences Test",
    banner: "https://images.unsplash.com/photo-1554224311-beee415c201f?w=1200&h=400&fit=crop",
    scope: "Multi-discipline Programs",
    universities: "LUMS (SSE, SDSB, HSS, SAHSOL)",
    acceptingUniversitiesList: [
      "Lahore University of Management Sciences (LUMS)",
    ],
    frequency: "Once per admission cycle",
    typicalMonth: "February-March",
    description: "LUMS test with 120 MCQs covering mathematics, English, and science aptitude.",
    importance: "LUMS is one of Pakistan's most prestigious universities. Very competitive admission.",
    whatToDo: "Prepare 6-9 months. No negative marking. Strong academic record and interview important.",
    duration: "2 hours 30 minutes",
    totalMarks: 100,
    sections: [
      { name: "Mathematics", marks: 40, time: "60 minutes" },
      { name: "English", marks: 30, time: "45 minutes" },
      { name: "Science Aptitude", marks: 30, time: "45 minutes" },
    ],
    topics: {
      multidiscipline: [
        "Algebra & Calculus",
        "English Grammar & Comprehension",
        "Science Concepts",
        "Critical Thinking",
        "Problem Solving",
      ],
    },
  },
  "comsats": {
    name: "COMSATS Test",
    fullName: "COMSATS University Admission Test",
    banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop",
    scope: "Science, Engineering, Business",
    universities: "COMSATS University Islamabad",
    acceptingUniversitiesList: [
      "COMSATS University Islamabad",
      "COMSATS Lahore Campus",
      "COMSATS Wah",
    ],
    frequency: "Multiple times/year",
    typicalMonth: "April, June, July",
    description: "COMSATS test with 120 MCQs covering mathematics, English, general knowledge, and subject content.",
    importance: "Multiple attempts available. 1 mark per MCQ, no negative marking.",
    whatToDo: "Prepare 3-4 months. Subject-specific content depends on program. Time management important.",
    duration: "2 hours 30 minutes",
    totalMarks: 100,
    sections: [
      { name: "Mathematics", marks: 40, time: "60 minutes" },
      { name: "English", marks: 30, time: "40 minutes" },
      { name: "General & Subject Knowledge", marks: 30, time: "50 minutes" },
    ],
    topics: {
      engineering: [
        "Applied Mathematics",
        "Physics",
        "Chemistry",
        "English Communication",
        "General Knowledge",
      ],
      computer_science: [
        "Discrete Mathematics",
        "Logic",
        "English",
        "General Knowledge",
        "Basic CS Concepts",
      ],
      business: [
        "Mathematics",
        "Economics",
        "Business Studies",
        "English",
        "General Knowledge",
      ],
    },
  },
};

const qualificationOptions: Record<string, { label: string; value: string }[]> = {
  mdcat: [
    { label: "MBBS (Medical)", value: "medical" },
    { label: "BDS (Dental)", value: "dental" },
  ],
  ecat: [
    { label: "Computer Engineering", value: "computer_engineering" },
    { label: "Mechanical Engineering", value: "mechanical_engineering" },
    { label: "Civil Engineering", value: "civil_engineering" },
    { label: "Electrical Engineering", value: "electrical_engineering" },
  ],
  nat: [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Business", value: "business" },
    { label: "Arts", value: "arts" },
  ],
  usat: [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Business", value: "business" },
    { label: "Sciences", value: "sciences" },
  ],
  "nat-im": [
    { label: "Medical", value: "medical" },
  ],
  "nat-ie": [
    { label: "Engineering", value: "engineering" },
  ],
  "nat-icom": [
    { label: "Business", value: "business" },
  ],
  "nat-ia": [
    { label: "Arts", value: "arts" },
  ],
  "gat-general": [
    { label: "Graduate", value: "graduate" },
  ],
  "gat-subject": [
    { label: "Graduate", value: "graduate" },
  ],
  "nust-net": [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
  ],
  "fast-test": [
    { label: "Computer Science", value: "computer_science" },
    { label: "Engineering", value: "engineering" },
  ],
  giki: [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
  ],
  pieas: [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
  ],
  "sat": [
    { label: "International", value: "international" },
  ],
  "act": [
    { label: "International", value: "international" },
  ],
  "gre": [
    { label: "Graduate", value: "graduate" },
  ],
  "gmat": [
    { label: "Graduate", value: "graduate" },
  ],
  "etea": [
    { label: "Engineering", value: "engineering" },
  ],
  "iba-test": [
    { label: "Business", value: "business" },
  ],
  "lums": [
    { label: "Multidiscipline", value: "multidiscipline" },
  ],
  "comsats": [
    { label: "Engineering", value: "engineering" },
    { label: "Computer Science", value: "computer_science" },
    { label: "Business", value: "business" },
  ],
};

export default function EntryTestDetail() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = testId ? testData[testId] : null;
  const [selectedQualification, setSelectedQualification] = useState<string>("");

  if (!test) {
    return (
      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Test not found</h1>
            <Button onClick={() => navigate("/entry-tests")}>Go Back to Entry Tests</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const topicsByQualification = test.topics || {};
  const availableQualifications = qualificationOptions[testId] || [];
  const displayQualification = selectedQualification || Object.keys(topicsByQualification)[0];
  const displayTopics = topicsByQualification[displayQualification] || [];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main className="pb-16">
        {/* Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src={test.banner}
            alt={test.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <Button
            onClick={() => navigate("/entry-tests")}
            variant="ghost"
            size="sm"
            className="absolute top-6 left-6 z-10 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="container px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          {/* Header Card */}
          <Card className="mb-8 border-primary/10">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-4xl font-bold text-primary mb-2">{test.name}</CardTitle>
                  <CardDescription className="text-lg">{test.fullName}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 h-fit">
                  {test.frequency}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 rounded-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="tips">Preparation</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Description Box */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-accent" />
                    What is {test.name}?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{test.description}</p>
                  
                  {/* Key Details Box */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4 space-y-3">
                    <div>
                      <span className="font-bold text-primary">Importance:</span>
                      <p className="text-muted-foreground mt-1">{test.importance}</p>
                    </div>
                    <div className="pt-2 border-t border-primary/10">
                      <span className="font-bold text-primary">When to Apply:</span>
                      <p className="text-muted-foreground mt-1">{test.typicalMonth}</p>
                    </div>
                    <div className="pt-2 border-t border-primary/10">
                      <span className="font-bold text-primary">What to Do:</span>
                      <p className="text-muted-foreground mt-1">{test.whatToDo}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Universities Dropdown */}
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5 text-accent" />
                    Universities That Accept {test.name}
                  </CardTitle>
                  <CardDescription>
                    Click to see the list of universities accepting this test's marks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Collapsible className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between rounded-xl h-12 border-primary/20 hover:border-primary/50"
                      >
                        <span className="flex items-center gap-2">
                          <School className="w-4 h-4" />
                          View List of Universities ({test.acceptingUniversitiesList.length})
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-2">
                      <div className="grid sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto pr-2">
                        {test.acceptingUniversitiesList.map((university: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            <span className="text-sm text-foreground">{university}</span>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Quick Info Cards */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{test.scope}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{test.duration}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">Total Marks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{test.totalMarks}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Structure Tab */}
            <TabsContent value="structure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Exam Structure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Duration</p>
                      <p className="text-2xl font-bold text-primary">{test.duration}</p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Total Marks</p>
                      <p className="text-2xl font-bold text-accent">{test.totalMarks}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {test.sections.map((section: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-primary/10 rounded-lg">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold">{section.name}</h4>
                          <p className="text-sm text-muted-foreground">{section.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{section.marks}</p>
                          <p className="text-xs text-muted-foreground">marks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Topics Tab */}
            <TabsContent value="topics" className="space-y-6">
              {availableQualifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent" />
                      Select Your Qualification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedQualification} onValueChange={setSelectedQualification}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Choose your desired qualification" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableQualifications.map((qual) => (
                          <SelectItem key={qual.value} value={qual.value}>
                            {qual.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-accent" />
                    Topics Included
                  </CardTitle>
                  <CardDescription>
                    Comprehensive list of topics covered for {availableQualifications.find(q => q.value === displayQualification)?.label || "this test"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {displayTopics.map((topic: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preparation Tips Tab */}
            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    Preparation Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Create a Study Schedule</h4>
                        <p className="text-sm text-muted-foreground">Plan 12-15 hours per week with focused study sessions</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Master Fundamentals</h4>
                        <p className="text-sm text-muted-foreground">Build strong foundation in core topics before advanced concepts</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Practice Consistently</h4>
                        <p className="text-sm text-muted-foreground">Solve 500+ problems and 10+ full mock papers</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Analyze Mistakes</h4>
                        <p className="text-sm text-muted-foreground">Review errors thoroughly to avoid repeating them</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Manage Time Wisely</h4>
                        <p className="text-sm text-muted-foreground">Practice time management techniques during mock tests</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/30 bg-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Use quality study materials and refer to recommended books</p>
                  <p>• Join a study group to share knowledge and stay motivated</p>
                  <p>• Take care of your health - sleep, exercise, and nutrition matter</p>
                  <p>• Start preparation 9-12 months before the test</p>
                  <p>• Consider enrolling in coaching classes if needed</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
