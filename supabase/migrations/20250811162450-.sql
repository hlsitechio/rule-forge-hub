-- Fix the purchases INSERT policy to include WITH CHECK clause
DROP POLICY "Users can create their own purchases" ON public.purchases;

CREATE POLICY "Users can create their own purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);