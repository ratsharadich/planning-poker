import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { CreateGame, Room } from './pages';
import { ErrorPage } from './shared/ui';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CreateGame />,
      },
      {
        path: 'room/:roomId',
        element: <Room />,
      },
    ],
  },
]);
