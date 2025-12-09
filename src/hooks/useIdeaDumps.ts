import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { IdeaDump } from "@/types/content";

export const useIdeaDumps = () => {
  return useQuery({
    queryKey: ["idea-dumps"],
    queryFn: async (): Promise<IdeaDump[]> => {
      const { data, error } = await supabase
        .from("idea_dumps")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data || [];
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
      return data;
    },
    enabled: !!id,
  });
};