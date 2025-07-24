import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { AnimatedHero } from '@/components/layout/AnimatedHero';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useProducts, useFeaturedProducts } from '@/hooks/useProducts';
import { usePurchase } from '@/hooks/usePurchase';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductsSection = () => {
  const { data: products, isLoading } = useProducts();
  const { data: featuredProducts } = useFeaturedProducts();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const { purchaseProduct } = usePurchase();

  const handlePurchase = async (productId: string) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    
    try {
      await purchaseProduct(productId);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return (
      <motion.div 
        className="flex items-center justify-center py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-accent" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="py-24">
        <div className="container mx-auto px-4">
          <ProductGallery
            featuredProducts={featuredProducts || []}
            allProducts={products || []}
            onPurchase={handlePurchase}
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <AnimatedHero />
        <ProductsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </AuthProvider>
  );
};

export default Index;
