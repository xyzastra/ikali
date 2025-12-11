-- Drop the policy we just created
DROP POLICY IF EXISTS "Authenticated users can insert" ON public."Users";

-- Create a secure policy that ties auth_id to the authenticated user
CREATE POLICY "Users can only insert their own record"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (auth_id = auth.uid());