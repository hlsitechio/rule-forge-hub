import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SocketIOAdminUI = () => {
  const localAdminUIUrl = 'http://localhost:3001/admin';
  
  const openLocalAdminUI = () => {
    window.open(localAdminUIUrl, '_blank', 'width=1200,height=800');
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
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Socket.IO Admin UI is available on your local backend server. 
              Make sure your local server is running on port 3001.
            </AlertDescription>
          </Alert>
          
          <p className="text-sm text-muted-foreground">
            The Socket.IO Admin UI provides a web interface to monitor your real-time connections,
            inspect active rooms, and debug events in real-time. Since you're running a local backend
            server, the admin UI should be configured there.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={openLocalAdminUI} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Open Local Admin UI
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

          <div className="bg-muted p-3 rounded-lg space-y-2">
            <p className="text-xs text-muted-foreground">
              <strong>Local Admin UI:</strong> {localAdminUIUrl}
            </p>
            <p className="text-xs text-muted-foreground">
              To set up Admin UI on your local server, install: 
              <code className="ml-1">npm install @socket.io/admin-ui</code>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};