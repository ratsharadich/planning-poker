import { useGate, useUnit } from 'effector-react';
import { CreateGameGate, formSubmitted } from '../model';
import {
  $roomName,
  $userName,
  roomNameChanged,
  userNameChanged,
} from 'shared/model';

export const useCreateGameEvents = () => {
  const [userName, roomName] = useUnit([$userName, $roomName]);
  const [onUserNameChange, onRoomNameChange, onSubmit] = useUnit([
    userNameChanged,
    roomNameChanged,
    formSubmitted,
  ]);

  useGate(CreateGameGate);

  return {
    userName,
    roomName,
    onUserNameChange,
    onRoomNameChange,
    onSubmit,
  };
};
