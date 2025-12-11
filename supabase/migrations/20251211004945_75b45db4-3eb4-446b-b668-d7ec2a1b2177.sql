-- Revoke all privileges from anonymous users
REVOKE ALL ON public."Users" FROM anon;

-- Add explicit deny policy for anonymous role (extra safety layer)
CREATE POLICY "Deny anonymous access to Users"
ON public."Users"
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);