import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { AnimatedHero } from '@/components/layout/AnimatedHero';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { ProductCard } from '@/components/product/ProductCard';
import { SearchBar } from '@/components/layout/SearchBar';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts';
import { usePurchase } from '@/hooks/usePurchase';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();
  const { data: featuredProducts } = useFeaturedProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredProducts = products?.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

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
        <motion.section 
          id="featured"
          className="py-24 bg-gradient-to-br from-card/30 via-background to-accent/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
              >
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Premium Collection</span>
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Featured AI Rules
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Hand-picked premium rules and templates from top creators. 
                Start with these battle-tested configurations.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="cursor-pointer"
                >
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    shortDescription={product.short_description || ''}
                    price={product.price}
                    category={product.category}
                    tags={product.tags || []}
                    downloadsCount={product.downloads_count}
                    isFeatured={product.is_featured}
                    onPurchase={(e) => {
                      e.stopPropagation();
                      handlePurchase(product.id);
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* All Products */}
      <motion.section 
        id="products" 
        className="py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-foreground">Complete</span>{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Browse our complete collection of AI rules for every platform. 
              Find the perfect setup for your development workflow.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto">
              <SearchBar 
                onSearch={setSearchQuery}
                placeholder="Search AI rules, tags, categories..."
              />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 
                      "bg-gradient-accent text-accent-foreground shadow-glow-accent/30" : 
                      "border-border hover:bg-secondary hover:border-accent/30"
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {filteredProducts?.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  shortDescription={product.short_description || ''}
                  price={product.price}
                  category={product.category}
                  tags={product.tags || []}
                  downloadsCount={product.downloads_count}
                  isFeatured={product.is_featured}
                  onPurchase={(e) => {
                    e.stopPropagation();
                    handlePurchase(product.id);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <AnimatedHero />
        <ProductsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </AuthProvider>
  );
};

export default Index;
