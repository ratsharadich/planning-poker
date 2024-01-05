import { FC } from 'react';
import { $create_game_form, CreateGame } from './features';
import { Page, Typography } from 'shared/ui';
import { useUnit } from 'effector-react';

export const App: FC = () => {
  const [shown] = useUnit([$create_game_form]);

  return (
    <Page tw="flex flex-col justify-center items-center gap-4">
      {!shown && (
        <header tw="flex flex-col items-center gap-1">
          <Typography.H1>Planning poker</Typography.H1>
          <Typography.Body16_400>
            Оценка задач в сторипоинтах
          </Typography.Body16_400>
        </header>
      )}

      <CreateGame shown={shown} />
    </Page>
  );
};
