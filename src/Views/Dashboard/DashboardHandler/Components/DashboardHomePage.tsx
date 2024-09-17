import { useDispatch } from 'react-redux';
import AdditionButtons from './DashboardHomePageComponents/AdditionButtons';
import OverView from './DashboardHomePageComponents/OverView';
import SpendFrequency from './DashboardHomePageComponents/SpendFrequency';
import TransactionSection from './DashboardHomePageComponents/TransactionSection';
import useFirbase from '../../../../Hooks/useFirbase';
import { useEffect } from 'react';
import { setLoading } from '../../../../Store/Loader';
import { onAuthStateChanged } from 'firebase/auth/cordova';
import { auth } from '../../../../firebase/firebase';
import { updateAuthTokenRedux } from '../../../../Store/Common';

const DashboardHomePage = () => {
  const dispatch = useDispatch();
  const { fetchUserData } = useFirbase();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log('Fetch user data successful');
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
    <div className="flex flex-col h-screen text-black dark:text-white">
      <div className="text-3xl font-bold h-[80px] flex p-4 justify-between items-center">
        <div className="text-black dark:text-white">Dashboard</div>
        <AdditionButtons></AdditionButtons>
      </div>

      <div className="flex  gap-4 p-4 h-5/6">
        <div className="flex flex-col flex-1 gap-4">
          <OverView></OverView>
          <SpendFrequency></SpendFrequency>
        </div>
        <TransactionSection></TransactionSection>
      </div>
    </div>
  );
};

export default DashboardHomePage;
