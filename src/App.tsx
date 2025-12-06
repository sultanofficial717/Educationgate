import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Universities from "./pages/Universities";
import MeritCalculatorPage from "./pages/MeritCalculatorPage";
import Tutors from "./pages/Tutors";
import StudyAbroad from "./pages/StudyAbroad";
import EntryTests from "./pages/EntryTests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
