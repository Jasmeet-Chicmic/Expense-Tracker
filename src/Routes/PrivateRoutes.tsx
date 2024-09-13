import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import { CustomRouter } from './RootRoutes';

import Dashboard from '../Views/Dashboard';

import DashboardPageHandler from '../Views/Dashboard/DashboardHandler/DashboardPageHandler';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.DASHBOARD_HOMEPAGE.path,
    element: <DashboardPageHandler />,
    title: ROUTES_CONFIG.DASHBOARD_HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.TRANSACTIONS.path,
    element: <DashboardPageHandler />,
    title: ROUTES_CONFIG.TRANSACTIONS.title,
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
