import { useUnit } from 'effector-react';
import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  SocketActions,
  SocketListeners,
  User,
  useReducerAsState,
} from 'shared';
import { getRoom } from 'shared/api/rest';
import { io } from 'socket.io-client';
import { $socket, socketSet, $userId } from 'shared/model';
import { $createUserForm, createUserFormSwitched } from '../features';

type Args = {
  roomId: string;
};

const { getCards, leave } = SocketActions;
const { listenCards, listenRoomShowState } = SocketListeners;

// TODO: move to model
export const useRoomEvents = ({ roomId }: Args) => {
  const [state, setState] = useReducerAsState<{
    shown: boolean;
    user: User;
    cards: Card[];
  }>({
    shown: false,
    user: { id: localStorage.getItem('userId') || '', name: '' },
    cards: [],
  });

  const [socket, setSocket] = useUnit([$socket, socketSet]);
  const [createUserForm, userId] = useUnit([$createUserForm, $userId]);
  const [onCreateUserFormSwitch] = useUnit([createUserFormSwitched]);

  const navigate = useNavigate();

  const handleGetCards = useCallback(() => {
    if (socket) {
      getCards({ socket });
    }
  }, []);

  useEffect(() => {
    getRoom({ roomId })
      .then(room => {
        if (room) {
          const userInRoom = room.users?.find(({ id }) => id === userId);

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
            onCreateUserFormSwitch(true);
          }
        }
      })
      .finally(() => {
        setSocket(
          io(process.env.BACK_URL || '', {
            query: { roomId },
          }),
        );
      });
    return () => {
      if (socket && state.user.id) {
        socket.disconnect();
        leave({ socket, userId: state.user.id });
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      listenCards({
        socket,
        onUpdate: cards => setState({ cards }),
      });
      listenRoomShowState({
        socket,
        onUpdate: shown => setState({ shown }),
      });

      getCards({ socket });
    }
  }, [socket]);

  return { state, createUserForm, handleGetCards, setState };
};
