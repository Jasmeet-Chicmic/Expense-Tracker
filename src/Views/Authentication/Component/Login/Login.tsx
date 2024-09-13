import { useEffect } from 'react';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { auth, ui } from '../../../../firebase/firebase';
import { LOGIN_FORM_SCHEMA } from './helper/loginSchema';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { updateAuthTokenRedux } from '../../../../Store/Common';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../Store/Loader';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize FirebaseUI Auth with config
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
              // Dispatch the auth token to Redux store
              dispatch(updateAuthTokenRedux({ token: user?.accessToken }));
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

  const handleLogin = (data: any) => {
    dispatch(setLoading(true));
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        dispatch(setLoading(false));
        const user: any = userCredential.user;

        dispatch(updateAuthTokenRedux({ token: user?.accessToken }));
        navigate(ROUTES.HOMEPAGE);
        // ...
      })
      .catch((error) => {
        dispatch(setLoading(false));
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
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
      <div
        id="firebaseui-auth-container"
       
        className=""
      ></div>
      <div>
        <p>
          Create an account{' '}
          <span
            onClick={() => {
              navigate(ROUTES.REGISTER);
            }}
          >
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
