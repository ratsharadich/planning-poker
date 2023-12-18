import { createEvent, createEffect, sample } from 'effector';
import { createRoom } from 'shared';
import { FormEvent } from 'react';
import { createUserFx } from 'pages/room/features';
import { $roomId, $roomName, $userName } from 'shared/model';
import { createGate } from 'effector-react';

// gates
export const createGameGate = createGate('create-game-gate');

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
const createRoomFx = createEffect(createRoom);

// handlers
$roomId.on(createRoomFx.doneData, (_, roomId) => roomId);

sample({
  clock: formSubmitted,
  source: $userName,
  fn: userName => ({ userName }),
  target: createUserFx,
});

sample({
  clock: createUserFx.doneData,
  filter: createGameGate.status,
  source: $roomName,
  fn: (roomName, userId) => ({ userId: userId || '', roomName }),
  target: createRoomFx,
});

// side effects
formSubmitted.watch(e => e.preventDefault());
