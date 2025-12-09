import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { JournalEntry } from "@/types/content";

export const useJournalEntries = () => {
  return useQuery({
    queryKey: ["journal-entries"],
    queryFn: async (): Promise<JournalEntry[]> => {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useJournalEntry = (id: string | undefined) => {
  return useQuery({
    queryKey: ["journal-entry", id],
    queryFn: async (): Promise<JournalEntry | null> => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};