import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Server, 
  Database, 
  Activity, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Cpu,
  MemoryStick,
  Clock,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useBackendAPI, HealthStatus, DashboardData } from '@/lib/backend-api';
import { useToast } from '@/hooks/use-toast';

export const BackendIntegration = () => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const backendAPI = useBackendAPI();
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('🔄 Fetching backend data...');
      
      // Test connection first
      setConnectionStatus('testing');
      const isConnected = await backendAPI.testConnection();
      
      if (!isConnected) {
        setConnectionStatus('disconnected');
        toast({
          title: "Connection Failed",
          description: "Unable to connect to backend server on port 3001",
          variant: "destructive",
        });
        return;
      }

      setConnectionStatus('connected');

      // Fetch health and dashboard data in parallel
      const [health, dashboard] = await Promise.all([
        backendAPI.getHealth(),
        backendAPI.getDashboardData(),
      ]);

      setHealthStatus(health);
      setDashboardData(dashboard);
      setLastUpdated(new Date());

      console.log('✅ Backend data fetched successfully');
      
      if (health.status === 'healthy') {
        toast({
          title: "Backend Connected",
          description: "Successfully connected to your backend server",
        });
      }

    } catch (error) {
      console.error('❌ Error fetching backend data:', error);
      setConnectionStatus('disconnected');
      toast({
        title: "Backend Error",
        description: error instanceof Error ? error.message : "Failed to fetch backend data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'unhealthy':
      case 'disconnected':
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'unhealthy':
      case 'disconnected':
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const endpoints = backendAPI.getAdminEndpoints();

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            Backend Server Status
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(connectionStatus)}>
              {connectionStatus}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-4">
            🚀 Backend Server: <code>http://localhost:3001</code>
            {lastUpdated && (
              <span className="ml-2">
                • Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {healthStatus && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Overall Health */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(healthStatus.status)}
                  <span className="font-medium">Overall Health</span>
                </div>
                <Badge className={getStatusColor(healthStatus.status)}>
                  {healthStatus.status.toUpperCase()}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Uptime: {formatUptime(healthStatus.uptime)}
                </div>
              </div>

              {/* Services */}
              <div className="space-y-2">
                <div className="font-medium">Services</div>
                <div className="space-y-1">
                  {Object.entries(healthStatus.services).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between text-sm">
                      <span className="capitalize">{service}</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(status)}
                        <span className="text-muted-foreground">{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Version Info */}
              <div className="space-y-2">
                <div className="font-medium">System Info</div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Version: {healthStatus.version}</div>
                  <div>Node.js: {dashboardData?.systemStats.nodeVersion || 'unknown'}</div>
                  <div>Environment: {dashboardData?.systemStats.environment || 'unknown'}</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dashboard Metrics */}
      {dashboardData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.overview.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.overview.activeConnections} active connections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Requests Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.overview.requestsToday.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.realTimeMetrics.requestsPerMinute}/min current rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.realTimeMetrics.cpu.toFixed(1)}%</div>
              <Progress value={dashboardData.realTimeMetrics.cpu} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.realTimeMetrics.memory.toFixed(1)}%</div>
              <Progress value={dashboardData.realTimeMetrics.memory} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Available Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Available Endpoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">API Endpoints</h4>
              <div className="space-y-1 text-sm font-mono">
                <div className="text-green-600">GET /api/health</div>
                <div className="text-blue-600">GET /api/dashboard</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Admin Endpoints</h4>
              <div className="space-y-1 text-sm font-mono">
                <div className="text-purple-600">GET /admin/users</div>
                <div className="text-purple-600">GET /admin/logs</div>
                <div className="text-purple-600">GET /admin/metrics</div>
                <div className="text-purple-600">GET /admin/config</div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Socket.IO server ready for real-time connections</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      {dashboardData?.recentLogs && dashboardData.recentLogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dashboardData.recentLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-center gap-3 p-2 rounded border">
                  <Badge 
                    variant={log.level === 'error' ? 'destructive' : log.level === 'warn' ? 'secondary' : 'default'}
                    className="text-xs"
                  >
                    {log.level.toUpperCase()}
                  </Badge>
                  <div className="flex-1 text-sm">{log.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};