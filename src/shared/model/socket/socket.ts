import { createEffect, createStore } from 'effector';
import { debug } from 'patronum';
import { Socket, io } from 'socket.io-client';

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

debug({ $socket });
