import { createEffect } from 'effector';
import { Socket } from 'socket.io-client';
import { ACTIONS } from 'src/shared';

export const addUserToRoomFx = createEffect(
  ({ socket, userId }: { socket: Socket; userId: string }) => {
    socket.emit(ACTIONS.ADD_USER_TO_ROOM, {
      userId,
    });
  },
);

export const getCardsFx = createEffect((socket: Socket) =>
  socket.emit(ACTIONS.GET_CARDS),
);

export const leaveFx = createEffect(
  ({ socket, userId }: { socket: Socket; userId: string }) => {
    socket.emit(ACTIONS.REMOVE_USER, { userId });
    socket.disconnect();
  },
);