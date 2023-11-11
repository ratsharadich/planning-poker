import { FC, Fragment } from 'react';
import { useCreateGameEvents } from './hooks';
import { Button, Input, Typography } from 'shared';

type Props = {
  show: boolean;
  onOpen: () => void;
};

export const CreateGame: FC<Props> = ({ show, onOpen }) => {
  const {
    roomName,
    userName,
    handleRoomChange,
    handleNameChange,
    handleSumbit,
  } = useCreateGameEvents();

  return (
    <Fragment>
      {!show && (
        <Button variant="primary" dimension="l" onClick={onOpen}>
          <Typography.Body16_400>Создать</Typography.Body16_400>
        </Button>
      )}

      {show && (
        <div tw="flex flex-col items-center gap-3">
          <form tw="flex flex-col items-center gap-1" onSubmit={handleSumbit}>
            <Input
              variant="l"
              label="Название игры"
              value={roomName}
              onChange={handleRoomChange}
            />

            <Input
              variant="l"
              label="Ваше имя"
              value={userName}
              onChange={handleNameChange}
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
