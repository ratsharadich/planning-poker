import { MutableRefObject, useCallback, useEffect } from 'react';
import {
  CardsState,
  SocketActions,
  SocketListeners,
  useReducerAsState,
} from 'shared';
import { Socket } from 'socket.io-client';

type Args = {
  userId: string;
  socketRef: MutableRefObject<Socket | null>;
};

export const useRoomEvents = ({ socketRef, userId }: Args) => {
  const [{ shown, list: cards }, setState] = useReducerAsState<CardsState>({
    shown: false,
    list: {},
  });

  console.log(shown, 'showed');

  const { getCards, updateCard, setCardsShown } = SocketActions;
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
    const socket = socketRef.current;
    if (socket) {
      setCardsShown({ socket, show: false });

      listenCards({
        socket,
        onUpdate: cards => setState(cards),
      });
    }

    return () => undefined;
  }, []);

  return { cards, shown, handleGetCards, handleUpdateCard };
};
