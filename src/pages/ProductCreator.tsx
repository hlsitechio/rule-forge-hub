import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductBuilder } from '@/components/product/ProductBuilder';
import { AuthProvider } from '@/components/auth/AuthProvider';

const ProductCreator = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ProductBuilder />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default ProductCreator;
