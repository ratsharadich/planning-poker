import { createEffect } from 'effector';
import { getRoom } from 'shared/api';
import { Room } from 'shared/types';

export const getRoomFx = createEffect((roomId: string) => getRoom(roomId));

export const checkUserInRoomFx = createEffect(
  ({ room, userId }: { room: Room; userId: string }) => {
    const userInRoom = room.users?.find(({ id }) => id === userId);

    if (!userInRoom) {
      throw new Error('User is not found!');
    }

    return {
      name: userInRoom.name,
      cards: room.users?.flatMap(({ cards }) => cards || []),
    };
  },
);
