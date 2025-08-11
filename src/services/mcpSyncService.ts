import { supabase } from '@/integrations/supabase/client';

// Configuration
const GITHUB_REPO = 'https://raw.githubusercontent.com/hlsitechio/MCPs/main';
const LOCAL_STORAGE_KEY = 'mcp_documents';
const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes

export interface SyncedDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  category: string;
  tags: string[];
  localPath?: string;
  githubPath?: string;
  lastSynced: string;
  syncStatus: 'synced' | 'pending' | 'error';
}

export interface SyncStatus {
  github: boolean;
  local: boolean;
  marketplace: boolean;
  lastSync: string | null;
  documentsCount: number;
  categoriesCount: number;
}

export class MCPSyncService {
  private syncTimer: NodeJS.Timeout | null = null;
  private isSyncing = false;

  /**
   * Start automatic sync between GitHub, local storage, and marketplace
   */
  startAutoSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    // Initial sync
    this.performFullSync();

    // Set up periodic sync
    this.syncTimer = setInterval(() => {
      this.performFullSync();
    }, SYNC_INTERVAL);
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  /**
   * Perform a complete three-way sync
   */
  async performFullSync(): Promise<SyncStatus> {
    if (this.isSyncing) {
      console.log('Sync already in progress, skipping...');
      return this.getSyncStatus();
    }

    this.isSyncing = true;
    const syncStatus: SyncStatus = {
      github: false,
      local: false,
      marketplace: false,
      lastSync: null,
      documentsCount: 0,
      categoriesCount: 0
    };

    try {
      console.log('🔄 Starting three-way sync...');

      // Step 1: Fetch from GitHub
      const githubData = await this.fetchFromGitHub();
      syncStatus.github = true;
      console.log(`✅ Fetched ${githubData.categories.length} categories from GitHub`);

      // Step 2: Sync to Local Storage
      await this.syncToLocalStorage(githubData);
      syncStatus.local = true;
      console.log('✅ Synced to local storage');

      // Step 3: Sync to Marketplace (Supabase)
      const marketplaceResult = await this.syncToMarketplace(githubData);
      syncStatus.marketplace = true;
      syncStatus.documentsCount = marketplaceResult.documentsCount;
      syncStatus.categoriesCount = marketplaceResult.categoriesCount;
      console.log(`✅ Synced to marketplace: ${marketplaceResult.categoriesCount} categories, ${marketplaceResult.documentsCount} documents`);

      // Step 4: Create local file system structure
      await this.syncToFileSystem(githubData);
      console.log('✅ Synced to local file system');

      syncStatus.lastSync = new Date().toISOString();
      
      // Save sync status
      this.saveSyncStatus(syncStatus);

      console.log('✨ Three-way sync completed successfully!');
    } catch (error) {
      console.error('❌ Sync error:', error);
      throw error;
    } finally {
      this.isSyncing = false;
    }

    return syncStatus;
  }

  /**
   * Fetch all documentation from GitHub
   */
  private async fetchFromGitHub() {
    const categories = [];
    const documents = [];

    try {
      // Fetch categories from your GitHub repo structure
      const categoryDirs = ['docs_z_ai', 'other', 'mcp_servers']; // Add your actual categories
      
      for (const categoryDir of categoryDirs) {
        try {
          const response = await fetch(
            `${GITHUB_REPO}/documentation/by-category/${categoryDir}/documents.json`
          );

          if (response.ok) {
            const data = await response.json();
            const categoryData = {
              key: categoryDir,
              name: this.formatCategoryName(categoryDir),
              documents: Array.isArray(data) ? data : (data.documents || []),
              icon: this.getCategoryIcon(categoryDir)
            };
            
            categories.push(categoryData);
            documents.push(...categoryData.documents.map((doc: any) => ({
              ...doc,
              category: categoryDir,
              githubPath: `documentation/by-category/${categoryDir}/${doc.id || doc.title}.json`
            })));
          }
        } catch (error) {
          console.warn(`Failed to fetch category ${categoryDir}:`, error);
        }
      }

      // Also fetch from the main documents.json if it exists
      try {
        const mainResponse = await fetch(`${GITHUB_REPO}/servers/documentation-library/data/documents.json`);
        if (mainResponse.ok) {
          const mainData = await mainResponse.json();
          if (Array.isArray(mainData)) {
            documents.push(...mainData.map((doc: any) => ({
              ...doc,
              category: 'general',
              githubPath: `servers/documentation-library/data/${doc.id || doc.title}.json`
            })));
          }
        }
      } catch (error) {
        console.warn('No main documents.json found');
      }

    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      throw error;
    }

    return { categories, documents };
  }

