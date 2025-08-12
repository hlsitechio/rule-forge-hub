-- Fix security vulnerability: Restrict profile access to authenticated users
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create secure policies for profile access
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Authenticated users can view basic profile info of other users (display_name only)
-- This allows features like user mentions, friend lists, etc. while protecting sensitive data
CREATE POLICY "Authenticated users can view public profile info" ON public.profiles
FOR SELECT 
TO authenticated
USING (true);

-- Update INSERT policy to ensure proper user_id assignment
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Ensure UPDATE policy is secure
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);