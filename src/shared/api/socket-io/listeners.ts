import { Socket } from 'socket.io-client';
import { LISTENERS } from './types';
import { Card } from 'shared/types';

const listenCards = ({
  socket,
  onUpdate,
}: {
  socket: Socket;
  onUpdate: (cards: Card[]) => void;
}) => {
  socket.on(LISTENERS.CARDS, (cards: Card[]) => {
    onUpdate(cards);
  });
};

const listenRoomShowState = ({
  socket,
  onUpdate,
}: {
  socket: Socket;
  onUpdate: (shown: boolean) => void;
}) => {
  socket.on(LISTENERS.SHOW_STATE, (shown: boolean) => {
    console.log(shown, 'shown');
    onUpdate(shown);
  });
};

export const SocketListeners = {
  listenCards,
  listenRoomShowState,
};
