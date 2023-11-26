import { FC, useCallback, useState } from 'react';
import { Page, Typography } from 'shared';
import { CreateGame } from './features';

export const App: FC = () => {
  const [createForm, setCreateForm] = useState(false);

  const handleCreateFormOpen = useCallback(() => {
    setCreateForm(true);
  }, []);

  return (
    <Page tw="flex flex-col justify-center items-center gap-4">
      {!createForm && (
        <header tw="flex flex-col items-center gap-1">
          <Typography.H1>Planning poker</Typography.H1>
          <Typography.Body16_400>
            Оценка задач в сторипоинтах
          </Typography.Body16_400>
        </header>
      )}

      <CreateGame show={createForm} onOpen={handleCreateFormOpen} />
    </Page>
  );
};
