import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowUp, Users, Star, Sparkles } from "lucide-react";
import { useUserProjects } from "@/hooks/useUserProjects";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const Community = () => {
  const [filter, setFilter] = useState<string>("all");
  const { user } = useAuth();
  
  const { data: projects, isLoading } = useUserProjects(
    filter === "collaborative" ? { type: "collaborative" } : 
    filter === "personal" ? { type: "personal" } : 
    filter === "featured" ? { featured: true } : 
    undefined
  );

  const featuredProjects = projects?.filter(p => p.is_featured) || [];
  const regularProjects = projects?.filter(p => filter === "featured" ? true : !p.is_featured) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <SectionHeader
            title="Community Projects"
            description="Discover, share, and collaborate on projects"
          />
          {user && (
            <Link to="/community/submit">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Submit Project
              </Button>
            </Link>
          )}
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="mb-8">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              <Sparkles className="h-3 w-3" /> All
            </TabsTrigger>
            <TabsTrigger value="featured" className="gap-2">
              <Star className="h-3 w-3" /> Featured
            </TabsTrigger>
            <TabsTrigger value="collaborative" className="gap-2">
              <Users className="h-3 w-3" /> Collabs
            </TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
        ) : !projects?.length ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects yet. Be the first to share!</p>
            {user && (
              <Link to="/community/submit">
                <Button>Submit Your Project</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {filter === "all" && featuredProjects.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" /> Featured
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {featuredProjects.slice(0, 2).map((project) => (
                    <ProjectCard key={project.id} project={project} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Projects Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}

        {!user && (
          <div className="mt-8 p-6 border border-border rounded-lg bg-muted/30 text-center">
            <p className="text-muted-foreground mb-3">
              Sign in to submit your own projects and upvote others
            </p>
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    project_type: string;
    looking_for_collaborators: boolean;
    tags: string[];
    upvote_count: number;
    is_featured: boolean;
    created_at: string;
    cover_image_url: string | null;
  };
  featured?: boolean;
}

const ProjectCard = ({ project, featured }: ProjectCardProps) => {
  return (
    <Link
      to={`/community/${project.id}`}
      className={`group block border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-all hover:shadow-md ${
        featured ? "md:flex" : ""
      }`}
    >
      {project.cover_image_url && (
        <div className={`bg-muted ${featured ? "md:w-1/3" : "h-32"}`}>
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`p-4 ${featured ? "md:flex-1" : ""}`}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm shrink-0">
            <ArrowUp className="h-3 w-3" />
            {project.upvote_count}
          </div>
        </div>
        
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={project.project_type === "collaborative" ? "default" : "secondary"} className="text-xs">
            {project.project_type === "collaborative" ? (
              <><Users className="h-3 w-3 mr-1" /> Collab</>
            ) : "Personal"}
          </Badge>
          {project.looking_for_collaborators && (
            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
              Looking for help
            </Badge>
          )}
          {project.is_featured && (
            <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
              <Star className="h-3 w-3 mr-1" /> Featured
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-3">
          {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
        </p>
      </div>
    </Link>
  );
};

export default Community;
