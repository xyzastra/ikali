import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { ContentCard } from "@/components/ContentCard";
import { Lightbulb } from "lucide-react";

// Sample idea dumps data
const ideaDumps = [
  {
    id: "1",
    title: "AI-Powered Learning Assistant",
    description: "Concept for an adaptive learning platform that personalizes content based on individual learning patterns and pace.",
    date: "2024-03-18",
    tags: ["AI", "Education", "Concept"],
  },
  {
    id: "2",
    title: "Decentralized Knowledge Sharing",
    description: "Exploring blockchain-based systems for preserving and sharing knowledge across communities without centralized control.",
    date: "2024-03-10",
    tags: ["Blockchain", "Web3", "Community"],
  },
  {
    id: "3",
    title: "Productivity Through Gamification",
    description: "Ideas for incorporating game mechanics into daily productivity tools to increase motivation and engagement.",
    date: "2024-02-28",
    tags: ["Gamification", "Productivity", "UX"],
  },
];

const IdeaDumps = () => {
  return (
    <div className="min-h-screen bg-content">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <SectionHeader
          title="Idea Dumps"
          description="Raw thoughts, unfiltered concepts, and creative brainstorms. This is where ideas are born before they're refined into full projects."
          icon={<Lightbulb className="h-16 w-16 text-accent" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideaDumps.map((idea) => (
            <ContentCard
              key={idea.id}
              title={idea.title}
              description={idea.description}
              date={idea.date}
              path={`/idea-dumps/${idea.id}`}
              tags={idea.tags}
            />
          ))}
        </div>

        {ideaDumps.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No ideas yet. Let your creativity flow!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default IdeaDumps;
