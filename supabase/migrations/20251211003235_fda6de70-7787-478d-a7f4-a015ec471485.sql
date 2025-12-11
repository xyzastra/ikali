-- Drop existing policies on Users table
DROP POLICY IF EXISTS "Users can view own record only" ON public."Users";
DROP POLICY IF EXISTS "Users can insert own record" ON public."Users";
DROP POLICY IF EXISTS "Users can delete own record" ON public."Users";

-- Re-enable RLS (ensure it's on)
ALTER TABLE public."Users" ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners too (extra security)
ALTER TABLE public."Users" FORCE ROW LEVEL SECURITY;

-- Create strict SELECT policy - users can only see their own record
CREATE POLICY "Users can view own record only"
ON public."Users"
FOR SELECT
TO authenticated
USING (auth_id = auth.uid());

-- Create strict INSERT policy - users can only insert their own record  
CREATE POLICY "Users can insert own record"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (auth_id = auth.uid());

-- Create strict UPDATE policy - users can only update their own record
CREATE POLICY "Users can update own record"
ON public."Users"
FOR UPDATE
TO authenticated
USING (auth_id = auth.uid())
WITH CHECK (auth_id = auth.uid());

-- Create strict DELETE policy - users can only delete their own record
CREATE POLICY "Users can delete own record"
ON public."Users"
FOR DELETE
TO authenticated
USING (auth_id = auth.uid());