import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/product/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { Loader2, ArrowLeft, Download, Star, Eye, Code2, CheckCircle, Zap, Rocket, Award, Clock, Shield, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePurchase } from '@/hooks/usePurchase';
import { Product } from '@/hooks/useProducts';

// Import banner images
import cursorBanner from '@/assets/cursor-small-banner.jpg';
import boltBanner from '@/assets/bolt-small-banner.jpg';
import windsurfBanner from '@/assets/windsurf-small-banner.jpg';
import lovableBanner from '@/assets/lovable-small-banner.jpg';
import universalBanner from '@/assets/universal-banner.jpg';
import enterpriseBanner from '@/assets/enterprise-banner.jpg';
import v0Banner from '@/assets/v0-banner.jpg';
import claudeBanner from '@/assets/claude-banner.jpg';
import debuggingBanner from '@/assets/debugging-banner.jpg';
import frameworkBanner from '@/assets/framework-banner.jpg';

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
      // Fallback for lowercase versions
      'cursor': '⚡',
      'windsurf': '🌊',
      'bolt': '⚡',
    };
    return iconMap[category] || '🤖';
  };

  const getCategoryBanner = (category: string) => {
    const bannerMap: Record<string, string> = {
      'Cursor AI': cursorBanner,
      'Windsurf AI': windsurfBanner,
      'lovable': lovableBanner,
      'Bolt.new': boltBanner,
      'Universal': universalBanner,
      'Enterprise': enterpriseBanner,
      'V0 Vercel': v0Banner,
      'Claude AI': claudeBanner,
      'Debugging': debuggingBanner,
      'Framework Specific': frameworkBanner,
      // Fallback for lowercase versions
      'cursor': cursorBanner,
      'windsurf': windsurfBanner,
      'bolt': boltBanner,
    };
    return bannerMap[category] || cursorBanner;
  };

  const formatImplementationGuide = (guide: string) => {
    // Split by numbers and clean up the text
    const steps = guide.split(/\d+\./).filter(step => step.trim().length > 0);
    return steps.map(step => step.trim());
  };

  const calculatePricePerFile = (totalPrice: number) => {
    // Assuming each product contains multiple configuration files
    const estimatedFiles = 3; // Average files per AI rules package
    return (totalPrice / 100 / estimatedFiles).toFixed(2);
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
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Product Header */}
              <Card className="bg-gradient-to-br from-card via-card to-secondary/20 border-border overflow-hidden relative">
                {/* Banner Image */}
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <img 
                    src={getCategoryBanner(product.category)} 
                    alt={`${product.category} banner`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-background/20"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
                <CardHeader className="relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center text-3xl shadow-glow-accent">
                          {getCategoryIcon(product.category)}
                        </div>
                        <div className="space-y-2">
                          <Badge variant="secondary" className="capitalize font-semibold">
                            {product.category} AI Rules
                          </Badge>
                          {product.is_featured && (
                            <Badge className="bg-gradient-accent text-accent-foreground shadow-glow-accent">
                              <Award className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-black bg-gradient-silver bg-clip-text text-transparent">
                          ${(product.price / 100).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Only ${calculatePricePerFile(product.price)} per config file
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                        {product.title}
                      </h1>
                      <p className="text-xl text-muted-foreground leading-relaxed">{product.short_description}</p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border/50">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div className="font-bold text-lg">{product.downloads_count.toLocaleString()}+</div>
                        <div className="text-sm text-muted-foreground">Developers</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Zap className="w-5 h-5 text-accent" />
                        </div>
                        <div className="font-bold text-lg">Instant</div>
                        <div className="text-sm text-muted-foreground">Setup</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Shield className="w-5 h-5 text-accent" />
                        </div>
                        <div className="font-bold text-lg">Pro-Grade</div>
                        <div className="text-sm text-muted-foreground">Quality</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Value Proposition */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5 text-accent" />
                    <span>What You Get</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Production-Ready Configuration</h4>
                          <p className="text-sm text-muted-foreground">Enterprise-grade setup that eliminates guesswork</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Advanced Workflow Management</h4>
                          <p className="text-sm text-muted-foreground">Streamlined development process from start to finish</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Code Quality Enforcement</h4>
                          <p className="text-sm text-muted-foreground">Consistent, high-quality output every time</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Project-Specific Optimizations</h4>
                          <p className="text-sm text-muted-foreground">Tailored for your development stack</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Instant Team Synchronization</h4>
                          <p className="text-sm text-muted-foreground">Keep your entire team aligned and productive</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">Lifetime Updates</h4>
                          <p className="text-sm text-muted-foreground">Always stay current with latest best practices</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {product.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="px-3 py-1 text-sm border-accent/20 hover:border-accent/40 transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Professional Implementation Guide */}
              <Card className="bg-gradient-to-br from-card to-secondary/30 border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-accent" />
                    <span>Professional Implementation Guide</span>
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      <Clock className="w-3 h-3 mr-1" />
                      5-min setup
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {formatImplementationGuide(product.implementation_guide).map((step, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground shadow-glow-accent group-hover:shadow-glow-accent/80 transition-all">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className="text-foreground leading-relaxed group-hover:text-accent transition-colors">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-accent">Pro Tip</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This configuration is battle-tested by {product.downloads_count}+ developers worldwide. 
                      Get the same productivity boost that's helping teams ship faster and with fewer bugs.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Full Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
                </CardContent>
              </Card>

              {/* Preview Content */}
              {hasPurchased && (
                <Card className="bg-gradient-to-br from-green-500/5 to-accent/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-500">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Your Premium Configuration Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border">
                      <pre className="text-sm whitespace-pre-wrap font-mono max-h-80 overflow-y-auto">
                        {product.preview_content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Premium Purchase Card */}
              <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-accent/20 sticky top-8 shadow-glow-accent/20">
                <CardHeader className="text-center pb-4">
                  <div className="space-y-2">
                    <Badge className="bg-gradient-accent text-accent-foreground px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Professional Grade
                    </Badge>
                    <div className="space-y-1">
                      <div className="text-5xl font-black bg-gradient-silver bg-clip-text text-transparent">
                        ${(product.price / 100).toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Just ${calculatePricePerFile(product.price)} per configuration file
                      </div>
                      <div className="text-xs text-accent font-semibold">
                        🔥 Limited Time: 50% OFF Regular Price
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Value Props */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Instant download & setup</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Lifetime access & updates</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Premium support included</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>

                  {hasPurchased ? (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center justify-center text-green-500 space-x-2 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-bold">Purchase Complete!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Access your premium configuration files
                        </p>
                      </div>
                      <Button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300 h-12 text-lg font-semibold"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Access Files
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        onClick={handlePurchase}
                        disabled={purchaseLoading}
                        className="w-full bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 h-14 text-lg font-bold"
                      >
                        {purchaseLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <Rocket className="w-5 h-5 mr-2" />
                            Get Instant Access
                          </>
                        )}
                      </Button>
                      
                      <div className="text-center space-y-2">
                        <div className="text-xs text-muted-foreground">
                          ⚡ Instant download after payment
                        </div>
                        <div className="text-xs text-accent font-medium">
                          Join {product.downloads_count}+ satisfied developers
                        </div>
                      </div>
                    </div>
                  )}
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