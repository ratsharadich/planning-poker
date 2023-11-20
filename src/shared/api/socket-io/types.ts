export enum ACTIONS {
  ADD_USER = 'user:add',
  USER_LEAVE = 'user:leave',
  GET_CARDS = 'cards:get',
  UPDATE_CARD = 'card:update',
  SHOW_CARDS = 'cards:set-shown',
}

export enum LISTENERS {
  LISTEN_USERS = 'users',
  LISTEN_CARDS = 'cards',
}
