import { cardsGotten } from './../model';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, SocketActions, User, useReducerAsState } from 'shared';
import { $socket, socketSet, $userId } from 'shared/model';
import { $createUserForm, createUserFormSwitched } from '../features';

type Args = {
  roomId: string;
};

// const { listenCards, listenRoomShowState } = SocketListeners;

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
  const [onCreateUserFormSwitch, getCards] = useUnit([
    createUserFormSwitched,
    cardsGotten,
  ]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (socket) {
  //     listenCards({
  //       socket,
  //       onUpdate: cards => setState({ cards }),
  //     });
  //     listenRoomShowState({
  //       socket,
  //       onUpdate: shown => setState({ shown }),
  //     });

  //     getCards();
  //   }
  // }, [socket]);

  return { state, createUserForm, setState };
};
