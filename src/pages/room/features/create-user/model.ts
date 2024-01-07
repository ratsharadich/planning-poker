import { createEffect, createEvent, createStore, sample } from 'effector';
import { FormEvent } from 'react';
import { createUser } from 'shared/api';
import { $user_id, $user_name, set_user_id_fx } from 'shared/model/coords';
import { $socket, add_user_to_room_fx } from 'shared/model/socket';

// stores
export const $create_user_form = createStore(false);

// events
export const form_submitted = createEvent<FormEvent<HTMLFormElement>>();
export const create_user_form_switched = createEvent<boolean>();

// effects
export const create_user_fx = createEffect(createUser);

// handlers
$create_user_form.on(create_user_form_switched, (_, status) => status);

form_submitted.watch(e => e.preventDefault());
sample({
  clock: form_submitted,
  source: { userName: $user_name },
  target: create_user_fx,
});

sample({
  clock: create_user_fx.doneData,
  filter: (userId): userId is string => Boolean(userId),
  target: [set_user_id_fx, $user_id],
});

sample({
  clock: create_user_fx.doneData,
  source: $socket,
  filter: (socket, userId) => Boolean(socket && userId),
  fn: (socket, userId) => ({ socket, userId }),
  target: add_user_to_room_fx,
});

sample({
  clock: add_user_to_room_fx.done,
  fn: () => false,
  target: $create_user_form,
});