  /**
   * Sync data to browser's localStorage
   */
  private async syncToLocalStorage(data: any) {
    try {
      // Store categories
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_categories`, JSON.stringify(data.categories));
      
      // Store documents by category for efficient retrieval
      for (const category of data.categories) {
        localStorage.setItem(
          `${LOCAL_STORAGE_KEY}_${category.key}`,
          JSON.stringify(category.documents)
        );
      }

      // Store all documents
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_all`, JSON.stringify(data.documents));
      
      // Store metadata
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_metadata`, JSON.stringify({
        lastSync: new Date().toISOString(),
        documentsCount: data.documents.length,
        categoriesCount: data.categories.length,
        source: 'github'
      }));

    } catch (error) {
      console.error('Error syncing to localStorage:', error);
      throw error;
    }
  }

  /**
   * Sync data to marketplace (Supabase products table)
   */
  private async syncToMarketplace(data: any) {
    let documentsCount = 0;
    let categoriesCount = 0;

    try {
      for (const category of data.categories) {
        const productCode = `mcp_${category.key}`;
        
        // Check if product exists
        const { data: existingProduct } = await supabase
          .from('products')
          .select('id')
          .eq('product_code', productCode)
          .single();

        const productData = {
          title: `${category.name} Documentation Suite`,
          description: this.generateProductDescription(category),
          short_description: `${category.documents.length} premium documentation resources for ${category.name}`,
          category: 'MCP Documentation',
          price: this.calculatePrice(category),
          product_code: productCode,
          tags: this.generateTags(category),
          is_active: true,
          is_featured: ['docs_z_ai', 'mcp_servers'].includes(category.key),
          downloads_count: 0,
          file_url: `${GITHUB_REPO}/documentation/by-category/${category.key}/documents.json`,
          preview_content: JSON.stringify({
            documentsCount: category.documents.length,
            sampleTitles: category.documents.slice(0, 5).map((d: any) => d.title),
            features: [
              'Full API access',
              'AI assistant integration',
              'Search capabilities',
              'Regular updates',
              'Technical support'
            ]
          }),
          implementation_guide: this.generateImplementationGuide(category)
        };

        if (existingProduct) {
          // Update existing product
          const { error } = await supabase
            .from('products')
            .update(productData)
            .eq('id', existingProduct.id);
          
          if (error) throw error;
        } else {
          // Create new product
          const { error } = await supabase
            .from('products')
            .insert(productData);
          
          if (error) throw error;
        }

        documentsCount += category.documents.length;
        categoriesCount++;
      }

      // Create a bundle product for all documentation
      await this.createBundleProduct(data);

    } catch (error) {
      console.error('Error syncing to marketplace:', error);
      throw error;
    }

    return { documentsCount, categoriesCount };
  }

  /**
   * Sync to local file system (for backup/offline access)
   */
  private async syncToFileSystem(data: any) {
    // Create a structured JSON for file system sync
    const fileSystemData = {
      timestamp: new Date().toISOString(),
      categories: data.categories.map((cat: any) => ({
        name: cat.name,
        key: cat.key,
        documentsCount: cat.documents.length,
        path: `Storages/${cat.key}`
      })),
      documents: data.documents.map((doc: any) => ({
        id: doc.id || this.generateDocId(doc.title),
        title: doc.title,
        category: doc.category,
        localPath: `Storages/${doc.category}/${this.sanitizeFilename(doc.title)}.json`,
        url: doc.url,
        tags: doc.tags || []
      })),
      syncInfo: {
        github: GITHUB_REPO,
        lastSync: new Date().toISOString(),
        totalDocuments: data.documents.length,
        totalCategories: data.categories.length
      }
    };

    // Store in localStorage for the file sync script to pick up
    localStorage.setItem('mcp_filesystem_sync', JSON.stringify(fileSystemData));

    // Also create a downloadable backup
    this.createBackupFile(fileSystemData);

    return fileSystemData;
  }

  /**
   * Create a downloadable backup file
   */
  private createBackupFile(data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Store the backup URL in localStorage
    localStorage.setItem('mcp_backup_url', url);
    localStorage.setItem('mcp_backup_filename', `mcp_backup_${timestamp}.json`);
  }

  /**
   * Generate product description for marketplace
   */
  private generateProductDescription(category: any): string {
    return `
## ${category.name} Documentation Library

### What's Included
- **${category.documents.length} Documents** - Comprehensive documentation coverage
- **API Access** - Full programmatic access via MCP API
- **AI Integration** - Ready for ChatGPT and Claude
- **Search Enabled** - Advanced search capabilities
- **Regular Updates** - Automatically synced with latest content

### Perfect For
- Developers working with ${category.name}
- Teams needing centralized documentation
- AI-assisted development workflows
- Technical documentation management

### Features
✅ Instant access to all documentation
✅ Structured and searchable content
✅ Integration with AI assistants
✅ API access for automation
✅ Regular content updates
✅ Professional support

### Documentation Includes
${category.documents.slice(0, 10).map((d: any) => `- ${d.title}`).join('\n')}
${category.documents.length > 10 ? `\n...and ${category.documents.length - 10} more documents` : ''}
    `.trim();
  }

  /**
   * Calculate dynamic pricing based on content
   */
  private calculatePrice(category: any): number {
    const basePrice = 0; // Free tier
    const docsCount = category.documents.length;
    
    // Premium pricing tiers
    if (docsCount > 50) return 49; // Enterprise
    if (docsCount > 20) return 29; // Professional
    if (docsCount > 10) return 19; // Starter
    
    return basePrice; // Free
  }

  /**
   * Generate relevant tags for the product
   */
  private generateTags(category: any): string[] {
    const baseTags = ['documentation', 'mcp', 'api', 'reference'];
    const categoryTags = category.key.split('_').filter((t: string) => t.length > 2);
    
    // Extract unique tags from documents
    const docTags = new Set<string>();
    category.documents.forEach((doc: any) => {
      if (doc.tags) {
        doc.tags.forEach((tag: string) => docTags.add(tag));
      }
    });

    return [...baseTags, ...categoryTags, ...Array.from(docTags)].slice(0, 10);
  }

  /**
   * Generate implementation guide
   */
  private generateImplementationGuide(category: any): string {
    return `
# Implementation Guide for ${category.name}

## Quick Start

### 1. API Integration
\`\`\`javascript
import { MCPClient } from '@mcp/client';

const client = new MCPClient({
  apiKey: 'YOUR_API_KEY',
  category: '${category.key}'
});

const docs = await client.getDocuments();
\`\`\`

### 2. AI Assistant Configuration

#### ChatGPT Custom GPT
\`\`\`json
{
  "name": "${category.name} Assistant",
  "instructions": "You have access to ${category.documents.length} documents about ${category.name}",
  "actions": [{
    "type": "mcp",
    "endpoint": "https://api.mcp-docs.com/v1/${category.key}"
  }]
}
\`\`\`

#### Claude Desktop
\`\`\`json
{
  "mcpServers": {
    "${category.key}": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-memory",
        "--data-url",
        "${GITHUB_REPO}/documentation/by-category/${category.key}/documents.json"
      ]
    }
  }
}
\`\`\`

### 3. Search Integration
\`\`\`javascript
const results = await client.search('your query', {
  category: '${category.key}',
  limit: 10
});
\`\`\`

### 4. Local Storage Sync
\`\`\`javascript
// Sync to local storage for offline access
await client.syncToLocal();
const localDocs = client.getLocalDocuments();
\`\`\`

## Support
- Documentation: https://docs.mcp-service.com
- API Reference: https://api.mcp-service.com/docs
- Support: support@mcp-service.com
    `.trim();
  }

