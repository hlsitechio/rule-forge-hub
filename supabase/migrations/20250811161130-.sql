-- Update product categories to match the new category structure
UPDATE products 
SET category = CASE 
  WHEN category = 'Development Tools' THEN 'Cascade Rules'
  WHEN category = 'Workflow Automation' THEN 'Prompt Instructions' 
  WHEN category = 'Documentation' THEN 'Enterprise Kits'
  ELSE category  -- Keep existing categories that already match (Cursor Rules, System Prompts, Agent Instructions)
END
WHERE category IN ('Development Tools', 'Workflow Automation', 'Documentation');