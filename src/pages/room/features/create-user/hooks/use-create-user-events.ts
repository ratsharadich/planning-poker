import { ChangeEvent, FormEvent, useCallback } from 'react';
import { createUser } from 'shared/api/rest';
import { CreateUserProps } from '../types';
import { SocketActions, useReducerAsState } from 'shared';

const { addUserToRoom } = SocketActions;

export const useCreateUserEvents = ({
  socketRef,
  onUserCreated,
}: CreateUserProps) => {
  const [{ isLoading, userName }, setState] = useReducerAsState({
    isLoading: false,
    userName: '',
  });

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState({
      userName: e.target.value.slice(0, 10).replace(/[^a-zA-Z0-9а-яА-Я]/g, ''),
    });
  }, []);

  console.log('userName', userName);

  const handleCreateUser = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        setState({ isLoading: true });
        const userId = await createUser({ userName });

        if (userId && socketRef.current) {
          localStorage.setItem('userId', userId);
          addUserToRoom({ socket: socketRef.current, userId });

          onUserCreated({
            userId,
            userName,
          });
        }
      } catch (error) {
      } finally {
        setState({ isLoading: false });
      }
    },
    [userName],
  );

  return { isLoading, userName, handleNameChange, handleCreateUser };
};
