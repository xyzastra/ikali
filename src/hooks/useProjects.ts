import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/types/content";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("content_projects")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async (): Promise<Project | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("content_projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};