import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout } from "@/components/Layout";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const IdeaDumps = lazy(() => import("./pages/IdeaDumps"));
const IdeaDumpDetail = lazy(() => import("./pages/IdeaDumpDetail"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalDetail = lazy(() => import("./pages/JournalDetail"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Index />
                  </Suspense>
                }
              />
              <Route
                path="/projects"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <ProjectDetail />
                  </Suspense>
                }
              />
              <Route
                path="/idea-dumps"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <IdeaDumps />
                  </Suspense>
                }
              />
              <Route
                path="/idea-dumps/:id"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <IdeaDumpDetail />
                  </Suspense>
                }
              />
              <Route
                path="/journal"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Journal />
                  </Suspense>
                }
              />
              <Route
                path="/journal/:id"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <JournalDetail />
                  </Suspense>
                }
              />
              <Route
                path="/resume"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Resume />
                  </Suspense>
                }
              />
              <Route
                path="/contact"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
