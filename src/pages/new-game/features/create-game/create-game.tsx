import { FC } from 'react';
import { useCreateGameEvents } from './hooks';
import { Button, Input } from 'shared';
import { getUsers } from 'config';

export const CreateGame: FC = () => {
  const {
    roomId,
    roomName,
    userName,
    handleRoomChange,
    handleNameChange,
    handleSumbit,
  } = useCreateGameEvents();

  const handleUsersGet = async () => {
    const data = await getUsers(roomId);
    console.log(data);
  };

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

        <Button
          type="button"
          variant="l"
          tw="w-full mt-2"
          onClick={handleUsersGet}
        >
          Запросить юзеров
        </Button>
      </form>
    </div>
  );
};
