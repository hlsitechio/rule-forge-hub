import { supabase } from '@/integrations/supabase/client';

// MCP Server configuration
const MCP_API_BASE = 'http://localhost:3001'; // Your local MCP server
const MCP_GITHUB_BASE = 'https://raw.githubusercontent.com/hlsitechio/MCPs/main';
const LOCAL_STORAGE_BASE = 'G:\\dashboard_1\\Storages'; // Local storage path

export interface MCPDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  tags: string[];
  metadata?: any;
}

export interface MCPCategory {
  key: string;
  name: string;
  description: string;
  documentsCount: number;
  icon?: string;
}

export class MCPService {
  private apiKey: string | null = null;
  private userId: string | null = null;

  /**
   * Initialize the MCP service with user credentials
   */
  async initialize(userId: string) {
    this.userId = userId;
    
    // Check if user has MCP subscription
    const { data: subscription } = await supabase
      .from('mcp_subscriptions')
      .select('api_key')
      .eq('user_id', userId)
      .single();
    
    if (subscription?.api_key) {
      this.apiKey = subscription.api_key;
      return true;
    }
    
    // Create a new subscription for the user if they don't have one
    return await this.createSubscription(userId);
  }

  /**
   * Create a new MCP subscription for the user
   */
  private async createSubscription(userId: string) {
    const apiKey = this.generateApiKey();
    
    const { data, error } = await supabase
      .from('mcp_subscriptions')
      .insert({
        user_id: userId,
        api_key: apiKey,
        plan_id: 'free', // Default to free plan
        status: 'active'
      })
      .select()
      .single();
    
    if (!error && data) {
      this.apiKey = apiKey;
      return true;
    }
    
    return false;
  }

  /**
   * Generate a unique API key
   */
  private generateApiKey(): string {
    const prefix = 'mcp_key_';
    const random = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    return prefix + random;
  }

  /**
   * Fetch all available MCP documentation categories from GitHub
   */
  async fetchCategories(): Promise<MCPCategory[]> {
    try {
      // First, try to fetch from the GitHub repository
      const response = await fetch(`${MCP_GITHUB_BASE}/documentation/by-category/index.json`);
      
      if (response.ok) {
        const data = await response.json();
        return data.categories || [];
      }
      
      // Fallback: Define default categories based on your MCP structure
      return [
        {
          key: 'docs_z_ai',
          name: 'Docs Z AI',
          description: 'Documentation for Z AI platform',
          documentsCount: 13,
          icon: '🤖'
        },
        {
          key: 'mcp_servers',
          name: 'MCP Servers',
          description: 'Model Context Protocol server documentation',
          documentsCount: 15,
          icon: '🖥️'
        },
        {
          key: 'integrations',
          name: 'Integrations',
          description: 'Integration guides and API documentation',
          documentsCount: 8,
          icon: '🔗'
        }
      ];
    } catch (error) {
      console.error('Error fetching MCP categories:', error);
      return [];
    }
  }

