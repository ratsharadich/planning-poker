import { attach, createEffect, createEvent, sample } from 'effector';
import { FormEvent } from 'react';
import { createUserFx } from 'src/pages/room/features';
import {
  $roomId,
  $roomName,
  $userId,
  $userName,
  createRoom,
  goToRoomFx,
} from 'src/shared';

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
const createRoomFx = createEffect(createRoom);
const attachedCreateUserFx = attach({ effect: createUserFx });

// handlers
$roomId.on(createRoomFx.doneData, (_, roomId) => roomId);

formSubmitted.watch(e => e.preventDefault());
sample({
  clock: formSubmitted,
  source: { userName: $userName },
  target: attachedCreateUserFx,
});

sample({
  clock: [attachedCreateUserFx.done, $userId],
  source: {
    roomName: $roomName,
    userId: $userId,
  },
  filter: ({ roomName, userId }) => Boolean(roomName && userId),
  target: createRoomFx,
});

sample({
  clock: createRoomFx.doneData,
  filter: (roomId): roomId is string => Boolean(roomId),
  target: goToRoomFx,
});
