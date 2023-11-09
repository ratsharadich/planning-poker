import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

type Args = {
  roomId: string;
  socketRef: MutableRefObject<Socket | null>;
};

export const useAuth = ({ socketRef, roomId }: Args) => {
  const [users, setUsers] = useState<
    Record<string, { userName: string; online: boolean }>
  >({});

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || '';

  // if (!userId) throw new Error('нет userId');
  // if (!userName) throw new Error('нет userName');

  useEffect(() => {
    if (socketRef) {
      socketRef.current = io(process.env.BACK_URL || '', {
        query: { roomId },
      });
      socketRef.current.emit('user:add', { userId, userName });
      socketRef.current.on('users', users => setUsers(users));

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current.emit('user:leave', { userId });
        }
      };
    }
  }, [roomId, userId, userName]);

  return { userId, userName, users, socketRef };
};
