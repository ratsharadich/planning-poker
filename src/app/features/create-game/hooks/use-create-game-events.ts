import { useUnit } from 'effector-react';
import {
  $roomId,
  $roomName,
  $userName,
  formSubmitted,
  roomNameChanged,
  userNameChanged,
} from '../model';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCreateGameEvents = () => {
  const [userName, roomName, roomId] = useUnit([$userName, $roomName, $roomId]);
  const [onUserNameChange, onRoomNameChange, onSubmit] = useUnit([
    userNameChanged,
    roomNameChanged,
    formSubmitted,
  ]);

  const navigate = useNavigate();

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
