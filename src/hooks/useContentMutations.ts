import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type ContentType = 'projects' | 'journal' | 'ideas';

interface ContentData {
  title: string;
  description?: string;
  content?: string;
  published_date?: string;
  tags?: string[];
  cover_image_url?: string;
}

const queryKeyMap = {
  projects: ['projects'],
  journal: ['journal-entries'],
  ideas: ['idea-dumps'],
} as const;

export const useCreateContent = (type: ContentType) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeyMap[type];

  return useMutation({
    mutationFn: async (data: ContentData) => {
      if (type === 'projects') {
        const { data: result, error } = await supabase
          .from('content_projects')
          .insert({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
            cover_image_url: data.cover_image_url || null,
          })
          .select()
          .single();
        if (error) throw error;
        return result;
      } else if (type === 'journal') {
        const { data: result, error } = await supabase
          .from('journal_entries')
          .insert({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
          })
          .select()
          .single();
        if (error) throw error;
        return result;
      } else {
        const { data: result, error } = await supabase
          .from('idea_dumps')
          .insert({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
          })
          .select()
          .single();
        if (error) throw error;
        return result;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Created!',
        description: 'Content has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create content.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateContent = (type: ContentType) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeyMap[type];

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ContentData }) => {
      if (type === 'projects') {
        const { data: result, error } = await supabase
          .from('content_projects')
          .update({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
            cover_image_url: data.cover_image_url || null,
          })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return result;
      } else if (type === 'journal') {
        const { data: result, error } = await supabase
          .from('journal_entries')
          .update({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
          })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return result;
      } else {
        const { data: result, error } = await supabase
          .from('idea_dumps')
          .update({
            title: data.title,
            description: data.description || null,
            content: data.content || null,
            published_date: data.published_date || null,
            tags: data.tags || [],
          })
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return result;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Updated!',
        description: 'Content has been updated successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update content.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteContent = (type: ContentType) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeyMap[type];

  return useMutation({
    mutationFn: async (id: string) => {
      if (type === 'projects') {
        const { error } = await supabase.from('content_projects').delete().eq('id', id);
        if (error) throw error;
      } else if (type === 'journal') {
        const { error } = await supabase.from('journal_entries').delete().eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('idea_dumps').delete().eq('id', id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: 'Deleted!',
        description: 'Content has been deleted.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete content.',
        variant: 'destructive',
      });
    },
  });
};
