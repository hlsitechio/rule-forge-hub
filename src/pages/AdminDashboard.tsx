import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SystemHealthMonitor } from '@/components/admin/SystemHealthMonitor';
import { ApiLogsMonitor } from '@/components/admin/ApiLogsMonitor';
import { DatabaseMonitor } from '@/components/admin/DatabaseMonitor';
import { UserActivityMonitor } from '@/components/admin/UserActivityMonitor';
import { RealTimeConnections } from '@/components/admin/RealTimeConnections';
import { ErrorTracking } from '@/components/admin/ErrorTracking';
import { Shield, Activity, Database, Users, Wifi, AlertTriangle } from 'lucide-react';

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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="api-logs" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            API Logs
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="realtime" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Real-time
          </TabsTrigger>
          <TabsTrigger value="errors" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Errors
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time system status and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <SystemHealthMonitor />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivityMonitor summary={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api-logs">
          <Card>
            <CardHeader>
              <CardTitle>API Request Logs</CardTitle>
              <CardDescription>Monitor all API requests and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <ApiLogsMonitor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Monitoring</CardTitle>
              <CardDescription>Database performance and query analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <DatabaseMonitor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Track user sessions and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <UserActivityMonitor />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Connections</CardTitle>
              <CardDescription>Monitor WebSocket connections and live users</CardDescription>
            </CardHeader>
            <CardContent>
              <RealTimeConnections />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Error Tracking</CardTitle>
              <CardDescription>Monitor and analyze system errors</CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorTracking />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}