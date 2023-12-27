import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { FormEvent } from 'react';
import { createUser } from 'shared';
import { $socket, $userId, $userName, addUserToRoomFx } from 'shared/model';
import { Socket } from 'socket.io-client';

// stores
export const $isLoading = createStore(false);
export const $createUserForm = createStore(false);

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const createUserFormSwitched = createEvent<boolean>();

// effects
export const createUserFx = createEffect(createUser);
export const setUserIdFx = createEffect<(userId: string) => void>(userId =>
  localStorage.setItem('userId', userId),
);

// handlers
$isLoading.on(createUserFx.pending, (_, pending) => pending);
$createUserForm.on(createUserFormSwitched, (_, status) => status);

sample({
  clock: formSubmitted,
  source: $userName,
  fn: userName => ({ userName }),
  target: createUserFx,
});

sample({
  clock: createUserFx.doneData,
  filter: (userId): userId is string => Boolean(userId),
  target: $userId,
});

sample({
  clock: createUserFx.doneData,
  filter: (userId): userId is string => Boolean(userId),
  target: setUserIdFx,
});

sample({
  clock: setUserIdFx.done,
  source: combine($userId, $socket, (userId, socket) => ({ userId, socket })),
  filter: (args): args is { userId: string; socket: Socket } =>
    Boolean(args.userId && args.socket),
  target: addUserToRoomFx,
});

sample({
  clock: addUserToRoomFx.done,
  fn: () => false,
  target: createUserFormSwitched,
});

// side effects
formSubmitted.watch(e => e.preventDefault());

// watchers
$userId.watch(userId => console.log({ userId }, 'userId'));
setUserIdFx.watch(userId => console.log('setUserId', { setUserId: userId }));
