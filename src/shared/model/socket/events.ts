import { createEvent } from 'effector';
import { Card } from 'shared/types';

// events
export const cardsUpdated = createEvent<Card[]>();
export const cardsShowStateSwitched = createEvent<boolean>();
