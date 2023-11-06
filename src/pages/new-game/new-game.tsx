import { FC, Fragment } from 'react';
import { Button, Page, Typography, useSwitch } from 'shared';
import { CreateGame } from './features';

export const NewGame: FC = () => {
  const [show, { on: open }] = useSwitch(false);

  return (
    <Page tw="flex flex-col justify-center items-center gap-4">
      {!show && (
        <Fragment>
          <header tw="flex flex-col items-center gap-1">
            <Typography.H1>Planning poker</Typography.H1>
            <Typography.Body16_400>
              Оценка задач в сторипоинтах
            </Typography.Body16_400>
          </header>
          <Button intent="primary" variant="l" onClick={open}>
            <Typography.Body16_400>Создать</Typography.Body16_400>
          </Button>
        </Fragment>
      )}

      {show && <CreateGame />}
    </Page>
  );
};
