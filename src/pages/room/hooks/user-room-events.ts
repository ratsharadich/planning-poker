import axios, { AxiosError } from 'axios';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Room,
  SocketActions,
  SocketListeners,
  User,
  useReducerAsState,
} from 'shared';
import { createUser, getRoom } from 'shared/api/rest';
import { Socket, io } from 'socket.io-client';

type Args = {
  roomId: string;
  socketRef: MutableRefObject<Socket | null>;
};

const { getCards, addUserToRoom, leave } = SocketActions;
const { listenCards, listenRoomShowState } = SocketListeners;

export const useRoomEvents = ({ socketRef, roomId }: Args) => {
  const [state, setState] = useReducerAsState<{
    shown: boolean;
    user: User;
    cards: Card[];
    createUser: boolean;
  }>({
    shown: false,
    user: { id: localStorage.getItem('userId') || '', name: '' },
    cards: [],
    createUser: false,
  });

  const navigate = useNavigate();

  const handleGetCards = useCallback(() => {
    if (socketRef.current) {
      getCards({ socket: socketRef.current });
    }
  }, []);

  useEffect(() => {
    getRoom({ roomId })
      .then(room => {
        if (room) {
          const userInRoom = room.users?.find(({ id }) => id === state.user.id);

          if (!userInRoom) {
            throw new Error('User is not found!');
          }

          setState({
            user: { ...state.user, name: userInRoom?.name || '' },
            cards: room.users?.flatMap(({ cards }) => cards || []),
          });
        }
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data.message === 'Room is not found!') {
            navigate('/');
          }
        }

        if (error instanceof Error) {
          if (error.message === 'User is not found!') {
            setState({ createUser: true });
          }
        }
      })
      .finally(() => {
        socketRef.current = io(process.env.BACK_URL || '', {
          query: { roomId },
        });

        const socket = socketRef.current;

        listenCards({
          socket: socket,
          onUpdate: cards => setState({ cards }),
        });
        listenRoomShowState({
          socket: socket,
          onUpdate: shown => setState({ shown }),
        });

        getCards({ socket });
      });

    const socket = socketRef.current;
    return () => {
      if (socket && state.user.id) {
        socket.disconnect();
        leave({ socket, userId: state.user.id });
      }
    };
  }, []);

  return { state, handleGetCards, setState };
};
