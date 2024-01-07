import { FC, Fragment } from 'react';
import { useUnit } from 'effector-react';

import { $create_game_form, form_showed, form_submitted } from './model';
import { Button, Typography } from 'shared/ui';
import { RoomName, Submit, UserName } from './ui';
import tw from 'twin.macro';

export const CreateGame: FC = () => {
  const [shown, onFormOpen, onSubmit] = useUnit([
    $create_game_form,
    form_showed,
    form_submitted,
  ]);

  return (
    <Container>
      {!shown && (
        <Fragment>
          <header tw="flex flex-col items-center gap-1">
            <Typography.H1>Planning poker</Typography.H1>
            <Typography.Body16_400>
              Оценка задач в сторипоинтах
            </Typography.Body16_400>
          </header>

          <Button variant="primary" dimension="l" onClick={onFormOpen}>
            <Typography.Body16_400>Создать</Typography.Body16_400>
          </Button>
        </Fragment>
      )}

      {shown && (
        <div tw="flex flex-col items-center gap-3">
          <form tw="flex flex-col items-center gap-1" onSubmit={onSubmit}>
            <RoomName />
            <UserName />
            <Submit />
          </form>
        </div>
      )}
    </Container>
  );
};

const Container = tw.div`h-full w-full flex flex-col justify-center items-center gap-4`;
