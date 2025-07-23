import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const usePurchase = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const purchaseProduct = async (productId: string) => {
    if (!user) {
      throw new Error('User must be authenticated to make a purchase');
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productId },
      });

      if (error) throw error;

      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Error",
        description: error.message || "Failed to initiate purchase",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    purchaseProduct,
    loading,
  };
};