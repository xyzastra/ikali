import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";

// Idea dumps - Decentralized solutions, Policy frameworks
const ideaDumps = [
  {
    id: "1",
    title: "State-Level Energy Policy Framework",
    description: "Exploring legislative models that incentivize universities to adopt localized energy management without federal dependency.",
    date: "2025-04-05",
    tags: ["Policy", "Energy", "Legislation"],
    readingTime: 4,
  },
  {
    id: "2",
    title: "Student-Powered Manufacturing",
    description: "Scaling the academic matchmaking model to manufacturing partnerships. Credit-based work replacing traditional internships.",
    date: "2025-03-22",
    tags: ["Education", "Manufacturing", "Innovation"],
    readingTime: 3,
  },
  {
    id: "3",
    title: "Metered Hardware Standards",
    description: "Proposing open standards for campus metering devices to enable cross-institutional data sharing without vendor lock-in.",
    date: "2025-02-15",
    tags: ["Hardware", "Standards", "Open Source"],
    readingTime: 5,
  },
];

const IdeaDumps = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-6xl">
        <SectionHeader
          title="Idea Dumps"
          description="Raw concepts exploring policy frameworks, decentralized systems, and student-powered innovation. Ideas before refinement."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {ideaDumps.map((idea) => (
            <FeedItem
              key={idea.id}
              title={idea.title}
              description={idea.description}
              date={idea.date}
              path={`/idea-dumps/${idea.id}`}
              tags={idea.tags}
              readingTime={idea.readingTime}
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
