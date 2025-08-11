import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Users, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MessageSquare,
  Server,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '@/lib/socket';
import { useToast } from '@/hooks/use-toast';

interface ActivityLog {
  id: string;
  type: 'status' | 'health' | 'activity' | 'log' | 'error' | 'message';
  title: string;
  message: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  source?: string;
  metadata?: any;
}

interface SystemStats {
  connectedClients: number;
  adminClients: number;
  uptime: number;
  timestamp: string;
}

export const RealTimeActivity = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [adminUsers, setAdminUsers] = useState<string[]>([]);
  
  const socket = useSocket();
  const { toast } = useToast();

  useEffect(() => {
    const connectToSocket = async () => {
      try {
        setConnectionStatus('connecting');
        await socket.connect();
        
        setConnectionStatus('connected');
        setIsConnected(true);
        
        // Join admin room
        socket.joinAdminRoom({
          email: 'hlarosesurprenant@gmail.com',
          userId: 'admin-user'
        });

        toast({
          title: "Connected",
          description: "Real-time monitoring is now active",
        });

      } catch (error) {
        console.error('Failed to connect to Socket.IO:', error);
        setConnectionStatus('disconnected');
        setIsConnected(false);
        
        toast({
          title: "Connection Failed",
          description: "Unable to connect to real-time monitoring",
          variant: "destructive",
        });
      }
    };

    connectToSocket();

    // Set up event listeners
    socket.on('connected', (data) => {
      console.log('Socket connected:', data);
      addActivity({
        type: 'log',
        title: 'System Connected',
        message: `Connected to monitoring server (${data.socketId})`,
        timestamp: data.timestamp
      });
    });

    socket.on('admin-joined', (data) => {
      console.log('Admin joined:', data);
      addActivity({
        type: 'activity',
        title: 'Admin Access',
        message: data.message,
        timestamp: new Date().toISOString()
      });
    });

    socket.on('admin-online', (data) => {
      console.log('Admin online:', data);
      setAdminUsers(prev => [...prev, data.socketId]);
      addActivity({
        type: 'activity',
        title: 'Admin Connected',
        message: `New admin user connected (${data.socketId})`,
        timestamp: data.timestamp
      });
    });

    socket.on('admin-offline', (data) => {
      console.log('Admin offline:', data);
      setAdminUsers(prev => prev.filter(id => id !== data.socketId));
      addActivity({
        type: 'activity',
        title: 'Admin Disconnected',
        message: `Admin user disconnected (${data.socketId})`,
        timestamp: data.timestamp
      });
    });

    socket.on('status-update', (data) => {
      console.log('Status update:', data);
      addActivity({
        type: 'status',
        title: `${data.service} Status`,
        message: `Status changed to ${data.status}${data.message ? ': ' + data.message : ''}`,
        timestamp: data.timestamp,
        severity: data.status === 'down' ? 'critical' : data.status === 'degraded' ? 'medium' : 'low'
      });
    });

    socket.on('health-update', (data) => {
      console.log('Health update:', data);
      addActivity({
        type: 'health',
        title: `API Health Check`,
        message: `${data.endpoint} - ${data.status} (${data.responseTime}ms)`,
        timestamp: data.timestamp,
        severity: data.status >= 500 ? 'high' : data.status >= 400 ? 'medium' : 'low'
      });
    });

    socket.on('activity-update', (data) => {
      console.log('Activity update:', data);
      addActivity({
        type: 'activity',
        title: 'User Activity',
        message: `${data.action} ${data.page ? `on ${data.page}` : ''}`,
        timestamp: data.timestamp
      });
    });

    socket.on('new-log', (data) => {
      console.log('New log:', data);
      addActivity({
        type: 'log',
        title: `${data.level.toUpperCase()} Log`,
        message: data.message,
        timestamp: data.timestamp,
        source: data.source,
        severity: data.level === 'error' ? 'high' : data.level === 'warn' ? 'medium' : 'low'
      });
    });

    socket.on('error-alert', (data) => {
      console.log('Error alert:', data);
      addActivity({
        type: 'error',
        title: 'System Error',
        message: data.error,
        timestamp: data.timestamp,
        severity: data.severity
      });
    });

    socket.on('admin-broadcast', (data) => {
      console.log('Admin broadcast:', data);
      addActivity({
        type: 'message',
        title: 'Admin Message',
        message: data.message,
        timestamp: data.timestamp,
        source: data.from
      });
    });

    socket.on('system-stats', (data) => {
      console.log('System stats:', data);
      setSystemStats(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const addActivity = (activity: Omit<ActivityLog, 'id'>) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: crypto.randomUUID(),
    };
    
    setActivities(prev => [newActivity, ...prev.slice(0, 99)]); // Keep last 100 activities
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'status': return <Server className="w-4 h-4" />;
      case 'health': return <Database className="w-4 h-4" />;
      case 'activity': return <Users className="w-4 h-4" />;
      case 'log': return <Activity className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const sendTestMessage = () => {
    socket.sendAdminMessage({
      text: 'Test message from admin dashboard',
      from: 'Admin Dashboard',
      type: 'test'
    });
  };

  const simulateActivity = () => {
    socket.sendUserActivity({
      userId: 'test-user',
      action: 'viewed_dashboard',
      page: '/admin',
      metadata: { source: 'manual_test' }
    });
  };

  const simulateError = () => {
    socket.sendError({
      message: 'Simulated test error for monitoring',
      severity: 'medium',
      source: 'admin_dashboard'
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              Real-Time Monitoring
            </div>
            <Badge 
              variant={isConnected ? "default" : "destructive"}
              className={isConnected ? "bg-green-100 text-green-800" : ""}
            >
              {connectionStatus}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemStats?.connectedClients || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemStats?.adminClients || 0}
              </div>
              <div className="text-sm text-muted-foreground">Admin Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {activities.length}
              </div>
              <div className="text-sm text-muted-foreground">Activities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {systemStats ? Math.floor(systemStats.uptime / 60) : 0}m
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
          
          {/* Test Controls */}
          <Separator className="my-4" />
          <div className="flex gap-2 flex-wrap">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={sendTestMessage}
              disabled={!isConnected}
            >
              Send Test Message
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={simulateActivity}
              disabled={!isConnected}
            >
              Simulate Activity
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={simulateError}
              disabled={!isConnected}
            >
              Simulate Error
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <AnimatePresence>
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-3 last:mb-0"
                >
                  <div className={`p-3 rounded-lg border ${getSeverityColor(activity.severity)}`}>
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <p className="text-sm mt-1">{activity.message}</p>
                        {activity.source && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Source: {activity.source}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {activities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No activities yet. Connect to start monitoring.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};