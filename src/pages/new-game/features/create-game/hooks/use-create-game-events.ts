import { socket } from 'shared/config';
import { ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { joinRoom, useReducerAsState } from 'shared';
import { useNavigate } from 'react-router-dom';

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
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      joinRoom({
        userName,
        roomName,
        onSessionJoined: ({ roomId }) => {
          navigate(`/room/${roomId}`);
        },
      });
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
