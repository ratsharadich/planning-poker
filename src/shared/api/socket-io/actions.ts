import { Socket } from 'socket.io-client';
import { ACTIONS } from './types';

// TODO: move to socket model
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

export const SocketActions = {
  updateCard,
  toggleRoomShowState,
};
