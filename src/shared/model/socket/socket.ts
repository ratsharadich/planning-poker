import { createEvent, createStore } from 'effector';
import { Socket } from 'socket.io-client';
import { addUserToRoomFx } from './actions';

// stores
export const $socket = createStore<Socket | null>(null);

// events
export const socketSet = createEvent<Socket>();

// handlers
$socket.on(socketSet, (_, socket) => socket);

// wathcers
$socket.watch(socket => console.log('socket', socket));
addUserToRoomFx.watch(({ socket, userId }) =>
  console.log({ socketFX: socket, userIdFx: userId }),
);
