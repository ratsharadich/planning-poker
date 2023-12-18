import { createEffect, createEvent, createStore, sample } from 'effector';
import { FormEvent } from 'react';
import { createUser } from 'shared';
import { $socket, $userId, $userName, addUserToRoom } from 'shared/model';
import { Socket } from 'socket.io-client';

// stores
export const $isLoading = createStore(false);

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
export const createUserFx = createEffect(createUser);
export const setUserIdFx = createEffect<(userId: string) => void>(userId =>
  localStorage.setItem('userId', userId),
);

// handlers
$isLoading.on(createUserFx.pending, (_, pending) => pending);

sample({
  clock: formSubmitted,
  source: $userName,
  fn: userName => ({ userName }),
  target: createUserFx,
});

sample({
  clock: createUserFx.doneData,
  fn: userId => userId || '',
  target: $userId,
});

sample({
  clock: $userId,
  filter: (userId): userId is string => Boolean(userId),
  target: setUserIdFx,
});

sample({
  clock: createUserFx.done,
  source: sample($userId, $socket, (userId, socket) => ({
    userId,
    socket,
  })),
  filter: (args): args is { userId: string; socket: Socket } =>
    Boolean(args.userId && args.socket),
  target: addUserToRoom,
});

$userId.watch(userId => console.log(userId, 'userId'));

// side effects
formSubmitted.watch(e => e.preventDefault());
