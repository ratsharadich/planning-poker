import { FC } from 'react';
import { useUnit } from 'effector-react';
import { form_submitted } from './model';
import { $user_name, user_name_changed } from 'shared/model/coords';
import { Button, Input } from 'shared/ui';

export const CreateUser: FC = () => {
  const [userName, onUserNameChange, onSubmit] = useUnit([
    $user_name,
    user_name_changed,
    form_submitted,
  ]);

  return (
    <div tw="h-full w-full flex justify-center items-center">
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
    </div>
  );
};
