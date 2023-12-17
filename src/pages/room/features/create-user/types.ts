import { MutableRefObject } from 'react';
import { Socket } from 'socket.io-client';

export type CreateUserProps = {
  onUserCreated: ({}: { userId: string; userName: string }) => void;
};
