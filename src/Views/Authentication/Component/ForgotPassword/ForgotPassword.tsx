import { useState } from 'react';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { FORGOT_PASSWORD_SCHEMA } from './helper/forgotPasswordSchema';

import useNotifications from '../../../../Hooks/useNotifications';


import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';
import useFirbase from '../../../../Hooks/useFirbase';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { notifyError } = useNotifications();
  const [email, setEmail] = useState('');
 const {sendPassResetEmail} = useFirbase()

  const handleForgotPassword = async (data: any) => {
    const email = data.email;
    setEmail(email);
    if (!email) {
      notifyError('Please enter your email.');
      return;
    }
    await sendPassResetEmail(email)
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
