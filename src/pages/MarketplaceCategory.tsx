import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { mcpSyncService } from '@/services/mcpSyncService';
import { 
  Loader2, 
  Search, 
  Grid3X3, 
  List,
  Package,
  Download,
  Code2,
  Clock,
  ShoppingCart,
  Star,
  ArrowLeft,
  RefreshCw,
  FileText,
  BookOpen,
  Server,
  Zap,
  GitBranch,
  CheckCircle
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  short_description: string;
  category: string;
  price: number;
  downloads_count: number;
  is_featured: boolean;
  is_active: boolean;
  tags: string[];
  file_url: string;
  product_code: string;
  preview_content: string;
  implementation_guide: string;
  created_at: string;
  updated_at: string;
}

// Category configurations with SEO metadata
const CATEGORY_CONFIG: Record<string, {
  name: string;
  title: string;
  description: string;
  icon: string;
  banner: string;
  color: string;
  seoKeywords: string[];
  relatedCategories: string[];
}> = {
  'mcp-documentation': {
    name: 'MCP Documentation',
    title: 'MCP Documentation Library - Model Context Protocol Resources',
    description: 'Complete MCP documentation suite with AI integration, search capabilities, and professional documentation management tools for developers.',
    icon: '🖥️',
    banner: 'mcp-banner',
    color: 'blue',
    seoKeywords: ['MCP', 'Model Context Protocol', 'documentation', 'AI integration', 'ChatGPT', 'Claude'],
    relatedCategories: ['system-prompts', 'agent-instructions']
  },
  'cursor-rules': {
    name: 'Cursor Rules',
    title: 'Cursor AI Rules - Professional Coding Assistant Rules',
    description: 'Premium Cursor AI rules and configurations for enhanced coding productivity. Industry-standard templates for AI-powered development.',
    icon: '⚡',
    banner: 'cursor-banner',
    color: 'purple',
    seoKeywords: ['Cursor AI', 'coding rules', 'AI assistant', 'development productivity'],
    relatedCategories: ['development-tools', 'system-prompts']
  },
  'system-prompts': {
    name: 'System Prompts',
    title: 'System Prompts - Professional AI Assistant Prompts',
    description: 'Curated collection of system prompts for AI assistants. Optimize your AI interactions with proven prompt engineering templates.',
    icon: '🧠',
    banner: 'prompts-banner',
    color: 'green',
    seoKeywords: ['system prompts', 'AI prompts', 'ChatGPT prompts', 'prompt engineering'],
    relatedCategories: ['agent-instructions', 'cursor-rules']
  },
  'agent-instructions': {
    name: 'Agent Instructions',
    title: 'AI Agent Instructions - Autonomous Agent Configurations',
    description: 'Professional instructions and configurations for AI agents. Build powerful autonomous systems with battle-tested templates.',
    icon: '🤖',
    banner: 'agent-banner',
    color: 'orange',
    seoKeywords: ['AI agents', 'autonomous agents', 'agent instructions', 'AI automation'],
    relatedCategories: ['system-prompts', 'workflow-automation']
  },
  'workflow-automation': {
    name: 'Workflow Automation',
    title: 'Workflow Automation - AI-Powered Process Automation',
    description: 'Streamline your workflows with AI-powered automation templates. Professional automation solutions for development teams.',
    icon: '⚙️',
    banner: 'workflow-banner',
    color: 'red',
    seoKeywords: ['workflow automation', 'process automation', 'AI workflows', 'development automation'],
    relatedCategories: ['agent-instructions', 'development-tools']
  },
  'development-tools': {
    name: 'Development Tools',
    title: 'Development Tools - Professional Developer Resources',
    description: 'Essential development tools and configurations for modern software development. Boost productivity with proven solutions.',
    icon: '🛠️',
    banner: 'tools-banner',
    color: 'indigo',
    seoKeywords: ['development tools', 'developer resources', 'productivity tools', 'coding tools'],
    relatedCategories: ['cursor-rules', 'workflow-automation']
  }
};

const MarketplaceCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(mcpSyncService.getSyncStatus());

  // Get category configuration
  const categoryConfig = category ? CATEGORY_CONFIG[category] : null;
  const categoryName = categoryConfig?.name || 'Unknown Category';
  const actualDbCategory = categoryName === 'MCP Documentation' ? 'MCP Documentation' : categoryName;

  useEffect(() => {
    if (!categoryConfig) {
      navigate('/marketplace');
      return;
    }
    
    fetchCategoryProducts();
    setSyncStatus(mcpSyncService.getSyncStatus());
    
    // Set page title for SEO
    document.title = categoryConfig.title;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', categoryConfig.description);
    }
  }, [category]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm]);

  const fetchCategoryProducts = async () => {
    if (!categoryConfig) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', actualDbCategory)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSync = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to sync documentation",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    try {
      const status = await mcpSyncService.performFullSync();
      setSyncStatus(status);
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced ${status.documentsCount} documents`,
      });

      // Refresh products
      await fetchCategoryProducts();
    } catch (error: any) {
      toast({
        title: "Sync Failed",
        description: error.message || "Failed to sync documentation",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const getCategoryStats = () => {
    const totalDocs = products.reduce((sum, p) => {
      try {
        const preview = JSON.parse(p.preview_content || '{}');
        return sum + (preview.documentsCount || 0);
      } catch {
        return sum;
      }
    }, 0);

    return {
      products: products.length,
      documents: totalDocs,
      featured: products.filter(p => p.is_featured).length
    };
  };

  if (!categoryConfig) {
    return null;
  }

  const stats = getCategoryStats();

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": categoryConfig.title,
          "description": categoryConfig.description,
          "url": `https://yoursite.com/marketplace/${category}`,
          "keywords": categoryConfig.seoKeywords.join(', '),
          "numberOfItems": products.length
        })}
      </script>

      <Header />
      
      {/* Hero Section with Category Info */}
      <div className={`bg-gradient-to-br from-${categoryConfig.color}-50 via-background to-background border-b`}>
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{categoryConfig.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{categoryConfig.icon}</div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{categoryConfig.name}</h1>
                  <p className="text-lg text-muted-foreground max-w-3xl">
                    {categoryConfig.description}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{stats.products}</span>
                  <span className="text-muted-foreground">Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{stats.documents}</span>
                  <span className="text-muted-foreground">Documents</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{stats.featured}</span>
                  <span className="text-muted-foreground">Featured</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                All Categories
              </Button>
              
              {category === 'mcp-documentation' && (
                <Button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="gap-2"
                >
                  {isSyncing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Sync with GitHub
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and View Controls */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search ${categoryConfig.name}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Display */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search terms' : `No ${categoryConfig.name} products available yet`}
              </p>
              {category === 'mcp-documentation' && !searchTerm && (
                <Button onClick={handleSync} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Sync Documentation from GitHub
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-3xl">{categoryConfig.icon}</div>
                        {product.is_featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.short_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Parse and display preview content */}
                      {(() => {
                        try {
                          const preview = JSON.parse(product.preview_content || '{}');
                          return (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                <span>{preview.documentsCount || 0} documents</span>
                              </div>
                              
                              {preview.features && (
                                <div className="space-y-1">
                                  {preview.features.slice(0, 3).map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                      <CheckCircle className="h-3 w-3 text-green-500" />
                                      <span className="text-xs">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {product.tags?.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="pt-3 border-t">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-2xl font-bold text-primary">
                                      ${(product.price / 100).toFixed(2)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">per month</div>
                                  </div>
                                  <Button size="sm" className="gap-2">
                                    <ShoppingCart className="h-4 w-4" />
                                    Get Access
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        } catch {
                          return null;
                        }
                      })()}
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{categoryConfig.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {product.short_description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                <span>{product.downloads_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Code2 className="h-4 w-4" />
                                <span>{product.product_code}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${(product.price / 100).toFixed(2)}</div>
                            {product.is_featured && (
                              <Badge className="mt-2">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Related Categories */}
        {categoryConfig.relatedCategories.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Related Categories</CardTitle>
              <CardDescription>Explore more resources that work well with {categoryConfig.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categoryConfig.relatedCategories.map((relatedCat) => {
                  const related = CATEGORY_CONFIG[relatedCat];
                  if (!related) return null;
                  
                  return (
                    <Link
                      key={relatedCat}
                      to={`/marketplace/${relatedCat}`}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors"
                    >
                      <span className="text-2xl">{related.icon}</span>
                      <div>
                        <div className="font-medium">{related.name}</div>
                        <div className="text-xs text-muted-foreground">Browse collection</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MarketplaceCategory;
