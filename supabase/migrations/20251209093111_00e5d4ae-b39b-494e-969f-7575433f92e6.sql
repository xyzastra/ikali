-- Allow the trigger function to insert into user_profiles
-- The trigger runs with SECURITY DEFINER so it bypasses RLS,
-- but users should also be able to insert their own profile

CREATE POLICY "Users can insert own profile"
ON public.user_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Also allow users to update their profile
CREATE POLICY "Users can update own profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their profile
CREATE POLICY "Users can delete own profile"
ON public.user_profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);