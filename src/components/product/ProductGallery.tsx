import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import { Star, Filter, Grid, LayoutGrid, Sparkles } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  tags: string[];
  downloads_count: number;
  is_featured: boolean;
}

interface ProductGalleryProps {
  featuredProducts: Product[];
  allProducts: Product[];
  onPurchase: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

export const ProductGallery = ({ 
  featuredProducts, 
  allProducts, 
  onPurchase, 
  onProductClick 
}: ProductGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');

  const categories = ['all', 'Cursor AI', 'Windsurf AI', 'lovable', 'Bolt.new', 'Universal', 'Enterprise', 'V0 Vercel', 'Claude AI'];

  const filteredProducts = allProducts?.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const handlePurchase = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onPurchase(productId);
  };

  return (
    <div className="space-y-16">
      {/* Featured Products Carousel */}
      {featuredProducts && featuredProducts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2"
            >
              <Star className="w-4 h-4 text-accent fill-current" />
              <span className="text-sm font-medium text-accent">Premium Collection</span>
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Featured AI Rules
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hand-picked premium configurations from top developers. 
              Start with these battle-tested setups.
            </p>
          </div>

          {/* Featured Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => onProductClick(product.id)}
                      className="cursor-pointer"
                    >
                      <EnhancedProductCard
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
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
              <CarouselNext className="hidden md:flex -right-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
            </Carousel>
          </motion.div>
        </motion.section>
      )}

      {/* All Products Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-foreground">Complete</span>{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Collection
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our complete collection of AI rules for every platform. 
            Find the perfect setup for your development workflow.
          </p>
        </div>

        {/* Filters and View Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter by:</span>
            </div>
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
                    "border-border/50 hover:bg-accent/10 hover:border-accent/30"
                  }
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button
              variant={viewMode === 'carousel' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('carousel')}
              className={viewMode === 'carousel' ? 
                "bg-gradient-accent text-accent-foreground" : 
                "border-border/50 hover:bg-accent/10"
              }
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 
                "bg-gradient-accent text-accent-foreground" : 
                "border-border/50 hover:bg-accent/10"
              }
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Products Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {viewMode === 'carousel' ? (
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredProducts?.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      onClick={() => onProductClick(product.id)}
                      className="cursor-pointer"
                    >
                      <EnhancedProductCard
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
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
              <CarouselNext className="hidden md:flex -right-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts?.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  onClick={() => onProductClick(product.id)}
                  className="cursor-pointer"
                >
                  <EnhancedProductCard
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
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.section>
    </div>
  );
};