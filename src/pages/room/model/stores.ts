import { createStore } from 'effector';
import { debug } from 'patronum';
import { Card } from 'shared/types';

export const $are_cards_uncovered = createStore(false);
export const $cards = createStore<Card[]>([]);
export const $user_card_value = createStore('');

debug({ $cards });
