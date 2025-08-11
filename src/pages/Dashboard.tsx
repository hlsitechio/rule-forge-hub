import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Package, Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { PurchaseCard } from '@/components/dashboard/PurchaseCard';

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
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/auth');
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
  }, [user, authLoading, navigate, toast]);

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

  if (authLoading || loading || !user) {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-4"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Your Dashboard</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-6xl font-black mb-3"
                >
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    My AI Rules
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-2xl"
                >
                  Manage your purchased AI rules and access them anytime. 
                  Build better code with professional configurations.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Browse More Rules
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <DashboardStats purchases={purchases} />

          {/* Purchases List */}
          {purchases.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-card/50 to-accent/5 border-accent/20 backdrop-blur-sm">
                <CardContent className="p-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
                    className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-accent/30"
                  >
                    <Package className="w-12 h-12 text-accent-foreground" />
                  </motion.div>
                  
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-2xl font-bold mb-3 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                  >
                    Start Your AI Journey
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto"
                  >
                    You haven't purchased any AI rules yet. Explore our marketplace 
                    to find the perfect configurations for your development workflow.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      onClick={() => navigate('/')}
                      size="lg"
                      className="bg-gradient-accent text-accent-foreground hover:shadow-glow-accent transition-all duration-300 px-8 py-4 text-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Discover AI Rules
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-3xl font-bold"
                >
                  Your Premium Collection
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-sm text-muted-foreground"
                >
                  {purchases.length} {purchases.length === 1 ? 'item' : 'items'} purchased
                </motion.div>
              </div>
              
              <div className="grid gap-8">
                {purchases.map((purchase, index) => (
                  <PurchaseCard
                    key={purchase.id}
                    purchase={purchase}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return <DashboardContent />;
};

export default Dashboard;