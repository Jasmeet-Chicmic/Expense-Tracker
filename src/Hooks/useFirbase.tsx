import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth/cordova';
import useNotifications from './useNotifications';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../Store/Common';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Shared/Constants';
import { setLoading } from '../Store/Loader';
import { updateUserData } from '../Store/User';

const useFirbase = () => {
  const { notifySuccess, notifyError } = useNotifications();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserData = async (
    userId: string,
    displayName: string,
    email: string,
    photoURL: string
  ) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        dispatch(setLoading(true));
        await setDoc(userDocRef, {
          Username: displayName || 'dummy',
          Email: email,
          PhotoUrl: photoURL || '',
          CreatedAt: new Date(),
          Income: 0,
          Balance: 0,
          Expenses: 0,
        });
        dispatch(setLoading(false));
        console.log('User data has been set.');
      } else {
        console.log('User data already exists.');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('Error setting user data: ', error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: any = credentials?.user;
      if (user.emailVerified) {
        notifySuccess('Logged in successfully!');

        dispatch(setLoading(false));
        dispatch(updateAuthTokenRedux({ token: user?.accessToken }));
        navigate(ROUTES.HOMEPAGE);
      } else {
        notifyError('Please verify your email before logging in.');
        dispatch(setLoading(false));
        auth.signOut();
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('Error creating user with email and password: ', error);
    }
  };

  const createUserWithEmail = async (
    email: string,
    password: string,
    username: string
  ) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      await setUserData(user.uid, username, email, '');
      notifySuccess('Verification email sent. Please verify your email.');
      dispatch(setLoading(false));
      navigate(ROUTES.LOGIN);
    } catch (error) {
      dispatch(setLoading(false));
      console.log('Error creating user with email and password: ', error);
    }
  };

  const sendPassResetEmail = async (email: string) => {
    try {
      dispatch(setLoading(true));
      await sendPasswordResetEmail(auth, email);
      notifySuccess('Password reset email sent. Please check your inbox.');
      dispatch(setLoading(false));
    } catch (error) {
      notifyError('Error sending password reset email.');
      dispatch(setLoading(false));
    }
  };

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {

        const data = userDoc.data();
        dispatch(
          updateUserData({
            userName: data.Username || 'dummy',
            photoUrl: data.PhotoUrl,
            income: data.Income || 0,
            expenses: data.Expenses || 0,
            balance: data.Balance || 0,
          })
        );
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  return {
    setUserData,
    signInWithEmail,
    createUserWithEmail,
    sendPassResetEmail,
    fetchUserData
  };
  
};

export default useFirbase;
