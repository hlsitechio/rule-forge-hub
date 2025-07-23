import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Star, Code2 } from 'lucide-react';

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
  onPurchase: (productId: string) => void;
}

export const ProductCard = ({
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
      cursor: '⚡',
      windsurf: '🌊',
      lovable: '💖',
      bolt: '⚡',
    };
    return iconMap[category] || '🤖';
  };

  return (
    <Card className={`group relative bg-card border-border hover:border-silver-muted transition-all duration-300 ${
      isFeatured ? 'ring-1 ring-accent/30 shadow-glow-accent' : ''
    }`}>
      {isFeatured && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-accent px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>Featured</span>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getCategoryIcon(category)}</span>
              <Badge variant="secondary" className="text-xs capitalize">
                {category}
              </Badge>
            </div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:bg-gradient-silver group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {title}
            </CardTitle>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {shortDescription}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-border">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-border">
              +{tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{downloadsCount.toLocaleString()} downloads</span>
          </div>
          <div className="flex items-center space-x-1">
            <Code2 className="w-4 h-4" />
            <span>AI Rules</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-bold bg-gradient-silver bg-clip-text text-transparent">
            {formatPrice(price)}
          </div>
          <Button
            onClick={() => onPurchase(id)}
            className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300"
          >
            Purchase
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};