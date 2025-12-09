import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, AlertCircle } from "lucide-react";

export function AuthModal({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"student" | "recruiter">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Dummy credentials info
  const dummyCredentials = {
    student: {
      email: "student@edu360.com",
      password: "student123",
    },
    recruiter: {
      email: "recruiter@edu360.com",
      password: "recruiter123",
    },
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (login(email, password, userType)) {
        setIsLoading(false);
        setOpen(false);
        // Navigate to appropriate dashboard
        if (userType === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/recruiter-dashboard");
        }
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (register(email, password, firstName, lastName, userType)) {
        setIsLoading(false);
        setOpen(false);
        // Navigate to appropriate dashboard
        if (userType === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/recruiter-dashboard");
        }
      } else {
        setError("Registration failed. Please try again.");
        setIsLoading(false);
      }
    }, 500);
  };

  const fillDummyCredentials = () => {
    setEmail(dummyCredentials[userType].email);
    setPassword(dummyCredentials[userType].password);
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-12 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <Minus className="h-4 w-4" />
          <span className="sr-only">Minimize</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to EDU360</DialogTitle>
          <DialogDescription className="text-center">
            Join our community of learners and educators.
          </DialogDescription>
        </DialogHeader>

        {/* User Type Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-secondary p-1 rounded-full inline-flex relative w-full max-w-[300px]">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                userType === "student" ? "left-1" : "left-[calc(50%)]"
              }`}
            />
            <button
              onClick={() => {
                setUserType("student");
                setError("");
              }}
              className={`relative z-10 w-1/2 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                userType === "student" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => {
                setUserType("recruiter");
                setError("");
              }}
              className={`relative z-10 w-1/2 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                userType === "recruiter" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recruiter
            </button>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
          <div className="flex gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-primary mb-2">Demo Credentials</p>
              <p className="text-muted-foreground text-xs">Email: {dummyCredentials[userType].email}</p>
              <p className="text-muted-foreground text-xs">Password: {dummyCredentials[userType].password}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <div className="grid gap-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleSignIn} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <Button
                onClick={fillDummyCredentials}
                variant="outline"
                className="w-full"
              >
                Use Demo Credentials
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register">
            <div className="grid gap-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-register">Password</Label>
                  <Input
                    id="password-register"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
