-- Drop the overly permissive "Unified View Users" policy that allows ALL operations
DROP POLICY IF EXISTS "Unified View Users" ON public."Users";

-- Create a proper SELECT policy: users can view own record or co-members in shared projects
CREATE POLICY "Users can view own record or co-members"
ON public."Users"
FOR SELECT
TO authenticated
USING (
  (id::text = auth.uid()::text)
  OR 
  EXISTS (
    SELECT 1
    FROM public.project_members pm1
    JOIN public.project_members pm2 ON pm1.project_id = pm2.project_id
    WHERE pm1.user_id = auth.uid()
      AND pm2.user_id::text = "Users".id::text
  )
);

-- Create INSERT policy: users can only insert their own record
CREATE POLICY "Users can insert own record"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (id::text = auth.uid()::text);

-- Create UPDATE policy: users can only update their own record
CREATE POLICY "Users can update own record"
ON public."Users"
FOR UPDATE
TO authenticated
USING (id::text = auth.uid()::text)
WITH CHECK (id::text = auth.uid()::text);

-- Create DELETE policy: users can only delete their own record
CREATE POLICY "Users can delete own record"
ON public."Users"
FOR DELETE
TO authenticated
USING (id::text = auth.uid()::text);