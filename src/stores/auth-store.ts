import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient, { tokenManager } from '@/lib/api/client';
import type { User, LoginRequest, RegisterRequest } from '@/types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          const response = await apiClient.post('/auth/login', { email, password });
          const { user, accessToken, refreshToken } = response.data;
          
          tokenManager.setTokens({ accessToken, refreshToken });
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          const response = await apiClient.post('/auth/register', data);
          const { user, accessToken, refreshToken } = response.data;
          
          tokenManager.setTokens({ accessToken, refreshToken });
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/auth/logout');
        } finally {
          tokenManager.clearTokens();
          set({ user: null, isAuthenticated: false });
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const token = tokenManager.getAccessToken();
          
          if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }
          
          const response = await apiClient.get('/auth/me');
          set({ user: response.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          tokenManager.clearTokens();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);