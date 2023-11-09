import { MutableRefObject, useCallback, useEffect } from 'react';
import { SocketActions, SocketListeners, useReducerAsState } from 'shared';
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

  const { getCards, updateCard } = SocketActions;
  const { listenCards } = SocketListeners;

  const handleGetCards = useCallback(() => {
    if (socketRef.current) {
      getCards({ socket: socketRef.current });
    }
  }, []);

  const handleUpdateCard = useCallback((value: string | number) => {
    if (socketRef.current) {
      updateCard({ socket: socketRef.current, userId, value });
    }
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      listenCards({
        socket: socketRef.current,
        onUpdate: cards => setState(cards),
      });
    }
  }, []);

  return { cards, handleGetCards, handleUpdateCard };
};
