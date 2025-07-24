import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Purchase {
  id: string;
  product_id: string;
  amount: number;
  status: string;
  created_at: string;
  products: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    preview_content: string;
    implementation_guide: string;
  };
}

interface PurchaseCardProps {
  purchase: Purchase;
  index: number;
}

export const PurchaseCard = ({ purchase, index }: PurchaseCardProps) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${title} copied to clipboard.`,
    });
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

  const formatSteps = (guide: string) => {
    const steps = guide.split(/\d+\./).filter(step => step.trim().length > 0);
    return steps.slice(0, 3); // Show first 3 steps
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <Card className="bg-card/70 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-300 group overflow-hidden relative">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center text-2xl shadow-glow-accent/20 group-hover:shadow-glow-accent/40 transition-shadow duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  {getCategoryIcon(purchase.products.category)}
                </motion.div>
                <div className="space-y-1">
                  <Badge variant="secondary" className="text-xs capitalize font-medium">
                    {purchase.products.category} AI Rules
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-muted-foreground">Premium</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              >
                <CardTitle className="text-xl group-hover:text-accent transition-colors duration-300">
                  {purchase.products.title}
                </CardTitle>
                <p className="text-muted-foreground mt-2 line-clamp-2">
                  {purchase.products.description}
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
              className="text-right space-y-2"
            >
              <div className="text-2xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                ${(purchase.amount / 100).toFixed(2)}
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{new Date(purchase.created_at).toLocaleDateString()}</span>
              </div>
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
            className="flex flex-wrap gap-2"
          >
            {purchase.products.tags?.slice(0, 4).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + tagIndex * 0.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-xs border-border/50 hover:border-accent/30 transition-colors duration-300"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Setup Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
            className="bg-secondary/30 p-4 rounded-lg border border-border/30"
          >
            <h4 className="font-semibold mb-3 flex items-center text-sm">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              Quick Setup Steps
            </h4>
            <div className="space-y-2">
              {formatSteps(purchase.products.implementation_guide).map((step, stepIndex) => (
                <motion.div
                  key={stepIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + stepIndex * 0.1 }}
                  className="flex items-start space-x-2 text-sm text-muted-foreground"
                >
                  <span className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center text-xs font-bold text-accent mt-0.5 flex-shrink-0">
                    {stepIndex + 1}
                  </span>
                  <span className="line-clamp-2">{step.trim()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.05 }}
            className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/30"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button
                onClick={() => copyToClipboard(purchase.products.preview_content, purchase.products.title)}
                className="w-full bg-gradient-accent text-accent-foreground hover:shadow-glow-accent/50 transition-all duration-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy AI Rules
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={() => copyToClipboard(purchase.products.implementation_guide, 'Implementation guide')}
                className="border-border/50 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Setup Guide
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};