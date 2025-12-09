-- Drop the incomplete UPDATE policy
DROP POLICY IF EXISTS "Unified Update Projects" ON public.projects;

-- Create proper UPDATE policy: only app admins can update projects
CREATE POLICY "App admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create DELETE policy: only app admins can delete projects
CREATE POLICY "App admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));