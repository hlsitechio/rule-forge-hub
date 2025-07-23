-- Create function to increment download count
CREATE OR REPLACE FUNCTION increment_downloads(product_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.products 
  SET downloads_count = downloads_count + 1
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;