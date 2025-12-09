-- Fix the broken "Unified Update Projects" policy that has no conditions
DROP POLICY IF EXISTS "Unified Update Projects" ON public.projects;