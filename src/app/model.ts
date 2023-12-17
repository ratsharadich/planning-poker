import { createStore, createEvent } from 'effector';
import { Socket } from 'socket.io-client';

export const $socket = createStore<Socket | null>(null);

export const socketSet = createEvent<Socket>();

$socket.on(socketSet, (_, socket) => socket);
$socket.watch(socket => console.log({ socket }));
