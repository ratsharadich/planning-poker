import { Socket } from 'socket.io-client';
import { CardsState, LISTENERS, UserList } from './types';

const listenUsers = ({
  socket,
  onUpdate,
}: {
  socket: Socket;
  onUpdate: (users: UserList) => void;
}) => {
  socket.on(LISTENERS.LISTEN_USERS, (users: UserList) => onUpdate(users));
};

const listenCards = ({
  socket,
  onUpdate,
}: {
  socket: Socket;
  onUpdate: (cards: CardsState) => void;
}) => {
  socket.on(LISTENERS.LISTEN_CARDS, (cards: CardsState) => {
    onUpdate(cards);
  });
};

export const SocketListeners = {
  listenUsers,
  listenCards,
};
