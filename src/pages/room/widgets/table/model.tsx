import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { toggleRoomShowStateFx, $socket } from 'shared/model/socket';
import { Socket } from 'socket.io-client';
import { $cards, $areCardsUncovered } from '../../model';
import { Card } from 'src/shared/types';
import { getSplittedCards } from './lib';
import { ReactNode } from 'react';
import { createGate } from 'effector-react';

export type SplittedCards = Record<
  'bottom' | 'left' | 'right' | 'top',
  ReactNode[]
>;

// gates
export const TableGate = createGate();

// stores
export const $splittedCards = createStore<SplittedCards>({
  top: [],
  right: [],
  bottom: [],
  left: [],
});

// events
export const cardsUncovered = createEvent();

// effects
const splitCardsFx = attach({
  source: {
    cards: $cards,
    shown: $areCardsUncovered,
  },
  effect: createEffect((args: { shown: boolean; cards: Card[] }) =>
    getSplittedCards(args),
  ),
});

// handlers
$splittedCards.on(splitCardsFx.doneData, (_, cards) => cards);

sample({
  clock: [$cards, $areCardsUncovered],
  target: splitCardsFx,
});

sample({
  clock: cardsUncovered,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: toggleRoomShowStateFx,
});
