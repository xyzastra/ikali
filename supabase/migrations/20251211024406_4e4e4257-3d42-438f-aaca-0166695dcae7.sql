-- =============================================
-- FIX 1: public_profiles view - This appears to be a duplicate
-- If it's meant to expose limited public profile data, add RLS
-- Since it's a VIEW, we need to handle it differently
-- =============================================
-- Drop the view if it exists and recreate as a secure view
DROP VIEW IF EXISTS public.public_profiles;

-- Recreate as a secure view that only exposes non-sensitive fields
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  display_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Enable security barrier on the view
ALTER VIEW public.public_profiles SET (security_barrier = on);

-- =============================================
-- FIX 2: user_id table - Replace overly permissive policy
-- =============================================
DROP POLICY IF EXISTS "allow_all_authenticated" ON public.user_id;

-- Users can only view their own record
CREATE POLICY "Users can view own user_id record"
ON public.user_id
FOR SELECT
TO authenticated
USING (id::text = auth.uid()::text OR id IN (
  SELECT CAST(EXTRACT(EPOCH FROM created_at) AS bigint) FROM public.user_id LIMIT 0
));

-- Actually, let's use a simpler approach - deny all access since this table's purpose is unclear
DROP POLICY IF EXISTS "Users can view own user_id record" ON public.user_id;

CREATE POLICY "Deny access to user_id table"
ON public.user_id
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);

-- =============================================
-- FIX 3: user_roles - Remove user self-delete policy
-- Users should not be able to delete their own roles
-- =============================================
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.user_roles;

-- Only admins can delete roles
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- =============================================
-- FIX 4: nods_page_section - Restrict to authenticated users only
-- and ensure proper read-only access
-- =============================================
DROP POLICY IF EXISTS "authenticated_insert" ON public.nods_page_section;
DROP POLICY IF EXISTS "authenticated_read" ON public.nods_page_section;

-- Only allow read access for authenticated users (no insert for regular users)
CREATE POLICY "Authenticated users can read page sections"
ON public.nods_page_section
FOR SELECT
TO authenticated
USING (true);

-- Only admins/service role can insert (service role bypasses RLS)
CREATE POLICY "Only admins can insert page sections"
ON public.nods_page_section
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- FIX 5: projects table - Ensure proper policies exist
-- Remove duplicate SELECT policy
-- =============================================
DROP POLICY IF EXISTS "Enable read access for all users" ON public.projects;
-- Keep "Authenticated users can view projects" which uses true for SELECT