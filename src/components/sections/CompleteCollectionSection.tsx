import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import { Filter, Grid, LayoutGrid } from 'lucide-react';

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

interface CompleteCollectionSectionProps {
  products: Product[];
  onPurchase: (e: React.MouseEvent, productId: string) => void;
  onProductClick: (productId: string) => void;
}

export const CompleteCollectionSection = ({ 
  products, 
  onPurchase, 
  onProductClick 
}: CompleteCollectionSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');

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

  const filteredProducts = products?.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  ) || [];

  if (!products || products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Section Header */}
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
          <div className="px-12">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {filteredProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      onClick={() => onProductClick(product.id)}
                      className="cursor-pointer h-full"
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
                        onPurchase={onPurchase}
                      />
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
              <CarouselNext className="right-0 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
            </Carousel>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
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
                  onPurchase={onPurchase}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};