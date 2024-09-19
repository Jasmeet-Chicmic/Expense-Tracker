import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { ROUTES } from '../../../Shared/Constants';
import ProfileDetails from './ProfileDetails';

import ThemeToggle from './ThemeToggle';
import { MODAL_TYPES, openModal } from '../../../Store/Modal';

const ProfileSection = () => {
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(
      openModal({
        modalType: MODAL_TYPES.CONFIRMATION_MODAL,
        modalProps: {
          message: 'Are you sure you want to logout?',
          title: 'Logout',
        },
      })
    );
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
