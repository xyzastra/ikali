import { useState } from "react";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { useIdeaDumps } from "@/hooks/useIdeaDumps";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { Lightbulb, Sprout, TreeDeciduous, Leaf, ArrowRight } from "lucide-react";
import { BottomSheet } from "@/components/BottomSheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { IdeaCard, getIdeaMaturity, type IdeaSize } from "@/components/IdeaCard";

const IdeaDumps = () => {
  const { data: ideaDumps, isLoading, error } = useIdeaDumps();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);
  const { user } = useAuth();

  const activeIdea = ideaDumps?.find((i) => i.id === activeId) || null;

  // Determine size variant based on index for bento effect
  const getSizeVariant = (index: number): IdeaSize => {
    const pattern = index % 6;
    if (pattern === 0 || pattern === 5) return "large";
    if (pattern === 2 || pattern === 3) return "medium";
    return "small";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-20 md:py-24 max-w-7xl">
        <SectionHeader
          title="Idea Dumps"
          description="Raw concepts exploring policy frameworks, decentralized systems, and innovation."
        />

        {/* Maturity Legend */}
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
              const isOwner = user?.id === idea.user_id;
              const sizeVariant = getSizeVariant(index);

              // Mobile: Button opens bottom sheet
              if (isMobile) {
                return (
                  <div
                    key={idea.id}
                    className="break-inside-avoid mb-4 md:mb-6"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <IdeaCard
                      id={idea.id}
                      title={idea.title}
                      description={idea.description}
                      tags={idea.tags}
                      publishedDate={idea.published_date}
                      maturity={maturity}
                      sizeVariant={sizeVariant}
                      isOwner={isOwner}
                      ownerName={idea.owner_display_name}
                      ownerAvatar={idea.owner_avatar_url}
                      onClick={() => setActiveId(idea.id)}
                      className="cursor-pointer"
                    />
                  </div>
                );
              }

              // Desktop: Link to detail page
              return (
                <Link
                  key={idea.id}
                  to={`/idea-dumps/${idea.id}`}
                  className="block break-inside-avoid mb-4 md:mb-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <IdeaCard
                    id={idea.id}
                    title={idea.title}
                    description={idea.description}
                    tags={idea.tags}
                    publishedDate={idea.published_date}
                    maturity={maturity}
                    sizeVariant={sizeVariant}
                    isOwner={isOwner}
                    ownerName={idea.owner_display_name}
                    ownerAvatar={idea.owner_avatar_url}
                    className="cursor-pointer"
                  />
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

        {/* Mobile Bottom Sheet */}
        <BottomSheet
          open={!!activeIdea && isMobile}
          onClose={() => setActiveId(null)}
          title={activeIdea?.title}
        >
          {activeIdea && (
            <div className="space-y-4">
              {/* Maturity Badge */}
              {(() => {
                const maturity = getIdeaMaturity(activeIdea.content, activeIdea.tags);
                const icons = { seedling: Sprout, growing: Leaf, evergreen: TreeDeciduous };
                const MaturityIcon = icons[maturity];
                return (
                  <div className="flex items-center gap-2">
                    <MaturityIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary capitalize">
                      {maturity}
                    </span>
                  </div>
                );
              })()}

              {/* Tags */}
              {activeIdea.tags && activeIdea.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {activeIdea.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeIdea.description}
              </p>

              {/* Content Preview */}
              {activeIdea.content && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-foreground line-clamp-6">
                    {activeIdea.content.slice(0, 300)}...
                  </p>
                </div>
              )}

              {/* Open Full Page Button */}
              <button
                className="w-full mt-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={() => {
                  setActiveId(null);
                  navigate(`/idea-dumps/${activeIdea.id}`);
                }}
              >
                Open full page <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </BottomSheet>
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
