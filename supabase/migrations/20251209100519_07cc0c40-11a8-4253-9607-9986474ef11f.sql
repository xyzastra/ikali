-- Fix user_profiles SELECT policy bug
-- Current: auth.uid() = (SELECT auth.uid()) -- always true for any authenticated user
-- Fixed: auth.uid() = user_id -- only allows viewing own profile

DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;

CREATE POLICY "Users can view own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = user_id);