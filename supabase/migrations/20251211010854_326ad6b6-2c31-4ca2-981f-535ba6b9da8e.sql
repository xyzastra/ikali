-- Fix the view to use SECURITY INVOKER (safer)
DROP VIEW IF EXISTS public.public_profiles;

CREATE VIEW public.public_profiles 
WITH (security_invoker = true)
AS
SELECT 
  id,
  display_name,
  avatar_url,
  created_at
FROM public.profiles;

-- Re-grant access
GRANT SELECT ON public.public_profiles TO anon, authenticated;