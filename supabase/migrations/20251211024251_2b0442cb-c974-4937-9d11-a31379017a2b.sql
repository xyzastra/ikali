-- =============================================
-- FIX 1: Users table - Remove overly permissive insert policy
-- =============================================
DROP POLICY IF EXISTS "Authenticated users can insert " ON public."Users";

-- =============================================
-- FIX 2: Profiles table - Ensure only users can see their own profile
-- The existing policy "Users can view their own full profile" is correct
-- but let's make sure there are no conflicting policies
-- =============================================
-- Drop and recreate with explicit restrictive SELECT policy
DROP POLICY IF EXISTS "Users can view their own full profile" ON public.profiles;
CREATE POLICY "Users can view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- =============================================
-- FIX 3: Admin audit log - Fix conflicting policies
-- Remove the authenticated user insert policy that's too permissive
-- Only admins should be able to insert audit logs
-- =============================================
DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON public.admin_audit_log;

-- Create proper admin-only insert policy
CREATE POLICY "Only admins can insert audit logs"
ON public.admin_audit_log
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- FIX 4: password_failed_verification_attempts - Add RLS policies
-- This table should be protected - only service role should access it
-- =============================================
ALTER TABLE public.password_failed_verification_attempts ENABLE ROW LEVEL SECURITY;

-- No SELECT policy for regular users - only service role can read
-- No INSERT/UPDATE/DELETE for regular users - only service role via hooks
-- Create a policy that denies all access to regular users (service role bypasses RLS)
CREATE POLICY "Deny all access to regular users"
ON public.password_failed_verification_attempts
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);