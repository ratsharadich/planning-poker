export type Card = {
  id: string;
  value: string;
  userId: string;
  roomId: string;
  user: Omit<User, 'cards'>;
};

export type User = {
  id: string;
  name: string;
  cards?: Card[];
};

export type Room = {
  id: string;
  name: string;
  showed: boolean;
  users?: User[];
};
