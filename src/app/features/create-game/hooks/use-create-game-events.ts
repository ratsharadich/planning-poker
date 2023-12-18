import { useGate, useUnit } from 'effector-react';
import { createGameGate, formSubmitted } from '../model';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  $roomId,
  $roomName,
  $userName,
  roomNameChanged,
  userNameChanged,
} from 'shared/model';

export const useCreateGameEvents = () => {
  const [userName, roomName, roomId] = useUnit([$userName, $roomName, $roomId]);
  const [onUserNameChange, onRoomNameChange, onSubmit] = useUnit([
    userNameChanged,
    roomNameChanged,
    formSubmitted,
  ]);

  const navigate = useNavigate();

  useGate(createGameGate);

  // TODO: move to gate
  useEffect(() => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  }, [roomId]);

  return {
    userName,
    roomName,
    onUserNameChange,
    onRoomNameChange,
    onSubmit,
  };
};
