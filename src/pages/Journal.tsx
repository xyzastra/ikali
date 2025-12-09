import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";
import { ColumnLayout } from "@/components/ColumnLayout";

// Journal entries - Strategy, Policy, Reflections
const journalEntries = [
  {
    id: "1",
    title: "Policy Strategy for University Innovation",
    description: "Engaging Pennsylvania representatives to advance legislation supporting decentralized, student-driven university impact.",
    date: "2025-04-01",
    tags: ["Policy", "Advocacy", "Higher Ed"],
    readingTime: 4,
  },
  {
    id: "2",
    title: "Why I Reject One-Size-Fits-All",
    description: "Every architecture must be built for the specific constraints of the local environment. Cookie-cutter solutions fail.",
    date: "2025-03-18",
    tags: ["Philosophy", "Strategy", "Architecture"],
    readingTime: 5,
  },
  {
    id: "3",
    title: "Compliance-First Thinking",
    description: "How strict compliance and user data constraints shape my approach to software architecture and stakeholder communication.",
    date: "2025-02-25",
    tags: ["Compliance", "Privacy", "Strategy"],
    readingTime: 6,
  },
];

const Journal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-6xl">
        <SectionHeader
          title="Journal"
          description="Reflections on strategy, policy advocacy, and the philosophy behind decentralized solutions in energy and education."
        />

        <ColumnLayout columns={2}>
          {journalEntries.map((entry) => (
            <FeedItem
              key={entry.id}
              title={entry.title}
              description={entry.description}
              date={entry.date}
              path={`/journal/${entry.id}`}
              tags={entry.tags}
              readingTime={entry.readingTime}
            />
          ))}
        </ColumnLayout>

        {journalEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No journal entries yet. Start documenting your journey!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Journal;
