import { createEffect, createEvent, createStore, sample } from 'effector';
import { FormEvent } from 'react';
import { createUser } from 'shared';
import {
  $socket,
  $userName,
  addUserToRoomFx,
  setUserIdFx,
  userIdChanged,
} from 'shared/model';

// stores
export const $isLoading = createStore(false);
export const $createUserForm = createStore(false);

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const createUserFormSwitched = createEvent<boolean>();

// effects
export const createUserFx = createEffect(createUser);

// handlers
$isLoading.on(createUserFx.pending, (_, pending) => pending);
$createUserForm.on(createUserFormSwitched, (_, status) => status);

sample({
  clock: formSubmitted,
  source: { userName: $userName },
  target: createUserFx,
});

sample({
  clock: createUserFx.doneData,
  filter: (userId): userId is string => Boolean(userId),
  target: [setUserIdFx, userIdChanged],
});

sample({
  clock: createUserFx.doneData,
  source: $socket,
  filter: (socket, userId) => Boolean(socket && userId),
  fn: (socket, userId) => ({ socket, userId }),
  target: addUserToRoomFx,
});

sample({
  clock: addUserToRoomFx.done,
  target: createUserFormSwitched.prepend(() => false),
});

// side effects
formSubmitted.watch(e => e.preventDefault());

// watchers
// $userId.watch(userId => console.log({ userId }, 'userId'));
// setUserIdFx.watch(userId => console.log('setUserId', { setUserId: userId }));
addUserToRoomFx.watch(addUserToRoomFx => console.log({ addUserToRoomFx }));
