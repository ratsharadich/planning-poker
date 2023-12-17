import { useRouteError } from 'react-router-dom';

import { FC } from 'react';
import { Page } from './page';
import { Typography } from './typography';

type CustomError = {
  statusText: string;
  message: string;
};

export const ErrorPage: FC = ({}) => {
  const error = useRouteError() as CustomError;
  console.error(error);

  return (
    <Page tw="flex flex-col justify-center items-center">
      <Typography.H1>Такого адреса нет :\</Typography.H1>
      <Typography.Body14_400>
        {error.statusText || error.message}
      </Typography.Body14_400>
    </Page>
  );
};
