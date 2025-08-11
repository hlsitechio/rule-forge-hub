import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { instrument } from "https://deno.land/x/socket_io@0.2.0/admin-ui.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

console.log("Socket.IO server starting...");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { pathname } = new URL(req.url);
  
  // Handle Socket.IO Admin UI requests
  if (pathname.startsWith('/admin') || pathname === '/socket.io/') {
    try {
      // Create Socket.IO server for admin UI
      const io = new Server({
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        },
        transports: ['websocket', 'polling']
      });

      // Instrument the server with admin UI
      instrument(io, {
        auth: false, // Disable auth for development - you can add auth later
        mode: "development",
        namespaceName: "/admin"
      });

      // Handle admin UI static files
      if (pathname.startsWith('/admin')) {
        // Return the admin UI interface
        const adminHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Socket.IO Admin UI</title>
    <script src="https://cdn.socket.io/4.8.0/socket.io.min.js"></script>
    <script src="https://unpkg.com/@socket.io/admin-ui@0.5.1/ui/dist/bundle.js"></script>
</head>
<body>
    <div id="admin-ui"></div>
    <script>
        // Connect to your Socket.IO server
        const socket = io('wss://oqvjazfvwxafxmgwtzti.supabase.co/functions/v1/socketio-server', {
          transports: ['websocket', 'polling']
        });
        
        // Initialize admin UI
        const adminUI = new AdminUI(socket);
        adminUI.mount('#admin-ui');
    </script>
</body>
</html>`;
        
        return new Response(adminHTML, {
          headers: { ...corsHeaders, 'Content-Type': 'text/html' }
        });
      }
    } catch (error) {
      console.error("Admin UI error:", error);
    }
  }
  
  try {
    // Check if this is a WebSocket upgrade request
    const upgradeHeader = req.headers.get("upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected WebSocket", { 
        status: 400,
        headers: corsHeaders 
      });
    }

    // Create Socket.IO server
    const io = new Server({
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling']
    });

    // Instrument the server with admin UI
    instrument(io, {
      auth: false, // Disable auth for development - you can add auth later
      mode: "development"
    });

    console.log("Socket.IO server created with Admin UI enabled");

    // Handle Socket.IO connections
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
      
      // Join admin room if user is admin
      socket.on("join-admin", (data) => {
        console.log("Admin joined:", data);
        socket.join("admin-room");
        socket.emit("admin-joined", { 
          message: "Successfully joined admin room",
          socketId: socket.id 
        });
        
        // Broadcast to other admins
        socket.to("admin-room").emit("admin-online", {
          socketId: socket.id,
          timestamp: new Date().toISOString()
        });
      });

      // Handle system status updates
      socket.on("system-status", (status) => {
        console.log("System status update:", status);
        // Broadcast to all admin room members
        io.to("admin-room").emit("status-update", {
          ...status,
          timestamp: new Date().toISOString(),
          source: socket.id
        });
      });

      // Handle API health checks
      socket.on("api-health", (healthData) => {
        console.log("API health update:", healthData);
        io.to("admin-room").emit("health-update", {
          ...healthData,
          timestamp: new Date().toISOString(),
          source: socket.id
        });
      });

      // Handle user activity tracking
      socket.on("user-activity", (activity) => {
        console.log("User activity:", activity);
        io.to("admin-room").emit("activity-update", {
          ...activity,
          timestamp: new Date().toISOString()
        });
      });

      // Handle real-time logs
      socket.on("log-entry", (logData) => {
        console.log("Log entry:", logData);
        io.to("admin-room").emit("new-log", {
          ...logData,
          timestamp: new Date().toISOString(),
          id: crypto.randomUUID()
        });
      });

      // Handle errors
      socket.on("error", (error) => {
        console.error("Socket error:", error);
        io.to("admin-room").emit("error-alert", {
          error: error.message || "Unknown error",
          timestamp: new Date().toISOString(),
          severity: error.severity || "high"
        });
      });

      // Handle custom messages
      socket.on("admin-message", (message) => {
        console.log("Admin message:", message);
        // Broadcast to all admin room members except sender
        socket.to("admin-room").emit("admin-broadcast", {
          message: message.text,
          from: message.from || socket.id,
          timestamp: new Date().toISOString()
        });
      });

      // Send periodic system stats
      const statsInterval = setInterval(() => {
        const stats = {
          connectedClients: io.engine.clientsCount,
          adminClients: io.sockets.adapter.rooms.get("admin-room")?.size || 0,
          uptime: process.uptime?.() || 0,
          timestamp: new Date().toISOString()
        };
        
        io.to("admin-room").emit("system-stats", stats);
      }, 30000); // Every 30 seconds

      // Handle disconnection
      socket.on("disconnect", (reason) => {
        console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
        clearInterval(statsInterval);
        
        // Notify other admins
        socket.to("admin-room").emit("admin-offline", {
          socketId: socket.id,
          reason,
          timestamp: new Date().toISOString()
        });
      });

      // Send welcome message
      socket.emit("connected", {
        message: "Connected to Socket.IO server",
        socketId: socket.id,
        timestamp: new Date().toISOString()
      });
    });

    // Upgrade the HTTP connection to WebSocket
    const { response, socket } = Deno.upgradeWebSocket(req);
    
    // Handle the WebSocket connection
    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      // Forward messages to Socket.IO
      try {
        const data = JSON.parse(event.data);
        io.handleMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return response;

  } catch (error) {
    console.error("Error in Socket.IO server:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});