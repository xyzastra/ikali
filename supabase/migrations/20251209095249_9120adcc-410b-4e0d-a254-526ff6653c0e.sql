-- =============================================
-- Fix Users table duplicate SELECT policies
-- =============================================
DROP POLICY IF EXISTS "Users can strictly view own profile" ON public."Users";
DROP POLICY IF EXISTS "Users can view co-members only" ON public."Users";
DROP POLICY IF EXISTS "Users can view own record or co-members" ON public."Users";

CREATE POLICY "Users can view own or co-member profiles"
ON public."Users"
FOR SELECT
TO authenticated
USING (
  auth_id = auth.uid() 
  OR EXISTS (
    SELECT 1 FROM public.project_members pm1
    JOIN public.project_members pm2 ON pm1.project_id = pm2.project_id
    WHERE pm1.user_id = auth.uid() AND pm2.user_id = "Users".auth_id
  )
);

-- =============================================
-- Fix content_projects table policies
-- =============================================
DROP POLICY IF EXISTS "Admins can insert content" ON public.content_projects;
DROP POLICY IF EXISTS "Admins can update content" ON public.content_projects;
DROP POLICY IF EXISTS "Admins can delete content" ON public.content_projects;

CREATE POLICY "Admins can insert content"
ON public.content_projects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content"
ON public.content_projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content"
ON public.content_projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Fix journal_entries table policies
-- =============================================
DROP POLICY IF EXISTS "Admins can insert journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Admins can update journal entries" ON public.journal_entries;
DROP POLICY IF EXISTS "Admins can delete journal entries" ON public.journal_entries;

CREATE POLICY "Admins can insert journal entries"
ON public.journal_entries
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update journal entries"
ON public.journal_entries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete journal entries"
ON public.journal_entries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Fix idea_dumps table policies
-- =============================================
DROP POLICY IF EXISTS "Admins can insert ideas" ON public.idea_dumps;
DROP POLICY IF EXISTS "Admins can update ideas" ON public.idea_dumps;
DROP POLICY IF EXISTS "Admins can delete ideas" ON public.idea_dumps;

CREATE POLICY "Admins can insert ideas"
ON public.idea_dumps
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ideas"
ON public.idea_dumps
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ideas"
ON public.idea_dumps
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- Fix user_roles table SELECT policy
-- =============================================
DROP POLICY IF EXISTS "Unified View User Roles" ON public.user_roles;

CREATE POLICY "Users can view own roles and admins can view all"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));