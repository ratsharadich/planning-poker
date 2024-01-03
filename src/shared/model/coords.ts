import { createEffect, createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';
import { getValidName } from 'shared/lib';

// stores
export const $userName = createStore('');
export const $userId = createStore('');

export const $roomName = createStore('');

// events
export const userIdChanged = createEvent<string>();
export const userNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const roomNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const roomIdChanged = createEvent<string>();

// effects
export const setUserIdFx = createEffect<(userId: string) => string>(userId => {
  localStorage.setItem('userId', userId);
  return userId;
});

// handlers
$userId.on(userIdChanged, (_, id) => id);
$userName.on(userNameChanged, (_, e) => getValidName(e.target.value));
$roomName.on(roomNameChanged, (_, e) => getValidName(e.target.value));
