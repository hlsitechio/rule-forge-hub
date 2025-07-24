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
  Code2
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
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const categories = [
    'all',
    'Cursor AI',
    'Windsurf AI',
    'lovable',
    'Bolt.new',
    'Universal',
    'Enterprise',
    'V0 Vercel',
    'Claude AI',
    'Debugging',
    'Framework Specific'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
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

  const getTotalProducts = () => products.length;
  const getFeaturedProducts = () => products.filter(p => p.is_featured).length;
  const getTotalDownloads = () => products.reduce((sum, p) => sum + p.downloads_count, 0);
  const getUniqueCategories = () => [...new Set(products.map(p => p.category))].length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-secondary/30 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Store className="h-12 w-12 text-accent" />
              <h1 className="text-4xl font-black bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                AI Rules Marketplace
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional AI configuration packages to supercharge your development workflow
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{getTotalProducts()}</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{getUniqueCategories()}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{getFeaturedProducts()}</div>
                <div className="text-sm text-muted-foreground">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{getTotalDownloads().toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters & Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Browse & Filter</span>
            </CardTitle>
            <CardDescription>
              Find the perfect AI rules package for your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
              
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : `${getCategoryIcon(category)} ${category}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Downloaded</SelectItem>
                  <SelectItem value="featured">Featured First</SelectItem>
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
            </div>
            
            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
              {searchTerm && ` for "${searchTerm}"`}
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
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-accent/20"
                      onClick={() => navigate(`/product/${product.id}`)}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center text-xl">
                          {getCategoryIcon(product.category)}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">${(product.price / 100).toFixed(2)}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Code2 className="h-3 w-3 mr-1" />
                            {product.product_code}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.short_description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Download className="h-4 w-4 mr-1" />
                          {product.downloads_count.toLocaleString()}
                        </div>
                        {product.is_featured && (
                          <Badge className="bg-gradient-accent">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        {product.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
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