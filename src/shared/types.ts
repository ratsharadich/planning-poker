export type Card = {
  id: string;
  value: string;
  userId: string;
  roomId: string;
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

export type NonNullableObject<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
