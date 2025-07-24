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

  // Platform-specific categories with proper terminology
  const categories = [
    { key: 'all', label: 'All Platforms', description: 'Complete collection' },
    { key: 'Cursor AI', label: 'Cursor Rules', description: 'Rules for .cursor/rules' },
    { key: 'Windsurf AI', label: 'Cascade Rules', description: 'AI Flows & Instructions' },
    { key: 'lovable', label: 'Agent Instructions', description: 'System instructions for Lovable' },
    { key: 'Bolt.new', label: 'Prompt Instructions', description: 'Persistent prompts' },
    { key: 'Universal', label: 'System Prompts', description: 'Cross-platform instructions' },
    { key: 'Enterprise', label: 'Enterprise Kits', description: 'Professional setups' },
    { key: 'V0 Vercel', label: 'V0 Templates', description: 'Vercel V0 presets' },
    { key: 'Claude AI', label: 'Claude Instructions', description: 'Anthropic Claude prompts' },
    { key: 'Debugging', label: 'Debug Recipes', description: 'Problem-solving scripts' },
    { key: 'Framework Specific', label: 'Framework Blueprints', description: 'Tech-specific guides' }
  ];

  // Helper function to get proper terminology for each platform
  const getPlatformTerminology = (category: string) => {
    const platformTerms: Record<string, string> = {
      'Cursor AI': 'Cursor Rules',
      'Windsurf AI': 'Cascade Rules & AI Flows',
      'lovable': 'Agent Instructions',
      'Bolt.new': 'Prompt Instructions',
      'Claude AI': 'System Instructions',
      'Universal': 'System Prompts',
      'Enterprise': 'Enterprise AI Kits',
      'Debugging': 'Debug Recipes',
      'Framework Specific': 'Framework Blueprints'
    };
    return platformTerms[category] || 'AI Instructions';
  };

  const filteredProducts = products?.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  ) || [];

  const selectedCategoryInfo = categories.find(cat => cat.key === selectedCategory) || categories[0];

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
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-foreground">Complete AI</span>{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Professional System Prompts, Cursor Rules, Agent Instructions, and AI Blueprints. 
            Industry-standard formats for Cursor AI, Windsurf, Lovable, Bolt.new, and more.
          </p>
        </div>

        {/* Platform Terminology Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/30 border border-border/50 rounded-2xl p-6 max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center space-y-1">
              <div className="font-semibold text-foreground">Cursor AI</div>
              <div className="text-muted-foreground">Cursor Rules</div>
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-foreground">Windsurf AI</div>
              <div className="text-muted-foreground">Cascade Rules</div>
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-foreground">Lovable.dev</div>
              <div className="text-muted-foreground">Agent Instructions</div>
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-foreground">Universal</div>
              <div className="text-muted-foreground">System Prompts</div>
            </div>
          </div>
        </motion.div>

        {/* Active Filter Description */}
        {selectedCategory !== 'all' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-accent/5 border border-accent/20 rounded-xl p-4 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <h3 className="font-semibold text-accent text-lg">
                {selectedCategoryInfo.label}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {selectedCategoryInfo.description} • {filteredProducts.length} available
              </p>
            </div>
          </motion.div>
        )}
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
          {categories.map((category, index) => {
            const isActive = selectedCategory === category.key;
            const productCount = category.key === 'all' 
              ? products.length 
              : products.filter(p => p.category === category.key).length;
            
            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className={`${
                    isActive ? 
                      "bg-gradient-accent text-accent-foreground shadow-glow-accent/30" : 
                      "border-border/50 hover:bg-accent/10 hover:border-accent/30"
                  } relative`}
                >
                  <span>{category.label}</span>
                  {productCount > 0 && (
                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      isActive 
                        ? "bg-accent-foreground/20 text-accent-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {productCount}
                    </span>
                  )}
                </Button>
              </motion.div>
            );
          })}
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
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full px-12"
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
              <CarouselPrevious className="-left-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
              <CarouselNext className="-right-12 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-accent/10 hover:border-accent/30" />
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