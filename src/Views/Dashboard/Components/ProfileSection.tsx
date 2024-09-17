import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Store/Loader';
import { signOut } from 'firebase/auth/cordova';
import { auth } from '../../../firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import { ROUTES } from '../../../Shared/Constants';
import ProfileDetails from './ProfileDetails';

import ThemeToggle from './ThemeToggle';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for theme management

  // Effect to apply theme based on state

  // Handle logout
  const handleLogout = () => {
    console.log('Logout');
    dispatch(setLoading(true));
    signOut(auth)
      .then(() => {
        console.log('signout success');
        dispatch(setLoading(false));
        dispatch(updateAuthTokenRedux({ token: false }));
        navigate(ROUTES.LOGIN);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log('Error in Logout', error);
      });
  };

  // Toggle theme handler

  return (
    <div className="flex flex-col h-screen w-60 bg-opacity-70 bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
      {/* Profile Header */}
      <ProfileDetails />

      {/* Theme Toggle */}

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to={ROUTES.DASHBOARD_HOMEPAGE}
              className="block p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.TRANSACTIONS}
              className="block p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="block p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Notifications
            </Link>
          </li>
        </ul>
      </nav>
      <ThemeToggle></ThemeToggle>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="block w-full p-2 text-red-500 bg-red-200 rounded-md hover:bg-red-300 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
