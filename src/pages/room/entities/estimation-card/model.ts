import { createEvent, sample } from 'effector';
import { $user_id } from 'shared/model/coords';
import { $socket, update_card_fx } from 'shared/model/socket';
import { Socket } from 'socket.io-client';
import { $user_card_value } from '../../model';

// events
export const task_estimated = createEvent<string>();

// handlers
sample({
  clock: task_estimated,
  source: {
    socket: $socket,
    userId: $user_id,
    cardValue: $user_card_value,
  },
  filter: ({ socket }) => Boolean(socket),
  fn: ({ socket, userId, cardValue }, assessment) => ({
    socket: socket as Socket,
    userId,
    value: assessment === cardValue ? '' : assessment,
  }),
  target: update_card_fx,
});
