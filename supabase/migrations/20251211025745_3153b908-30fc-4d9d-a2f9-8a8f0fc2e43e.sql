-- Insert admin role for altruisticxai@gmail.com if they exist
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'altruisticxai@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;