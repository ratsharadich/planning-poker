import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

export type CreateUserProps = {
  socketRef: MutableRefObject<Socket | null>;
  onUserCreated: ({}: { userId: string; userName: string }) => void;
};
