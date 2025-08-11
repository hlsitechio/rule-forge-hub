// Backend API client for local server on port 3001
const API_BASE_URL = 'http://localhost:3001';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  services: {
    database: 'connected' | 'disconnected';
    redis: 'connected' | 'disconnected';
    socketio: 'active' | 'inactive';
  };
}

export interface DashboardData {
  overview: {
    totalUsers: number;
    activeConnections: number;
    requestsToday: number;
    errorRate: number;
  };
  realTimeMetrics: {
    cpu: number;
    memory: number;
    requestsPerMinute: number;
    responseTime: number;
  };
  recentLogs: Array<{
    id: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    timestamp: string;
    source?: string;
  }>;
  systemStats: {
    uptime: number;
    startTime: string;
    environment: string;
    nodeVersion: string;
  };
}

export interface AdminEndpoints {
  users: string;
  logs: string;
  metrics: string;
  config: string;
}

class BackendAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async getHealth(): Promise<HealthStatus> {
    try {
      console.log('Fetching health status from:', `${this.baseUrl}/api/health`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/health`);
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Health status received:', data);
      return data;
    } catch (error) {
      console.error('Health check error:', error);
      // Return unhealthy status if the request fails
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: 0,
        version: 'unknown',
        services: {
          database: 'disconnected',
          redis: 'disconnected',
          socketio: 'inactive',
        },
      };
    }
  }

  async getDashboardData(): Promise<DashboardData> {
    try {
      console.log('Fetching dashboard data from:', `${this.baseUrl}/api/dashboard`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/api/dashboard`);
      
      if (!response.ok) {
        throw new Error(`Dashboard fetch failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Dashboard data received:', data);
      return data;
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      // Return default data if the request fails
      return {
        overview: {
          totalUsers: 0,
          activeConnections: 0,
          requestsToday: 0,
          errorRate: 0,
        },
        realTimeMetrics: {
          cpu: 0,
          memory: 0,
          requestsPerMinute: 0,
          responseTime: 0,
        },
        recentLogs: [],
        systemStats: {
          uptime: 0,
          startTime: new Date().toISOString(),
          environment: 'unknown',
          nodeVersion: 'unknown',
        },
      };
    }
  }

  async getAdminLogs(limit = 100): Promise<any[]> {
    try {
      console.log('Fetching admin logs from:', `${this.baseUrl}/admin/logs`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/admin/logs?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Admin logs fetch failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Admin logs received:', data);
      return data;
    } catch (error) {
      console.error('Admin logs fetch error:', error);
      return [];
    }
  }

  async getAdminUsers(): Promise<any[]> {
    try {
      console.log('Fetching admin users from:', `${this.baseUrl}/admin/users`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/admin/users`);
      
      if (!response.ok) {
        throw new Error(`Admin users fetch failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Admin users received:', data);
      return data;
    } catch (error) {
      console.error('Admin users fetch error:', error);
      return [];
    }
  }

  async getAdminMetrics(): Promise<any> {
    try {
      console.log('Fetching admin metrics from:', `${this.baseUrl}/admin/metrics`);
      const response = await this.fetchWithTimeout(`${this.baseUrl}/admin/metrics`);
      
      if (!response.ok) {
        throw new Error(`Admin metrics fetch failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Admin metrics received:', data);
      return data;
    } catch (error) {
      console.error('Admin metrics fetch error:', error);
      return {};
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const health = await this.getHealth();
      return health.status === 'healthy';
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  getAdminEndpoints(): AdminEndpoints {
    return {
      users: `${this.baseUrl}/admin/users`,
      logs: `${this.baseUrl}/admin/logs`,
      metrics: `${this.baseUrl}/admin/metrics`,
      config: `${this.baseUrl}/admin/config`,
    };
  }
}

// Singleton instance
export const backendAPI = new BackendAPI();

// Helper hook for using the backend API
export const useBackendAPI = () => {
  return backendAPI;
};