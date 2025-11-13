import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { ContentCard } from "@/components/ContentCard";
import { BookOpen } from "lucide-react";

// Sample journal entries data
const journalEntries = [
  {
    id: "1",
    title: "Reflections on Building in Public",
    description: "Thoughts on sharing my learning journey openly and the unexpected benefits of transparency in the development process.",
    date: "2024-03-20",
    tags: ["Learning", "Community", "Growth"],
  },
  {
    id: "2",
    title: "Overcoming Imposter Syndrome",
    description: "Personal insights on dealing with self-doubt in tech and strategies that have helped me move forward confidently.",
    date: "2024-03-12",
    tags: ["Mental Health", "Career", "Personal"],
  },
  {
    id: "3",
    title: "The Power of Documentation",
    description: "Why I started documenting everything and how it has transformed my approach to learning and problem-solving.",
    date: "2024-03-05",
    tags: ["Documentation", "Learning", "Productivity"],
  },
];

const Journal = () => {
  return (
    <div className="min-h-screen bg-content">
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <SectionHeader
          title="Journal"
          description="Personal reflections, learnings, and experiences captured over time. A space for introspection and growth."
          icon={<BookOpen className="h-16 w-16 text-primary" />}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journalEntries.map((entry) => (
            <ContentCard
              key={entry.id}
              title={entry.title}
              description={entry.description}
              date={entry.date}
              path={`/journal/${entry.id}`}
              tags={entry.tags}
            />
          ))}
        </div>

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
