-- Drop the insecure INSERT policy that allows any authenticated user to insert roles
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.user_roles;

-- Create a secure INSERT policy that only allows admins to assign roles
CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));