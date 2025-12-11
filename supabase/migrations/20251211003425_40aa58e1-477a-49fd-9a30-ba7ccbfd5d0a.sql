-- Drop existing policies on contact_submissions
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Force RLS for extra security
ALTER TABLE public.contact_submissions FORCE ROW LEVEL SECURITY;

-- Create SELECT policy for admins only (scoped to authenticated role)
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create DELETE policy for admins only (scoped to authenticated role)
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow anyone (including anon) to INSERT contact form submissions
-- This is needed for the public contact form
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);