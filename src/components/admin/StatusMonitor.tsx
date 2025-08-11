import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  components: number;
  description?: string;
  incidents?: number;
  lastCheck: Date;
  history: Array<{
    timestamp: Date;
    status: 'up' | 'down' | 'degraded';
  }>;
}

interface StatusMonitorProps {
  className?: string;
}

export const StatusMonitor = ({ className }: StatusMonitorProps) => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Generate mock historical data for the last 90 days
  const generateHistoricalData = (baseUptime: number) => {
    const history = [];
    const now = new Date();
    
    for (let i = 89; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Simulate status based on uptime probability
      const random = Math.random() * 100;
      let status: 'up' | 'down' | 'degraded' = 'up';
      
      if (random > baseUptime) {
        status = random > baseUptime + 5 ? 'down' : 'degraded';
      }
      
      history.push({
        timestamp: date,
        status
      });
    }
    
    return history;
  };

  const checkBackendHealth = async () => {
    setLoading(true);
    
    try {
      // Simulate backend health checks
      const mockServices: ServiceStatus[] = [
        {
          name: 'API Gateway',
          status: 'operational',
          uptime: 99.98,
          components: 15,
          description: 'All API endpoints responding normally',
          incidents: 0,
          lastCheck: new Date(),
          history: generateHistoricalData(99.98)
        },
        {
          name: 'Database',
          status: 'operational',
          uptime: 99.95,
          components: 8,
          description: 'Database connections stable',
          incidents: 0,
          lastCheck: new Date(),
          history: generateHistoricalData(99.95)
        },
        {
          name: 'Authentication Service',
          status: 'operational',
          uptime: 99.99,
          components: 5,
          description: 'Auth endpoints operational',
          incidents: 0,
          lastCheck: new Date(),
          history: generateHistoricalData(99.99)
        },
        {
          name: 'File Storage',
          status: 'degraded',
          uptime: 99.12,
          components: 3,
          description: 'Experiencing minor delays',
          incidents: 2,
          lastCheck: new Date(),
          history: generateHistoricalData(99.12)
        },
        {
          name: 'Email Service',
          status: 'operational',
          uptime: 99.87,
          components: 4,
          description: 'Email delivery working normally',
          incidents: 0,
          lastCheck: new Date(),
          history: generateHistoricalData(99.87)
        }
      ];

      setServices(mockServices);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to check backend health:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Degraded Performance</Badge>;
      case 'down':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Major Outage</Badge>;
    }
  };

  const renderHistoryBar = (history: ServiceStatus['history']) => {
    return (
      <div className="flex gap-[1px] mt-2">
        {history.map((entry, index) => {
          let color = 'bg-green-500'; // up
          if (entry.status === 'degraded') color = 'bg-yellow-500';
          if (entry.status === 'down') color = 'bg-red-500';
          
          return (
            <motion.div
              key={index}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: index * 0.01, duration: 0.3 }}
              className={`w-2 h-8 ${color} rounded-sm`}
              title={`${entry.timestamp.toLocaleDateString()}: ${entry.status}`}
            />
          );
        })}
      </div>
    );
  };

  const getOverallStatus = () => {
    if (services.some(s => s.status === 'down')) return 'Major Issues';
    if (services.some(s => s.status === 'degraded')) return 'Minor Issues';
    return 'All Systems Operational';
  };

  const getOverallStatusColor = () => {
    if (services.some(s => s.status === 'down')) return 'text-red-600';
    if (services.some(s => s.status === 'degraded')) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            System Status Monitor
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-lg font-semibold ${getOverallStatusColor()}`}>
            {getOverallStatus()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-border rounded-lg p-4 bg-card/50"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(service.status)}
                <div>
                  <h3 className="font-medium text-sm">{service.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {service.components} components
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {service.uptime.toFixed(2)}% uptime
                </div>
                {getStatusBadge(service.status)}
              </div>
            </div>
            
            {service.description && (
              <p className="text-xs text-muted-foreground mb-2">
                {service.description}
              </p>
            )}
            
            <div className="mb-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
              {renderHistoryBar(service.history)}
            </div>
            
            {service.incidents > 0 && (
              <div className="text-xs text-muted-foreground">
                {service.incidents} incident{service.incidents > 1 ? 's' : ''} in the last 30 days
              </div>
            )}
          </motion.div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <span>Operational</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
              <span>Degraded</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span>Down</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};