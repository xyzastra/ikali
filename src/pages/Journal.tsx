import { useMemo } from "react";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";
import { TrendingUp, FileText, MessageSquare, X } from "lucide-react";
import { JournalCard, getEntryType, type JournalEntryType, type JournalStyle } from "@/components/JournalCard";

const validTypes: JournalEntryType[] = ["Strategy", "Policy", "Reflection"];

const typeConfig: Record<JournalEntryType, { color: string; icon: React.ElementType }> = {
  Strategy: { color: "bg-chart-1", icon: TrendingUp },
  Policy: { color: "bg-chart-2", icon: FileText },
  Reflection: { color: "bg-chart-4", icon: MessageSquare },
};

const Journal = () => {
  const { data: journalEntries, isLoading, error } = useJournalEntries();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get filter from URL, validate it
  const typeParam = searchParams.get("type");
  const activeFilter = validTypes.includes(typeParam as JournalEntryType) ? (typeParam as JournalEntryType) : null;

  // Get style from URL (for demo purposes - normally this would come from user preferences)
  const styleParam = searchParams.get("style") as JournalStyle | null;
  const journalStyle: JournalStyle = styleParam && ["minimal", "notebook", "typewriter"].includes(styleParam) 
    ? styleParam 
    : "minimal";

  // Filter entries based on active filter
  const filteredEntries = useMemo(() => {
    if (!journalEntries) return [];
    if (!activeFilter) return journalEntries;
    return journalEntries.filter(entry => getEntryType(entry.title, entry.tags) === activeFilter);
  }, [journalEntries, activeFilter]);

  // Group filtered entries by year
  const entriesByYear = useMemo(() => {
    return filteredEntries.reduce((acc, entry) => {
      const year = entry.published_date 
        ? new Date(entry.published_date).getFullYear().toString()
        : "Undated";
      if (!acc[year]) acc[year] = [];
      acc[year].push(entry);
      return acc;
    }, {} as Record<string, typeof filteredEntries>);
  }, [filteredEntries]);

  const years = Object.keys(entriesByYear).sort((a, b) => b.localeCompare(a));

  const handleFilterClick = (type: JournalEntryType) => {
    if (activeFilter === type) {
      searchParams.delete("type");
    } else {
      searchParams.set("type", type);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const clearFilter = () => {
    searchParams.delete("type");
    setSearchParams(searchParams, { replace: true });
  };

  const handleStyleChange = (style: JournalStyle) => {
    searchParams.set("style", style);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-20 md:py-24 max-w-5xl">
        <SectionHeader
          title="Journal"
          description="Reflections on strategy, policy advocacy, and decentralized solutions."
        />

        {/* Filter & Style Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Type Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
            {(Object.keys(typeConfig) as JournalEntryType[]).map((type) => {
              const { color, icon: Icon } = typeConfig[type];
              const isActive = activeFilter === type;
              return (
                <button
                  key={type}
                  onClick={() => handleFilterClick(type)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-md" 
                      : "bg-card border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <Icon className="w-3.5 h-3.5" />
                  <span>{type}</span>
                </button>
              );
            })}
            {activeFilter && (
              <button
                onClick={clearFilter}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Style Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Style:</span>
            {(["minimal", "notebook", "typewriter"] as JournalStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => handleStyleChange(style)}
                className={`px-2 py-1 rounded text-xs capitalize transition-colors ${
                  journalStyle === style
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {activeFilter && (
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredEntries.length} {activeFilter.toLowerCase()} {filteredEntries.length === 1 ? 'entry' : 'entries'}
          </p>
        )}

        {isLoading && <TimelineSkeleton />}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading journal entries. Please try again.</p>
          </div>
        )}

        {filteredEntries.length > 0 && (
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
                    <div
                      key={entry.id}
                      className="relative"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <JournalCard
                        id={entry.id}
                        title={entry.title}
                        description={entry.description}
                        tags={entry.tags}
                        publishedDate={entry.published_date}
                        readingTime={entry.reading_time}
                        entryType={getEntryType(entry.title, entry.tags)}
                        journalStyle={journalStyle}
                        showTimelineDot={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredEntries.length === 0 && !isLoading && !error && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              {activeFilter 
                ? `No ${activeFilter.toLowerCase()} entries found. Try a different filter.`
                : "No journal entries yet. Start documenting your journey!"}
            </p>
            {activeFilter && (
              <button
                onClick={clearFilter}
                className="mt-4 inline-flex items-center gap-1 text-primary hover:underline"
              >
                <X className="w-4 h-4" />
                Clear filter
              </button>
            )}
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
