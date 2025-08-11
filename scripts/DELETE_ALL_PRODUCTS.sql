-- ============================================================
-- RULESMARKET PRODUCT CLEANUP SCRIPT
-- ============================================================
-- Run this script in the Supabase SQL Editor to remove all 
-- predefined sample products from the marketplace
-- 
-- HOW TO USE:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project (oqvjazfvwxafxmgwtzti)
-- 3. Navigate to SQL Editor (left sidebar)
-- 4. Create a new query
-- 5. Copy and paste this entire script
-- 6. Click "Run" to execute
-- ============================================================

-- Show current product count before deletion
SELECT COUNT(*) as total_products, 
       COUNT(DISTINCT category) as total_categories 
FROM products;

-- Show products per category before deletion
SELECT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;

-- ============================================================
-- DELETE ALL PRODUCTS
-- ============================================================
-- This will remove ALL products from the marketplace
-- making all category counts show 0

DELETE FROM products;

-- ============================================================
-- VERIFY DELETION
-- ============================================================

-- Show product count after deletion (should be 0)
SELECT COUNT(*) as remaining_products FROM products;

-- Show category counts after deletion (should all be 0)
SELECT 
    'All Platforms' as category, COUNT(*) as count FROM products
UNION ALL
SELECT 'Cursor Rules', COUNT(*) FROM products WHERE category = 'Cursor Rules'
UNION ALL
SELECT 'System Prompts', COUNT(*) FROM products WHERE category = 'System Prompts'
UNION ALL
SELECT 'Agent Instructions', COUNT(*) FROM products WHERE category = 'Agent Instructions'
UNION ALL
SELECT 'Workflow Automation', COUNT(*) FROM products WHERE category = 'Workflow Automation'
UNION ALL
SELECT 'Development Tools', COUNT(*) FROM products WHERE category = 'Development Tools'
UNION ALL
SELECT 'Documentation', COUNT(*) FROM products WHERE category = 'Documentation'
UNION ALL
SELECT 'MCP Documentation', COUNT(*) FROM products WHERE category = 'MCP Documentation';

-- Success message
SELECT '✅ All products have been deleted successfully! The marketplace is now empty.' as message;
