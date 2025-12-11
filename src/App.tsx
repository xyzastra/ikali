import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ReadingProgress } from "@/components/ReadingProgress";
import { PageTransition } from "@/components/PageTransition";
import { AIChatWidget } from "@/components/AIChatWidget";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import IdeaDumps from "./pages/IdeaDumps";
import IdeaDumpDetail from "./pages/IdeaDumpDetail";
import Journal from "./pages/Journal";
import JournalDetail from "./pages/JournalDetail";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import CommunityProjectDetail from "./pages/CommunityProjectDetail";
import SubmitProject from "./pages/SubmitProject";
import UserProfile from "./pages/UserProfile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ReadingProgress />
            <BrowserRouter>
              <a href="#main-content" className="skip-to-content">
                Skip to main content
              </a>
              <AIChatWidget />
              <main id="main-content">
                <Routes>
                  <Route path="/" element={<PageTransition><Index /></PageTransition>} />
                  <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
                  <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
                  <Route path="/idea-dumps" element={<PageTransition><IdeaDumps /></PageTransition>} />
                  <Route path="/idea-dumps/:id" element={<PageTransition><IdeaDumpDetail /></PageTransition>} />
                  <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
                  <Route path="/journal/:id" element={<PageTransition><JournalDetail /></PageTransition>} />
                  <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                  <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
                  <Route path="/community/submit" element={<PageTransition><SubmitProject /></PageTransition>} />
                  <Route path="/community/:id" element={<PageTransition><CommunityProjectDetail /></PageTransition>} />
                  <Route path="/profile/:userId" element={<PageTransition><UserProfile /></PageTransition>} />
                  <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
                  <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin>
                        <PageTransition><Admin /></PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                </Routes>
              </main>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
