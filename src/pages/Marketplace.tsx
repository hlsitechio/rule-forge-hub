import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { SearchBar } from '@/components/layout/SearchBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Loader2, 
  Store, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Package,
  TrendingUp,
  Star,
  Download,
  Code2,
  Clock,
  ShoppingCart,
  Zap
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
  created_at: string;
  updated_at: string;
}

const Marketplace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Updated categories to match the reference design
  const categories = [
    { key: 'all', name: 'All Platforms', count: 0 },
    { key: 'Cursor AI', name: 'Cursor Rules', count: 0 },
    { key: 'Windsurf AI', name: 'Cascade Rules', count: 0 },
    { key: 'lovable', name: 'Agent Instructions', count: 0 },
    { key: 'Universal', name: 'System Prompts', count: 0 },
    { key: 'Enterprise', name: 'Enterprise Kits', count: 0 },
    { key: 'V0 Vercel', name: 'V0 Templates', count: 0 },
    { key: 'Claude AI', name: 'Claude Instructions', count: 0 },
    { key: 'Debugging', name: 'Debug Recipes', count: 0 },
    { key: 'Framework Specific', name: 'Framework Blueprints', count: 0 }
  ];

  // Platform categories for the top section
  const platformCategories = [
    { key: 'Cursor AI', name: 'Cursor AI', subtitle: 'Cursor Rules', icon: '⚡' },
    { key: 'Windsurf AI', name: 'Windsurf AI', subtitle: 'Cascade Rules', icon: '🌊' },
    { key: 'lovable', name: 'Lovable.dev', subtitle: 'Agent Instructions', icon: '💖' },
    { key: 'Universal', name: 'Universal', subtitle: 'System Prompts', icon: '🌐' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
    updateCategoryCounts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
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

  const updateCategoryCounts = () => {
    const updatedCategories = categories.map(cat => ({
      ...cat,
      count: cat.key === 'all' 
        ? products.length 
        : products.filter(p => p.category === cat.key).length
    }));
    // Update the categories state if needed
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.downloads_count - a.downloads_count);
        break;
      case 'featured':
        filtered.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
        break;
    }

    setFilteredProducts(filtered);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      'Cursor AI': '⚡',
      'Windsurf AI': '🌊',
      'lovable': '💖',
      'Bolt.new': '⚡',
      'Universal': '🌐',
      'Enterprise': '🏢',
      'V0 Vercel': '▲',
      'Claude AI': '🧠',
      'Debugging': '🐛',
      'Framework Specific': '⚛️',
    };
    return iconMap[category] || '🤖';
  };

  const getBundleType = (product: Product) => {
    if (product.tags?.includes('bundle')) return 'BUNDLE';
    return product.category.toUpperCase().replace(' ', ' ');
  };

  const isPremium = (product: Product) => {
    return product.is_featured || product.price >= 2999;
  };

  const getTotalProducts = () => products.length;
  const getFeaturedProducts = () => products.filter(p => p.is_featured).length;
  const getTotalDownloads = () => products.reduce((sum, p) => sum + p.downloads_count, 0);
  const getUniqueCategories = () => [...new Set(products.map(p => p.category))].length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-card border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-black">
              Complete AI <span className="text-accent">Marketplace</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Professional System Prompts, Cursor Rules, Agent Instructions, and AI Blueprints. Industry-standard formats for Cursor AI, Windsurf, Lovable, Bolt.new, and more.
            </p>
            
            {/* Platform Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              {platformCategories.map((platform) => (
                <div 
                  key={platform.key}
                  className="text-center space-y-2 cursor-pointer group"
                  onClick={() => setSelectedCategory(platform.key)}
                >
                  <div className="text-3xl mb-2">{platform.icon}</div>
                  <h3 className="font-bold text-lg group-hover:text-accent transition-colors">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters & Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.key)}
                    className="text-xs"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products, codes, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Downloaded</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Mode */}
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Results count */}
              <div className="text-sm text-muted-foreground flex items-center">
                Showing {filteredProducts.length} of {products.length}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('newest');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              viewMode === 'grid' ? (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-border bg-gradient-to-br from-card to-card/50 relative overflow-hidden"
                      onClick={() => navigate(`/product/${product.id}`)}>
                  
                  {/* Premium Badge */}
                  {isPremium(product) && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-accent text-accent-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    </div>
                  )}
                  
                  {/* Bundle/Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur">
                      {getBundleType(product)}
                    </Badge>
                  </div>
                  
                  {/* Banner Background */}
                  <div className="h-32 bg-gradient-to-br from-accent/20 to-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center text-2xl">
                        {getCategoryIcon(product.category)}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-white/80 text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      5 min setup
                    </div>
                  </div>
                  
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-xl mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {product.short_description}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-2 py-1">
                          {tag}
                        </Badge>
                      ))}
                      {product.tags && product.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{product.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-accent">
                        <Zap className="h-3 w-3 mr-2" />
                        Instant productivity boost
                      </div>
                      <div className="flex items-center text-accent">
                        <Code2 className="h-3 w-3 mr-2" />
                        Professional-grade rules
                      </div>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-2xl font-bold text-accent">
                            ${(product.price / 100).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">One-time purchase</div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {product.downloads_count}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Get Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center text-2xl">
                        {getCategoryIcon(product.category)}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <p className="text-sm text-muted-foreground">{product.short_description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">${(product.price / 100).toFixed(2)}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Code2 className="h-3 w-3 mr-1" />
                              {product.product_code}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              {product.downloads_count.toLocaleString()}
                            </div>
                            <Badge variant="outline">{product.category}</Badge>
                            {product.is_featured && (
                              <Badge className="bg-gradient-accent">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <Button size="sm" onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;