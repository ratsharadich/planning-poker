import { createStore, createEvent, createEffect } from 'effector';
import { ACTIONS } from 'shared/api';
import { Socket } from 'socket.io-client';

// stores
export const $socket = createStore<Socket | null>(null);

// events
export const socketSet = createEvent<Socket>();

// handlers
$socket.on(socketSet, (_, socket) => socket);

// effects
export const addUserToRoomFx = createEffect<
  ({}: { socket: Socket; userId: string }) => void
>(({ socket, userId }) => {
  socket.emit(ACTIONS.ADD_USER_TO_ROOM, {
    userId,
  });
});

// wathcers
$socket.watch(socket => console.log('socket', socket));
addUserToRoomFx.watch(({ socket, userId }) =>
  console.log({ socketFX: socket, userIdFx: userId }),
);
