import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { toggle_room_show_state_fx, $socket } from 'shared/model/socket';
import { Socket } from 'socket.io-client';
import { $cards, $are_cards_uncovered } from '../../model';
import { Card } from 'shared/types';
import { getSplittedCards } from './lib';
import { ReactNode } from 'react';
import { createGate } from 'effector-react';
import { spread } from 'patronum';

// gates
export const TableGate = createGate();

// stores
export const $top_cards = createStore<ReactNode[]>([]);
export const $right_cards = createStore<ReactNode[]>([]);
export const $bottom_cards = createStore<ReactNode[]>([]);
export const $left_cards = createStore<ReactNode[]>([]);

// events
export const cards_uncovered = createEvent();

// effects
const split_cards_fx = attach({
  source: $cards,
  effect: createEffect((cards: Card[]) => getSplittedCards(cards)),
});

// handlers
sample({
  clock: [$cards, $are_cards_uncovered],
  target: split_cards_fx,
});

sample({
  clock: split_cards_fx.doneData,
  target: spread({
    top: $top_cards,
    right: $right_cards,
    bottom: $bottom_cards,
    left: $left_cards,
  }),
});

sample({
  clock: cards_uncovered,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: toggle_room_show_state_fx,
});
