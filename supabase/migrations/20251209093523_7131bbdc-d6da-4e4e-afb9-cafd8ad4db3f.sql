-- Drop the overly permissive policy that exposes emails to all project members
DROP POLICY IF EXISTS "project_members_can_view_users_simple" ON public."Users";

-- Create a more restrictive policy: users can only see other users who share at least one project
CREATE POLICY "Users can view co-members only"
ON public."Users"
FOR SELECT
TO authenticated
USING (
  -- Users can always see their own data
  id::text = auth.uid()::text
  OR
  -- Users can see others only if they share at least one project
  EXISTS (
    SELECT 1 FROM public.project_members pm1
    JOIN public.project_members pm2 ON pm1.project_id = pm2.project_id
    WHERE pm1.user_id = auth.uid()
    AND pm2.user_id::text = public."Users".id::text
  )
);