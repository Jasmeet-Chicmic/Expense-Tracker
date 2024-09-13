import { doc, getDoc } from 'firebase/firestore';
import DashboardPageHandler from './DashboardHandler/DashboardPageHandler';
import { auth, db } from '../../firebase/firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../Store/User';
import { onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async (uid: string) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          console.log('User data:', userDoc.data());
          const data = userDoc.data();
          dispatch(
            updateUserData({
              userName: data.Username || 'dummy',
              photoUrl: data.PhotoUrl,
            })
          );
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

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
