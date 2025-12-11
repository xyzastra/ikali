import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PageTransition } from "@/components/PageTransition";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import IdeaDumps from "@/pages/IdeaDumps";
import IdeaDumpDetail from "@/pages/IdeaDumpDetail";
import Journal from "@/pages/Journal";
import JournalDetail from "@/pages/JournalDetail";
import Resume from "@/pages/Resume";
import Contact from "@/pages/Contact";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import Community from "@/pages/Community";
import CommunityProjectDetail from "@/pages/CommunityProjectDetail";
import SubmitProject from "@/pages/SubmitProject";
import UserProfile from "@/pages/UserProfile";

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/projects/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/idea-dumps" element={<PageTransition variant="slide"><IdeaDumps /></PageTransition>} />
        <Route path="/idea-dumps/:id" element={<PageTransition variant="scale"><IdeaDumpDetail /></PageTransition>} />
        <Route path="/journal" element={<PageTransition variant="slide"><Journal /></PageTransition>} />
        <Route path="/journal/:id" element={<PageTransition variant="scale"><JournalDetail /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
        <Route path="/community/submit" element={<PageTransition><SubmitProject /></PageTransition>} />
        <Route path="/community/:id" element={<PageTransition><CommunityProjectDetail /></PageTransition>} />
        <Route path="/profile/:userId" element={<PageTransition><UserProfile /></PageTransition>} />
        <Route path="/auth" element={<PageTransition variant="fade"><Auth /></PageTransition>} />
        <Route path="/reset-password" element={<PageTransition variant="fade"><ResetPassword /></PageTransition>} />
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
    </AnimatePresence>
  );
};
