-- Restrict Users SELECT policy to only allow viewing own record
-- This prevents co-members from seeing each other's email addresses

DROP POLICY IF EXISTS "Users can view own or co-member profiles" ON public."Users";

CREATE POLICY "Users can view own record only"
ON public."Users"
FOR SELECT
USING (auth_id = auth.uid());