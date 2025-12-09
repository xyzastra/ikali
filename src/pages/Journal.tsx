import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";
import { ColumnLayout } from "@/components/ColumnLayout";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Skeleton } from "@/components/ui/skeleton";

const Journal = () => {
  const { data: journalEntries, isLoading, error } = useJournalEntries();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-6xl">
        <SectionHeader
          title="Journal"
          description="Reflections on strategy, policy advocacy, and the philosophy behind decentralized solutions in energy and education."
        />

        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading journal entries. Please try again.</p>
          </div>
        )}

        {journalEntries && journalEntries.length > 0 && (
          <ColumnLayout columns={2}>
            {journalEntries.map((entry) => (
              <FeedItem
                key={entry.id}
                title={entry.title}
                description={entry.description || ""}
                date={entry.published_date || entry.created_at}
                path={`/journal/${entry.id}`}
                tags={entry.tags}
                readingTime={entry.reading_time}
              />
            ))}
          </ColumnLayout>
        )}

        {journalEntries && journalEntries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No journal entries yet. Start documenting your journey!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Journal;