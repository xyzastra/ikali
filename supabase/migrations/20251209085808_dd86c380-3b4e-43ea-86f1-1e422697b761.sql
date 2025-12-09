-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Users";

-- Create a restrictive policy - users can only view their own data
CREATE POLICY "Users can view own data" ON public."Users"
  FOR SELECT
  TO authenticated
  USING (id::text = auth.uid()::text);