import { useEffect, useCallback } from 'react';
import { wsClient } from '@/lib/websocket/client';

export const useWebSocket = () => {
  useEffect(() => {
    wsClient.connect();
    
    return () => {
      wsClient.disconnect();
    };
  }, []);

  const subscribe = useCallback((event: string, callback: Function) => {
    wsClient.on(event, callback);
    
    return () => {
      wsClient.off(event, callback);
    };
  }, []);

  const send = useCallback((type: string, data: any) => {
    wsClient.send(type, data);
  }, []);

  return { subscribe, send };
};