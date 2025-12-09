-- Fix projects table RLS policies based on actual schema
-- The projects table has: members (bigint), "project type" (text)

-- Recreate the SELECT policy dropped earlier - restrict to authenticated users
CREATE POLICY "Authenticated users can view projects"
ON public.projects
FOR SELECT
TO authenticated
USING (true);

-- Fix the UPDATE policy - only admins can update
CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));