#!/usr/bin/env node

/**
 * Script to remove all predefined/sample products from the RulesMarket marketplace
 * This will clean up the marketplace to start fresh with real products
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Product IDs to remove (from original migrations)
const productIdsToRemove = [
  '6a983bac-b082-48cc-87bb-e25232e501c4',  // Cursor AI Pro Rules
  '583ddf9c-6511-473a-ba9e-1cd3a3213336',  // Claude AI Development Instructions
  'f388829a-729e-4ed6-b09e-e77213d81e4a',  // V0 Vercel Development Templates
  '4bb2969b-1fad-4764-81ac-60c577a13733',  // Windsurf AI Cascade Rules
  'fb51da56-8c73-46ce-8735-cb6bfaa5469f',  // Lovable.dev Agent Instructions
  '91e399aa-28a0-44b8-b697-d4a9c5b8f82c',  // Debug Recipe Collection
  '71f5bcaf-fcd4-4061-953d-90ee99425ba6',  // AI Coding Assistant Universal Rules
  '084a0cc8-b215-4e00-8f65-cc1dbf838834',  // Framework-Specific React Blueprint
  'acd1f753-3081-41ff-9ec7-46d703f0dca6',  // Enterprise AI Code Review Rules
  '3d26e126-055e-49fc-8d18-ba17354539be',  // Enterprise Security Kit
  'd8a44176-106d-49a8-8a5d-befd051b930e',  // AI Startup Accelerator Pack
  'b33987f3-1677-4dea-8f31-8121b180c6b2'   // Complete AI Developer Bundle
];

// Sample product titles to remove (from bulk inserts)
const sampleProductTitles = {
  'Cursor Rules': [
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
  ],
  'System Prompts': [
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
  ],
  'Agent Instructions': [
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
  ],
  'Workflow Automation': [
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
  ],
  'Development Tools': [
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
  ],
  'Documentation': [
    'API Documentation Templates',
    'Technical Writing Guidelines',
    'Software Architecture Documentation',
    'User Manual Templates',
    'Code Documentation Standards',
    'Project Documentation Toolkit',
    'Compliance Documentation Package'
  ]
};

async function cleanupProducts() {
  console.log('🧹 Starting RulesMarket product cleanup...\n');

  try {
    // First, get the current product count
    const { count: initialCount, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error getting product count:', countError);
      return;
    }

    console.log(`📊 Current product count: ${initialCount}`);

    // Delete products by ID
    console.log('\n🗑️  Removing products by ID...');
    const { error: deleteByIdError, count: deletedById } = await supabase
      .from('products')
      .delete()
      .in('id', productIdsToRemove);

    if (deleteByIdError) {
      console.error('❌ Error deleting products by ID:', deleteByIdError);
    } else {
      console.log(`✅ Deleted ${productIdsToRemove.length} products by ID`);
    }

    // Delete sample products by title and category
    let totalDeleted = 0;
    
    for (const [category, titles] of Object.entries(sampleProductTitles)) {
      console.log(`\n🗑️  Removing ${category} samples...`);
      
      const { error, count } = await supabase
        .from('products')
        .delete()
        .eq('category', category)
        .in('title', titles);

      if (error) {
        console.error(`❌ Error deleting ${category} products:`, error);
      } else {
        console.log(`✅ Deleted ${titles.length} ${category} products`);
        totalDeleted += titles.length;
      }
    }

    // Get final product count
    const { count: finalCount, error: finalCountError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (finalCountError) {
      console.error('❌ Error getting final product count:', finalCountError);
      return;
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(50));
    console.log(`Initial products: ${initialCount}`);
    console.log(`Products removed: ${initialCount - finalCount}`);
    console.log(`Remaining products: ${finalCount}`);
    
    if (finalCount > 0) {
      // List remaining products
      console.log('\n📝 Remaining products:');
      const { data: remainingProducts, error: listError } = await supabase
        .from('products')
        .select('id, title, category, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!listError && remainingProducts) {
        remainingProducts.forEach(product => {
          console.log(`  - ${product.title} (${product.category})`);
        });
        
        if (finalCount > 10) {
          console.log(`  ... and ${finalCount - 10} more`);
        }
      }
    } else {
      console.log('\n✨ All products have been successfully removed!');
      console.log('🎉 The marketplace is now empty and ready for real products.');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Add option to delete ALL products
async function deleteAllProducts() {
  const { error } = await supabase
    .from('products')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all (using impossible ID)

  if (error) {
    console.error('❌ Error deleting all products:', error);
  } else {
    console.log('✅ All products have been deleted');
  }
}

// Main execution
console.log('🚀 RulesMarket Product Cleanup Script');
console.log('=====================================\n');

// Check for --all flag to delete everything
if (process.argv.includes('--all')) {
  console.log('⚠️  WARNING: This will delete ALL products from the marketplace!');
  console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  setTimeout(async () => {
    await deleteAllProducts();
    
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });
    
    console.log(`\n✅ Cleanup complete. Remaining products: ${count}`);
  }, 5000);
} else {
  // Run normal cleanup
  cleanupProducts();
}
