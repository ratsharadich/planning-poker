import { io } from 'socket.io-client';

const serverUrl = 'http://192.168.0.16:3000';
export const socket = io(serverUrl, {
  autoConnect: false,
});
