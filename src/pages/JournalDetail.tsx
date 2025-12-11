import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
          <div className="rounded-xl border border-border bg-card p-8">
            <h1 className="text-4xl font-serif font-bold mb-4">Entry Not Found</h1>
            <p className="text-muted-foreground mb-4">The journal entry you're looking for doesn't exist or may have been moved.</p>
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-mono bg-muted px-2 py-1 rounded">Tip:</span> Journal URLs use UUIDs like{" "}
              <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">/journal/a1b2c3d4-e5f6-7890-abcd-ef1234567890</span>
            </p>
            <Link to="/journal">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Journal
              </Button>
            </Link>
          </div>
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

        <motion.article
          layoutId={`journal-card-${id}`}
          className="bg-card rounded-xl border border-border overflow-hidden"
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <header className="p-8 md:p-12 pb-8 border-b border-border">
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-4">
              <time dateTime={entry.published_date || entry.created_at}>
                {new Date(entry.published_date || entry.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
            <motion.h1 
              layoutId={`journal-title-${id}`}
              className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight"
            >
              {entry.title}
            </motion.h1>
            <motion.p 
              layoutId={`journal-desc-${id}`}
              className="text-xl text-muted-foreground leading-relaxed mb-6"
            >
              {entry.description}
            </motion.p>
            {entry.tags && entry.tags.length > 0 && (
              <motion.div 
                layoutId={`journal-tags-${id}`}
                className="flex flex-wrap gap-2"
              >
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-mono uppercase tracking-wider">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            )}
          </header>

          <motion.div 
            className="p-8 md:p-12 prose prose-lg max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
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
          </motion.div>
        </motion.article>
      </main>
    </div>
  );
};

export default JournalDetail;
