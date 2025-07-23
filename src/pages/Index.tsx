import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import { ProductCard } from '@/components/product/ProductCard';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts';
import { usePurchase } from '@/hooks/usePurchase';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();
  const { data: featuredProducts } = useFeaturedProducts();
  const { user } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const { purchaseProduct, loading: purchaseLoading } = usePurchase();

  const handlePurchase = async (productId: string) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    
    try {
      await purchaseProduct(productId);
    } catch (error) {
      // Error is already handled in the usePurchase hook
      console.error('Purchase failed:', error);
    }
  };

  const categories = ['all', 'cursor', 'windsurf', 'lovable', 'bolt'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products?.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <>
      {/* Featured Products */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-16 bg-card/30" id="featured">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-silver bg-clip-text text-transparent">
                Featured AI Rules
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hand-picked premium rules and templates from top creators
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  shortDescription={product.short_description || ''}
                  price={product.price}
                  category={product.category}
                  tags={product.tags || []}
                  downloadsCount={product.downloads_count}
                  isFeatured={product.is_featured}
                  onPurchase={handlePurchase}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-16" id="products">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All AI Rules & Templates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of AI rules for every platform
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 
                  "bg-gradient-silver text-primary-foreground" : 
                  "border-border hover:bg-secondary"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                shortDescription={product.short_description || ''}
                price={product.price}
                category={product.category}
                tags={product.tags || []}
                downloadsCount={product.downloads_count}
                isFeatured={product.is_featured}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </div>
      </section>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <ProductsSection />
      </div>
    </AuthProvider>
  );
};

export default Index;
