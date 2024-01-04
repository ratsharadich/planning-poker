import {
  $roomName,
  $userId,
  $userName,
  setUserIdFx,
  userIdChanged,
} from 'shared/model/coords';
import { $cards, $cardsShown, $isLoading, $users } from './stores';
import { checkUserInRoomFx, getRoomFx } from './effects';
import {
  $socket,
  cardsShowStateSwitched,
  cardsUpdated,
  leaveFx,
  listenCardsFx,
  listenCardsShowStateFx,
  setSocketFx,
} from 'shared/model/socket';
import { sample } from 'effector';
import { RoomGate } from './gates';
import { gotToMainPageFx } from 'shared/model/router';
import { createUserFormSwitched } from '../features/create-user';
import { Socket } from 'socket.io-client';

$isLoading.on(getRoomFx.pending, (_, pending) => pending);
$cardsShown.on(getRoomFx.doneData, (_, { showed }) => showed);
$roomName.on(getRoomFx.doneData, (_, { name }) => name);
$users.on(getRoomFx.doneData, (_, { users }) => users);

$cardsShown.on(cardsShowStateSwitched, (_, shown) => shown);
$userName.on(checkUserInRoomFx.doneData, (_, { name }) => name);
$cards.on(checkUserInRoomFx.doneData, (_, { cards }) => cards);
$cards.on(cardsUpdated, (_, cards) => cards);

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
