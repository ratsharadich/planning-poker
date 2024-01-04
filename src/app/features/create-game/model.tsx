import { attach, createEffect, createEvent, sample } from 'effector';
import { FormEvent } from 'react';
import { createRoom } from 'shared/api';
import { $roomName, $userName } from 'shared/model/coords';
import { goToRoomFx } from 'shared/model/router';
import { createUserFx } from 'src/pages/room/features';

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
const createRoomFx = createEffect(createRoom);
const attachedCreateUserFx = attach({ effect: createUserFx });

// handlers
formSubmitted.watch(e => e.preventDefault());
sample({
  clock: formSubmitted,
  source: { userName: $userName },
  target: attachedCreateUserFx,
});

sample({
  clock: attachedCreateUserFx.doneData,
  source: $roomName,
  filter: (roomName, userId) => Boolean(roomName && userId),
  fn: (roomName, userId) => ({ roomName, userId: userId || '' }),
  target: createRoomFx,
});

sample({
  clock: createRoomFx.doneData,
  filter: (roomId): roomId is string => Boolean(roomId),
  target: goToRoomFx,
});
