import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { Socket } from 'socket.io-client';

import { $createUserForm, createUserFormSwitched } from './features';
import {
  $socket,
  $userId,
  $userName,
  Card,
  Room,
  cardsShowStateSwitched,
  cardsUpdated,
  getCardsFx,
  getRoom,
  gotToMainPageFx,
  leaveFx,
  listenCardsFx,
  listenCardsShowStateFx,
  setSocketFx,
  setUserIdFx,
  userIdChanged,
} from 'src/shared';

// gates
export const RoomGate = createGate<{ roomId: string; userId: string }>();

// stores
export const $isLoading = createStore(false);
export const $cardsShown = createStore(false);
export const $cards = createStore<Card[]>([]);

// events
export const cardsGotten = createEvent();

// effects
export const getRoomFx = createEffect((roomId: string) => getRoom(roomId));
export const checkUserInRoomFx = createEffect(
  ({ room, userId }: { room: Room; userId: string }) => {
    const userInRoom = room.users?.find(({ id }) => id === userId);

    console.log(userInRoom, 'userInRoom');

    if (!userInRoom) {
      throw new Error('User is not found!');
    }

    return {
      name: userInRoom.name,
      cards: room.users?.flatMap(({ cards }) => cards || []),
    };
  },
);

// handlers
$isLoading.on(getRoomFx.pending, (_, pending) => pending);
$userName.on(checkUserInRoomFx.doneData, (_, { name }) => name);
$cards.on(checkUserInRoomFx.doneData, (_, { cards }) => cards);
$cards.on(cardsUpdated, (_, cards) => cards);
$cardsShown.on(cardsShowStateSwitched, (_, shown) => shown);

sample({
  clock: cardsGotten,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: getCardsFx,
});

sample({
  clock: RoomGate.open,
  fn: ({ roomId }) => roomId,
  target: [getRoomFx, setSocketFx],
});

sample({
  clock: RoomGate.open,
  fn: ({ userId }) => userId,
  target: [setUserIdFx, userIdChanged],
});

sample({
  clock: getRoomFx.doneData,
  source: $userId,
  fn: (userId, room) => ({ userId, room }),
  target: checkUserInRoomFx,
});

sample({
  clock: getRoomFx.failData,
  filter: error => error.message === 'Room is not found!',
  target: gotToMainPageFx,
});

sample({
  clock: checkUserInRoomFx.failData,
  filter: error => error.message === 'User is not found!',
  target: createUserFormSwitched.prepend(() => true),
});

sample({
  clock: checkUserInRoomFx.finally,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: [listenCardsFx, listenCardsShowStateFx],
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
// getRoomFx.watch(getRoomFx => console.log({ getRoomFx }));
checkUserInRoomFx.watch(checkUserInRomFx => console.log({ checkUserInRomFx }));
// $userId.watch(userId => console.log(userId));
$cards.watch(cards => console.log({ cards }));
