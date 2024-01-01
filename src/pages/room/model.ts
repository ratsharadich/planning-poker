import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { Socket, io } from 'socket.io-client';

import { createUserFormSwitched } from './features';
import {
  $roomId,
  $socket,
  $userId,
  $userName,
  Card,
  Room,
  getCardsFx,
  getRoom,
  gotToMainPageFx,
  leaveFx,
} from 'src/shared';

// gates
export const RoomGate = createGate<{ roomId: string }>();

// stores
export const $isLoading = createStore(false);
export const $cardsShown = createStore(false);
export const $cards = createStore<Card[]>([]);

// events
export const cardsGotten = createEvent();
export const cardsUpdated = createEvent<Card[]>();

// effects
export const getRoomFx = createEffect((roomId: string) => getRoom(roomId));
export const checkUserInRomFx = createEffect(
  ({ room, userId }: { room: Room; userId: string }) => {
    const userInRoom = room.users?.find(({ id }) => id === userId);

    if (!userInRoom) {
      throw new Error('User is not found!');
    }

    return {
      name: userInRoom.name,
      cards: room.users?.flatMap(({ cards }) => cards || []),
    };
  },
);
export const setSocketFx = createEffect((roomId: string) => {
  io(process.env.BACK_URL || '', {
    query: { roomId },
  });
});

// handlers
$isLoading.on(getRoomFx.pending, (_, pending) => pending);
$userName.on(checkUserInRomFx.doneData, (_, { name }) => name);
$cards.on(checkUserInRomFx.doneData, (_, { cards }) => cards);
$cards.on(cardsUpdated, (_, cards) => cards);

sample({
  clock: cardsGotten,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: getCardsFx,
});

sample({
  clock: RoomGate.open,
  source: $roomId,
  target: getRoomFx,
});

// TODO: как пробросить апдейт карточек?
// sample({
//   clock: RoomGate.open,
//   source: { socket: $socket, onUpdate: cardsUpdated },
//   target: listenCardsFx,
// });

sample({
  clock: getRoomFx.doneData,
  filter: room => Boolean(room),
});

sample({
  clock: getRoomFx.failData,
  filter: error => error.message === 'Room is not found!',
  target: gotToMainPageFx,
});

sample({
  clock: getRoomFx.finally,
  source: $roomId,
  target: setSocketFx,
});

sample({
  clock: checkUserInRomFx.failData,
  filter: error => error.message === 'User is not found!',
  target: createUserFormSwitched.prepend(() => true),
});

sample({
  clock: RoomGate.close,
  source: { socket: $socket, userId: $userId },
  filter: (args): args is { socket: Socket; userId: string } =>
    Boolean(args.socket && args.userId),
  target: leaveFx,
});

// wathcers
// RoomGate.open.watch(props => console.log(props));
