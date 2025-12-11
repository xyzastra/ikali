import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { IdeaDump } from "@/types/content";

export const useIdeaDumps = () => {
  return useQuery({
    queryKey: ["idea-dumps"],
    queryFn: async (): Promise<IdeaDump[]> => {
      // Fetch ideas
      const { data: ideas, error } = await supabase
        .from("idea_dumps")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      if (!ideas || ideas.length === 0) return [];

      // Get unique user_ids
      const userIds = [...new Set(ideas.map(i => i.user_id).filter(Boolean))] as string[];
      
      // Fetch public profiles for all users (using the public_profiles view)
      const profileMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("public_profiles")
          .select("id, display_name, avatar_url")
          .in("id", userIds);
        
        profiles?.forEach(p => {
          if (p.id) {
            profileMap[p.id] = { display_name: p.display_name, avatar_url: p.avatar_url };
          }
        });
      }

      // Merge profile data into ideas
      return ideas.map(idea => ({
        ...idea,
        tags: idea.tags || [],
        owner_display_name: idea.user_id ? profileMap[idea.user_id]?.display_name : null,
        owner_avatar_url: idea.user_id ? profileMap[idea.user_id]?.avatar_url : null,
      }));
    },
  });
};

export const useIdeaDump = (id: string | undefined) => {
  return useQuery({
    queryKey: ["idea-dump", id],
    queryFn: async (): Promise<IdeaDump | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("idea_dumps")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Fetch owner profile using public_profiles view
      let owner_display_name: string | null = null;
      let owner_avatar_url: string | null = null;
      
      if (data.user_id) {
        const { data: profile } = await supabase
          .from("public_profiles")
          .select("display_name, avatar_url")
          .eq("id", data.user_id)
          .maybeSingle();
        
        owner_display_name = profile?.display_name ?? null;
        owner_avatar_url = profile?.avatar_url ?? null;
      }

      return {
        ...data,
        tags: data.tags || [],
        owner_display_name,
        owner_avatar_url,
      };
    },
    enabled: !!id,
  });
};