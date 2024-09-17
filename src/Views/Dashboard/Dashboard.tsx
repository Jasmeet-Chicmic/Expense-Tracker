import DashboardPageHandler from './DashboardHandler/DashboardPageHandler';
import { auth } from '../../firebase/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import useFirbase from '../../Hooks/useFirbase';
import { setLoading } from '../../Store/Loader';
import { updateAuthTokenRedux } from '../../Store/Common';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { fetchUserData } = useFirbase();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in

        fetchUserData(user.uid);
      } else {
        // No user is signed in

        dispatch(updateAuthTokenRedux({ token: false }));

        dispatch(setLoading(false));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="flex-1">
        <DashboardPageHandler />
      </div>
    </div>
  );
}
