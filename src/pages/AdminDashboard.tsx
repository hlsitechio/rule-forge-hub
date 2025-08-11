import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Activity, Database, Users, Wifi, AlertTriangle } from 'lucide-react';
import { StatusMonitor } from '@/components/admin/StatusMonitor';
import { RealTimeActivity } from '@/components/admin/RealTimeActivity';
import { BackendIntegration } from '@/components/admin/BackendIntegration';
import { SocketIOAdminUI } from '@/components/admin/SocketIOAdminUI';

const ADMIN_EMAIL = 'hlarosesurprenant@gmail.com';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user is authenticated and is the admin
  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your backend systems</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-medium">{user.email}</span>
        </div>
      </div>

      {/* Backend Integration */}
      <BackendIntegration />

      {/* Status Monitor */}
      <StatusMonitor />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Backend monitoring will connect to your API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Connect to your backend API at:</p>
              <code className="text-sm">GET /admin/health</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Analytics
            </CardTitle>
            <CardDescription>Track user activity and sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Connect to your backend API at:</p>
              <code className="text-sm">GET /admin/users/activity</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Real-time Monitoring
            </CardTitle>
            <CardDescription>WebSocket connections and live data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Connect to your backend API at:</p>
              <code className="text-sm">GET /admin/websocket/stats</code>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Activity */}
      <RealTimeActivity />

      {/* Socket.IO Admin UI */}
      <SocketIOAdminUI />

      <Card>
        <CardHeader>
          <CardTitle>Admin Access Confirmed</CardTitle>
          <CardDescription>
            You have admin access to monitor your backend systems. 
            Connect your backend API to the endpoints shown above to see live data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Required Backend Endpoints:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <code>GET /admin/health</code> - System health status</li>
                <li>• <code>GET /admin/logs</code> - API request logs</li>
                <li>• <code>GET /admin/database/stats</code> - Database performance</li>
                <li>• <code>GET /admin/users/activity</code> - User activity tracking</li>
                <li>• <code>GET /admin/websocket/stats</code> - Real-time connections</li>
                <li>• <code>GET /admin/errors</code> - Error tracking and analysis</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ Admin authentication configured for: <strong>{user.email}</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}