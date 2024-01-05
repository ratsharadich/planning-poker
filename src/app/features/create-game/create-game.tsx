import { FC, Fragment } from 'react';
import { useUnit } from 'effector-react';

import { form_showed, form_submitted } from './model';
import { Button, Typography } from 'shared/ui';
import { RoomName, Submit, UserName } from './ui';

type Props = {
  shown: boolean;
};

export const CreateGame: FC<Props> = ({ shown }) => {
  const [onFormOpen, onSubmit] = useUnit([form_showed, form_submitted]);

  return (
    <Fragment>
      {!shown && (
        <Button variant="primary" dimension="l" onClick={onFormOpen}>
          <Typography.Body16_400>Создать</Typography.Body16_400>
        </Button>
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
    </Fragment>
  );
};
