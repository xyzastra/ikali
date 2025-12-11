import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserProject {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  content: string | null;
  cover_image_url: string | null;
  project_type: "personal" | "collaborative";
  looking_for_collaborators: boolean;
  tags: string[];
  is_featured: boolean;
  upvote_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    display_name: string | null;
    avatar_url: string | null;
    email: string | null;
  } | null;
}

export interface ProjectComment {
  id: string;
  project_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  replies?: ProjectComment[];
  user_email?: string;
}

export interface ProjectVote {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
}

export function useUserProjects(options?: { featured?: boolean; type?: string }) {
  return useQuery({
    queryKey: ["user-projects", options],
    queryFn: async () => {
      let query = supabase
        .from("user_projects")
        .select("*")
        .order("upvote_count", { ascending: false })
        .order("created_at", { ascending: false });

      if (options?.featured) {
        query = query.eq("is_featured", true);
      }
      if (options?.type) {
        query = query.eq("project_type", options.type);
      }

      const { data: projects, error } = await query;
      if (error) throw error;

      // Fetch profiles for all unique user_ids
      const userIds = [...new Set((projects || []).map(p => p.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, email")
        .in("id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      return (projects || []).map(project => ({
        ...project,
        profiles: profileMap.get(project.user_id) || null,
      })) as UserProject[];
    },
  });
}

export function useUserProject(id: string) {
  return useQuery({
    queryKey: ["user-project", id],
    queryFn: async () => {
      const { data: project, error } = await supabase
        .from("user_projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!project) return null;

      // Fetch profile for the user
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, email")
        .eq("id", project.user_id)
        .maybeSingle();

      return {
        ...project,
        profiles: profile || null,
      } as UserProject;
    },
    enabled: !!id,
  });
}

export function useProjectComments(projectId: string) {
  return useQuery({
    queryKey: ["project-comments", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_comments")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });
      if (error) throw error;

      // Build threaded structure
      const comments = data as ProjectComment[];
      const rootComments: ProjectComment[] = [];
      const commentMap = new Map<string, ProjectComment>();

      comments.forEach((c) => {
        c.replies = [];
        commentMap.set(c.id, c);
      });

      comments.forEach((c) => {
        if (c.parent_id) {
          const parent = commentMap.get(c.parent_id);
          if (parent) parent.replies!.push(c);
        } else {
          rootComments.push(c);
        }
      });

      return rootComments;
    },
    enabled: !!projectId,
  });
}

export function useUserVote(projectId: string, userId: string | undefined) {
  return useQuery({
    queryKey: ["user-vote", projectId, userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("project_votes")
        .select("*")
        .eq("project_id", projectId)
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data as ProjectVote | null;
    },
    enabled: !!projectId && !!userId,
  });
}

export function useProjectMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createProject = useMutation({
    mutationFn: async (project: Omit<UserProject, "id" | "created_at" | "updated_at" | "upvote_count" | "is_featured">) => {
      const { data, error } = await supabase.from("user_projects").insert(project).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      toast({ title: "Project created!", description: "Your project has been submitted." });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<UserProject> & { id: string }) => {
      const { data, error } = await supabase.from("user_projects").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      queryClient.invalidateQueries({ queryKey: ["user-project"] });
      toast({ title: "Project updated!" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      toast({ title: "Project deleted" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const toggleVote = useMutation({
    mutationFn: async ({ projectId, userId, hasVoted }: { projectId: string; userId: string; hasVoted: boolean }) => {
      if (hasVoted) {
        const { error } = await supabase.from("project_votes").delete().eq("project_id", projectId).eq("user_id", userId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("project_votes").insert({ project_id: projectId, user_id: userId });
        if (error) throw error;
      }
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["user-vote", projectId] });
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      queryClient.invalidateQueries({ queryKey: ["user-project", projectId] });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const addComment = useMutation({
    mutationFn: async ({ projectId, userId, content, parentId }: { projectId: string; userId: string; content: string; parentId?: string }) => {
      const { data, error } = await supabase
        .from("project_comments")
        .insert({ project_id: projectId, user_id: userId, content, parent_id: parentId || null })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project-comments", projectId] });
      toast({ title: "Comment added!" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async ({ id, projectId }: { id: string; projectId: string }) => {
      const { error } = await supabase.from("project_comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project-comments", projectId] });
      toast({ title: "Comment deleted" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  return { createProject, updateProject, deleteProject, toggleVote, addComment, deleteComment };
}
