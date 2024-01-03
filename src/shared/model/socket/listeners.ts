import { createEffect, createEvent } from 'effector';
import { Socket } from 'socket.io-client';
import { Card, LISTENERS } from 'src/shared';

// events
export const cardsUpdated = createEvent<Card[]>();
export const cardsShowStateSwitched = createEvent<boolean>();

// effects
export const listenCardsFx = createEffect((socket: Socket) =>
  socket.on(LISTENERS.CARDS, (cards: Card[]) => {
    console.log('cards updated inside fx');
    cardsUpdated(cards);
  }),
);

export const listenCardsShowStateFx = createEffect((socket: Socket) => {
  socket.on(LISTENERS.SHOW_STATE, (shown: boolean) => {
    cardsShowStateSwitched(shown);
  });
});

cardsUpdated.watch(() => 'cards updated watcher');

listenCardsFx.watch(() => ({ listenCardsFx }));
