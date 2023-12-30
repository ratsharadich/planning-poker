import { createEvent, createStore } from 'effector';
import { ChangeEvent } from 'react';
import { getValidName } from 'shared/lib';

// stores
export const $userName = createStore('');
export const $userId = createStore(localStorage.getItem('userId') || '');

export const $roomName = createStore('');
export const $roomId = createStore('');

// events
export const userNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const roomNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const roomIdChanged = createEvent<string>();

// handlers
$userName.on(userNameChanged, (_, e) => getValidName(e.target.value));
$roomName.on(roomNameChanged, (_, e) => getValidName(e.target.value));
$roomId.on(roomIdChanged, (_, id) => id);
