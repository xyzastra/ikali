-- Consolidate duplicate Users SELECT policies into one

-- Drop both existing SELECT policies
DROP POLICY IF EXISTS "Users can strictly view own profile" ON public."Users";
DROP POLICY IF EXISTS "Users can view own or co-member profiles" ON public."Users";

-- Create single consolidated policy
CREATE POLICY "Users can view own or co-member profiles"
ON public."Users"
FOR SELECT
USING (
  (auth_id = auth.uid()) 
  OR 
  EXISTS (
    SELECT 1
    FROM project_members pm1
    JOIN project_members pm2 ON pm1.project_id = pm2.project_id
    WHERE pm1.user_id = auth.uid() 
      AND pm2.user_id = "Users".auth_id
  )
);