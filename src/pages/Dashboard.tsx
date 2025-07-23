import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Copy, Calendar, DollarSign, Package } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

const DashboardContent = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchPurchases = async () => {
      try {
        const { data, error } = await supabase
          .from('purchases')
          .select(`
            id,
            product_id,
            amount,
            status,
            created_at,
            products (
              id,
              title,
              description,
              category,
              tags,
              preview_content,
              implementation_guide
            )
          `)
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPurchases(data || []);
      } catch (error: any) {
        console.error('Error fetching purchases:', error);
        toast({
          title: "Error",
          description: "Failed to load your purchases.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user, navigate, toast]);

  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${title} rules copied to clipboard.`,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-silver bg-clip-text text-transparent">
              My Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your purchased AI rules and download them anytime.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Purchases</p>
                    <p className="text-2xl font-bold">{purchases.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold">
                      ${purchases.reduce((sum, p) => sum + (p.amount / 100), 0).toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Latest Purchase</p>
                    <p className="text-2xl font-bold">
                      {purchases.length > 0 
                        ? new Date(purchases[0].created_at).toLocaleDateString()
                        : 'None'
                      }
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchases List */}
          {purchases.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start building your AI rules collection by browsing our marketplace.
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300"
                >
                  Browse Products
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Your Purchases</h2>
              
              <div className="grid gap-6">
                {purchases.map((purchase) => (
                  <Card key={purchase.id} className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{getCategoryIcon(purchase.products.category)}</span>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {purchase.products.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{purchase.products.title}</CardTitle>
                          <p className="text-muted-foreground">{purchase.products.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold bg-gradient-silver bg-clip-text text-transparent">
                            ${(purchase.amount / 100).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {purchase.products.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-border">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Implementation Guide */}
                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Implementation Guide</h4>
                        <p className="text-sm text-muted-foreground">
                          {purchase.products.implementation_guide}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                        <Button
                          onClick={() => copyToClipboard(purchase.products.preview_content, purchase.products.title)}
                          className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Rules
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => copyToClipboard(purchase.products.implementation_guide, 'Implementation guide')}
                          className="border-border"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Copy Guide
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
};

export default Dashboard;