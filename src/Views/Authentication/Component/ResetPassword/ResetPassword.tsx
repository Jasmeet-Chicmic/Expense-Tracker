import { useLocation, useNavigate } from 'react-router-dom';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { RESET_PASSWORD_SCHEMA } from './helper/resetPasswordSchema';
import { auth } from '../../../../firebase/firebase'; // Ensure Firebase is correctly initialized
import { confirmPasswordReset } from 'firebase/auth/cordova';
import useNotifications from '../../../../Hooks/useNotifications';
import { setLoading } from '../../../../Store/Loader';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../../../Shared/Constants';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the reset code from the URL
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get('oobCode');

  const handleResetPassword = (data: any) => {
    if (!oobCode) {
      notifyError('Invalid or expired password reset code.');
      return;
    }

    const { password } = data;

    if (!password) {
      notifyError('Please enter a new password.');
      return;
    }

    dispatch(setLoading(true));

    confirmPasswordReset(auth, oobCode, password)
      .then(() => {
        dispatch(setLoading(false));
        notifySuccess('Password has been reset successfully.');
        navigate(ROUTES.LOGIN); // Redirect to login page or another page as needed
      })
      .catch((error) => {
        dispatch(setLoading(false));
        notifyError(`Error: ${error.message}`);
        console.error('Password reset error:', error.code, error.message);
      });
  };

  return (
    <div>
      <h1 className="text-center mb-4">Reset Password</h1>
      <CustomForm
        id="reset-password-form"
        formData={RESET_PASSWORD_SCHEMA}
        defaultValues={{}}
        onSubmit={handleResetPassword}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        submitText="Reset Password"
      />
    </div>
  );
};

export default ResetPassword;
