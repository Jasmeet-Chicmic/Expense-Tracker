import { useNavigate } from 'react-router-dom';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { SIGN_UP_FORM_SCHEMA } from './helper/signUpSchema';
import { ROUTES } from '../../../../Shared/Constants';
import { auth, db } from '../../../../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../Store/Loader';
import useNotifications from '../../../../Hooks/useNotifications';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useNotifications();

  const setUserData = async (user: any, values: any) => {
    console.log('values', values);

    try {
      await setDoc(doc(db, 'users', user.uid), {
        Username: values?.username,
        Email: user.email,
        PhotoUrl: user.photoURL || '',
        CreatedAt: new Date(),
        Income: 0,
        Balance: 0,
        Expenses: 0,
      });
    } catch (error) {
      console.log('Error setting user data: ', error);
    }
  };
  const handleSignup = async (values: any) => {
    dispatch(setLoading(true));

    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      notifySuccess('Verification email sent. Please verify your email.');
      try {
        await setUserData(user, values);
        console.log('User data set successfully');
      } catch (error) {
        console.log('Error setting user data: ', error);
      }

      // Stop the loader and navigate to login page
      dispatch(setLoading(false));
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      notifyError(error.message);
      dispatch(setLoading(false));
      console.log('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Sign Up</h1>
      <CustomForm
        id="signup-form"
        formData={SIGN_UP_FORM_SCHEMA}
        defaultValues={{}}
        onSubmit={handleSignup}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        submitText="Sign Up"
      />
      <div>
        <p>
          Already have an account?{' '}
          <span
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
            className="text-blue-600 cursor-pointer"
          >
            click here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
