-- Add product_code field to products table for tracking
ALTER TABLE public.products 
ADD COLUMN product_code TEXT UNIQUE;

-- Create an index for faster lookups
CREATE INDEX idx_products_product_code ON public.products(product_code);

-- Update existing products with sample codes (you can modify these)
UPDATE public.products 
SET product_code = 'ai_rules_' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::text, 4, '0')
WHERE product_code IS NULL;