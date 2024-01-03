import { createEffect, createStore } from 'effector';
import { Socket, io } from 'socket.io-client';
import { addUserToRoomFx } from './actions';

// stores
export const $socket = createStore<Socket | null>(null);

// effects
export const setSocketFx = createEffect((roomId: string) => {
  return io(process.env.BACK_URL || '', {
    query: { roomId },
  });
});

// handlers
$socket.on(setSocketFx.doneData, (_, socket) => socket);

// wathcers
$socket.watch(socket => console.log('socket', socket));
addUserToRoomFx.watch(({ socket, userId }) =>
  console.log({ socketFX: socket, userIdFx: userId }),
);
