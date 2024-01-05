import { createStore } from 'effector';
import { Card, User } from 'shared/types';

export const $are_cards_uncovered = createStore(false);
export const $cards = createStore<Card[]>([]);
export const $users = createStore<User[]>([]);
export const $user_card_value = createStore('');
