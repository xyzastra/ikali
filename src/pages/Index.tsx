import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Brain, Code, Lightbulb, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Projects",
    description: "Technical projects, experiments, and builds showcasing my work and learning journey.",
    icon: Code,
    path: "/projects",
    color: "text-primary",
  },
  {
    title: "Idea Dumps",
    description: "Raw thoughts, concepts, and brainstorms—a collection of ideas waiting to be refined.",
    icon: Lightbulb,
    path: "/idea-dumps",
    color: "text-accent",
  },
  {
    title: "Journal",
    description: "Personal reflections, learnings, and experiences documented over time.",
    icon: BookOpen,
    path: "/journal",
    color: "text-primary",
  },
  {
    title: "Resume",
    description: "Professional experience, skills, and achievements in one place.",
    icon: FileText,
    path: "/resume",
    color: "text-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-content">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Brain className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Welcome to brainOS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A personal knowledge base for capturing projects, ideas, journal entries, and professional milestones.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.path}
                to={section.path}
                className="group"
              >
                <div className="h-full p-8 rounded-lg border bg-card hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                  <Icon className={`h-12 w-12 mb-4 ${section.color} group-hover:scale-110 transition-transform`} />
                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                  <Button variant="link" className="mt-4 px-0 group-hover:translate-x-2 transition-transform">
                    Explore →
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* About Section */}
        <div className="max-w-3xl mx-auto text-center p-8 rounded-lg bg-secondary/50">
          <h2 className="text-2xl font-semibold mb-4">About This Knowledge Base</h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a living document of my personal and professional growth. Built with React and powered by 
            thoughtful organization, brainOS serves as a central hub for everything I create, think, and learn.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
