-- User-submitted projects table
CREATE TABLE public.user_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  cover_image_url TEXT,
  project_type TEXT NOT NULL DEFAULT 'personal' CHECK (project_type IN ('personal', 'collaborative')),
  looking_for_collaborators BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  upvote_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Project upvotes table
CREATE TABLE public.project_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.user_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- Threaded comments table
CREATE TABLE public.project_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.user_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.project_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

-- User Projects Policies
CREATE POLICY "Anyone can view projects" ON public.user_projects
FOR SELECT USING (true);

CREATE POLICY "Users can create their own projects" ON public.user_projects
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" ON public.user_projects
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" ON public.user_projects
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can update any project" ON public.user_projects
FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete any project" ON public.user_projects
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Project Votes Policies
CREATE POLICY "Anyone can view votes" ON public.project_votes
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can vote" ON public.project_votes
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own vote" ON public.project_votes
FOR DELETE USING (auth.uid() = user_id);

-- Project Comments Policies
CREATE POLICY "Anyone can view comments" ON public.project_comments
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can comment" ON public.project_comments
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.project_comments
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.project_comments
FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any comment" ON public.project_comments
FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to update upvote count
CREATE OR REPLACE FUNCTION public.update_project_upvote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.user_projects SET upvote_count = upvote_count + 1 WHERE id = NEW.project_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.user_projects SET upvote_count = upvote_count - 1 WHERE id = OLD.project_id;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger to auto-update upvote count
CREATE TRIGGER on_vote_change
AFTER INSERT OR DELETE ON public.project_votes
FOR EACH ROW EXECUTE FUNCTION public.update_project_upvote_count();

-- Trigger for updated_at
CREATE TRIGGER update_user_projects_updated_at
BEFORE UPDATE ON public.user_projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_comments_updated_at
BEFORE UPDATE ON public.project_comments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();