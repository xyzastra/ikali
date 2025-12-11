-- Explicitly set security_invoker = true on the public_profiles view
-- This ensures the view uses the calling user's permissions, not the owner's
ALTER VIEW public.public_profiles SET (security_invoker = true);