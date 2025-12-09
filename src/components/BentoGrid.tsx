import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, BookOpen, Lightbulb, Briefcase, Mail } from "lucide-react";
import type { Project, JournalEntry, IdeaDump } from "@/types/content";

interface BentoItem {
  id: string;
  title: string;
  description: string | null;
  tags?: string[] | null;
  type: "project" | "journal" | "idea";
}

interface BentoGridProps {
  projects: Project[];
  journals: JournalEntry[];
  ideas: IdeaDump[];
  isLoading?: boolean;
}

const bentoColors = [
  "from-bento-coral/20 to-bento-amber/10 border-bento-coral/30 hover:border-bento-coral/60",
  "from-bento-emerald/20 to-bento-teal/10 border-bento-emerald/30 hover:border-bento-emerald/60",
  "from-bento-sky/20 to-bento-indigo/10 border-bento-sky/30 hover:border-bento-sky/60",
  "from-bento-violet/20 to-bento-rose/10 border-bento-violet/30 hover:border-bento-violet/60",
  "from-bento-rose/20 to-bento-coral/10 border-bento-rose/30 hover:border-bento-rose/60",
  "from-bento-teal/20 to-bento-emerald/10 border-bento-teal/30 hover:border-bento-teal/60",
];

const getPath = (type: string, id: string) => {
  switch (type) {
    case "project": return `/projects/${id}`;
    case "journal": return `/journal/${id}`;
    case "idea": return `/idea-dumps/${id}`;
    default: return "/";
  }
};

const BentoCard = ({ 
  item, 
  colorClass, 
  size = "normal" 
}: { 
  item: BentoItem; 
  colorClass: string; 
  size?: "normal" | "large" | "wide";
}) => {
  const sizeClasses = {
    normal: "col-span-1 row-span-1",
    large: "col-span-1 row-span-2 md:col-span-1",
    wide: "col-span-1 md:col-span-2 row-span-1",
  };

  return (
    <Link
      to={getPath(item.type, item.id)}
      className={`
        group relative overflow-hidden rounded-2xl border-2 p-4 sm:p-6
        bg-gradient-to-br ${colorClass} ${sizeClasses[size]}
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
        active:scale-[0.98]
      `}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8">
        <div className="w-full h-full rounded-full bg-current" />
      </div>
      
      {/* Type badge */}
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-foreground/10 text-foreground/70 mb-3">
        {item.type === "project" && <Briefcase className="w-3 h-3" />}
        {item.type === "journal" && <BookOpen className="w-3 h-3" />}
        {item.type === "idea" && <Lightbulb className="w-3 h-3" />}
        {item.type}
      </span>
      
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      
      {item.description && (
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3">
          {item.description}
        </p>
      )}
      
      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto">
          {item.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 rounded-md text-[10px] bg-foreground/5 text-foreground/60"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Arrow indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-5 h-5 text-foreground/50" />
      </div>
    </Link>
  );
};

const NavCard = ({ 
  title, 
  description, 
  path, 
  icon: Icon, 
  colorClass 
}: { 
  title: string; 
  description: string; 
  path: string; 
  icon: React.ElementType;
  colorClass: string;
}) => (
  <Link
    to={path}
    className={`
      group relative overflow-hidden rounded-2xl border-2 p-4 sm:p-5
      bg-gradient-to-br ${colorClass}
      transition-all duration-300 ease-out
      hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]
      active:scale-[0.98]
    `}
  >
    <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-foreground/70 group-hover:text-foreground transition-colors" />
    <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">
      {title}
    </h3>
    <p className="text-xs text-muted-foreground line-clamp-2">
      {description}
    </p>
    <ArrowRight className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
  </Link>
);

export const BentoGrid = ({ projects, journals, ideas, isLoading }: BentoGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className={`
              rounded-2xl bg-muted animate-pulse
              ${i === 0 ? "col-span-2 row-span-2 h-48 sm:h-64" : "h-32 sm:h-40"}
            `} 
          />
        ))}
      </div>
    );
  }

  // Combine and limit items for display
  const allItems: BentoItem[] = [
    ...projects.slice(0, 2).map(p => ({ ...p, type: "project" as const })),
    ...journals.slice(0, 2).map(j => ({ ...j, type: "journal" as const })),
    ...ideas.slice(0, 2).map(i => ({ ...i, type: "idea" as const })),
  ];

  // Navigation items
  const navItems = [
    { title: "All Projects", description: "Energy & platforms", path: "/projects", icon: Briefcase },
    { title: "Journal", description: "Notes & reflections", path: "/journal", icon: BookOpen },
    { title: "Ideas", description: "Raw concepts", path: "/idea-dumps", icon: Lightbulb },
    { title: "Contact", description: "Get in touch", path: "/contact", icon: Mail },
  ];

  return (
    <section className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Sparkles className="w-5 h-5 text-bento-amber" />
        <h2 className="text-xl sm:text-2xl font-bold">Explore</h2>
      </div>
      
      {/* Main Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
        {/* Featured content cards */}
        {allItems.map((item, index) => (
          <BentoCard
            key={`${item.type}-${item.id}`}
            item={item}
            colorClass={bentoColors[index % bentoColors.length]}
            size={index === 0 ? "large" : "normal"}
          />
        ))}
        
        {/* Navigation cards */}
        {navItems.map((nav, index) => (
          <NavCard
            key={nav.path}
            {...nav}
            colorClass={bentoColors[(allItems.length + index) % bentoColors.length]}
          />
        ))}
      </div>
    </section>
  );
};
