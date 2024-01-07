import { createEffect, createEvent, createStore } from 'effector';
import { debug } from 'patronum';
import { ChangeEvent } from 'react';
import { getValidName } from 'shared/lib';

// stores
export const $user_name = createStore('');
export const $user_id = createStore('');
export const $room_name = createStore('');

// events
export const user_name_changed = createEvent<ChangeEvent<HTMLInputElement>>();
export const room_name_changed = createEvent<ChangeEvent<HTMLInputElement>>();

// effects
export const set_user_id_fx = createEffect((userId: string) => {
  localStorage.setItem('userId', userId);
  return userId;
});

// handlers
$user_name.on(user_name_changed, (_, e) => getValidName(e.target.value));
$room_name.on(room_name_changed, (_, e) => getValidName(e.target.value));
