-- Add product_code field to products table for tracking
ALTER TABLE public.products 
ADD COLUMN product_code TEXT UNIQUE;

-- Create an index for faster lookups
CREATE INDEX idx_products_product_code ON public.products(product_code);

-- Update existing products with sequential codes using a different approach
WITH numbered_products AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM public.products
  WHERE product_code IS NULL
)
UPDATE public.products 
SET product_code = 'ai_rules_' || LPAD(numbered_products.rn::text, 4, '0')
FROM numbered_products
WHERE products.id = numbered_products.id;