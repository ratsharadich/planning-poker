import { createStore } from 'effector';
import { Card, User } from 'shared/types';

export const $isLoading = createStore(false);
export const $cardsShown = createStore(false);
export const $cards = createStore<Card[]>([]);
export const $users = createStore<User[]>([]);
