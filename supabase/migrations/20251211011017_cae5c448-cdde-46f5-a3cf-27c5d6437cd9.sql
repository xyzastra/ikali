-- Drop the insecure policy that allows anyone to insert
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public."Users";

-- Create a secure policy that only allows authenticated users to insert
-- Since this table only has id and created_at, we restrict to authenticated users only
CREATE POLICY "Authenticated users can insert"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (true);