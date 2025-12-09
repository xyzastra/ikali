import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import IdeaDumps from "./pages/IdeaDumps";
import IdeaDumpDetail from "./pages/IdeaDumpDetail";
import Journal from "./pages/Journal";
import JournalDetail from "./pages/JournalDetail";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/idea-dumps" element={<IdeaDumps />} />
              <Route path="/idea-dumps/:id" element={<IdeaDumpDetail />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<JournalDetail />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;