import { MutableRefObject, useEffect } from 'react';
import { useReducerAsState } from 'shared';
import { Socket } from 'socket.io-client';

type Args = {
  userId: string;
  socketRef: MutableRefObject<Socket | null>;
};

export const useRoomEvents = ({ socketRef, userId }: Args) => {
  const [{ showed, list: cards }, setState] = useReducerAsState<{
    showed: boolean;
    list: Record<string, { userId: string; value: string | number }>;
  }>({ showed: false, list: {} });

  const handleGetCards = () => {
    socketRef.current?.emit('cards:get');
  };

  const handleUpdateCard = (value: string | number) => {
    socketRef.current?.emit('card:update', {
      userId,
      value,
    });
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('cards', cards => {
        setState(cards);
        console.log(cards, 'cards');
      });
    }
  }, []);

  return { cards, handleGetCards, handleUpdateCard };
};
