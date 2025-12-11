import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useIdeaDumps } from "@/hooks/useIdeaDumps";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sprout, TreeDeciduous, Leaf, ArrowRight, Clock } from "lucide-react";
import { format } from "date-fns";

// Idea maturity based on content length or tags
const getIdeaMaturity = (content: string | null, tags: string[] | null) => {
  const contentLength = content?.length || 0;
  const tagCount = tags?.length || 0;
  
  if (contentLength > 1000 || tagCount > 4) {
    return { label: "Evergreen", icon: TreeDeciduous, color: "text-green-600 dark:text-green-400" };
  } else if (contentLength > 400 || tagCount > 2) {
    return { label: "Growing", icon: Leaf, color: "text-emerald-500 dark:text-emerald-400" };
  }
  return { label: "Seedling", icon: Sprout, color: "text-lime-500 dark:text-lime-400" };
};

const IdeaDumps = () => {
  const { data: ideaDumps, isLoading, error } = useIdeaDumps();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-20 md:py-24 max-w-7xl">
        <SectionHeader
          title="Idea Dumps"
          description="Raw concepts exploring policy frameworks, decentralized systems, and innovation."
        />

        {/* Maturity Legend - Mobile horizontal scroll */}
        <div className="flex gap-4 md:gap-6 mb-8 pb-2 overflow-x-auto scrollbar-hide">
          {[
            { label: "Seedling", icon: Sprout, desc: "Fresh thoughts" },
            { label: "Growing", icon: Leaf, desc: "Taking shape" },
            { label: "Evergreen", icon: TreeDeciduous, desc: "Well-developed" },
          ].map((stage) => (
            <div key={stage.label} className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
              <stage.icon className="w-4 h-4" />
              <span className="font-medium">{stage.label}</span>
              <span className="hidden md:inline text-xs">— {stage.desc}</span>
            </div>
          ))}
        </div>

        {isLoading && <MasonrySkeleton />}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading ideas. Please try again.</p>
          </div>
        )}

        {ideaDumps && ideaDumps.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {ideaDumps.map((idea, index) => {
              const maturity = getIdeaMaturity(idea.content, idea.tags);
              const MaturityIcon = maturity.icon;
              
              // Vary card heights based on content
              const hasLongDesc = (idea.description?.length || 0) > 100;
              
              return (
                <Link
                  key={idea.id}
                  to={`/idea-dumps/${idea.id}`}
                  className="group block break-inside-avoid mb-4 md:mb-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <article 
                    className="relative overflow-hidden rounded-2xl bg-card border border-border/50 p-5 md:p-6
                      transform-gpu transition-all duration-300
                      hover:shadow-xl hover:-translate-y-1 hover:border-primary/30
                      active:scale-[0.98]"
                    style={{
                      // Thought bubble aesthetic with varied border radius
                      borderRadius: index % 2 === 0 
                        ? "1.5rem 1.5rem 0.5rem 1.5rem" 
                        : "1.5rem 1.5rem 1.5rem 0.5rem"
                    }}
                  >
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Lightbulb decoration */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative space-y-3">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <MaturityIcon className={`w-4 h-4 ${maturity.color}`} />
                          <span className={`text-xs font-medium ${maturity.color}`}>
                            {maturity.label}
                          </span>
                        </div>
                        <Lightbulb className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="text-base md:text-lg font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {idea.title}
                      </h3>

                      {/* Description - Variable length */}
                      {idea.description && (
                        <p className={`text-sm text-muted-foreground leading-relaxed ${hasLongDesc ? "line-clamp-4" : "line-clamp-2"}`}>
                          {idea.description}
                        </p>
                      )}

                      {/* Tags as thought bubbles */}
                      {idea.tags && idea.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {idea.tags.slice(0, 4).map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground
                                group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {idea.tags.length > 4 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{idea.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <time className="font-mono">
                            {idea.published_date 
                              ? format(new Date(idea.published_date), "MMM d")
                              : ""}
                          </time>
                          {idea.reading_time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {idea.reading_time}m
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all font-medium">
                          Explore <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}

        {ideaDumps && ideaDumps.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground/30" />
            <p className="text-muted-foreground text-lg">No ideas yet. Let your creativity flow!</p>
          </div>
        )}
      </main>
    </div>
  );
};

const MasonrySkeleton = () => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
    {[180, 220, 160, 200, 180, 240].map((h, i) => (
      <Skeleton 
        key={i} 
        className="mb-4 md:mb-6 rounded-2xl" 
        style={{ height: `${h}px` }} 
      />
    ))}
  </div>
);

export default IdeaDumps;
