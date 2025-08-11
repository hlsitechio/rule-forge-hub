import { io, Socket } from 'socket.io-client';

export class SocketIOClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(private url: string) {}

  connect(): Promise<Socket> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Connecting to Socket.IO server:', this.url);
        
        this.socket = io(this.url, {
          transports: ['websocket', 'polling'],
          upgrade: true,
          rememberUpgrade: true,
          timeout: 10000,
          forceNew: true,
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
        });

        this.socket.on('connect', () => {
          console.log('Connected to Socket.IO server:', this.socket?.id);
          this.reconnectAttempts = 0;
          resolve(this.socket!);
        });

        this.socket.on('connect_error', (error) => {
          console.error('Socket.IO connection error:', error);
          this.reconnectAttempts++;
          
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            reject(new Error(`Failed to connect after ${this.maxReconnectAttempts} attempts`));
          }
        });

        this.socket.on('disconnect', (reason) => {
          console.log('Disconnected from Socket.IO server:', reason);
        });

        this.socket.on('reconnect', (attemptNumber) => {
          console.log('Reconnected to Socket.IO server after', attemptNumber, 'attempts');
          this.reconnectAttempts = 0;
        });

        this.socket.on('reconnect_error', (error) => {
          console.error('Socket.IO reconnection error:', error);
        });

        this.socket.on('reconnect_failed', () => {
          console.error('Socket.IO reconnection failed');
          reject(new Error('Failed to reconnect to Socket.IO server'));
        });

      } catch (error) {
        console.error('Error creating Socket.IO connection:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      console.log('Disconnecting from Socket.IO server');
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      console.log('Emitting event:', event, data);
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected, cannot emit event:', event);
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  joinAdminRoom(adminData: { email: string; userId: string }) {
    this.emit('join-admin', adminData);
  }

  sendSystemStatus(status: {
    service: string;
    status: 'operational' | 'degraded' | 'down';
    message?: string;
  }) {
    this.emit('system-status', status);
  }

  sendAPIHealth(health: {
    endpoint: string;
    status: number;
    responseTime: number;
    message?: string;
  }) {
    this.emit('api-health', health);
  }

  sendUserActivity(activity: {
    userId: string;
    action: string;
    page?: string;
    metadata?: any;
  }) {
    this.emit('user-activity', activity);
  }

  sendLogEntry(log: {
    level: 'info' | 'warn' | 'error';
    message: string;
    source?: string;
    metadata?: any;
  }) {
    this.emit('log-entry', log);
  }

  sendError(error: {
    message: string;
    stack?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    source?: string;
  }) {
    this.emit('error', error);
  }

  sendAdminMessage(message: {
    text: string;
    from: string;
    type?: string;
  }) {
    this.emit('admin-message', message);
  }

  get isConnected(): boolean {
    return this.socket?.connected || false;
  }

  get socketId(): string | undefined {
    return this.socket?.id;
  }
}

// Singleton instance
let socketClient: SocketIOClient | null = null;

export const getSocketClient = (): SocketIOClient => {
  if (!socketClient) {
    // Connect to your local backend server (same as admin UI)
    const socketUrl = 'http://localhost:3001';
    socketClient = new SocketIOClient(socketUrl);
  }
  return socketClient;
};

export const useSocket = () => {
  return getSocketClient();
};