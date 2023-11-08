import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';

type Args = {
  roomId: string;
};

export const userAuth = ({ roomId }: Args) => {
  const [users, setUsers] = useState<
    Record<string, { userName: string; online: boolean }>
  >({});

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || '';

  if (!userId) console.error('нет userId');
  if (!userName) console.error('нет userName');

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.BACK_URL || '', {
      query: { roomId },
    });
    socketRef.current.emit('user:add', { userId, userName });
    socketRef.current.on('users', users => setUsers(users));

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.emit('user:leave', { userId });
    };
  }, [roomId, userId, userName]);

  return { userId, userName, users, socketRef };
};
