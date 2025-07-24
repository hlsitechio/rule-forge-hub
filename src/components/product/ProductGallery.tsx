import { CompleteCollectionSection } from '@/components/sections/CompleteCollectionSection';

interface Product {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category: string;
  tags: string[];
  downloads_count: number;
  is_featured: boolean;
}

interface ProductGalleryProps {
  featuredProducts: Product[];
  allProducts: Product[];
  onPurchase: (productId: string) => void;
  onProductClick: (productId: string) => void;
}

export const ProductGallery = ({ 
  featuredProducts, 
  allProducts, 
  onPurchase, 
  onProductClick 
}: ProductGalleryProps) => {
  const handlePurchase = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onPurchase(productId);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <CompleteCollectionSection 
          products={allProducts} 
          onPurchase={handlePurchase}
          onProductClick={onProductClick}
        />
      </div>
    </div>
  );
};