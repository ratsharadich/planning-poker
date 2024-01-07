import { FC } from 'react';
import { Page } from 'shared/ui';
import { Outlet } from 'react-router-dom';

export const App: FC = () => {
  return (
    <Page>
      <Outlet />
    </Page>
  );
};
