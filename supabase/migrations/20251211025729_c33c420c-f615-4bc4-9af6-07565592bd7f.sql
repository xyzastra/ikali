-- =============================================
-- Step 2: Create is_collaborator() helper function
-- =============================================
CREATE OR REPLACE FUNCTION public.is_collaborator()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND role = 'collaborator'
  )
$$;

-- =============================================
-- Step 3: Create auto-assign role trigger for new signups
-- =============================================
CREATE OR REPLACE FUNCTION public.on_auth_user_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE
      WHEN NEW.email = 'altruisticxai@gmail.com' THEN 'admin'::app_role
      ELSE 'collaborator'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.on_auth_user_created();

-- =============================================
-- Step 4: Update RLS policies for content_projects
-- Allow both admin and collaborator to manage content
-- =============================================
DROP POLICY IF EXISTS "Admins can insert content" ON public.content_projects;
DROP POLICY IF EXISTS "Admins can update content" ON public.content_projects;
DROP POLICY IF EXISTS "Admins can delete content" ON public.content_projects;

CREATE POLICY "Admins and collaborators can insert content"
ON public.content_projects
FOR INSERT
TO authenticated
WITH CHECK (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can update content"
ON public.content_projects
FOR UPDATE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can delete content"
ON public.content_projects
FOR DELETE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

-- =============================================
-- Step 5: Update RLS policies for journal_entries
-- =============================================
DROP POLICY IF EXISTS "Admins can insert journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Admins can update journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Admins can delete journal entries" ON public.journal_entries;

CREATE POLICY "Admins and collaborators can insert journal entries"
ON public.journal_entries
FOR INSERT
TO authenticated
WITH CHECK (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can update journal entries"
ON public.journal_entries
FOR UPDATE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can delete journal entries"
ON public.journal_entries
FOR DELETE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

-- =============================================
-- Step 6: Update RLS policies for idea_dumps
-- =============================================
DROP POLICY IF EXISTS "Admins can insert ideas" ON public.idea_dumps;
DROP POLICY IF EXISTS "Admins can update ideas" ON public.idea_dumps;
DROP POLICY IF EXISTS "Admins can delete ideas" ON public.idea_dumps;

CREATE POLICY "Admins and collaborators can insert ideas"
ON public.idea_dumps
FOR INSERT
TO authenticated
WITH CHECK (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can update ideas"
ON public.idea_dumps
FOR UPDATE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);

CREATE POLICY "Admins and collaborators can delete ideas"
ON public.idea_dumps
FOR DELETE
TO authenticated
USING (
  has_role((SELECT auth.uid()), 'admin'::app_role) 
  OR has_role((SELECT auth.uid()), 'collaborator'::app_role)
);