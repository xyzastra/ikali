import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export type JournalStyle = "minimal" | "notebook" | "typewriter";
export type IdeaLayoutStyle = "masonry" | "grid" | "list";

export interface UserPreferences {
  journal_style: JournalStyle | null;
  idea_layout_style: IdeaLayoutStyle | null;
  font_pref: string | null;
  primary_color: string | null;
  accent_color: string | null;
}

export function useUserPreferences() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ["user-preferences", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("user_profiles")
        .select("journal_style, idea_layout_style, font_pref, primary_color, accent_color")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user preferences:", error);
        return null;
      }

      return data as UserPreferences | null;
    },
    enabled: !!user?.id,
  });

  const updatePreference = useMutation({
    mutationFn: async (updates: Partial<UserPreferences>) => {
      if (!user?.id) throw new Error("Not authenticated");

      // First check if profile exists
      const { data: existing } = await supabase
        .from("user_profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (existing) {
        // Update existing profile
        const { error } = await supabase
          .from("user_profiles")
          .update(updates)
          .eq("user_id", user.id);

        if (error) throw error;
      } else {
        // Insert new profile
        const { error } = await supabase
          .from("user_profiles")
          .insert({ user_id: user.id, ...updates });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-preferences", user?.id] });
    },
    onError: (error) => {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save preference",
        variant: "destructive",
      });
    },
  });

  const setJournalStyle = (style: JournalStyle) => {
    updatePreference.mutate({ journal_style: style });
  };

  const setIdeaLayoutStyle = (style: IdeaLayoutStyle) => {
    updatePreference.mutate({ idea_layout_style: style });
  };

  return {
    preferences,
    isLoading,
    journalStyle: (preferences?.journal_style as JournalStyle) || "minimal",
    ideaLayoutStyle: (preferences?.idea_layout_style as IdeaLayoutStyle) || "masonry",
    setJournalStyle,
    setIdeaLayoutStyle,
    updatePreference: updatePreference.mutate,
    isUpdating: updatePreference.isPending,
  };
}
