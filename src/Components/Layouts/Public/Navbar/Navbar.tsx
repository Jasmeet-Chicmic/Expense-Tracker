import './navbar.scss';
import { auth } from '../../../../firebase/firebase';
import {  updateAuthTokenRedux } from '../../../../Store/Common';

import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth/cordova';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../Store/Loader';

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log('Logout');
    dispatch(setLoading(true));
    signOut(auth)
      .then(() => {
        console.log('signout suceess');
        dispatch(setLoading(false));
        dispatch(updateAuthTokenRedux({ token: false }));
        navigate('/login');
        // Sign-out successful.
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log('Error in Logout', error);

        // An error happened.
      });
    // Add your logout functionality here
  };

  return (
    <header className="bg-black text-white p-4">
      <div className="flex justify-between items-center mx-1 mx-auto">
        <h1 className="text-xl font-normal">Expense Tracker</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
