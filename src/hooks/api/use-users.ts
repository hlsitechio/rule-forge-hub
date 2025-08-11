import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/client';
import type { User, PaginationParams, PaginatedResponse } from '@/types/api';

const USERS_KEY = ['users'];

export const useUsers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...USERS_KEY, params],
    queryFn: async () => {
      const response = await apiClient.get<PaginatedResponse<User>>('/users', { params });
      return response.data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: [...USERS_KEY, id],
    queryFn: async () => {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<User> }) => {
      const response = await apiClient.put<User>(`/users/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [...USERS_KEY, variables.id] });
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};