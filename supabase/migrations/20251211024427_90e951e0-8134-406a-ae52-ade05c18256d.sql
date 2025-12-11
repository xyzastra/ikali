-- Fix: Remove SECURITY DEFINER from public_profiles view
-- Recreate as a regular view that uses caller's permissions
DROP VIEW IF EXISTS public.public_profiles;

-- Create view without security_barrier (which implies security_definer behavior)
-- Instead, rely on the underlying profiles table RLS
CREATE VIEW public.public_profiles AS
SELECT 
  id,
  display_name,
  avatar_url,
  created_at
FROM public.profiles;