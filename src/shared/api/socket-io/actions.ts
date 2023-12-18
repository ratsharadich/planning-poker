import { Socket } from 'socket.io-client';
import { ACTIONS } from './types';

const getCards = ({ socket }: { socket: Socket }) => {
  socket.emit(ACTIONS.GET_CARDS);
};

const updateCard = ({
  socket,
  userId,
  value,
}: {
  socket: Socket;
  userId: string;
  value: string;
}) => {
  socket.emit(ACTIONS.UPDATE_CARD, {
    userId,
    value,
  });
};

const toggleRoomShowState = ({ socket }: { socket: Socket }) => {
  socket.emit(ACTIONS.TOGGLE_ROOM_SHOW_STATE);
};

const leave = ({ socket, userId }: { socket: Socket; userId: string }) => {
  socket.emit(ACTIONS.REMOVE_USER, { userId });
};

export const SocketActions = {
  getCards,
  updateCard,
  toggleRoomShowState,
  leave,
};