  /**
   * Create a bundle product for all documentation
   */
  private async createBundleProduct(data: any) {
    const bundleCode = 'mcp_complete_bundle';
    const totalDocs = data.documents.length;
    const totalCategories = data.categories.length;

    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('product_code', bundleCode)
      .single();

    const bundleData = {
      title: 'Complete MCP Documentation Bundle',
      description: `Get access to ALL documentation libraries with ${totalDocs} documents across ${totalCategories} categories. The ultimate documentation resource for developers.`,
      short_description: `${totalDocs} documents | ${totalCategories} categories | Unlimited access`,
      category: 'MCP Documentation',
      price: 99, // Bundle pricing
      product_code: bundleCode,
      tags: ['bundle', 'complete', 'all-access', 'documentation', 'mcp', 'premium'],
      is_active: true,
      is_featured: true,
      file_url: `${GITHUB_REPO}/documentation/complete-bundle.json`,
      preview_content: JSON.stringify({
        totalDocuments: totalDocs,
        totalCategories: totalCategories,
        categories: data.categories.map((c: any) => ({
          name: c.name,
          documentsCount: c.documents.length
        })),
        features: [
          'Complete documentation access',
          'All categories included',
          'Priority support',
          'Early access to new content',
          'Custom integration support'
        ]
      })
    };

    if (existing) {
      await supabase.from('products').update(bundleData).eq('id', existing.id);
    } else {
      await supabase.from('products').insert(bundleData);
    }
  }

