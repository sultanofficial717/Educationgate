import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Home, Briefcase, Users, FileText, Calendar, Settings, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function RecruiterDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'recruiter') {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/3 pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Company Profile & Details */}
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
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-xl">TC</span>
            </div>
            <h2 className="text-lg font-bold text-foreground">TechCorp Inc.</h2>
            <p className="text-xs text-muted-foreground mt-1">Recruiter: {user?.name}</p>
          </div>

          {/* Company Details */}
          <div className="p-6 space-y-6">
            <div className="border-t border-primary/15 pt-6">
              <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3">Company Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Industry</p>
                  <p className="font-medium">Software Technology</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="font-medium">500-1000 employees</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">San Francisco, USA</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Founded</p>
                  <p className="font-medium">2010</p>
                </div>
              </div>
            </div>

            {/* Current Engagements */}
            <div className="border-t border-primary/15 pt-6">
              <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3">Active Engagements</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Open Positions</span>
                  <span className="font-bold text-primary">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Candidates</span>
                  <span className="font-bold text-accent">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Scheduled Interviews</span>
                  <span className="font-bold text-primary">23</span>
                </div>
              </div>
            </div>

            {/* Employee Stats */}
            <div className="border-t border-primary/15 pt-6">
              <h3 className="text-xs uppercase font-semibold text-muted-foreground mb-3">Team Members</h3>
              <div className="space-y-2">
                {[
                  { name: 'John Developer', role: 'Senior Engineer' },
                  { name: 'Jane Designer', role: 'UI/UX Designer' },
                  { name: 'Mike Manager', role: 'Project Manager' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded hover:bg-primary/10 transition-all">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
              <h1 className="text-4xl font-bold text-gradient mb-2">Recruiter Dashboard</h1>
              <p className="text-muted-foreground">Manage jobs, candidates, and company engagement</p>
            </div>

            {/* Dashboard Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="jobs">Post Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="candidates">Candidates</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Open Positions</h3>
                      <p className="text-3xl font-bold text-primary">12</p>
                      <p className="text-xs text-muted-foreground mt-2">Active hiring</p>
                    </div>
                  </Card>

                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Applications</h3>
                      <p className="text-3xl font-bold text-accent">342</p>
                      <p className="text-xs text-muted-foreground mt-2">This month</p>
                    </div>
                  </Card>

                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Hired</h3>
                      <p className="text-3xl font-bold text-primary">18</p>
                      <p className="text-xs text-muted-foreground mt-2">This year</p>
                    </div>
                  </Card>

                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/3">
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Interviews</h3>
                      <p className="text-3xl font-bold text-accent">23</p>
                      <p className="text-xs text-muted-foreground mt-2">Scheduled</p>
                    </div>
                  </Card>
                </div>

                <Card className="border-primary/20 p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Applications</h3>
                  <div className="space-y-3">
                    {[
                      { candidate: 'Alice Johnson', position: 'Senior Developer', status: 'New', time: '1 hour ago' },
                      { candidate: 'Bob Smith', position: 'Full Stack Engineer', status: 'Reviewing', time: '3 hours ago' },
                      { candidate: 'Carol Davis', position: 'DevOps Engineer', status: 'Interview Scheduled', time: '1 day ago' },
                    ].map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                        <div>
                          <p className="font-medium">{app.candidate}</p>
                          <p className="text-sm text-muted-foreground">{app.position}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs bg-blue-100/50 text-blue-700 px-2 py-1 rounded">{app.status}</span>
                          <span className="text-xs text-muted-foreground">{app.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Post Jobs Tab */}
              <TabsContent value="jobs" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Manage Job Postings</h3>
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Post New Job
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'Senior Developer', posted: '1 week ago', applications: 45, status: 'Active' },
                      { title: 'Full Stack Engineer', posted: '2 weeks ago', applications: 38, status: 'Active' },
                      { title: 'DevOps Engineer', posted: '3 weeks ago', applications: 52, status: 'Active' },
                      { title: 'Product Manager', posted: '1 month ago', applications: 28, status: 'Closed' },
                    ].map((job, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                        <div className="flex-1">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.applications} applications · Posted {job.posted}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                            job.status === 'Active' ? 'bg-green-100/50 text-green-700' : 'bg-gray-100/50 text-gray-700'
                          }`}>
                            {job.status}
                          </span>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <h3 className="text-lg font-bold mb-4">View Applications</h3>
                  <div className="space-y-3">
                    {[
                      { candidate: 'Alex Turner', position: 'Senior Developer', rating: '⭐⭐⭐⭐⭐', status: 'Interview' },
                      { candidate: 'Blake Morgan', position: 'Full Stack', rating: '⭐⭐⭐⭐', status: 'Review' },
                      { candidate: 'Casey Roberts', position: 'DevOps', rating: '⭐⭐⭐⭐⭐', status: 'Offer' },
                    ].map((app, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                        <div className="flex-1">
                          <p className="font-medium">{app.candidate}</p>
                          <p className="text-sm text-muted-foreground">{app.position}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{app.rating}</span>
                          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                            {app.status}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Find Applicants Tab */}
              <TabsContent value="candidates" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Find Applicants</h3>
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Users className="w-4 h-4 mr-2" />
                      Search Candidates
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Diana Prince', skills: 'React, TypeScript, Node.js', experience: '5 years', match: '95%' },
                      { name: 'Edward Norton', skills: 'Python, Django, PostgreSQL', experience: '7 years', match: '88%' },
                      { name: 'Fiona Green', skills: 'Vue.js, Go, Kubernetes', experience: '4 years', match: '82%' },
                    ].map((candidate, idx) => (
                      <div key={idx} className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.experience} experience</p>
                          </div>
                          <span className="text-sm font-bold text-accent">{candidate.match}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{candidate.skills}</p>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                          View Profile
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events" className="space-y-4">
                <Card className="border-primary/20 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Announce Events</h3>
                    <Button className="bg-gradient-to-r from-primary to-accent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: 'Campus Recruitment Drive', date: 'Dec 20, 2024', location: 'Delhi University', attendees: 342 },
                      { title: 'Tech Webinar Series', date: 'Dec 15, 2024', location: 'Online', attendees: 1200 },
                      { title: 'Internship Program Launch', date: 'Dec 10, 2024', location: 'Mumbai IIT', attendees: 567 },
                    ].map((event, idx) => (
                      <div key={idx} className="p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                          </div>
                          <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">{event.attendees} attending</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{event.date}</p>
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
