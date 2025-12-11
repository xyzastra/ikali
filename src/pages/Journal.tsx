import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, ArrowRight, TrendingUp, FileText, MessageSquare } from "lucide-react";
import { format } from "date-fns";

// Helper to detect entry type based on title/tags
const getEntryType = (entry: { title: string; tags?: string[] | null }): { 
  type: "Strategy" | "Policy" | "Reflection"; 
  color: string;
  icon: React.ElementType;
} => {
  const title = entry.title.toLowerCase();
  const tags = entry.tags?.map(t => t.toLowerCase()) || [];
  
  if (title.includes("strategy") || tags.includes("strategy")) {
    return { type: "Strategy", color: "bg-chart-1", icon: TrendingUp };
  }
  if (title.includes("policy") || tags.includes("policy")) {
    return { type: "Policy", color: "bg-chart-2", icon: FileText };
  }
  return { type: "Reflection", color: "bg-chart-4", icon: MessageSquare };
};

const Journal = () => {
  const { data: journalEntries, isLoading, error } = useJournalEntries();

  // Group entries by year
  const entriesByYear = journalEntries?.reduce((acc, entry) => {
    const year = entry.published_date 
      ? new Date(entry.published_date).getFullYear().toString()
      : "Undated";
    if (!acc[year]) acc[year] = [];
    acc[year].push(entry);
    return acc;
  }, {} as Record<string, typeof journalEntries>) || {};

  const years = Object.keys(entriesByYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-20 md:py-24 max-w-5xl">
        <SectionHeader
          title="Journal"
          description="Reflections on strategy, policy advocacy, and decentralized solutions."
        />

        {/* Type Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
          <span className="text-muted-foreground">Entry types:</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
            <span>Strategy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
            <span>Policy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-chart-4" />
            <span>Reflection</span>
          </div>
        </div>

        {isLoading && <TimelineSkeleton />}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading journal entries. Please try again.</p>
          </div>
        )}

        {journalEntries && journalEntries.length > 0 && (
          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-border via-primary/20 to-border" />

            {years.map((year) => (
              <div key={year} className="relative">
                {/* Sticky Year Header */}
                <div className="sticky top-20 z-10 mb-6 md:mb-8">
                  <div className="md:w-[100px] inline-block">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-mono font-bold shadow-lg">
                      {year}
                    </span>
                  </div>
                </div>

                {/* Entries for this year */}
                <div className="space-y-4 md:space-y-6 pb-12 md:pb-16 md:pl-[140px]">
                  {entriesByYear[year]?.map((entry, index) => (
                    <Link
                      key={entry.id}
                      to={`/journal/${entry.id}`}
                      className="group block relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Timeline Dot - Hidden on mobile */}
                      <div className="hidden md:flex absolute -left-[32px] top-6 w-4 h-4 rounded-full bg-background border-2 border-primary/30 group-hover:border-primary group-hover:scale-125 transition-all duration-300 items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      </div>

                      {/* Entry Card */}
                      <article className="relative overflow-hidden rounded-xl bg-card border border-border/50 p-5 md:p-6
                        transform-gpu transition-all duration-300 
                        hover:shadow-xl hover:-translate-y-0.5 hover:border-primary/30
                        active:scale-[0.99]">
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative space-y-3">
                          {/* Date, Type & Reading Time Row */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <time className="font-mono">
                                {entry.published_date 
                                  ? format(new Date(entry.published_date), "MMM d")
                                  : "—"}
                              </time>
                              {(() => {
                                const { type, color, icon: TypeIcon } = getEntryType(entry);
                                return (
                                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/50">
                                    <div className={`w-2 h-2 rounded-full ${color}`} />
                                    <TypeIcon className="w-3 h-3" />
                                    <span className="text-[10px] uppercase tracking-wide">{type}</span>
                                  </span>
                                );
                              })()}
                            </div>
                            <span className="flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 rounded-full">
                              <Clock className="w-3 h-3" />
                              {entry.reading_time || 5} min
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg md:text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {entry.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {entry.description}
                          </p>

                          {/* Tags & CTA */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex flex-wrap gap-1.5">
                              {entry.tags?.slice(0, 3).map((tag, i) => (
                                <Badge 
                                  key={i} 
                                  variant="outline" 
                                  className="text-[10px] md:text-xs font-normal"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <span className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-all group-hover:gap-2">
                              <BookOpen className="w-3.5 h-3.5" />
                              Read
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

const TimelineSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-20 rounded-full" />
    {[1, 2, 3].map((i) => (
      <div key={i} className="md:pl-[140px]">
        <Skeleton className="h-[160px] rounded-xl" />
      </div>
    ))}
  </div>
);

export default Journal;
