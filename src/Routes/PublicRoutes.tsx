import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';

import { CustomRouter } from './RootRoutes';

import Auth from '../Views/Authentication/Auth';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Auth />,
  },
  {
    path: `${ROUTES_CONFIG.REGISTER.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Auth />,
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
