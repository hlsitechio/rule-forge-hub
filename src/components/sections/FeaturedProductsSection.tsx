import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { EnhancedProductCard } from '@/components/product/EnhancedProductCard';
import { Star, Sparkles } from 'lucide-react';

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

interface FeaturedProductsSectionProps {
  products: Product[];
  onPurchase: (e: React.MouseEvent, productId: string) => void;
  onProductClick: (productId: string) => void;
}

export const FeaturedProductsSection = ({ 
  products, 
  onPurchase, 
  onProductClick 
}: FeaturedProductsSectionProps) => {
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

      {/* Featured Products Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative px-12"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
      </motion.div>
    </motion.section>
  );
};