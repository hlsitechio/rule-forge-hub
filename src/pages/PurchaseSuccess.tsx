import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, ArrowLeft, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';

const PurchaseSuccessContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [purchase, setPurchase] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPurchase = async () => {
      if (!sessionId) {
        navigate('/');
        return;
      }

      try {
        // Verify payment with our edge function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId },
        });

        if (error) throw error;

        if (data.success && data.product_id) {
          // Get product details
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', data.product_id)
            .single();

          if (productError) throw productError;

          // Get purchase details
          const { data: purchaseData, error: purchaseError } = await supabase
            .from('purchases')
            .select('*')
            .eq('stripe_session_id', sessionId)
            .single();

          if (purchaseError) throw purchaseError;

          setProduct(productData);
          setPurchase(purchaseData);
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error: any) {
        console.error('Error verifying purchase:', error);
        toast({
          title: "Error",
          description: "Failed to verify purchase. Please contact support.",
          variant: "destructive",
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyPurchase();
  }, [sessionId, navigate, toast]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  if (!product || !purchase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Purchase not found.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Purchase Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your AI rules are ready to download.
            </p>
          </div>

          {/* Product Info */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{product.title}</span>
                <span className="text-lg bg-gradient-silver bg-clip-text text-transparent">
                  ${(product.price / 100).toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              {/* Implementation Guide */}
              <div className="bg-secondary p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Implementation Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {product.implementation_guide}
                </p>
              </div>

              {/* Preview Content */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Rules Content</h3>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(product.preview_content)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap bg-background p-3 rounded border">
                  {product.preview_content}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-border"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse More Rules
            </Button>
            <Button
              onClick={() => copyToClipboard(product.preview_content)}
              className="bg-gradient-silver text-primary-foreground hover:shadow-glow-silver transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Copy Rules
            </Button>
          </div>

          {/* Purchase Details */}
          <Card className="mt-8 bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Purchase Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Purchase ID:</strong> {purchase.id}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(purchase.created_at).toLocaleDateString()}
                </div>
                <div>
                  <strong>Status:</strong> {purchase.status}
                </div>
                <div>
                  <strong>Amount:</strong> ${(purchase.amount / 100).toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PurchaseSuccess = () => {
  return (
    <AuthProvider>
      <PurchaseSuccessContent />
    </AuthProvider>
  );
};

export default PurchaseSuccess;