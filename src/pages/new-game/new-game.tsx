import { FC } from 'react';
import { Button, Page, Typography } from 'shared';

export const NewGame: FC = ({}) => {
  return (
    <Page tw="flex flex-col justify-center items-center gap-4">
      <header tw="flex flex-col items-center gap-1">
        <Typography.H1>Planning poker</Typography.H1>
        <Typography.Body1_400>Оценка задач в сторипоинтах</Typography.Body1_400>
      </header>

      <Button intent="primary" size="l">
        <Typography.Body1_400>Создать</Typography.Body1_400>
      </Button>
    </Page>
  );
};
