import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowUp, Users, Star, Calendar, FolderOpen, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string | null;
}

interface UserProject {
  id: string;
  title: string;
  description: string | null;
  project_type: string;
  upvote_count: number | null;
  is_featured: boolean | null;
  created_at: string;
  tags: string[] | null;
}

function useProfile(userId: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!userId,
  });
}

function useUserProjectsByUser(userId: string) {
  return useQuery({
    queryKey: ["user-projects-by-user", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as UserProject[];
    },
    enabled: !!userId,
  });
}

function useUserCommentCount(userId: string) {
  return useQuery({
    queryKey: ["user-comment-count", userId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("project_comments")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);
      if (error) throw error;
      return count || 0;
    },
    enabled: !!userId,
  });
}

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  
  const { data: profile, isLoading: profileLoading } = useProfile(userId || "");
  const { data: projects, isLoading: projectsLoading } = useUserProjectsByUser(userId || "");
  const { data: commentCount } = useUserCommentCount(userId || "");

  const isLoading = profileLoading || projectsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">User not found</p>
          <Link to="/community">
            <Badge variant="outline" className="cursor-pointer">Back to Community</Badge>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = profile.display_name || profile.email?.split("@")[0] || "Anonymous";
  const initials = displayName.slice(0, 2).toUpperCase();
  const totalUpvotes = projects?.reduce((sum, p) => sum + (p.upvote_count || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back link */}
        <Link to="/community" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Community
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 p-6 bg-card rounded-lg border border-border">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profile.avatar_url || undefined} alt={displayName} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{displayName}</h1>
            
            {profile.created_at && (
              <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4" />
                Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <FolderOpen className="h-4 w-4 text-primary" />
                <span className="font-medium">{projects?.length || 0}</span>
                <span className="text-muted-foreground">projects</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ArrowUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">{totalUpvotes}</span>
                <span className="text-muted-foreground">upvotes received</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span className="font-medium">{commentCount}</span>
                <span className="text-muted-foreground">comments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Projects by {displayName}
          </h2>

          {projects && projects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/community/${project.id}`}
                  className="group block border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm shrink-0">
                      <ArrowUp className="h-3 w-3" />
                      {project.upvote_count || 0}
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
                    {project.is_featured && (
                      <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                        <Star className="h-3 w-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-3">
                    {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No projects yet
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
