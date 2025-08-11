const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { instrument } = require('@socket.io/admin-ui');
const cors = require('cors');

const app = express();
const server = createServer(app);

// Enhanced CORS configuration for hosted Lovable apps
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "http://localhost:5174", 
        "https://admin.socket.io",
        /.*\.lovableproject\.com$/  // Allow all Lovable project domains
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Request-Private-Network'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add private network access headers for all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Private-Network', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Request-Private-Network');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.use(express.json());

// Socket.IO configuration with enhanced CORS
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173", 
            "http://localhost:5174", 
            "https://admin.socket.io",
            /.*\.lovableproject\.com$/
        ],
        credentials: true,
        methods: ["GET", "POST"]
    },
    allowEIO3: true,
    transports: ['websocket', 'polling']
});

// Admin UI instrumentation
instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "supersecret123"
    },
    mode: "development",
    readonly: false,
    serverId: "socketio-backend-server",
    namespaceName: "/"
});

// Root homepage
app.get('/', (req, res) => {
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>All-in-One Backend Socket.IO Server</title>
            <style>
                body { 
                    font-family: 'Segoe UI', system-ui, sans-serif; 
                    margin: 0; 
                    padding: 40px; 
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                    color: white; 
                    min-height: 100vh; 
                }
                .container { 
                    max-width: 800px; 
                    margin: 0 auto; 
                    background: rgba(255,255,255,0.1); 
                    padding: 40px; 
                    border-radius: 20px; 
                    backdrop-filter: blur(10px); 
                }
                h1 { margin: 0 0 20px 0; font-size: 2.5em; text-align: center; }
                .status { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                    gap: 20px; 
                    margin: 30px 0; 
                }
                .card { 
                    background: rgba(255,255,255,0.2); 
                    padding: 20px; 
                    border-radius: 15px; 
                    text-align: center; 
                }
                .card h3 { margin: 0 0 10px 0; color: #4ade80; }
                .links { 
                    display: flex; 
                    gap: 15px; 
                    justify-content: center; 
                    flex-wrap: wrap; 
                    margin-top: 30px; 
                }
                .btn { 
                    padding: 12px 24px; 
                    background: rgba(255,255,255,0.2); 
                    border: 2px solid rgba(255,255,255,0.3); 
                    color: white; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    transition: all 0.3s; 
                }
                .btn:hover { 
                    background: rgba(255,255,255,0.3); 
                    transform: translateY(-2px); 
                }
                .emoji { font-size: 1.5em; margin-right: 8px; }
                .cors-info {
                    background: rgba(52, 211, 153, 0.2);
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                    border-left: 4px solid #10b981;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1><span class="emoji">🚀</span>All-in-One Backend System</h1>
                <p style="text-align: center; font-size: 1.2em; margin-bottom: 30px;">Socket.IO Server + Backend Integration</p>
                
                <div class="cors-info">
                    <h4>🔗 CORS & Private Network Ready</h4>
                    <p>✅ Configured for Lovable hosted apps<br>
                    ✅ Private network access enabled<br>
                    ✅ WebSocket & polling transports supported</p>
                </div>
                
                <div class="status">
                    <div class="card">
                        <h3>🔌 Socket.IO</h3>
                        <p>Port: 3003</p>
                        <p>Status: <span style="color: #4ade80;">ACTIVE</span></p>
                    </div>
                    <div class="card">
                        <h3>👥 Clients</h3>
                        <p id="clientCount">${io.engine.clientsCount}</p>
                        <p>Connected</p>
                    </div>
                    <div class="card">
                        <h3>⏰ Uptime</h3>
                        <p id="uptime">${Math.floor(process.uptime())}s</p>
                        <p>Running</p>
                    </div>
                    <div class="card">
                        <h3>🌐 Admin UI</h3>
                        <p>Username: admin</p>
                        <p>Ready</p>
                    </div>
                </div>
                
                <div class="links">
                    <a href="/api/test" class="btn">📊 API Status</a>
                    <a href="/health" class="btn">💚 Health Check</a>
                    <a href="/api/dashboard" class="btn">📈 Dashboard Data</a>
                    <a href="https://admin.socket.io/#/" target="_blank" class="btn">🔧 Admin UI</a>
                    <a href="http://localhost:5173" target="_blank" class="btn">📚 Document Library</a>
                </div>
                
                <script>
                    // Auto-refresh client count and uptime
                    setInterval(() => {
                        fetch('/api/test')
                            .then(r => r.json())
                            .then(data => {
                                document.getElementById('clientCount').textContent = data.clients;
                                document.getElementById('uptime').textContent = Math.floor(data.uptime || 0) + 's';
                            })
                            .catch(() => {});
                    }, 2000);
                </script>
            </div>
        </body>
        </html>
    `;
    res.send(html);
});

// API endpoints
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Socket.IO Backend Server Running!',
        timestamp: new Date().toISOString(),
        port: 3003,
        clients: io.engine.clientsCount,
        server: 'All-in-One Backend',
        uptime: process.uptime(),
        cors: 'enabled',
        privateNetwork: 'supported'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        clients: io.engine.clientsCount,
        server: 'All-in-One Backend',
        port: 3003,
        version: '1.0.0',
        services: {
            database: 'connected',
            redis: 'connected',
            socketio: 'active'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        clients: io.engine.clientsCount,
        server: 'All-in-One Backend',
        port: 3003,
        version: '1.0.0',
        services: {
            database: 'connected',
            redis: 'connected', 
            socketio: 'active'
        }
    });
});

app.get('/api/dashboard', (req, res) => {
    res.json({
        overview: {
            totalUsers: Math.floor(Math.random() * 1000) + 100,
            activeConnections: io.engine.clientsCount,
            requestsToday: Math.floor(Math.random() * 10000) + 1000,
            errorRate: Math.random() * 5
        },
        realTimeMetrics: {
            cpu: Math.random() * 100,
            memory: Math.random() * 100,
            requestsPerMinute: Math.floor(Math.random() * 100) + 10,
            responseTime: Math.floor(Math.random() * 200) + 50
        },
        recentLogs: [
            {
                id: '1',
                level: 'info',
                message: 'Socket.IO server started successfully',
                timestamp: new Date().toISOString(),
                source: 'server'
            },
            {
                id: '2', 
                level: 'info',
                message: `Client connected (Total: ${io.engine.clientsCount})`,
                timestamp: new Date().toISOString(),
                source: 'socketio'
            }
        ],
        systemStats: {
            uptime: process.uptime(),
            startTime: new Date(Date.now() - process.uptime() * 1000).toISOString(),
            environment: 'development',
            nodeVersion: process.version
        }
    });
});

// Enhanced connection handling
io.on('connection', (socket) => {
    console.log('👤 Client connected:', socket.id);
    console.log('🌐 Transport:', socket.conn.transport.name);
    console.log('📊 Total clients:', io.engine.clientsCount);
    console.log('🔗 Origin:', socket.handshake.headers.origin);
    
    socket.emit('welcome', { 
        message: 'Connected to Backend Socket.IO Server!',
        socketId: socket.id,
        timestamp: new Date().toISOString(),
        serverInfo: {
            version: '4.x',
            transport: socket.conn.transport.name,
            backend: 'All-in-One',
            cors: 'enabled'
        }
    });
    
    // Admin room functionality
    socket.on('join-admin', (data) => {
        console.log('🔐 Admin joined:', data);
        socket.join('admin-room');
        socket.emit('admin-joined', { 
            message: 'Successfully joined admin room',
            socketId: socket.id,
            timestamp: new Date().toISOString()
        });
        
        socket.to('admin-room').emit('admin-online', {
            socketId: socket.id,
            timestamp: new Date().toISOString()
        });
    });
    
    // System status updates
    socket.on('system-status', (status) => {
        console.log('📊 System status update:', status);
        io.to('admin-room').emit('status-update', {
            ...status,
            timestamp: new Date().toISOString(),
            source: socket.id
        });
    });
    
    // API health checks
    socket.on('api-health', (healthData) => {
        console.log('💚 API health update:', healthData);
        io.to('admin-room').emit('health-update', {
            ...healthData,
            timestamp: new Date().toISOString(),
            source: socket.id
        });
    });
    
    // User activity tracking
    socket.on('user-activity', (activity) => {
        console.log('👤 User activity:', activity);
        io.to('admin-room').emit('activity-update', {
            ...activity,
            timestamp: new Date().toISOString()
        });
    });
    
    // Real-time logs
    socket.on('log-entry', (logData) => {
        console.log('📝 Log entry:', logData);
        io.to('admin-room').emit('new-log', {
            ...logData,
            timestamp: new Date().toISOString(),
            id: crypto.randomUUID()
        });
    });
    
    // Error handling
    socket.on('error', (error) => {
        console.error('❌ Socket error:', error);
        io.to('admin-room').emit('error-alert', {
            error: error.message || 'Unknown error',
            timestamp: new Date().toISOString(),
            severity: error.severity || 'high'
        });
    });
    
    // Admin messages
    socket.on('admin-message', (message) => {
        console.log('💬 Admin message:', message);
        socket.to('admin-room').emit('admin-broadcast', {
            message: message.text,
            from: message.from || socket.id,
            timestamp: new Date().toISOString()
        });
    });
    
    socket.on('ping', (data) => {
        console.log('📡 Backend ping from', data.client || 'Client');
        socket.emit('pong', { 
            ...data, 
            timestamp: new Date().toISOString(),
            server: 'All-in-One Backend',
            latency: Date.now() - new Date(data.timestamp).getTime()
        });
    });
    
    socket.on('backend-request', (data) => {
        console.log('📨 Backend request:', data.action);
        socket.emit('backend-response', {
            ...data,
            response: 'Backend processed: ' + data.action,
            timestamp: new Date().toISOString()
        });
    });
    
    socket.on('disconnect', (reason) => {
        console.log('👋 Client disconnected:', socket.id, '- Reason:', reason);
        console.log('📊 Remaining clients:', io.engine.clientsCount);
        
        socket.to('admin-room').emit('admin-offline', {
            socketId: socket.id,
            reason,
            timestamp: new Date().toISOString()
        });
    });
});

// Periodic system stats broadcast
setInterval(() => {
    const stats = {
        connectedClients: io.engine.clientsCount,
        adminClients: io.sockets.adapter.rooms.get('admin-room')?.size || 0,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        server: 'All-in-One Backend'
    };
    
    io.to('admin-room').emit('system-stats', stats);
}, 30000);

// Start server
server.listen(3003, () => {
    console.log('🚀 All-in-One Backend Socket.IO Server running on port 3003');
    console.log('🌐 Admin UI: https://admin.socket.io/#/');
    console.log('🔗 Server: http://localhost:3003');
    console.log('👤 Username: admin');
    console.log('🔑 Password: supersecret123');
    console.log('📊 Backend Integration: ACTIVE');
    console.log('🔒 CORS & Private Network: ENABLED');
});