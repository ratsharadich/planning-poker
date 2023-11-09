import { MutableRefObject, useEffect, useState } from 'react';
import { SocketActions, SocketListeners, UserList } from 'shared';
import { Socket, io } from 'socket.io-client';

type Args = {
  roomId: string;
  socketRef: MutableRefObject<Socket | null>;
};

export const useAuth = ({ socketRef, roomId }: Args) => {
  const [users, setUsers] = useState<UserList>({});

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || '';

  // if (!userId) throw new Error('нет userId');
  // if (!userName) throw new Error('нет userName');

  useEffect(() => {
    if (socketRef) {
      socketRef.current = io(process.env.BACK_URL || '', {
        query: { roomId },
      });

      const socket = socketRef.current;
      const { addUser, leave } = SocketActions;
      const { listenUsers } = SocketListeners;

      if (socket) {
        addUser({ socket, userId, userName });
        listenUsers({ socket, onUpdate: users => setUsers(users) });
        return () => {
          socket.disconnect();
          leave({ socket, userId });
        };
      }
    }
  }, [roomId, userId, userName]);

  return { userId, userName, users, socketRef };
};
