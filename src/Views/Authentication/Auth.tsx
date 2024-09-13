import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/helper/Signup';

const Auth = () => {
  const location = useLocation();
  const renderActiveAuth = useMemo(() => {
    switch (location.pathname) {
      case ROUTES.LOGIN:
        return <Login />;
      case ROUTES.REGISTER:
        return <Signup></Signup>;

      default:
        return <div>Auth</div>;
    }
  }, [location]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Auth Box */}
      <div className="flex flex-col lg:flex-row w-4/5 h-4/5 bg-gray-900 bg-opacity-50 backdrop-blur-sm shadow-lg rounded-lg">
        {/* Image Section */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('your-image-url.jpg')` }}
        >
          {/* You can replace 'your-image-url.jpg' with the actual image URL */}
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
