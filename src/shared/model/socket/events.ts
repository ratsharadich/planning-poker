import { createEvent } from 'effector';
import { Card } from 'shared/types';

// events
export const cards_updated = createEvent<Card[]>();
export const cards_show_state_switched = createEvent<boolean>();
