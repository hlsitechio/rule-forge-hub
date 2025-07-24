import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Star, Code2, Clock, Users, Zap, ShoppingCart } from 'lucide-react';

// Import banner images
import cursorBanner from '@/assets/cursor-banner.jpg';
import windsurfBanner from '@/assets/windsurf-banner.jpg';
import lovableBanner from '@/assets/lovable-banner.jpg';
import boltBanner from '@/assets/bolt-banner.jpg';
import universalBanner from '@/assets/universal-banner.jpg';
import enterpriseBanner from '@/assets/enterprise-banner.jpg';
import v0Banner from '@/assets/v0-banner.jpg';
import claudeBanner from '@/assets/claude-banner.jpg';
import debuggingBanner from '@/assets/debugging-banner.jpg';
import frameworkBanner from '@/assets/framework-banner.jpg';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  category: string;
  tags: string[];
  downloadsCount: number;
  isFeatured: boolean;
  onPurchase: (e: React.MouseEvent, productId: string) => void;
}

export const EnhancedProductCard = ({
  id,
  title,
  description,
  shortDescription,
  price,
  category,
  tags,
  downloadsCount,
  isFeatured,
  onPurchase,
}: ProductCardProps) => {
  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
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
      'cursor': '⚡',
      'windsurf': '🌊',
      'bolt': '⚡',
    };
    return iconMap[category] || '🤖';
  };

  const getBannerImage = (category: string) => {
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

  const getCategoryGradient = (category: string) => {
    const gradientMap: Record<string, string> = {
      'Cursor AI': 'from-purple-500/20 to-blue-500/20',
      'Windsurf AI': 'from-cyan-500/20 to-teal-500/20',
      'lovable': 'from-pink-500/20 to-purple-500/20',
      'Bolt.new': 'from-yellow-500/20 to-orange-500/20',
      'Universal': 'from-indigo-500/20 to-purple-500/20',
      'Enterprise': 'from-blue-500/20 to-teal-500/20',
      'V0 Vercel': 'from-black/20 to-purple-500/20',
      'Claude AI': 'from-orange-500/20 to-purple-500/20',
      'Debugging': 'from-red-500/20 to-orange-500/20',
      'Framework Specific': 'from-cyan-500/20 to-blue-500/20',
      // Fallback for lowercase versions
      'cursor': 'from-purple-500/20 to-blue-500/20',
      'windsurf': 'from-cyan-500/20 to-teal-500/20',
      'bolt': 'from-yellow-500/20 to-orange-500/20',
    };
    return gradientMap[category] || 'from-gray-500/20 to-gray-600/20';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Card className={`overflow-hidden bg-card/70 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-500 ${
        isFeatured ? 'ring-2 ring-accent/30 shadow-glow-accent/20' : ''
      }`}>
        {/* Banner Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={getBannerImage(category)}
            alt={`${category} AI banner`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
          />
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryGradient(category)} to-transparent`} />
          
          {/* Featured badge */}
          {isFeatured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 z-10"
            >
              <Badge className="bg-gradient-accent text-accent-foreground px-3 py-1 shadow-glow-accent/30">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Premium
              </Badge>
            </motion.div>
          )}

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 z-10"
          >
            <Badge variant="secondary" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
              <span className="mr-1">{getCategoryIcon(category)}</span>
              {category.toUpperCase()}
            </Badge>
          </motion.div>

          {/* Quick stats overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 right-4 z-10"
          >
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                <Users className="w-3 h-3" />
                <span>{downloadsCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                <Clock className="w-3 h-3" />
                <span>5 min setup</span>
              </div>
            </div>
          </motion.div>
        </div>

        <CardHeader className="pb-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {shortDescription || description}
            </p>
          </motion.div>
        </CardHeader>

        <CardContent className="pb-4">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {tags.slice(0, 3).map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-xs border-border/50 hover:border-accent/30 transition-colors duration-300"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-border/50">
                +{tags.length - 3} more
              </Badge>
            )}
          </motion.div>

          {/* Features highlight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-accent" />
              <span>Instant productivity boost</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Code2 className="w-4 h-4 text-accent" />
              <span>Professional-grade rules</span>
            </div>
          </motion.div>
        </CardContent>

        <CardFooter className="pt-4 border-t border-border/30">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between w-full"
          >
            <div className="space-y-1">
              <div className="text-3xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {formatPrice(price)}
              </div>
              <div className="text-xs text-muted-foreground">
                One-time purchase
              </div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={(e) => onPurchase(e, id)}
                className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent/50 transition-all duration-300 px-6"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Now
              </Button>
            </motion.div>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};