import { MutableRefObject, useCallback, useEffect } from 'react';
import {
  CardsState,
  SocketActions,
  SocketListeners,
  useReducerAsState,
} from 'shared';
import { Socket } from 'socket.io-client';

type Args = {
  socketRef: MutableRefObject<Socket | null>;
};

const { getCards, setCardsShown } = SocketActions;
const { listenCards } = SocketListeners;

export const useRoomEvents = ({ socketRef }: Args) => {
  const [{ shown, list: cards }, setState] = useReducerAsState<CardsState>({
    shown: false,
    list: {},
  });

  const handleGetCards = useCallback(() => {
    if (socketRef.current) {
      getCards({ socket: socketRef.current });
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

  return { cards, shown, handleGetCards };
};
