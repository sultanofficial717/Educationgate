import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Universities from "./pages/Universities";
import MeritCalculatorPage from "./pages/MeritCalculatorPage";
import Tutors from "./pages/Tutors";
import StudyAbroad from "./pages/StudyAbroad";
import EntryTests from "./pages/EntryTests";
import AiEdubotPage from "./pages/AiEdubotPage";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/merit-calculator" element={<MeritCalculatorPage />} />
            <Route path="/entry-tests" element={<EntryTests />} />
            <Route path="/tutors" element={<Tutors />} />
            <Route path="/study-abroad" element={<StudyAbroad />} />
            <Route path="/ai-edubot" element={<AiEdubotPage />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
