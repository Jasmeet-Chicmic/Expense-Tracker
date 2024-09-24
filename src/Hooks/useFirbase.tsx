import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth/cordova';
import useNotifications from './useNotifications';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../Store/Common';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Shared/Constants';
import { setLoading } from '../Store/Loader';
import { updateAmount, updateUserData, updateUserName } from '../Store/User';

export enum TRANSACTION_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense',
  ALL = 'all',
}
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
      } else {
      }
    } catch (error) {
      dispatch(setLoading(false));
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
      notifyError('Error logging in' + error);
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

        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        notifyError('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const addTransaction = async (
    userId: string | undefined,
    amount: number,
    description: string,
    transactionType: TRANSACTION_TYPE
  ) => {
    if (userId) {
      // Add the new expense to the user's 'expenses' collection
      await addDoc(collection(db, 'users', userId, 'transactions'), {
        amount: amount,
        description: description,
        transactionType: transactionType,
        createdAt: new Date(),
      });

      if (transactionType === TRANSACTION_TYPE.EXPENSE)
        // Update the total expenses and balance in Firestore
        await updateTotalExpenseAndBalance(amount);
    }
  };

  async function updateTotalExpenseAndBalance(amount: number) {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      // Get the user's document reference
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentExpenses = userData?.Expenses || 0;
        const currentBalance = userData?.Balance || 0;

        // Calculate the new expenses and balance
        const newExpenses = currentExpenses + amount;
        const newBalance = currentBalance - amount; // Assuming balance decreases by expense amount

        // Update the Expenses and Balance fields in Firestore
        await updateDoc(userDocRef, {
          Expenses: newExpenses,
          Balance: newBalance,
        });
      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error updating expenses and balance:', error);
    }
  }

  const updateTotalIncomeAndBalance = async (
    amount: number,
    description: string
  ) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }

    try {
      // Get the user's document reference
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const currentIncome = userData?.Income || 0;
        const currentBalance = userData?.Balance || 0;

        // Calculate the new expenses and balance
        const newIncome = currentIncome + amount;
        const newBalance = currentBalance + amount; // Assuming balance decreases by expense amount

        // Update the Expenses and Balance fields in Firestore
        await updateDoc(userDocRef, {
          Income: newIncome,
          Balance: newBalance,
        });
        await addTransaction(
          auth.currentUser?.uid,
          amount,
          description,
          TRANSACTION_TYPE.INCOME
        );
      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error updating expenses and balance:', error);
    }
  };
  const handleDeleteTransaction = async (
    transactionId: string,
    transactionType: string,
    amount: number
  ) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('User is not authenticated.');
      return;
    }

    dispatch(setLoading(true));

    try {
      // Reference to the transaction document
      const transactionDocRef = doc(
        db,
        'users',
        userId,
        'transactions',
        transactionId
      );

      // Reference to the user's document
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error('User document not found.');
      }

      const { Income, Balance, Expenses } = userDoc.data() as {
        Income: number;
        Expenses: number;
        Balance: number;
      };

      let newBalance = Balance;
      let newIncome = Income;
      let newExpenses = Expenses;
      if (transactionType === TRANSACTION_TYPE.EXPENSE) {
        newBalance = Balance + amount;
        newExpenses = Expenses - amount;
      } else if (transactionType === TRANSACTION_TYPE.INCOME) {
        newIncome = Income - amount;
        newBalance = Balance - amount;
      }

      // Delete the transaction
      await deleteDoc(transactionDocRef);

      // Update user's document with new totals
      await updateDoc(userDocRef, {
        Income: newIncome,
        Expenses: newExpenses,
        Balance: newBalance,
      });
      dispatch(
        updateAmount({
          balance: newBalance,
          income: newIncome,
          expenses: newExpenses,
        })
      );
      dispatch(setLoading(false));
      notifySuccess('Transaction deleted successfully.');

      // Update local state to remove the deleted transaction
    } catch (error) {
      dispatch(setLoading(false));
      notifyError('Error deleting transaction.');
      console.error('Error deleting transaction:', error);
    }
  };

  const signOutUser = async () => {
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

  const updateUserDetails = async (userId: string, username: string) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        dispatch(setLoading(true));
        await updateDoc(userDocRef, {
          Username: username,
        });
        dispatch(updateUserName(username));
        dispatch(setLoading(false));
        notifySuccess('User details updated successfully.');
      } else {
        notifyError('User document not found.');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.error('Error updating user details:', error);
    }
  };

  return {
    updateUserDetails,
    setUserData,
    signInWithEmail,
    createUserWithEmail,
    sendPassResetEmail,
    fetchUserData,
    addTransaction,
    updateTotalIncomeAndBalance,
    handleDeleteTransaction,
    signOutUser,
  };
};

export default useFirbase;
