import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { FeedItem } from "@/components/FeedItem";
import { useIdeaDumps } from "@/hooks/useIdeaDumps";
import { Skeleton } from "@/components/ui/skeleton";

const IdeaDumps = () => {
  const { data: ideaDumps, isLoading, error } = useIdeaDumps();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-6xl">
        <SectionHeader
          title="Idea Dumps"
          description="Raw concepts exploring policy frameworks, decentralized systems, and student-powered innovation. Ideas before refinement."
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
            <p className="text-destructive text-lg">Error loading ideas. Please try again.</p>
          </div>
        )}

        {ideaDumps && ideaDumps.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {ideaDumps.map((idea) => (
              <FeedItem
                key={idea.id}
                title={idea.title}
                description={idea.description || ""}
                date={idea.published_date || idea.created_at}
                path={`/idea-dumps/${idea.id}`}
                tags={idea.tags}
                readingTime={idea.reading_time}
              />
            ))}
          </div>
        )}

        {ideaDumps && ideaDumps.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No ideas yet. Let your creativity flow!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default IdeaDumps;