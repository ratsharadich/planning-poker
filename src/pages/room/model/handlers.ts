import {
  $room_name,
  $user_id,
  $user_name,
  set_user_id_fx,
} from 'shared/model/coords';
import {
  $cards,
  $are_cards_uncovered,
  $users,
  $user_card_value,
} from './stores';
import { check_user_in_room_fx, get_room_fx } from './effects';
import {
  $socket,
  cards_show_state_switched,
  cards_updated,
  leave_room_fx,
  listen_cards_fx,
  listen_cards_show_state_fx,
  set_socket_fx,
} from 'shared/model/socket';
import { sample } from 'effector';
import { RoomGate } from './gates';
import { go_to_main_page_fx } from 'shared/model/router';
import { $create_user_form } from '../features/create-user';
import { Socket } from 'socket.io-client';

import { spread } from 'patronum';

$are_cards_uncovered.on(cards_show_state_switched, (_, shown) => shown);
$user_name.on(check_user_in_room_fx.doneData, (_, { name }) => name);
$cards.on(check_user_in_room_fx.doneData, (_, { cards }) => cards);
$cards.on(cards_updated, (_, cards) => cards);

sample({
  clock: RoomGate.open,
  fn: ({ roomId, userId }) => ({
    getRoom: roomId,
    setSocket: roomId,
    setUserId: userId,
    changeUserId: userId,
  }),
  target: spread({
    getRoom: get_room_fx,
    setSocket: set_socket_fx,
    setUserId: set_user_id_fx,
    changeUserId: $user_id,
  }),
});

sample({
  clock: get_room_fx.doneData,
  source: $user_id,
  fn: (userId, room) => ({
    showed: room.showed,
    name: room.name,
    users: room.users,
    checkUser: {
      userId,
      room,
    },
  }),
  target: spread({
    showed: $are_cards_uncovered,
    name: $room_name,
    users: $users,
    checkUser: check_user_in_room_fx,
  }),
});

sample({
  clock: get_room_fx.failData,
  filter: error => error.message === 'Room is not found!',
  target: go_to_main_page_fx,
});

sample({
  clock: check_user_in_room_fx.failData,
  filter: error => error.message === 'User is not found!',
  fn: () => true,
  target: $create_user_form,
});

sample({
  clock: check_user_in_room_fx.finally,
  source: $socket,
  filter: (socket): socket is Socket => Boolean(socket),
  target: [listen_cards_fx, listen_cards_show_state_fx],
});

sample({
  clock: $cards,
  source: $user_id,
  fn: (userId, cards) =>
    cards.find(user => user.userId === userId)?.value || '',
  target: $user_card_value,
});

sample({
  clock: RoomGate.close,
  source: { socket: $socket, userId: $user_id },
  filter: (args): args is { socket: Socket; userId: string } =>
    Boolean(args.socket && args.userId),
  target: leave_room_fx,
});
