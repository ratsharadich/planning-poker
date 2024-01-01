import { createBrowserRouter } from 'react-router-dom';
import { App } from './app';
import { ErrorPage } from './shared';
import { Room } from './pages';

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
