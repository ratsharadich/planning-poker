import { FC, Fragment } from 'react';
import { Button, Input, Typography } from 'shared';
import { useUnit } from 'effector-react';
import {
  $roomName,
  $userName,
  roomNameChanged,
  userNameChanged,
} from 'src/shared/model';
import { formSubmitted } from './model';

type Props = {
  show: boolean;
  onOpen: () => void;
};

export const CreateGame: FC<Props> = ({ show, onOpen }) => {
  const [userName, roomName] = useUnit([$userName, $roomName]);
  const [onUserNameChange, onRoomNameChange, onSubmit] = useUnit([
    userNameChanged,
    roomNameChanged,
    formSubmitted,
  ]);

  return (
    <Fragment>
      {!show && (
        <Button variant="primary" dimension="l" onClick={onOpen}>
          <Typography.Body16_400>Создать</Typography.Body16_400>
        </Button>
      )}

      {show && (
        <div tw="flex flex-col items-center gap-3">
          <form tw="flex flex-col items-center gap-1" onSubmit={onSubmit}>
            <Input
              variant="l"
              label="Название игры"
              value={roomName}
              onChange={onRoomNameChange}
            />

            <Input
              variant="l"
              label="Ваше имя"
              value={userName}
              onChange={onUserNameChange}
            />

            <Button
              type="submit"
              dimension="l"
              tw="w-full mt-2"
              disabled={!roomName || !userName}
            >
              Создать игру
            </Button>
          </form>
        </div>
      )}
    </Fragment>
  );
};
