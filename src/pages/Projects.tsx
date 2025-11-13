import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { ContentCard } from "@/components/ContentCard";
import { Code } from "lucide-react";

// Sample project data
const projects = [
  {
    id: "1",
    title: "Personal Knowledge Base",
    description: "A React-based knowledge management system for organizing projects, ideas, and journal entries with a clean, reader-first design.",
    date: "2024-03-15",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "2",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with real-time updates and customizable charts.",
    date: "2024-02-20",
    tags: ["D3.js", "React", "API Integration"],
  },
  {
    id: "3",
    title: "Automation Toolkit",
    description: "Collection of Python scripts for automating repetitive tasks and improving workflow efficiency.",
    date: "2024-01-10",
    tags: ["Python", "Automation", "CLI"],
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-content">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <SectionHeader
          title="Projects"
          description="A showcase of technical projects, experiments, and builds that represent my journey in software development and creative problem-solving."
          icon={<Code className="h-16 w-16 text-primary" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ContentCard
              key={project.id}
              title={project.title}
              description={project.description}
              date={project.date}
              path={`/projects/${project.id}`}
              tags={project.tags}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects yet. Start building!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
