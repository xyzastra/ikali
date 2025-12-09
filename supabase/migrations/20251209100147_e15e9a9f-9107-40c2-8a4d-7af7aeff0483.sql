-- Fix Users table policies: replace id (bigint) with auth_id (uuid)

-- Drop the broken policies that use id::text = auth.uid()::text
DROP POLICY IF EXISTS "Users can delete own record" ON public."Users";
DROP POLICY IF EXISTS "Users can insert own record" ON public."Users";
DROP POLICY IF EXISTS "Users can only insert their own record" ON public."Users";
DROP POLICY IF EXISTS "Users can update own record" ON public."Users";

-- Create fixed policies using auth_id (uuid) column
CREATE POLICY "Users can insert own record"
ON public."Users"
FOR INSERT
WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Users can update own record"
ON public."Users"
FOR UPDATE
USING (auth_id = auth.uid())
WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Users can delete own record"
ON public."Users"
FOR DELETE
USING (auth_id = auth.uid());