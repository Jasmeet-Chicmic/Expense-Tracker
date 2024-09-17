import DashboardPageHandler from './DashboardHandler/DashboardPageHandler';
import { auth } from '../../firebase/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import useFirbase from '../../Hooks/useFirbase';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { fetchUserData } = useFirbase();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('User ID:', user.uid);
        fetchUserData(user.uid);
      } else {
        // No user is signed in
        console.log('No user is signed in.');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="h-full w-full flex">
      <div className="flex-1">
        <DashboardPageHandler />
      </div>
    </div>
  );
}
