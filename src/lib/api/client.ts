import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiError } from '@/types/api';

// Types
interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with cookies
});

// Token management
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
  getAccessToken: () => Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY) || localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (tokens: AuthTokens) => {
    Cookies.set(TOKEN_KEY, tokens.accessToken, { expires: 7 });
    if (tokens.refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken, { expires: 30 });
    }
  },
  clearTokens: () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (import.meta.env.VITE_ENABLE_API_LOGS === 'true' && import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.VITE_ENABLE_API_LOGS === 'true' && import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 - try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refreshToken,
          });
          
          tokenManager.setTokens(response.data);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        tokenManager.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (import.meta.env.VITE_ENABLE_API_LOGS === 'true' && import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.config?.url}`, error.response?.data || error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;