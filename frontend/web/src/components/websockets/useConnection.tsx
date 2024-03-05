import { useEffect, useRef, useState } from 'react';

import handleServerMessage from './actions';
import {
  ClientToServerMessageFormat,
  ServerActionType,
} from '@awesome/shared/types/ws';
import { useAuthState } from '@awesome/shared/atoms/auth';

type WebSocketMessage = Omit<ClientToServerMessageFormat, 'token'>;

const useWebSocketConnection = () => {
  const [auth, setAuth] = useAuthState();
  const ref = useRef<HTMLDivElement>(null);
  const [retryQueue, setRetryQueue] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const newWebsocketMessage = (msg: WebSocketMessage) => {
    const message = JSON.stringify({
      ...msg,
      token: `Bearer ${localStorage.getItem('awesome:token')}`,
    });

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setRetryQueue((prev) => [...prev, message]);
      refreshSocket();
      return;
    }

    if (retryQueue.length > 0) {
      setRetryQueue((prev) => {
        prev.forEach((retryMessage) => socket.send(retryMessage));
        return [];
      });
      setRetryQueue([]);
    }
    socket.send(message);
  };

  const onMessageFromServer = (messageType: ServerActionType) => {};

  const refreshSocket = () => {
    const _socket = new WebSocket('ws://localhost:4000/ws/hello');
    _socket.onopen = () => setSocket(_socket);
    _socket.onmessage = (event) =>
      handleServerMessage(event.data, auth, setAuth);
    return _socket;
  };

  const unRegisterSocket = () => {
    if (!socket) return;
    socket.close();
    setSocket(null);
  };

  useEffect(() => {
    if (!auth?.user.id) return;
    if (!socket) refreshSocket();
    return () => unRegisterSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user.id]);

  return { _ref: ref, socket, newWebsocketMessage };
};

export default useWebSocketConnection;
