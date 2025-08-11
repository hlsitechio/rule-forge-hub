-- Migration to remove all predefined/sample products from the marketplace
-- This will clean up the marketplace to start fresh with real products

-- First, let's backup the current product count for verification
DO $$
DECLARE
    product_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO product_count FROM products;
    RAISE NOTICE 'Current product count before deletion: %', product_count;
END $$;

-- Delete all the predefined sample products by their IDs
DELETE FROM products WHERE id IN (
    -- Original products from earlier migrations
    '6a983bac-b082-48cc-87bb-e25232e501c4',  -- Cursor AI Pro Rules
    '583ddf9c-6511-473a-ba9e-1cd3a3213336',  -- Claude AI Development Instructions
    'f388829a-729e-4ed6-b09e-e77213d81e4a',  -- V0 Vercel Development Templates
    '4bb2969b-1fad-4764-81ac-60c577a13733',  -- Windsurf AI Cascade Rules
    'fb51da56-8c73-46ce-8735-cb6bfaa5469f',  -- Lovable.dev Agent Instructions
    '91e399aa-28a0-44b8-b697-d4a9c5b8f82c',  -- Debug Recipe Collection
    '71f5bcaf-fcd4-4061-953d-90ee99425ba6',  -- AI Coding Assistant Universal Rules
    '084a0cc8-b215-4e00-8f65-cc1dbf838834',  -- Framework-Specific React Blueprint
    'acd1f753-3081-41ff-9ec7-46d703f0dca6',  -- Enterprise AI Code Review Rules
    '3d26e126-055e-49fc-8d18-ba17354539be',  -- Enterprise Security Kit
    'd8a44176-106d-49a8-8a5d-befd051b930e',  -- AI Startup Accelerator Pack
    'b33987f3-1677-4dea-8f31-8121b180c6b2'   -- Complete AI Developer Bundle
);

-- Delete all sample products added in the bulk insert migrations
-- These are identified by their generic naming patterns and pricing structure

-- Delete Cursor Rules samples (23 products added)
DELETE FROM products 
WHERE category = 'Cursor Rules' 
AND title IN (
    'Cursor React Development Rules',
    'Cursor Python Data Science Rules',
    'Cursor Full-Stack JavaScript Rules',
    'Cursor Vue.js Development Rules',
    'Cursor Angular Enterprise Rules',
    'Cursor Mobile Development Rules',
    'Cursor DevOps Integration Rules',
    'Cursor Database Development Rules',
    'Cursor API Development Rules',
    'Cursor Microservices Rules',
    'Cursor Testing Automation Rules',
    'Cursor Game Development Rules',
    'Cursor Blockchain Development Rules',
    'Cursor Machine Learning Rules',
    'Cursor Security Audit Rules',
    'Cursor Performance Optimization Rules',
    'Cursor Cloud Development Rules',
    'Cursor E-commerce Development Rules',
    'Cursor Content Management Rules',
    'Cursor IoT Development Rules',
    'Cursor Accessibility Rules',
    'Cursor SEO Optimization Rules',
    'Cursor Progressive Web App Rules'
);

-- Delete System Prompts samples (15 products added)
DELETE FROM products 
WHERE category = 'System Prompts' 
AND title IN (
    'GPT-4 Code Review Prompts',
    'AI Content Creation Prompts',
    'AI Database Design Prompts',
    'AI Security Analysis Prompts',
    'AI Business Strategy Prompts',
    'AI Technical Documentation Prompts',
    'AI Data Analysis Prompts',
    'AI Project Management Prompts',
    'AI UI/UX Design Prompts',
    'AI Marketing Automation Prompts',
    'AI Financial Analysis Prompts',
    'AI Customer Support Prompts',
    'AI Legal Document Prompts',
    'AI Research Assistant Prompts',
    'AI Quality Assurance Prompts'
);

-- Delete Agent Instructions samples (14 products added)
DELETE FROM products 
WHERE category = 'Agent Instructions' 
AND title IN (
    'GitHub Copilot Agent Instructions',
    'ChatGPT Development Agent Instructions',
    'Claude Code Review Agent Instructions',
    'AI Testing Assistant Instructions',
    'AI Documentation Agent Instructions',
    'AI Debugging Assistant Instructions',
    'AI Refactoring Agent Instructions',
    'AI Security Audit Instructions',
    'AI Performance Analysis Instructions',
    'AI Database Optimization Instructions',
    'AI API Design Instructions',
    'AI DevOps Assistant Instructions',
    'AI Code Migration Instructions',
    'AI Architecture Review Instructions'
);

-- Delete Workflow Automation samples (11 products added)
DELETE FROM products 
WHERE category = 'Workflow Automation' 
AND title IN (
    'CI/CD Pipeline Automation',
    'Code Quality Automation Workflows',
    'Database Migration Automation',
    'Security Scanning Automation',
    'Performance Testing Automation',
    'Documentation Generation Automation',
    'Environment Provisioning Automation',
    'Backup and Recovery Automation',
    'Monitoring and Alerting Automation',
    'Release Management Automation',
    'Cross-Platform Build Automation'
);

-- Delete Development Tools samples (17 products added)
DELETE FROM products 
WHERE category = 'Development Tools' 
AND title IN (
    'VS Code Extensions Bundle',
    'Git Workflow Tools',
    'API Testing Toolkit',
    'Database Design Tools',
    'Mobile Development Toolkit',
    'Performance Monitoring Tools',
    'Security Analysis Tools',
    'Frontend Build Tools',
    'Backend Development Toolkit',
    'Cloud Development Tools',
    'Testing Automation Tools',
    'Code Quality Tools',
    'DevOps Utilities Collection',
    'Documentation Tools Suite',
    'Debugging Tools Collection',
    'Package Management Tools',
    'Environment Management Tools'
);

-- Delete Documentation samples (7 products added)
DELETE FROM products 
WHERE category = 'Documentation' 
AND title IN (
    'API Documentation Templates',
    'Technical Writing Guidelines',
    'Software Architecture Documentation',
    'User Manual Templates',
    'Code Documentation Standards',
    'Project Documentation Toolkit',
    'Compliance Documentation Package'
);

-- Alternative approach: Delete ALL products if you want a completely fresh start
-- Uncomment the line below to delete everything
-- TRUNCATE TABLE products CASCADE;

-- Verify the deletion
DO $$
DECLARE
    product_count INTEGER;
    remaining_products RECORD;
BEGIN
    SELECT COUNT(*) INTO product_count FROM products;
    RAISE NOTICE 'Product count after deletion: %', product_count;
    
    -- List any remaining products
    IF product_count > 0 THEN
        RAISE NOTICE 'Remaining products:';
        FOR remaining_products IN 
            SELECT id, title, category, created_at 
            FROM products 
            ORDER BY created_at DESC 
            LIMIT 10
        LOOP
            RAISE NOTICE 'ID: %, Title: %, Category: %', 
                remaining_products.id, 
                remaining_products.title, 
                remaining_products.category;
        END LOOP;
    ELSE
        RAISE NOTICE 'All products have been successfully removed. The marketplace is now empty.';
    END IF;
END $$;

-- Add a comment to document this cleanup
COMMENT ON TABLE products IS 'Product table cleaned on 2025-08-11 - All predefined sample products removed';
