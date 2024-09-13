import { useState } from 'react';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { FORGOT_PASSWORD_SCHEMA } from './helper/forgotPasswordSchema';
import { auth } from '../../../../firebase/firebase'; // Ensure Firebase is correctly initialized
import { sendPasswordResetEmail } from 'firebase/auth/cordova';
import useNotifications from '../../../../Hooks/useNotifications';
import { setLoading } from '../../../../Store/Loader';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotifications();
  const [email, setEmail] = useState('');

  const handleForgotPassword = (data: any) => {
    const email = data.email;
    setEmail(email);
    if (!email) {
      notifyError('Please enter your email.');
      return;
    }

    dispatch(setLoading(true));

    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(setLoading(false));
        notifySuccess('Password reset email sent successfully.');
      })
      .catch((error) => {
        dispatch(setLoading(false));
        notifyError(`Error: ${error.message}`);
        console.error('Password reset error:', error.code, error.message);
      });
  };

  return (
    <div>
      <h1 className="text-center mb-4">Forgot Password</h1>
      <CustomForm
        id="forgot-password-form"
        formData={FORGOT_PASSWORD_SCHEMA}
        defaultValues={{ email }}
        onSubmit={handleForgotPassword}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        submitText="Continue"
      />
      <div>
        <p className="text-center ">
          <span
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
