import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { Room } from './pages';
import { ErrorPage } from './shared/ui';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'room/:roomId',
    element: <Room />,
  },
]);
