import { createEffect } from 'effector';
import { Socket } from 'socket.io-client';
import { LISTENERS } from 'shared/api';
import { Card } from 'shared/types';
import { cardsShowStateSwitched, cardsUpdated } from './events';

// effects
export const listenCardsFx = createEffect((socket: Socket) =>
  socket.on(LISTENERS.CARDS, (cards: Card[]) => {
    cardsUpdated(cards);
  }),
);

export const listenCardsShowStateFx = createEffect((socket: Socket) => {
  socket.on(LISTENERS.SHOW_STATE, (shown: boolean) => {
    cardsShowStateSwitched(shown);
  });
});
