-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for AI rules/templates
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price INTEGER NOT NULL, -- Price in cents
  category TEXT NOT NULL, -- e.g., 'cursor', 'windsurf', 'lovable', 'bolt'
  tags TEXT[],
  file_url TEXT, -- URL to the downloadable file
  implementation_guide TEXT, -- Instructions for implementing the rules
  preview_content TEXT, -- Preview of the rules content
  downloads_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create purchases table to track user purchases
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  amount INTEGER NOT NULL, -- Amount paid in cents
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id) -- Prevent duplicate purchases
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Products policies
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can create products" 
ON public.products 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own products" 
ON public.products 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Purchases policies
CREATE POLICY "Users can view their own purchases" 
ON public.purchases 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchases" 
ON public.purchases 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample products
INSERT INTO public.products (title, description, short_description, price, category, tags, implementation_guide, preview_content, is_featured) VALUES
('Advanced Cursor Rules Pro', 'Professional-grade AI rules for Cursor IDE with advanced code generation, refactoring patterns, and best practices for React, TypeScript, and Node.js development.', 'Pro AI rules for Cursor with React/TS patterns', 2999, 'cursor', ARRAY['react', 'typescript', 'advanced', 'pro'], 'Copy the rules to your .cursorrules file in your project root. Restart Cursor for optimal performance.', '// Advanced Cursor Rules\n// React component generation\n// TypeScript best practices\n// Code optimization patterns', true),
('Windsurf AI Workflow Templates', 'Complete workflow templates for Windsurf AI including project setup, code review automation, and deployment pipelines for modern web applications.', 'Complete Windsurf workflow automation', 1999, 'windsurf', ARRAY['workflow', 'automation', 'deployment'], 'Import templates into Windsurf AI workspace. Configure your project variables and run automated workflows.', '# Windsurf Workflow Templates\n- Automated code reviews\n- CI/CD pipeline setup\n- Testing automation', true),
('Bolt.new Rapid Prototyping Kit', 'Accelerate your prototyping with pre-configured Bolt.new templates for SaaS, e-commerce, and dashboard applications with modern UI components.', 'Rapid prototyping templates for Bolt.new', 1499, 'bolt', ARRAY['prototyping', 'saas', 'templates'], 'Import into Bolt.new and customize the templates for your specific use case. Includes component library and styling guides.', '<!-- Bolt.new Templates -->\n<!-- SaaS Dashboard Template -->\n<!-- E-commerce Starter -->', false),
('Lovable.dev Component Library', 'Premium component patterns and AI rules for Lovable.dev featuring responsive designs, accessibility standards, and performance optimizations.', 'Premium components for Lovable.dev', 3499, 'lovable', ARRAY['components', 'design-system', 'premium'], 'Add rules to your Lovable project. Components will be automatically available in your design system.', '// Lovable Component Rules\n// Responsive design patterns\n// Accessibility first\n// Performance optimized', true);