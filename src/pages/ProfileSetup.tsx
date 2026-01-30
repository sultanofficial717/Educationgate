import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Camera,
  User,
  Target,
  Loader2,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Plus,
  Trash2,
} from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade: string;
}

interface Certification {
  id: string;
  certName: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
}

interface LanguageTest {
  id: string;
  language: string;
  testType: string;
  testDate: string;
  scores: {
    [key: string]: number | null;
  };
}

interface ProfileData {
  fullName: string;
  headline: string;
  bio: string;
  phone: string;
  location: string;
  email: string;
  website: string;
  profileImage: string | null;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  languageTests: LanguageTest[];
  testScores: {
    ielts: {
      hasScore: boolean;
      overallBand: number | null;
      listeningBand: number | null;
      readingBand: number | null;
      writingBand: number | null;
      speakingBand: number | null;
      testDate: string;
    };
    entryTest: {
      hasScore: boolean;
      testName: string;
      obtainedMarks: number | null;
      totalMarks: number | null;
      percentage: number | null;
      testDate: string;
    };
  };
}

const steps = ["Basic Info", "Experience & Education", "Skills & Certifications", "Test Scores", "Review"];

export default function ProfileSetup() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skillInput, setSkillInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Load existing profile data if available
  const getInitialProfileData = (): ProfileData => {
    const savedProfile = localStorage.getItem("profileSetup");
    if (savedProfile) {
      setIsEditMode(true);
      const data = JSON.parse(savedProfile);
      // Ensure languageTests array exists
      if (!data.languageTests) {
        data.languageTests = [];
      }
      return data;
    }
    return {
      fullName: user?.name || "",
      headline: "",
      bio: "",
      phone: "",
      location: "",
      email: user?.email || "",
      website: "",
      profileImage: null,
      skills: [],
      experiences: [],
      education: [],
      certifications: [],
      languageTests: [],
      testScores: {
        ielts: {
          hasScore: false,
          overallBand: null,
          listeningBand: null,
          readingBand: null,
          writingBand: null,
          speakingBand: null,
          testDate: "",
        },
        entryTest: {
          hasScore: false,
          testName: "",
          obtainedMarks: null,
          totalMarks: null,
          percentage: null,
          testDate: "",
        },
      },
    };
  };

  const [profileData, setProfileData] = useState<ProfileData>(getInitialProfileData());

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    };
    setProfileData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
    }));
  };

  const removeExperience = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      grade: "",
    };
    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const removeEducation = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const updateEducation = (id: string, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      certName: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
    };
    setProfileData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  const removeCertification = (id: string) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  const updateCertification = (id: string, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const getScoreFieldsForTestType = (testType: string): Record<string, null> => {
    const scoreFields: Record<string, Record<string, null>> = {
      IELTS: {
        overall: null,
        listening: null,
        reading: null,
        writing: null,
        speaking: null,
      },
      PTE: {
        overall: null,
        listening: null,
        reading: null,
        writing: null,
        speaking: null,
      },
      TOEFL: {
        overall: null,
        reading: null,
        listening: null,
        writing: null,
        speaking: null,
      },
      Duolingo: {
        overall: null,
      },
      Cambridge: {
        overall: null,
        reading: null,
        writing: null,
        listening: null,
        speaking: null,
      },
      GOETHE: {
        overall: null,
        reading: null,
        writing: null,
        listening: null,
        speaking: null,
      },
      DELF: {
        overall: null,
        reading: null,
        writing: null,
        listening: null,
        speaking: null,
      },
      DELE: {
        overall: null,
        reading: null,
        writing: null,
        listening: null,
        speaking: null,
      },
      HSK: {
        level: null,
        score: null,
      },
      Other: {
        score: null,
      },
    };
    return scoreFields[testType] || { score: null };
  };

  const RenderScoreFields: React.FC<{
    test: LanguageTest;
    onScoreChange: (field: string, value: string) => void;
  }> = ({ test, onScoreChange }) => {
    const getInputConfig = (testType: string) => {
      const configs: Record<string, Array<{ label: string; max: string }>> = {
        IELTS: [
          { label: "Overall Band", max: "9" },
          { label: "Listening", max: "9" },
          { label: "Reading", max: "9" },
          { label: "Writing", max: "9" },
          { label: "Speaking", max: "9" },
        ],
        PTE: [
          { label: "Overall Score", max: "90" },
          { label: "Listening", max: "90" },
          { label: "Reading", max: "90" },
          { label: "Writing", max: "90" },
          { label: "Speaking", max: "90" },
        ],
        TOEFL: [
          { label: "Overall Score", max: "120" },
          { label: "Reading", max: "30" },
          { label: "Listening", max: "30" },
          { label: "Writing", max: "30" },
          { label: "Speaking", max: "30" },
        ],
        Duolingo: [{ label: "Overall Score", max: "160" }],
        Cambridge: [
          { label: "Overall Score", max: "230" },
          { label: "Reading", max: "230" },
          { label: "Writing", max: "230" },
          { label: "Listening", max: "230" },
          { label: "Speaking", max: "230" },
        ],
        GOETHE: [
          { label: "Overall Score", max: "300" },
          { label: "Reading", max: "300" },
          { label: "Writing", max: "300" },
          { label: "Listening", max: "300" },
          { label: "Speaking", max: "300" },
        ],
        DELF: [
          { label: "Overall Score", max: "300" },
          { label: "Reading", max: "300" },
          { label: "Writing", max: "300" },
          { label: "Listening", max: "300" },
          { label: "Speaking", max: "300" },
        ],
        DELE: [
          { label: "Overall Score", max: "300" },
          { label: "Reading", max: "300" },
          { label: "Writing", max: "300" },
          { label: "Listening", max: "300" },
          { label: "Speaking", max: "300" },
        ],
        HSK: [
          { label: "HSK Level", max: "6" },
          { label: "Score", max: "300" },
        ],
        Other: [{ label: "Score", max: "100" }],
      };
      return configs[testType] || [{ label: "Score", max: "100" }];
    };

    const fields = getInputConfig(test.testType);

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fields.map((field, idx) => (
          <div key={idx}>
            <Label className="text-sm text-foreground">{field.label}</Label>
            <Input
              type="number"
              step={test.testType === "IELTS" || test.testType === "PTE" ? "0.5" : "1"}
              min="0"
              max={field.max}
              placeholder={`0-${field.max}`}
              onChange={(e) =>
                onScoreChange(
                  Object.keys(test.scores)[idx] || `score_${idx}`,
                  e.target.value
                )
              }
              className="bg-background border-border text-foreground mt-1"
            />
          </div>
        ))}
      </div>
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!profileData.fullName.trim() || profileData.fullName.length < 3) {
        newErrors.fullName = "Name must be at least 3 characters";
      }
      if (!profileData.headline.trim()) {
        newErrors.headline = "Headline is required";
      }
      if (!profileData.location.trim()) {
        newErrors.location = "Location is required";
      }
      if (profileData.phone && !/^\d{10,15}$/.test(profileData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone must be 10-15 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(steps.length - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("profileSetup", JSON.stringify(profileData));
      
      const updatedUser = {
        ...user,
        profileComplete: true,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      navigate("/student-dashboard");
    } catch (error) {
      setErrors({ submit: "Failed to save profile" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {isEditMode ? "Edit Your Profile" : "Complete Your Profile"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isEditMode ? "Update your professional information" : "Build your professional profile"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Exit
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index < currentStep
                      ? "bg-primary text-white"
                      : index === currentStep
                      ? "bg-accent text-foreground ring-2 ring-accent/50"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-3 rounded-full ${
                      index < currentStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} />
        </div>

        {/* Content Card */}
        <Card className="bg-card border-border">
          {currentStep === 0 && (
            <div className="p-8">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-foreground">Basic Information</h2>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div>
                  <Label className="text-foreground mb-3 block">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-primary/20">
                      {profileData.profileImage ? (
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-secondary border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Ahmad Hassan"
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    className={`bg-secondary border-border text-foreground mt-2 ${
                      errors.fullName ? "border-destructive" : ""
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Headline */}
                <div>
                  <Label htmlFor="headline" className="text-foreground">
                    Professional Headline *
                  </Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Computer Science Student | Aspiring Software Engineer"
                    value={profileData.headline}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, headline: e.target.value }))
                    }
                    className={`bg-secondary border-border text-foreground mt-2 ${
                      errors.headline ? "border-destructive" : ""
                    }`}
                  />
                  {errors.headline && (
                    <p className="text-destructive text-sm mt-1">{errors.headline}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-foreground">
                    Location / City *
                  </Label>
                  <Input
                    id="location"
                    placeholder="Karachi, Pakistan"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, location: e.target.value }))
                    }
                    className={`bg-secondary border-border text-foreground mt-2 ${
                      errors.location ? "border-destructive" : ""
                    }`}
                  />
                  {errors.location && (
                    <p className="text-destructive text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="text-foreground">
                    About You
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your interests, and career goals..."
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="bg-secondary border-border text-foreground mt-2 resize-none"
                    rows={4}
                  />
                  <p className="text-muted-foreground text-sm mt-2">
                    {profileData.bio.length}/500 characters
                  </p>
                </div>

                {/* Phone & Website */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-foreground">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+92 300 1234567"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className={`bg-secondary border-border text-foreground mt-2 ${
                        errors.phone ? "border-destructive" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-foreground">
                      Website/Portfolio (Optional)
                    </Label>
                    <Input
                      id="website"
                      placeholder="www.example.com"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, website: e.target.value }))
                      }
                      className="bg-secondary border-border text-foreground mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Briefcase className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-foreground">Experience & Education</h2>
              </div>

              <Tabs defaultValue="experience" className="space-y-6">
                <TabsList className="bg-secondary border-border">
                  <TabsTrigger value="experience" className="text-foreground">
                    Experience
                  </TabsTrigger>
                  <TabsTrigger value="education" className="text-foreground">
                    Education
                  </TabsTrigger>
                </TabsList>

                {/* Experience Tab */}
                <TabsContent value="experience" className="space-y-4">
                  {profileData.experiences.length === 0 ? (
                    <p className="text-muted-foreground py-4">No experiences added yet</p>
                  ) : (
                    profileData.experiences.map((exp, idx) => (
                      <Card key={exp.id} className="bg-secondary border-border p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-foreground">Experience {idx + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(exp.id, "company", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <Input
                            placeholder="Position/Title"
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(exp.id, "position", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              type="date"
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(exp.id, "startDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                            <Input
                              type="date"
                              disabled={exp.currentlyWorking}
                              value={exp.endDate}
                              onChange={(e) =>
                                updateExperience(exp.id, "endDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`current-${exp.id}`}
                              checked={exp.currentlyWorking}
                              onChange={(e) =>
                                updateExperience(exp.id, "currentlyWorking", e.target.checked)
                              }
                              className="w-4 h-4"
                            />
                            <label
                              htmlFor={`current-${exp.id}`}
                              className="ml-2 text-sm text-foreground"
                            >
                              Currently working here
                            </label>
                          </div>
                          <Textarea
                            placeholder="Description (optional)"
                            value={exp.description}
                            onChange={(e) =>
                              updateExperience(exp.id, "description", e.target.value)
                            }
                            className="bg-background border-border text-foreground resize-none"
                            rows={3}
                          />
                        </div>
                      </Card>
                    ))
                  )}

                  <Button
                    onClick={addExperience}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="space-y-4">
                  {profileData.education.length === 0 ? (
                    <p className="text-muted-foreground py-4">No education entries added yet</p>
                  ) : (
                    profileData.education.map((edu, idx) => (
                      <Card key={edu.id} className="bg-secondary border-border p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-foreground">Education {idx + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <Input
                            placeholder="School/University"
                            value={edu.school}
                            onChange={(e) =>
                              updateEducation(edu.id, "school", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <Input
                            placeholder="Degree (e.g., B.S.)"
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <Input
                            placeholder="Field of Study"
                            value={edu.field}
                            onChange={(e) =>
                              updateEducation(edu.id, "field", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              type="date"
                              value={edu.startDate}
                              onChange={(e) =>
                                updateEducation(edu.id, "startDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                            <Input
                              type="date"
                              value={edu.endDate}
                              onChange={(e) =>
                                updateEducation(edu.id, "endDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <Input
                            placeholder="Grade/GPA (optional)"
                            value={edu.grade}
                            onChange={(e) =>
                              updateEducation(edu.id, "grade", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </Card>
                    ))
                  )}

                  <Button
                    onClick={addEducation}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Code className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-foreground">Skills & Certifications</h2>
              </div>

              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <Label className="text-foreground mb-3 block">Add Skills</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="e.g., React, JavaScript, Python"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addSkill();
                        }
                      }}
                      className="bg-secondary border-border text-foreground"
                    />
                    <Button
                      onClick={addSkill}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-primary/20 text-primary flex items-center gap-2 px-3 py-1.5"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-primary/80"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <Label className="text-foreground mb-3 block">Certifications</Label>
                  {profileData.certifications.length === 0 ? (
                    <p className="text-muted-foreground py-4">No certifications added yet</p>
                  ) : (
                    profileData.certifications.map((cert, idx) => (
                      <Card key={cert.id} className="bg-secondary border-border p-4 mb-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-foreground">
                            Certification {idx + 1}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCertification(cert.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <Input
                            placeholder="Certification Name"
                            value={cert.certName}
                            onChange={(e) =>
                              updateCertification(cert.id, "certName", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <Input
                            placeholder="Issuing Organization"
                            value={cert.issuer}
                            onChange={(e) =>
                              updateCertification(cert.id, "issuer", e.target.value)
                            }
                            className="bg-background border-border text-foreground"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              type="date"
                              value={cert.issueDate}
                              onChange={(e) =>
                                updateCertification(cert.id, "issueDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                            <Input
                              type="date"
                              placeholder="Expiry Date (optional)"
                              value={cert.expiryDate}
                              onChange={(e) =>
                                updateCertification(cert.id, "expiryDate", e.target.value)
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                        </div>
                      </Card>
                    ))
                  )}

                  <Button
                    onClick={addCertification}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certification
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-primary mr-3" />
                <h2 className="text-xl font-bold text-foreground">Language Tests</h2>
              </div>

              <div className="space-y-6">
                {profileData.languageTests.map((test) => (
                  <Card key={test.id} className="bg-secondary border-border p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <Badge className="bg-primary text-white mb-2">
                          {test.language} - {test.testType}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Test Date: {test.testDate || "Not specified"}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setProfileData((prev) => ({
                            ...prev,
                            languageTests: prev.languageTests.filter((t) => t.id !== test.id),
                          }));
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(test.scores).map(([key, value]) => (
                        <div key={key}>
                          <p className="text-xs text-muted-foreground capitalize mb-1">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p className="text-foreground font-medium">{value || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}

                <Card className="bg-secondary border-border p-6 space-y-4">
                  <h3 className="text-foreground font-semibold">Add Language Test</h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">Language</Label>
                      <Select
                        onValueChange={(language) => {
                          const newTest: LanguageTest = {
                            id: Date.now().toString(),
                            language,
                            testType: "",
                            testDate: "",
                            scores: {},
                          };
                          setProfileData((prev) => ({
                            ...prev,
                            languageTests: [...prev.languageTests, newTest],
                          }));
                        }}
                      >
                        <SelectTrigger className="bg-background border-border text-foreground mt-1">
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                          <SelectItem value="Arabic">Arabic</SelectItem>
                          <SelectItem value="Urdu">Urdu</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {profileData.languageTests.length > 0 && (
                      <div>
                        <Label className="text-foreground">Test Type</Label>
                        <Select
                          onValueChange={(testType) => {
                            const lastTest = profileData.languageTests[
                              profileData.languageTests.length - 1
                            ];
                            if (!lastTest.testType) {
                              const updatedTests = [...profileData.languageTests];
                              updatedTests[updatedTests.length - 1] = {
                                ...lastTest,
                                testType,
                                scores: getScoreFieldsForTestType(testType),
                              };
                              setProfileData((prev) => ({
                                ...prev,
                                languageTests: updatedTests,
                              }));
                            }
                          }}
                        >
                          <SelectTrigger className="bg-background border-border text-foreground mt-1">
                            <SelectValue placeholder="Select Test Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {profileData.languageTests.length > 0 && (
                              <>
                                <SelectItem value="IELTS">IELTS</SelectItem>
                                <SelectItem value="PTE">PTE (Pearson Test of English)</SelectItem>
                                <SelectItem value="TOEFL">TOEFL</SelectItem>
                                <SelectItem value="Duolingo">Duolingo English Test</SelectItem>
                                <SelectItem value="Cambridge">Cambridge English</SelectItem>
                                <SelectItem value="GOETHE">GOETHE (German)</SelectItem>
                                <SelectItem value="DELF">DELF/DALF (French)</SelectItem>
                                <SelectItem value="DELE">DELE (Spanish)</SelectItem>
                                <SelectItem value="HSK">HSK (Chinese)</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {profileData.languageTests.length > 0 && (
                      <>
                        <div>
                          <Label className="text-foreground">Test Date</Label>
                          <Input
                            type="date"
                            onChange={(e) => {
                              const updatedTests = [...profileData.languageTests];
                              updatedTests[updatedTests.length - 1].testDate = e.target.value;
                              setProfileData((prev) => ({
                                ...prev,
                                languageTests: updatedTests,
                              }));
                            }}
                            className="bg-background border-border text-foreground mt-1"
                          />
                        </div>

                        {profileData.languageTests[profileData.languageTests.length - 1]
                          ?.testType && (
                          <RenderScoreFields
                            test={profileData.languageTests[profileData.languageTests.length - 1]}
                            onScoreChange={(field, value) => {
                              const updatedTests = [...profileData.languageTests];
                              updatedTests[updatedTests.length - 1].scores[field] = value
                                ? parseFloat(value)
                                : null;
                              setProfileData((prev) => ({
                                ...prev,
                                languageTests: updatedTests,
                              }));
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Target className="w-6 h-6 text-primary mr-3" />
                Review Your Profile
              </h2>

              <div className="space-y-6">
                {/* Basic Info */}
                <Card className="bg-secondary border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    {profileData.profileImage && (
                      <div className="flex justify-center mb-4">
                        <img
                          src={profileData.profileImage}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground text-sm">Full Name</p>
                      <p className="text-foreground font-medium">{profileData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Headline</p>
                      <p className="text-foreground font-medium">{profileData.headline}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Location</p>
                      <p className="text-foreground font-medium">{profileData.location}</p>
                    </div>
                    {profileData.bio && (
                      <div>
                        <p className="text-muted-foreground text-sm">About</p>
                        <p className="text-foreground">{profileData.bio}</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Experience */}
                {profileData.experiences.length > 0 && (
                  <Card className="bg-secondary border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      Experience ({profileData.experiences.length})
                    </h3>
                    <div className="space-y-3">
                      {profileData.experiences.map((exp) => (
                        <div key={exp.id} className="border-b border-border pb-3 last:border-0">
                          <p className="text-foreground font-semibold">{exp.position}</p>
                          <p className="text-muted-foreground text-sm">{exp.company}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Education */}
                {profileData.education.length > 0 && (
                  <Card className="bg-secondary border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      Education ({profileData.education.length})
                    </h3>
                    <div className="space-y-3">
                      {profileData.education.map((edu) => (
                        <div key={edu.id} className="border-b border-border pb-3 last:border-0">
                          <p className="text-foreground font-semibold">{edu.degree}</p>
                          <p className="text-muted-foreground text-sm">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Skills */}
                {profileData.skills.length > 0 && (
                  <Card className="bg-secondary border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      Skills ({profileData.skills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill) => (
                        <Badge key={skill} className="bg-primary/20 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Certifications */}
                {profileData.certifications.length > 0 && (
                  <Card className="bg-secondary border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      Certifications ({profileData.certifications.length})
                    </h3>
                    <div className="space-y-2">
                      {profileData.certifications.map((cert) => (
                        <p key={cert.id} className="text-foreground">
                          • {cert.certName}
                        </p>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Language Tests */}
                {profileData.languageTests.length > 0 && (
                  <Card className="bg-secondary border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                      Language Tests ({profileData.languageTests.length})
                    </h3>
                    <div className="space-y-4">
                      {profileData.languageTests.map((test) => (
                        <div key={test.id} className="border-b border-border pb-3 last:border-0">
                          <p className="text-foreground font-semibold">
                            {test.language} - {test.testType}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Test Date: {test.testDate || "Not specified"}
                          </p>
                          <div className="mt-2 text-sm">
                            {Object.entries(test.scores).map(([key, value]) => (
                              value !== null && (
                                <p key={key} className="text-foreground capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                                </p>
                              )
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4 mt-8">
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="border-border text-foreground hover:bg-secondary"
            disabled={currentStep === 0 || isSubmitting}
          >
            Previous
          </Button>

          {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              disabled={isSubmitting}
            >
              Skip
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-accent hover:bg-accent/90 text-foreground font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Profile
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
