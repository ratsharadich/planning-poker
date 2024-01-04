import { createStore } from 'effector';
import { Card, User } from 'shared/types';

export const $areCardsUncovered = createStore(false);
export const $cards = createStore<Card[]>([]);
export const $users = createStore<User[]>([]);
export const $userCardValue = createStore('');
