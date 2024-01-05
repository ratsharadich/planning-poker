import { createEffect } from 'effector';
import { Socket } from 'socket.io-client';
import { cards_show_state_switched, cards_updated } from './events';
import { Card, SOCKET_LISTENERS } from 'shared/types';

// effects
export const listen_cards_fx = createEffect((socket: Socket) =>
  socket.on(SOCKET_LISTENERS.CARDS, (cards: Card[]) => {
    cards_updated(cards);
  }),
);

export const listen_cards_show_state_fx = createEffect((socket: Socket) => {
  socket.on(SOCKET_LISTENERS.SHOW_STATE, (shown: boolean) => {
    cards_show_state_switched(shown);
  });
});