  /**
   * Fetch documents for a specific category
   */
  async fetchCategoryDocuments(category: string): Promise<MCPDocument[]> {
    try {
      // Try to fetch from GitHub repository
      const response = await fetch(
        `${MCP_GITHUB_BASE}/documentation/by-category/${category}/documents.json`
      );
      
      if (response.ok) {
        const data = await response.json();
        return data.documents || data || [];
      }
      
      // If GitHub fetch fails, try local MCP server
      if (this.apiKey) {
        const serverResponse = await fetch(`${MCP_API_BASE}/api/documents/${category}`, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (serverResponse.ok) {
          return await serverResponse.json();
        }
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching documents for category ${category}:`, error);
      return [];
    }
  }

  /**
   * Sync MCP documentation library with local database
   */
  async syncDocumentationLibrary() {
    if (!this.userId) {
      throw new Error('User not initialized');
    }

    const syncResults = {
      categories: 0,
      documents: 0,
      errors: []
    };

    try {
      // Fetch all categories
      const categories = await this.fetchCategories();
      syncResults.categories = categories.length;

      // Create products for each category of documentation
      for (const category of categories) {
        try {
          // Fetch documents for this category
          const documents = await this.fetchCategoryDocuments(category.key);
          
          // Check if product already exists
          const { data: existingProduct } = await supabase
            .from('products')
            .select('id')
            .eq('product_code', `mcp_${category.key}`)
            .single();

          const productData = {
            title: `${category.name} Documentation Library`,
            description: `Complete documentation set for ${category.name}. Includes ${documents.length} documents with full search and AI integration support.`,
            short_description: category.description,
            category: 'MCP Documentation',
            price: 0, // Free for now, can be updated based on tier
            product_code: `mcp_${category.key}`,
            tags: ['documentation', 'mcp', category.key, 'ai-ready'],
            is_active: true,
            is_featured: category.key === 'docs_z_ai', // Feature specific categories
            downloads_count: 0,
            file_url: `${MCP_GITHUB_BASE}/documentation/by-category/${category.key}/documents.json`,
            preview_content: JSON.stringify({
              documentsCount: documents.length,
              sampleTitles: documents.slice(0, 3).map(d => d.title)
            }),
            implementation_guide: `
## How to Use This Documentation Library

### 1. API Access
Use your MCP API key to access these documents programmatically:
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  ${MCP_API_BASE}/api/documents/${category.key}
\`\`\`

### 2. AI Assistant Integration
Configure your AI assistant (ChatGPT/Claude) with:
\`\`\`json
{
  "mcpServers": {
    "${category.key}": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory",
        "--data-url",
        "${MCP_GITHUB_BASE}/documentation/by-category/${category.key}/documents.json"
      ]
    }
  }
}
\`\`\`

### 3. Search Integration
All documents are indexed and searchable through the MCP search API.
            `
          };

          if (existingProduct) {
            // Update existing product
            await supabase
              .from('products')
              .update(productData)
              .eq('id', existingProduct.id);
          } else {
            // Create new product
            await supabase
              .from('products')
              .insert(productData);
          }

          syncResults.documents += documents.length;
        } catch (categoryError: any) {
          syncResults.errors.push(`Category ${category.key}: ${categoryError.message}`);
        }
      }

      // Store sync metadata
      await this.saveSyncMetadata(syncResults);

      return syncResults;
    } catch (error: any) {
      console.error('Error syncing MCP library:', error);
      throw error;
    }
  }

  /**
   * Save sync metadata to track last sync time and results
   */
  private async saveSyncMetadata(results: any) {
    if (!this.userId) return;

    const metadata = {
      user_id: this.userId,
      last_sync: new Date().toISOString(),
      categories_synced: results.categories,
      documents_synced: results.documents,
      errors: results.errors,
      source: 'github_mcp'
    };

    // Store in a sync_history table (you'll need to create this)
    try {
      await supabase
        .from('mcp_sync_history')
        .insert(metadata);
    } catch (error) {
      console.log('Sync history table not found, skipping metadata save');
    }
  }

  /**
   * Search across all MCP documentation
   */
  async searchDocuments(query: string, filters?: any) {
    if (!this.apiKey) {
      throw new Error('API key not initialized');
    }

    try {
      const response = await fetch(`${MCP_API_BASE}/api/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, ...filters })
      });

      if (response.ok) {
        return await response.json();
      }

      // Fallback to searching in products
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'MCP Documentation')
        .ilike('title', `%${query}%`);

      return data || [];
    } catch (error) {
      console.error('Error searching documents:', error);
      return [];
    }
  }

  /**
   * Get user's MCP usage statistics
   */
  async getUsageStats() {
    if (!this.userId) {
      return {
        apiCalls: 0,
        documentsAccessed: 0,
        categoriesUsed: 0,
        lastSync: null
      };
    }

    const { data: subscription } = await supabase
      .from('mcp_subscriptions')
      .select('api_calls_used, storage_used')
      .eq('user_id', this.userId)
      .single();

    return {
      apiCalls: subscription?.api_calls_used || 0,
      storage: subscription?.storage_used || 0,
      lastSync: new Date().toISOString()
    };
  }
}

// Export a singleton instance
export const mcpService = new MCPService();
