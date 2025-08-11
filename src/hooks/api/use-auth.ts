import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest, RegisterRequest } from '@/types/api';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate('/dashboard');
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
    },
  });
};