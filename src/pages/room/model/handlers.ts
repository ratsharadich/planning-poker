import {
  $roomName,
  $userId,
  $userName,
  setUserIdFx,
} from 'shared/model/coords';
import { $cards, $areCardsUncovered, $users, $userCardValue } from './stores';
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
import { $createUserForm } from '../features/create-user';
import { Socket } from 'socket.io-client';

import { spread } from 'patronum';

$areCardsUncovered.on(cardsShowStateSwitched, (_, shown) => shown);
$userName.on(checkUserInRoomFx.doneData, (_, { name }) => name);
$cards.on(checkUserInRoomFx.doneData, (_, { cards }) => cards);
$cards.on(cardsUpdated, (_, cards) => cards);

sample({
  clock: RoomGate.open,
  fn: ({ roomId, userId }) => ({
    getRoom: roomId,
    setSocket: roomId,
    setUserId: userId,
    changeUserId: userId,
  }),
  target: spread({
    getRoom: getRoomFx,
    setSocket: setSocketFx,
    setUserId: setUserIdFx,
    changeUserId: $userId,
  }),
});

sample({
  clock: getRoomFx.doneData,
  source: $userId,
  fn: (userId, room) => ({
    showed: room.showed,
    name: room.name,
    users: room.users,
    checkUser: {
      userId,
      room,
    },
  }),
  target: spread({
    showed: $areCardsUncovered,
    name: $roomName,
    users: $users,
    checkUser: checkUserInRoomFx,
  }),
});

sample({
  clock: getRoomFx.failData,
  filter: error => error.message === 'Room is not found!',
  target: gotToMainPageFx,
});

sample({
  clock: checkUserInRoomFx.failData,
  filter: error => error.message === 'User is not found!',
  fn: () => true,
  target: $createUserForm,
});

sample({
  clock: checkUserInRoomFx.finally,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: [listenCardsFx, listenCardsShowStateFx],
});

sample({
  clock: $cards,
  source: $userId,
  fn: (userId, cards) =>
    cards.find(user => user.userId === userId)?.value || '',
  target: $userCardValue,
});

sample({
  clock: RoomGate.close,
  source: { socket: $socket, userId: $userId },
  filter: (args): args is { socket: Socket; userId: string } =>
    Boolean(args.socket && args.userId),
  target: leaveFx,
});
