-- Fix Users table RLS to include tenant isolation
DROP POLICY IF EXISTS "Users can view own record only" ON public."Users";
DROP POLICY IF EXISTS "Users can update own record" ON public."Users";
DROP POLICY IF EXISTS "Users can delete own record" ON public."Users";

-- Create tenant-aware policies
CREATE POLICY "Users can view own record only"
ON public."Users"
FOR SELECT
USING (auth_id = auth.uid());

CREATE POLICY "Users can update own record"
ON public."Users"
FOR UPDATE
USING (auth_id = auth.uid())
WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Users can delete own record"
ON public."Users"
FOR DELETE
USING (auth_id = auth.uid());