  /**
   * Helper functions
   */
  private formatCategoryName(key: string): string {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getCategoryIcon(key: string): string {
    const icons: Record<string, string> = {
      'docs_z_ai': '🤖',
      'mcp_servers': '🖥️',
      'integrations': '🔗',
      'other': '📄',
      'general': '📚'
    };
    return icons[key] || '📁';
  }

  private generateDocId(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 50);
  }

  private sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
  }

  /**
   * Get current sync status
   */
  getSyncStatus(): SyncStatus {
    const metadata = localStorage.getItem(`${LOCAL_STORAGE_KEY}_metadata`);
    if (metadata) {
      const data = JSON.parse(metadata);
      return {
        github: true,
        local: true,
        marketplace: true,
        lastSync: data.lastSync,
        documentsCount: data.documentsCount,
        categoriesCount: data.categoriesCount
      };
    }
    
    return {
      github: false,
      local: false,
      marketplace: false,
      lastSync: null,
      documentsCount: 0,
      categoriesCount: 0
    };
  }

  /**
   * Save sync status
   */
  private saveSyncStatus(status: SyncStatus) {
    localStorage.setItem('mcp_sync_status', JSON.stringify(status));
  }

  /**
   * Get documents from local storage
   */
  getLocalDocuments(category?: string): any[] {
    if (category) {
      const data = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${category}`);
      return data ? JSON.parse(data) : [];
    }
    
    const data = localStorage.getItem(`${LOCAL_STORAGE_KEY}_all`);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Get categories from local storage
   */
  getLocalCategories(): any[] {
    const data = localStorage.getItem(`${LOCAL_STORAGE_KEY}_categories`);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Download backup file
   */
  downloadBackup() {
    const url = localStorage.getItem('mcp_backup_url');
    const filename = localStorage.getItem('mcp_backup_filename');
    
    if (url && filename) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
}

// Export singleton instance
export const mcpSyncService = new MCPSyncService();
