import { io } from 'socket.io-client';

const serverUrl = process.env.BACK_URL || '';
export const socket = io(serverUrl, {
  autoConnect: false,
});
