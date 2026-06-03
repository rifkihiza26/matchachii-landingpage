DELETE FROM public.user_roles WHERE user_id IN (SELECT id FROM auth.users WHERE email = 'admin@matchachii.com');
DELETE FROM auth.users WHERE email = 'admin@matchachii.com';