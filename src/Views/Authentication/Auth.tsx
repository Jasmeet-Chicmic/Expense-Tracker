import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import ICONS from '../../assets';

const Auth = () => {
  const location = useLocation();
  const renderActiveAuth = useMemo(() => {
    switch (location.pathname) {
      case ROUTES.LOGIN:
        return <Login />;
      case ROUTES.REGISTER:
        return <Signup />;
      case ROUTES.FORGOT_PASSWORD:
        return <ForgotPassword />;
      case ROUTES.RESET_PASSWORD:
        return <ResetPassword />;
      default:
        return <div>Auth</div>;
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Auth Box */}
      <div className="flex flex-col lg:flex-row w-4/5 h-[600px] overflow-hidden bg-white bg-opacity-50 backdrop-blur-sm shadow-lg rounded-lg">
        {/* Image Section */}
        <div className="hidden lg:block w-1/2 h-full bg-cover bg-center  ">
          <img
            src={ICONS.expanseTrackerLogo}
            alt="Expanse Tracker Logo"
            style={{
              width: '100%',
              height: '100%',
              // objectFit: 'cover',
              // borderRadius: 'inherit', // Inherit the border-radius from the parent
            }}
          />
        </div>

        {/* Auth Section */}
        <div className="flex-1 flex justify-center items-center bg-white p-8 rounded-r-lg">
          {renderActiveAuth}
        </div>
      </div>
    </div>
  );
};

export default Auth;
