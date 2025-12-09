-- Fix Users table RLS policy to require authentication and restrict to own data only

-- Drop the existing overly permissive SELECT policy if it exists
DROP POLICY IF EXISTS "Enable read access for all users" ON public."Users";
DROP POLICY IF EXISTS "Users can view own data" ON public."Users";

-- Create a restrictive policy that requires authentication and only allows users to see their own data
CREATE POLICY "Users can view own data" ON public."Users"
  FOR SELECT
  TO authenticated
  USING (id::text = auth.uid()::text);