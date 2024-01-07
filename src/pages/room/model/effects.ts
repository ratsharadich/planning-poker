import { createEffect } from 'effector';
import { getRoom } from 'shared/api';
import { Room } from 'shared/types';
import { create_user_form_switched } from '../features';

export const get_room_fx = createEffect((roomId: string) => getRoom(roomId));

export const check_user_in_room_fx = createEffect(
  ({ room, userId }: { room: Room; userId: string }) => {
    if (room.users) {
      const userInRoom = room.users?.find(({ id }) => id === userId);

      if (!userInRoom && room.users?.length >= 10) {
        throw new Error('Room is full!');
      }

      if (!userInRoom) {
        throw new Error('User is not found!');
      }

      return userInRoom.name;
    }

    throw new Error('Room does not have users!');
  },
);

export const handle_check_user_error_fx = createEffect((error: string) => {
  switch (error) {
    case 'User is not found!':
      create_user_form_switched(true);
      break;
  }
});
