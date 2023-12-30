import { createEvent, createEffect, sample } from 'effector';
import { createRoom } from 'shared';
import { FormEvent } from 'react';
import { createUserFx } from 'pages/room/features';
import { $roomId, $roomName, $userName, $userId } from 'shared/model';
import { createGate } from 'effector-react';
import { router } from 'src/index';

// gates
export const CreateGameGate = createGate('create-game-gate');

// events
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

// effects
const createRoomFx = createEffect(createRoom);

const goToRoomFx = createEffect((roomId: string) => {
  router.navigate(`/room/${roomId}`);
});

// handlers
$roomId.on(createRoomFx.doneData, (_, roomId) => roomId);

sample({
  clock: formSubmitted,
  source: { userName: $userName },
  target: createUserFx,
});

sample({
  clock: [createUserFx.done, $userId],
  source: {
    roomName: $roomName,
    userId: $userId,
    gateStatus: CreateGameGate.status,
  },
  filter: ({ roomName, userId, gateStatus }) =>
    Boolean(roomName && userId && gateStatus),
  target: createRoomFx,
});

sample({
  clock: createRoomFx.doneData,
  filter: (roomId): roomId is string => Boolean(roomId),
  target: goToRoomFx,
});

// side effects
formSubmitted.watch(e => e.preventDefault());
