-- =====================================================
-- FIX ALL RLS LINTER WARNINGS
-- Part 1: auth_rls_initplan fixes (use (select auth.uid()))
-- Part 2: multiple_permissive_policies fixes (merge duplicates)
-- =====================================================

-- =====================================================
-- contact_submissions
-- =====================================================
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can delete contact submissions" ON public.contact_submissions
  FOR DELETE TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role));

CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions
  FOR SELECT TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role));

-- =====================================================
-- profiles
-- =====================================================
DROP POLICY IF EXISTS "Users can view own profile only" ON public.profiles;

CREATE POLICY "Users can view own profile only" ON public.profiles
  FOR SELECT TO authenticated
  USING ((select auth.uid()) = id);

-- =====================================================
-- Users table (fix initplan + merge duplicate INSERT policies)
-- =====================================================
DROP POLICY IF EXISTS "Authenticated users can insert" ON public."Users";
DROP POLICY IF EXISTS "Users can insert own record" ON public."Users";
DROP POLICY IF EXISTS "Users can view own record only" ON public."Users";
DROP POLICY IF EXISTS "Users can update own record" ON public."Users";
DROP POLICY IF EXISTS "Users can delete own record" ON public."Users";

CREATE POLICY "Users can insert own record" ON public."Users"
  FOR INSERT TO authenticated
  WITH CHECK (auth_id = (select auth.uid()));

CREATE POLICY "Users can view own record only" ON public."Users"
  FOR SELECT TO authenticated
  USING (auth_id = (select auth.uid()));

CREATE POLICY "Users can update own record" ON public."Users"
  FOR UPDATE TO authenticated
  USING (auth_id = (select auth.uid()))
  WITH CHECK (auth_id = (select auth.uid()));

CREATE POLICY "Users can delete own record" ON public."Users"
  FOR DELETE TO authenticated
  USING (auth_id = (select auth.uid()));

-- =====================================================
-- user_projects (fix initplan + merge duplicate DELETE/UPDATE policies)
-- =====================================================
DROP POLICY IF EXISTS "Admins can delete any project" ON public.user_projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.user_projects;
DROP POLICY IF EXISTS "Admins can update any project" ON public.user_projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.user_projects;

CREATE POLICY "Users and admins can delete projects" ON public.user_projects
  FOR DELETE TO authenticated
  USING (
    (select auth.uid()) = user_id 
    OR has_role((select auth.uid()), 'admin'::app_role)
  );

CREATE POLICY "Users and admins can update projects" ON public.user_projects
  FOR UPDATE TO authenticated
  USING (
    (select auth.uid()) = user_id 
    OR has_role((select auth.uid()), 'admin'::app_role)
  )
  WITH CHECK (
    (select auth.uid()) = user_id 
    OR has_role((select auth.uid()), 'admin'::app_role)
  );

-- =====================================================
-- project_votes
-- =====================================================
DROP POLICY IF EXISTS "Authenticated users can vote" ON public.project_votes;
DROP POLICY IF EXISTS "Users can remove their own vote" ON public.project_votes;

CREATE POLICY "Authenticated users can vote" ON public.project_votes
  FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can remove their own vote" ON public.project_votes
  FOR DELETE TO authenticated
  USING ((select auth.uid()) = user_id);

-- =====================================================
-- project_comments (fix initplan + merge duplicate DELETE policies)
-- =====================================================
DROP POLICY IF EXISTS "Authenticated users can comment" ON public.project_comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.project_comments;
DROP POLICY IF EXISTS "Admins can delete any comment" ON public.project_comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.project_comments;

CREATE POLICY "Authenticated users can comment" ON public.project_comments
  FOR INSERT TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update their own comments" ON public.project_comments
  FOR UPDATE TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users and admins can delete comments" ON public.project_comments
  FOR DELETE TO authenticated
  USING (
    (select auth.uid()) = user_id 
    OR has_role((select auth.uid()), 'admin'::app_role)
  );

-- =====================================================
-- user_roles
-- =====================================================
DROP POLICY IF EXISTS "Only admins can assign roles" ON public.user_roles;
DROP POLICY IF EXISTS "Only admins can delete roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles and admins can view all" ON public.user_roles;

CREATE POLICY "Only admins can assign roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (has_role((select auth.uid()), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role));

CREATE POLICY "Users can view own roles and admins can view all" ON public.user_roles
  FOR SELECT TO authenticated
  USING (
    user_id = (select auth.uid()) 
    OR has_role((select auth.uid()), 'admin'::app_role)
  );

-- =====================================================
-- projects
-- =====================================================
DROP POLICY IF EXISTS "App admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "App admins can delete projects" ON public.projects;

CREATE POLICY "App admins can update projects" ON public.projects
  FOR UPDATE TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role))
  WITH CHECK (has_role((select auth.uid()), 'admin'::app_role));

CREATE POLICY "App admins can delete projects" ON public.projects
  FOR DELETE TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role));

-- =====================================================
-- nods_page_section
-- =====================================================
DROP POLICY IF EXISTS "Only admins can insert page sections" ON public.nods_page_section;

CREATE POLICY "Only admins can insert page sections" ON public.nods_page_section
  FOR INSERT TO authenticated
  WITH CHECK (has_role((select auth.uid()), 'admin'::app_role));

-- =====================================================
-- admin_audit_log (merge duplicate UPDATE policies)
-- =====================================================
DROP POLICY IF EXISTS "Authenticated users can update audit logs" ON public.admin_audit_log;
DROP POLICY IF EXISTS "Only admins can update audit logs" ON public.admin_audit_log;

CREATE POLICY "Only admins can update audit logs" ON public.admin_audit_log
  FOR UPDATE TO authenticated
  USING (has_role((select auth.uid()), 'admin'::app_role));

-- =====================================================
-- user_profiles (merge duplicate SELECT policies)
-- =====================================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can view own profile (claims)" ON public.user_profiles;

CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT TO authenticated
  USING ((select auth.uid()) = user_id);