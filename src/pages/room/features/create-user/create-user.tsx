import { FC } from 'react';
import { Button, Input } from 'shared';
import { useUnit } from 'effector-react';
import { $isLoading, formSubmitted } from './model';
import { $userName, userNameChanged } from 'shared/model';

export const CreateUser: FC = () => {
  const [isLoading, userName] = useUnit([$isLoading, $userName]);
  const [onUserNameChange, onSubmit] = useUnit([
    userNameChanged,
    formSubmitted,
  ]);

  return (
    <div tw="h-full w-full flex justify-center items-center">
      {isLoading && '...Загрузка'}

      {!isLoading && (
        <div tw="flex flex-col items-center gap-3">
          <form tw="flex flex-col items-center gap-1" onSubmit={onSubmit}>
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
