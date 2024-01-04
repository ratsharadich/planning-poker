import { createEffect, createEvent, createStore, sample } from 'effector';
import { FormEvent } from 'react';
import { createUser } from 'shared/api';
import { $userId, $userName, setUserIdFx } from 'shared/model/coords';
import { $socket, addUserToRoomFx } from 'shared/model/socket';

// stores
export const $isLoading = createStore(false);
export const $createUserForm = createStore(false);

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
export const createUserFx = createEffect(createUser);

// handlers
formSubmitted.watch(e => e.preventDefault());
sample({
  clock: formSubmitted,
  source: { userName: $userName },
  target: createUserFx,
});

sample({
  clock: createUserFx.doneData,
  filter: (userId): userId is string => Boolean(userId),
  target: [setUserIdFx, $userId],
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
  fn: () => false,
  target: $createUserForm,
});
