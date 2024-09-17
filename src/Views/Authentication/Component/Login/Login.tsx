import { useEffect } from 'react';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { ui } from '../../../../firebase/firebase';
import { LOGIN_FORM_SCHEMA } from './helper/loginSchema';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';

import { updateAuthTokenRedux } from '../../../../Store/Common';
import { useDispatch } from 'react-redux';

import useFirbase from '../../../../Hooks/useFirbase';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setUserData, signInWithEmail } = useFirbase();

  //Social login Init
  useEffect(() => {
    // Initialize FirebaseUI Auth with config
    const googleLoginSuccess = async (user: any) => {
      await setUserData(user.uid, user.displayName, user.email, user.photoURL);

      // Dispatch the auth token to Redux store
      dispatch(updateAuthTokenRedux({ token: user?.accessToken }));
    };
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: ROUTES.HOMEPAGE,
      signInOptions: [
        { provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID },
        // Add other providers if needed
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          // On success, stop the loader

          // Extract the user object from authResult
          const user = authResult.user;

          if (user) {
            const providerData = user.providerData[0]?.providerId;

            // Check if logged in via Google provider
            if (providerData === firebase.auth.GoogleAuthProvider.PROVIDER_ID) {
              console.log('User logged in with Google:', user);
              googleLoginSuccess(user);
            }
          }

          // Optionally, prevent Firebase UI from redirecting
          return false; // Prevent redirect after sign-in
        },
        signInFailure: (error: any) => {
          // On failure, stop the loader and log the error

          console.error('Sign-in failure:', error);
        },
      },
    };

    // Initialize FirebaseUI
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => ui.reset(); // Clean up UI on component unmount
  }, []);

  const handleLogin = async (data: any) => {
    await signInWithEmail(data.email, data.password);
  };

  const handleForgotPassword = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  return (
    <div>
      <h1 className="text-center mb-4">Sign In</h1>
      <CustomForm
        id="login-form"
        formData={LOGIN_FORM_SCHEMA}
        defaultValues={{}}
        onSubmit={handleLogin}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        submitText="Login"
      />
      <div className="text-center">
        <p className="font-weight-bold mx-auto">OR</p>
      </div>
      <div id="firebaseui-auth-container" className=""></div>
      <div>
        <div className="text-center text-red-500">
          <p
            className="font-weight-bold mx-auto cursor-pointer"
            onClick={() => {
              handleForgotPassword();
            }}
          >
            Forgot Password ?
          </p>
        </div>
        <p>
          Create an account{' '}
          <span
            onClick={() => {
              navigate(ROUTES.REGISTER);
            }}
            className="cursor-pointer text-blue-600"
          >
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
