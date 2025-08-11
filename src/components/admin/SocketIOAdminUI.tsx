import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor } from "lucide-react";

export const SocketIOAdminUI = () => {
  const adminUIUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/socketio-server/admin`;
  
  const openAdminUI = () => {
    window.open(adminUIUrl, '_blank', 'width=1200,height=800');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Socket.IO Admin UI
        </CardTitle>
        <CardDescription>
          Monitor real-time connections, rooms, and events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Socket.IO Admin UI provides a web interface to monitor your real-time connections,
            inspect active rooms, and debug events in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={openAdminUI} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open Admin UI
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.open('https://socket.io/docs/v4/admin-ui/', '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Documentation
            </Button>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Admin UI URL:</strong> {adminUIUrl}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};