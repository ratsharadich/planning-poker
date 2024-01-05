import { createEffect } from 'effector';
import { Socket } from 'socket.io-client';
import { SOCKET_ACTIONS } from 'shared/types';

export const add_user_to_room_fx = createEffect(
  ({ socket, userId }: { socket: Socket | null; userId?: string }) => {
    if (socket && userId)
      socket.emit(SOCKET_ACTIONS.ADD_USER_TO_ROOM, {
        userId,
      });
  },
);

export const get_cards_fx = createEffect((socket: Socket) =>
  socket.emit(SOCKET_ACTIONS.GET_CARDS),
);

export const update_card_fx = createEffect(
  ({
    socket,
    userId,
    value,
  }: {
    socket: Socket;
    userId: string;
    value: string;
  }) => {
    socket.emit(SOCKET_ACTIONS.UPDATE_CARD, {
      userId,
      value,
    });
  },
);

export const leave_room_fx = createEffect(
  ({ socket, userId }: { socket: Socket; userId: string }) => {
    socket.emit(SOCKET_ACTIONS.REMOVE_USER, { userId });
    socket.disconnect();
  },
);

export const toggle_room_show_state_fx = createEffect((socket: Socket) => {
  socket.emit(SOCKET_ACTIONS.TOGGLE_ROOM_SHOW_STATE);
});
