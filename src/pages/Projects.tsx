import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { format } from "date-fns";

const Projects = () => {
  const { data: projects, isLoading, error } = useProjects();

  const featured = projects?.slice(0, 1)[0];
  const rest = projects?.slice(1) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-20 md:py-24 max-w-7xl">
        <SectionHeader
          title="Projects"
          description="Energy systems, academic platforms, and compliance-first architectures."
        />

        {/* Tech Stack Ticker */}
        {projects && projects.length > 0 && (
          <div className="relative overflow-hidden py-4 mb-8 border-y border-border/50">
            <div className="flex animate-[scroll_20s_linear_infinite] gap-6 whitespace-nowrap">
              {projects.flatMap(p => p.tags || []).filter((v, i, a) => a.indexOf(v) === i).map((tag, i) => (
                <span key={i} className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {tag}
                </span>
              ))}
              {projects.flatMap(p => p.tags || []).filter((v, i, a) => a.indexOf(v) === i).map((tag, i) => (
                <span key={`dup-${i}`} className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {isLoading && <BentoSkeleton />}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive text-lg">Error loading projects. Please try again.</p>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Featured Hero Card - Full Width */}
            {featured && (
              <Link
                to={`/projects/${featured.id}`}
                className="group col-span-1 md:col-span-12 relative overflow-hidden rounded-2xl bg-card border border-border/50 
                  transform-gpu transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl
                  hover:-translate-y-1 active:scale-[0.99]"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 md:p-10 min-h-[280px] md:min-h-[400px] flex flex-col justify-end">
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-0 gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </Badge>
                  </div>
                  <div className="space-y-3 md:space-y-4 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {featured.tags?.slice(0, 4).map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-4 text-xs md:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.reading_time || 5} min
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        View Project <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Mobile: Horizontal Swipe Strip */}
            <div className="md:hidden col-span-1 -mx-4 px-4">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide [-webkit-overflow-scrolling:touch]">
                {rest.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    className="group flex-shrink-0 w-[280px] snap-center relative overflow-hidden rounded-xl bg-card border border-border/50
                      transform-gpu transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative p-5 min-h-[180px] flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="space-y-2 pt-3">
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-[10px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{project.published_date ? format(new Date(project.published_date), "MMM yyyy") : ""}</span>
                          <span className="flex items-center gap-1 text-primary">
                            View <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="text-center text-[11px] text-muted-foreground mt-2">
                ← Swipe to browse →
              </p>
            </div>

            {/* Desktop: Bento Grid Cards */}
            {rest.map((project, index) => {
              const isLarge = index % 3 === 0;
              const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";

              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className={`hidden md:block group col-span-1 ${colSpan} relative overflow-hidden rounded-xl bg-card border border-border/50
                    transform-gpu transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    hover:-translate-y-1 active:scale-[0.98]`}
                  style={{ 
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-5 md:p-6 min-h-[200px] md:min-h-[240px] flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="space-y-3 pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags?.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-[10px] md:text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{project.published_date ? format(new Date(project.published_date), "MMM yyyy") : ""}</span>
                        <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-primary">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {projects && projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No projects yet. Start building!</p>
          </div>
        )}
      </main>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const BentoSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
    <div className="col-span-1 md:col-span-12">
      <Skeleton className="h-[280px] md:h-[400px] rounded-2xl" />
    </div>
    <div className="col-span-1 md:col-span-8">
      <Skeleton className="h-[200px] md:h-[240px] rounded-xl" />
    </div>
    <div className="col-span-1 md:col-span-4">
      <Skeleton className="h-[200px] md:h-[240px] rounded-xl" />
    </div>
  </div>
);

export default Projects;
