import { Socket } from 'socket.io-client';
import { ACTIONS, CardValue, UserId, UserName } from './types';

const addUser = ({
  socket,
  userId,
  userName,
}: {
  socket: Socket;
  userId: UserId;
  userName: UserName;
}) => {
  socket.emit(ACTIONS.ADD_USER, { userId, userName });
};

const getCards = ({ socket }: { socket: Socket }) => {
  socket.emit(ACTIONS.GET_CARDS);
};

const updateCard = ({
  socket,
  userId,
  value,
}: {
  socket: Socket;
  userId: UserId;
  value: CardValue;
}) => {
  socket.emit(ACTIONS.UPDATE_CARD, {
    userId,
    value,
  });
};

const setCardsShown = ({ socket, show }: { socket: Socket; show: boolean }) => {
  socket.emit(ACTIONS.SHOW_CARDS, { show });
};

const leave = ({ socket, userId }: { socket: Socket; userId: UserId }) => {
  socket.emit(ACTIONS.USER_LEAVE, { userId });
};

export const SocketActions = {
  addUser,
  getCards,
  updateCard,
  setCardsShown,
  leave,
};
