import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/product/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Loader2, ArrowLeft, Download, Star, Eye, Code2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePurchase } from '@/hooks/usePurchase';
import { Product } from '@/hooks/useProducts';

const ProductDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { purchaseProduct, loading: purchaseLoading } = usePurchase();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        // Fetch main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();

        if (productError) throw productError;
        setProduct(productData);

        // Check if user has purchased this product
        if (user) {
          const { data: purchaseData } = await supabase
            .from('purchases')
            .select('id')
            .eq('user_id', user.id)
            .eq('product_id', id)
            .eq('status', 'completed')
            .single();

          setHasPurchased(!!purchaseData);
        }

        // Fetch related products (same category, different products)
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .eq('is_active', true)
          .neq('id', id)
          .limit(3);

        if (relatedError) throw relatedError;
        setRelatedProducts(relatedData || []);

      } catch (error: any) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Product not found.",
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user, navigate, toast]);

  const handlePurchase = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    
    if (!product) return;

    try {
      await purchaseProduct(product.id);
      setHasPurchased(true);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleRelatedPurchase = async (productId: string) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    
    try {
      await purchaseProduct(productId);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      cursor: '⚡',
      windsurf: '🌊',
      lovable: '💖',
      bolt: '⚡',
    };
    return iconMap[category] || '🤖';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Header */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                        <Badge variant="secondary" className="capitalize">
                          {product.category}
                        </Badge>
                        {product.is_featured && (
                          <Badge className="bg-gradient-accent text-accent-foreground">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <p className="text-muted-foreground text-lg">{product.short_description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Download className="w-4 h-4" />
                      <span>{product.downloads_count.toLocaleString()} downloads</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Code2 className="w-4 h-4" />
                      <span>AI Rules</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-border">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>

                  {/* Implementation Guide */}
                  <div className="bg-secondary p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      Implementation Guide
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.implementation_guide}
                    </p>
                  </div>

                  {/* Preview Content */}
                  {hasPurchased && (
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2 flex items-center text-green-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Your Rules Content (Purchased)
                      </h3>
                      <pre className="text-sm text-muted-foreground whitespace-pre-wrap bg-background p-3 rounded border max-h-60 overflow-y-auto">
                        {product.preview_content}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <Card className="bg-card border-border sticky top-8">
                <CardHeader>
                  <CardTitle className="text-center">
                    <span className="text-3xl font-bold bg-gradient-silver bg-clip-text text-transparent">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {hasPurchased ? (
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center text-green-500 space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Already Purchased</span>
                      </div>
                      <Button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300"
                      >
                        View in Dashboard
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handlePurchase}
                      disabled={purchaseLoading}
                      className="w-full bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300"
                    >
                      {purchaseLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Purchase Now
                        </>
                      )}
                    </Button>
                  )}
                  
                  <div className="text-xs text-muted-foreground text-center">
                    Instant download • Lifetime access
                  </div>
                </CardContent>
              </Card>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedProducts.map((relatedProduct) => (
                      <div 
                        key={relatedProduct.id}
                        className="border border-border rounded-lg p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span>{getCategoryIcon(relatedProduct.category)}</span>
                          <h4 className="font-semibold text-sm">{relatedProduct.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {relatedProduct.short_description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold bg-gradient-silver bg-clip-text text-transparent">
                            ${(relatedProduct.price / 100).toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {relatedProduct.downloads_count} downloads
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
};

const ProductDetail = () => {
  return (
    <AuthProvider>
      <ProductDetailContent />
    </AuthProvider>
  );
};

export default ProductDetail;