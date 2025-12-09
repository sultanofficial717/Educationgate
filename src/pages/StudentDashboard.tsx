import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Home, Briefcase, FileText, Settings, ArrowLeft, Plus, Edit2, Trash2, Award, Code, BookOpen, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState({
    headline: "Computer Science Student | Aspiring Software Engineer",
    about: "Passionate about technology and building innovative solutions. Experienced in full-stack development with modern web technologies.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "www.example.com",
    experience: [
      { id: 1, title: "Intern - Web Development", company: "TechCorp Inc.", duration: "Jun 2023 - Aug 2023", description: "Developed React components and fixed bugs" },
      { id: 2, title: "Freelance Developer", company: "Self-employed", duration: "Jan 2022 - Present", description: "Building websites for small businesses" }
    ],
    education: [
      { id: 1, school: "University of California", degree: "B.S. Computer Science", field: "Computer Science", startYear: 2020, endYear: 2024 },
      { id: 2, school: "Tech High School", degree: "High School Diploma", field: "General", startYear: 2016, endYear: 2020 }
    ],
    skills: [
      "JavaScript", "React", "TypeScript", "Node.js", "Python", "SQL", "MongoDB", "Git", "Web Development", "Full Stack"
    ],
    projects: [
      { id: 1, title: "E-commerce Platform", description: "Built a full-stack e-commerce platform using React and Node.js", link: "github.com/project1" },
      { id: 2, title: "Task Management App", description: "Created a task management application with real-time updates", link: "github.com/project2" }
    ],
    volunteer: [
      { id: 1, title: "Coding Mentor", organization: "Code for Good", duration: "2023 - Present", description: "Teaching web development to underprivileged students" }
    ],
    openSource: [
      { id: 1, project: "React UI Library", contribution: "Fixed 5 bugs and added new features", link: "github.com/library" },
      { id: 2, project: "Data Science Library", contribution: "Added documentation and improved performance", link: "github.com/datascience" }
    ],
    publications: [
      { id: 1, title: "The Future of Web Development", journal: "Tech Today Magazine", date: "March 2024", link: "techtoday.com/article1" }
    ],
    research: [
      { id: 1, title: "AI-Powered Code Generation", focus: "Machine Learning", date: "2024", description: "Researching how AI can improve developer productivity" }
    ]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3 pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-primary/5 to-background/50 border-r border-primary/15 overflow-y-auto">
          <div className="p-6 pb-3 border-b border-primary/15">
            <Button
              onClick={() => navigate(-1)}
              variant="ghost"
              size="sm"
              className="w-full text-primary hover:bg-primary/10 justify-start mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gradient mb-2">Student Dashboard</h2>
            <p className="text-sm text-muted-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
          </div>

          <nav className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-semibold text-muted-foreground px-3 mb-3">Menu</h3>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 border border-primary/30 text-foreground font-medium transition-all">
                <Home className="w-4 h-4 text-primary" />
                Dashboard
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all">
                <Briefcase className="w-4 h-4" />
                Job Applications
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all">
                <FileText className="w-4 h-4" />
                My Resume
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-all">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-primary/15">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
          </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gradient mb-2">Welcome Back, {user?.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">Explore opportunities and manage your career journey</p>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Active Applications</h3>
                      <p className="text-3xl font-bold text-primary">8</p>
                      <p className="text-xs text-muted-foreground mt-2">Waiting for response</p>
                    </div>
                  </Card>

                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Jobs Saved</h3>
                      <p className="text-3xl font-bold text-accent">24</p>
                      <p className="text-xs text-muted-foreground mt-2">For later review</p>
                    </div>
                  </Card>

                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Profile Views</h3>
                      <p className="text-3xl font-bold text-primary">156</p>
                      <p className="text-xs text-muted-foreground mt-2">This month</p>
                    </div>
                  </Card>
                </div>

                <Card className="border-primary/20 p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                      <div>
                        <p className="font-medium">Applied to Senior Developer</p>
                        <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                      <div>
                        <p className="font-medium">Viewed Full Stack Engineer</p>
                        <p className="text-sm text-muted-foreground">InnovateTech</p>
                      </div>
                      <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">5 days ago</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <h3 className="text-lg font-bold mb-4">Your Applications</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Senior Developer', company: 'TechCorp Inc.', status: 'Under Review', date: '2 days ago' },
                      { title: 'Full Stack Engineer', company: 'InnovateTech', status: 'Accepted', date: '1 week ago' },
                      { title: 'React Developer', company: 'Digital Solutions', status: 'Rejected', date: '2 weeks ago' },
                    ].map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                        <div className="flex-1">
                          <p className="font-medium">{app.title}</p>
                          <p className="text-sm text-muted-foreground">{app.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            app.status === 'Under Review' ? 'bg-yellow-100/50 text-yellow-700' :
                            app.status === 'Accepted' ? 'bg-green-100/50 text-green-700' :
                            'bg-red-100/50 text-red-700'
                          }`}>
                            {app.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{app.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Opportunities Tab */}
              <TabsContent value="opportunities" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <h3 className="text-lg font-bold mb-4">Recommended Opportunities</h3>
                  <div className="space-y-3">
                    {[
                      { title: 'Principal Engineer', company: 'Tech Giants Corp', location: 'Remote', salary: '$180K - $220K' },
                      { title: 'DevOps Engineer', company: 'CloudBase Systems', location: 'Hybrid', salary: '$140K - $170K' },
                      { title: 'Product Manager', company: 'StartupXYZ', location: 'Onsite', salary: '$120K - $150K' },
                    ].map((job, idx) => (
                      <div key={idx} className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                            Apply
                          </Button>
                        </div>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                          <span>{job.location}</span>
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                {/* Header Card */}
                <Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-foreground mb-2">{user?.name}</h2>
                      <p className="text-lg text-primary font-semibold mb-2">{profileData.headline}</p>
                      <p className="text-muted-foreground mb-4">{profileData.location}</p>
                      <p className="text-foreground max-w-2xl">{profileData.about}</p>
                      <div className="flex gap-4 mt-4 text-sm">
                        <a href={`tel:${profileData.phone}`} className="text-primary hover:underline">{profileData.phone}</a>
                        <a href={`https://${profileData.website}`} target="_blank" className="text-primary hover:underline">{profileData.website}</a>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-accent">Edit Profile</Button>
                  </div>
                </Card>

                {/* About Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">About</h3>
                    <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <p className="text-foreground">{profileData.about}</p>
                </Card>

                {/* Experience Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Briefcase className="w-5 h-5" />Experience</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.experience.map((exp) => (
                      <div key={exp.id} className="border-l-4 border-primary/30 pl-4 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{exp.title}</h4>
                            <p className="text-primary font-semibold">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                            <p className="text-foreground mt-2">{exp.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Education Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5" />Education</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-accent/30 pl-4 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{edu.school}</h4>
                            <p className="text-primary font-semibold">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.field}</p>
                            <p className="text-sm text-muted-foreground">{edu.startYear} - {edu.endYear}</p>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Skills Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Award className="w-5 h-5" />Skills</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                        <span>{skill}</span>
                        <Trash2 className="w-3 h-3 cursor-pointer hover:text-destructive" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Projects Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Code className="w-5 h-5" />Projects</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.projects.map((proj) => (
                      <div key={proj.id} className="border border-primary/10 rounded-lg p-4 hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{proj.title}</h4>
                            <p className="text-foreground mt-1">{proj.description}</p>
                            <a href={`https://${proj.link}`} target="_blank" className="text-primary hover:underline text-sm mt-2 block">{proj.link}</a>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Volunteer Work Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Users className="w-5 h-5" />Volunteer Work</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.volunteer.map((vol) => (
                      <div key={vol.id} className="border-l-4 border-accent/50 pl-4 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{vol.title}</h4>
                            <p className="text-primary font-semibold">{vol.organization}</p>
                            <p className="text-sm text-muted-foreground">{vol.duration}</p>
                            <p className="text-foreground mt-2">{vol.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Open Source Contributions Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Code className="w-5 h-5" />Open Source Contributions</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.openSource.map((os) => (
                      <div key={os.id} className="border border-primary/10 rounded-lg p-4 hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{os.project}</h4>
                            <p className="text-foreground mt-1">{os.contribution}</p>
                            <a href={`https://${os.link}`} target="_blank" className="text-primary hover:underline text-sm mt-2 block">{os.link}</a>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Publications Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><BookOpen className="w-5 h-5" />Publications</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.publications.map((pub) => (
                      <div key={pub.id} className="border border-primary/10 rounded-lg p-4 hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{pub.title}</h4>
                            <p className="text-primary font-semibold">{pub.journal}</p>
                            <p className="text-sm text-muted-foreground">{pub.date}</p>
                            <a href={`https://${pub.link}`} target="_blank" className="text-primary hover:underline text-sm mt-2 block">{pub.link}</a>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Research Section */}
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Trophy className="w-5 h-5" />Research</h3>
                    <Plus className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                  </div>
                  <div className="space-y-4">
                    {profileData.research.map((res) => (
                      <div key={res.id} className="border-l-4 border-primary/30 pl-4 pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-foreground">{res.title}</h4>
                            <p className="text-primary font-semibold">{res.focus}</p>
                            <p className="text-sm text-muted-foreground">{res.date}</p>
                            <p className="text-foreground mt-2">{res.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Edit2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground" />
                            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
