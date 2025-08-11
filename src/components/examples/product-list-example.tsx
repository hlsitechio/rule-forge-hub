import { useState } from 'react';
import { useProducts, useCreateProduct } from '@/hooks/api/use-products';
import { useAuthStore } from '@/stores/auth-store';
import { useWebSocket } from '@/hooks/use-websocket';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const ProductListExample = () => {
  const user = useAuthStore((state) => state.user);
  const { data: productsData, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();
  const { subscribe, send } = useWebSocket();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);

  // WebSocket example usage
  useState(() => {
    const unsubscribeConnected = subscribe('connected', () => {
      setIsConnected(true);
      toast({
        title: 'WebSocket Connected',
        description: 'Real-time features are now active',
      });
    });

    const unsubscribeDisconnected = subscribe('disconnected', () => {
      setIsConnected(false);
    });

    const unsubscribeProductUpdate = subscribe('product_updated', (data: any) => {
      toast({
        title: 'Product Updated',
        description: `Product ${data.name} was updated`,
      });
    });

    return () => {
      unsubscribeConnected();
      unsubscribeDisconnected();
      unsubscribeProductUpdate();
    };
  });

  const handleCreateProduct = async () => {
    try {
      const newProduct = {
        name: `Test Product ${Date.now()}`,
        description: 'A test product created from the frontend',
        price: 99.99,
        category: 'test',
        images: [],
      };

      await createProduct.mutateAsync(newProduct);
      
      // Send WebSocket notification
      send('product_created', { productName: newProduct.name });
      
      toast({
        title: 'Success',
        description: 'Product created successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create product',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error loading products</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'}</h1>
          <p className="text-muted-foreground">
            WebSocket Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </p>
        </div>
        <Button onClick={handleCreateProduct} disabled={createProduct.isPending}>
          {createProduct.isPending ? 'Creating...' : 'Create Test Product'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsData?.items?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">{product.description}</p>
              <p className="font-semibold">${product.price}</p>
              <p className="text-sm text-muted-foreground">Category: {product.category}</p>
            </CardContent>
          </Card>
        )) || (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      {productsData?.pagination && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {productsData.items?.length || 0} of {productsData.pagination.total} products
        </div>
      )}
    </div>
  );
};