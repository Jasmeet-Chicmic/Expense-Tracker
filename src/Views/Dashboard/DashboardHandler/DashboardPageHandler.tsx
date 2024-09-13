import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import DashboardHomePage from './Components/DashboardHomePage';
import Transactions from './Components/Transactions';

const DashboardPageHandler = () => {
  const location = useLocation();
  const renderActiveAuth = useMemo(() => {
    switch (location.pathname) {
      case ROUTES.DASHBOARD_HOMEPAGE:
        return <DashboardHomePage />;
      case ROUTES.TRANSACTIONS:
        return <Transactions />;

      default:
        return <DashboardHomePage />;
    }
  }, [location]);
  return <div>{renderActiveAuth}</div>;
};

export default DashboardPageHandler;
