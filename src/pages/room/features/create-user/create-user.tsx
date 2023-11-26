import { FC } from 'react';
import { Button, Input } from 'shared';
import { CreateUserProps } from './types';
import { useCreateUserEvents } from './hooks';

export const CreateUser: FC<CreateUserProps> = ({
  socketRef,
  onUserCreated,
}) => {
  const { isLoading, userName, handleNameChange, handleCreateUser } =
    useCreateUserEvents({ socketRef, onUserCreated });

  return (
    <div tw="h-full w-full flex justify-center items-center">
      {isLoading && '...Загрузка'}

      {!isLoading && (
        <div tw="flex flex-col items-center gap-3">
          <form
            tw="flex flex-col items-center gap-1"
            onSubmit={handleCreateUser}
          >
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
              disabled={!userName}
            >
              Создать игру
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
