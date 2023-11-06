import { socket } from 'config';
import { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useReducerAsState } from 'shared';

export const useCreateGameEvents = () => {
  const [{ userName, roomName, roomId }, setState] = useReducerAsState({
    userName: '',
    roomName: '',
    roomId: '',
  });

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
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      socket.connect();

      if (userName && roomName) {
        socket.emit('join', { userName, roomName });

        socket.on('session-joined', ({ roomId }) => {
          setState({ roomId });
        });
      }
    },
    [userName, roomName],
  );

  useEffect(() => {
    // TODO: add listener
    () => socket.off('session-joined');
  }, []);

  return {
    roomId,
    roomName,
    userName,
    handleRoomChange,
    handleNameChange,
    handleSumbit,
  };
};
