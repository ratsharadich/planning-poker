import { FC, Fragment, useEffect } from 'react';
import { Button, Input, Typography } from 'shared';
import { useCreateGameEvents } from './hooks';

type Props = {
  show: boolean;
  onOpen: () => void;
};

export const CreateGame: FC<Props> = ({ show, onOpen }) => {
  const { userName, roomName, onUserNameChange, onRoomNameChange, onSubmit } =
    useCreateGameEvents();

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
