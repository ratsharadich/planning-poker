import { createEffect } from 'effector';
import { Socket } from 'socket.io-client';
import { Card, LISTENERS } from 'src/shared';

export const listenCardsFx = createEffect(
  ({
    socket,
    onUpdate,
  }: {
    socket: Socket;
    onUpdate: (cards: Card[]) => void;
  }) =>
    socket.on(LISTENERS.CARDS, (cards: Card[]) => {
      onUpdate(cards);
    }),
);

export const listenCardsShownState = createEffect(
  ({
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
  },
);
