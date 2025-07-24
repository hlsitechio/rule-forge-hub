import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Loader2, 
  ShoppingBag, 
  Download, 
  Calendar, 
  DollarSign, 
  Package,
  FileText,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Code2
} from 'lucide-react';

interface Purchase {
  id: string;
  product_id: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  products: {
    id: string;
    title: string;
    short_description: string;
    category: string;
    file_url: string;
    tags: string[];
    price: number;
    product_code: string;
  };
}

const Purchases = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const fetchPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select(`
          *,
          products (
            id,
            title,
            short_description,
            category,
            file_url,
            tags,
            price,
            product_code
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
    } catch (error: any) {
      console.error('Error fetching purchases:', error);
      toast({
        title: "Error",
        description: "Failed to load purchases",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default' as const;
      case 'pending':
        return 'secondary' as const;
      case 'failed':
        return 'destructive' as const;
      default:
        return 'outline' as const;
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
    };
    return iconMap[category] || '🤖';
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleDownload = async (purchase: Purchase) => {
    if (purchase.status !== 'completed') {
      toast({
        title: "Download not available",
        description: "This purchase is not completed yet",
        variant: "destructive",
      });
      return;
    }

    if (!purchase.products.file_url) {
      toast({
        title: "Download not available",
        description: "File not available for this product",
        variant: "destructive",
      });
      return;
    }

    // Simulate download
    toast({
      title: "Download started",
      description: `Downloading ${purchase.products.title}`,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Please sign in to view your purchases.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
              <ShoppingBag className="h-8 w-8 text-accent" />
              My Purchases
            </h1>
            <p className="text-muted-foreground">
              Manage and download your AI rules packages
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">{purchases.length}</p>
                    <p className="text-sm text-muted-foreground">Total Purchases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {purchases.filter(p => p.status === 'completed').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card to-secondary/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-2xl font-bold">
                      ${(purchases.reduce((sum, p) => sum + p.amount, 0) / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchases List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Purchase History</span>
              </CardTitle>
              <CardDescription>
                Download and manage your AI rules packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : purchases.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse our marketplace to find AI rules packages for your projects
                  </p>
                  <Button onClick={() => navigate('/categories')}>
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <Card key={purchase.id} className="border border-border/50 hover:border-accent/20 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between space-x-4">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Category Icon */}
                            <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center text-xl">
                              {getCategoryIcon(purchase.products.category)}
                            </div>
                            
                            {/* Purchase Details */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg leading-tight">
                                    {purchase.products.title}
                                  </h3>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <p className="text-sm text-muted-foreground">
                                      {purchase.products.short_description}
                                    </p>
                                    <Badge variant="outline" className="text-xs">
                                      <Code2 className="h-3 w-3 mr-1" />
                                      {purchase.products.product_code}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg">
                                    ${(purchase.amount / 100).toFixed(2)}
                                  </p>
                                  <Badge variant={getStatusVariant(purchase.status)} className="flex items-center space-x-1">
                                    {getStatusIcon(purchase.status)}
                                    <span className="capitalize">{purchase.status}</span>
                                  </Badge>
                                </div>
                              </div>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {purchase.products.category}
                                </Badge>
                                {purchase.products.tags?.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              {/* Purchase Info */}
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>
                                    {new Date(purchase.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>
                                    {new Date(purchase.created_at).toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewProduct(purchase.products.id)}
                            className="flex items-center space-x-2"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Product</span>
                          </Button>
                          
                          {purchase.status === 'completed' && (
                            <Button
                              onClick={() => handleDownload(purchase)}
                              className="flex items-center space-x-2 bg-gradient-accent text-accent-foreground hover:shadow-glow-accent"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Purchases;