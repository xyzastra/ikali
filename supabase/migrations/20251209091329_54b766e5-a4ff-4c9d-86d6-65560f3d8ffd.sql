-- 1. Create an Enum for Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. Set Up the user_roles Table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable Row-Level Security on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create a Security Definer Function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. Fix content_projects INSERT policy - restrict to admins only
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.content_projects;

CREATE POLICY "Admins can insert content"
ON public.content_projects
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add UPDATE and DELETE policies for content_projects
CREATE POLICY "Admins can update content"
ON public.content_projects
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content"
ON public.content_projects
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Fix journal_entries - add admin-only write policies
CREATE POLICY "Admins can insert journal entries"
ON public.journal_entries
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update journal entries"
ON public.journal_entries
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete journal entries"
ON public.journal_entries
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Fix idea_dumps - add admin-only write policies
CREATE POLICY "Admins can insert ideas"
ON public.idea_dumps
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ideas"
ON public.idea_dumps
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ideas"
ON public.idea_dumps
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 9. Fix profiles SELECT policy - users should only see their own profile
DROP POLICY IF EXISTS "profiles_select_consolidated" ON public.profiles;

CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- 10. Fix project_members SELECT policy - remove always-true condition
DROP POLICY IF EXISTS "project_members_select_consolidated" ON public.project_members;

CREATE POLICY "Users can view their own memberships and project co-members"
ON public.project_members
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid() 
  OR 
  project_id IN (
    SELECT pm.project_id FROM public.project_members pm WHERE pm.user_id = auth.uid()
  )
);

-- 11. Fix Users table INSERT policy
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public."Users";

CREATE POLICY "Users can only insert their own record"
ON public."Users"
FOR INSERT
TO authenticated
WITH CHECK (id::text = auth.uid()::text);