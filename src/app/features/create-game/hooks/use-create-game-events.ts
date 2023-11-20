import { ChangeEvent, FormEvent, useCallback } from 'react';
import { addUserToStorage, createGuid, useReducerAsState } from 'shared';
import { useNavigate } from 'react-router-dom';
import { createUser, createRoom, getRoom } from 'shared/api/rest';

export const useCreateGameEvents = () => {
  const [{ userName, roomName }, setState] = useReducerAsState({
    userName: '',
    roomName: '',
  });

  const navigate = useNavigate();

  const handleRoomChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState({
      roomName: e.target.value.slice(0, 10).replace(/[^a-zA-Z0-9а-яА-Я]/g, ''),
    });
  }, []);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState({
      userName: e.target.value.slice(0, 10).replace(/[^a-zA-Z0-9а-яА-Я]/g, ''),
    });
  }, []);

  const handleSumbit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      //TODO

      // addUserToStorage({ userName });

      const userId = (await createUser({ userName })) || '';
      const roomId = (await createRoom({ roomName, userId })) || '';
      console.log(await getRoom({ roomId }));

      // navigate(`/room/${roomId}`);
    },
    [userName, roomName],
  );

  return {
    roomName,
    userName,
    handleRoomChange,
    handleNameChange,
    handleSumbit,
  };
};
