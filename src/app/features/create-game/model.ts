import { createStore, createEvent, createEffect, sample } from 'effector';
import { getValidName } from './lib';
import { createRoom, createUser } from 'shared';
import { ChangeEvent, FormEvent } from 'react';

// stores
export const $userName = createStore('');
export const $roomName = createStore('');
export const $roomId = createStore('');

// events
export const userNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const roomNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
const createUserFx = createEffect(createUser);
const createRoomFx = createEffect(createRoom);

// handlers
$userName.on(userNameChanged, (_, e) => getValidName(e.target.value));
$roomName.on(roomNameChanged, (_, e) => getValidName(e.target.value));
$roomId.on(createRoomFx.doneData, (_, roomId) => roomId);

formSubmitted.watch(e => e.preventDefault());
sample({
  clock: formSubmitted,
  source: $userName,
  fn: userName => ({ userName }),
  target: createUserFx,
});

createUserFx.doneData.watch(
  userId => userId && localStorage.setItem('userId', userId),
);
sample({
  clock: createUserFx.doneData,
  source: $roomName,
  fn: (roomName, userId) => ({ userId: String(userId), roomName }),
  target: createRoomFx,
});
