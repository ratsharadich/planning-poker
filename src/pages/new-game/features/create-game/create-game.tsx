import { FC } from 'react';
import { useCreateGameEvents } from './hooks';
import { Button, Input } from 'shared';

export const CreateGame: FC = () => {
  const {
    roomName,
    userName,
    handleRoomChange,
    handleNameChange,
    handleSumbit,
  } = useCreateGameEvents();

  return (
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
          variant="l"
          tw="w-full mt-2"
          disabled={!roomName || !userName}
        >
          Создать игру
        </Button>
      </form>
    </div>
  );
};
