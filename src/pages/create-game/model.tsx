import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { not, or } from 'patronum';
import { FormEvent } from 'react';
import { createRoom } from 'shared/api';
import { $room_name, $user_name } from 'shared/model/coords';
import { go_to_room_fx } from 'shared/model/router';
import { create_user_fx } from 'src/pages/room/features';

// stores
export const $create_game_form = createStore(false);
export const $disabled = or(not($user_name), not($room_name));

// events
export const form_submitted = createEvent<FormEvent<HTMLFormElement>>();
export const form_showed = createEvent();

// effects
const create_room_fx = createEffect(createRoom);
const attached_create_user_fx = attach({ effect: create_user_fx });

// handlers
$create_game_form.on(form_showed, () => true);

form_submitted.watch(e => e.preventDefault());
sample({
  clock: form_submitted,
  source: { userName: $user_name },
  target: attached_create_user_fx,
});

sample({
  clock: attached_create_user_fx.doneData,
  source: $room_name,
  filter: (roomName, userId) => Boolean(roomName && userId),
  fn: (roomName, userId) => ({ roomName, userId: userId || '' }),
  target: create_room_fx,
});

sample({
  clock: create_room_fx.doneData,
  filter: (roomId): roomId is string => Boolean(roomId),
  target: go_to_room_fx,
});
