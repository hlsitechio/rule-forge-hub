import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import type { Product, PaginationParams, PaginatedResponse } from '@/types/api';

const PRODUCTS_KEY = ['products'];

export const useProducts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, params],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<Product>>('/products', { params });
      return response.data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: [...PRODUCTS_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const response = await apiClient.post<Product>('/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Product> }) => {
      const response = await apiClient.put<Product>(`/products/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...PRODUCTS_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY });
    },
  });
};