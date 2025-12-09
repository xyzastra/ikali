import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJournalEntry } from "@/hooks/useJournalEntries";
import { Skeleton } from "@/components/ui/skeleton";

const JournalDetail = () => {
  const { id } = useParams();
  const { data: entry, isLoading, error } = useJournalEntry(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-24 max-w-4xl">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </main>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-8 py-24 max-w-4xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Entry Not Found</h1>
          <p className="text-muted-foreground mb-8">The journal entry you're looking for doesn't exist.</p>
          <Link to="/journal">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Journal
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-8 py-24 max-w-4xl">
        <Link to="/journal" className="inline-flex items-center text-sm mb-8 hover:opacity-60 transition-opacity uppercase tracking-widest">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Link>

        <article>
          <header className="mb-12 pb-8 border-b border-border">
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-4">
              <time dateTime={entry.published_date || entry.created_at}>
                {new Date(entry.published_date || entry.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
              {entry.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              {entry.description}
            </p>
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {entry.content?.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('##')) {
                return (
                  <h2 key={index} className="text-3xl font-serif font-bold mt-12 mb-4">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              if (paragraph.trim().startsWith('-')) {
                return (
                  <li key={index} className="ml-6 my-2">
                    {paragraph.replace('-', '').trim()}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </article>
      </main>
    </div>
  );
};

export default JournalDetail;