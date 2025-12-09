import { Header } from "@/components/Header";
import { BentoGrid } from "@/components/BentoGrid";
import { Component as RevolutionHero } from "@/components/ui/revolution-hero";
import { useProjects } from "@/hooks/useProjects";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { useIdeaDumps } from "@/hooks/useIdeaDumps";

const Index = () => {
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: journals = [], isLoading: journalsLoading } = useJournalEntries();
  const { data: ideas = [], isLoading: ideasLoading } = useIdeaDumps();

  const isLoading = projectsLoading || journalsLoading || ideasLoading;

  return (
    <div className="min-h-screen">
      {/* WebGL Hero */}
      <RevolutionHero />

      <div className="bg-background">
        <Header />

        {/* Colorful Bento Grid - Mobile First */}
        <BentoGrid 
          projects={projects}
          journals={journals}
          ideas={ideas}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
