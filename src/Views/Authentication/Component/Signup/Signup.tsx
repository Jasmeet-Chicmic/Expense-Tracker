import { useNavigate } from 'react-router-dom';
import CustomForm from '../../../../Components/Shared/Form/CustomForm';
import { SIGN_UP_FORM_SCHEMA } from './helper/signUpSchema';
import { ROUTES } from '../../../../Shared/Constants';
import useFirbase from '../../../../Hooks/useFirbase';

const Signup = () => {
  const navigate = useNavigate();
  const {  createUserWithEmail } = useFirbase();


  const handleSignup = async (values: any) => {
      await createUserWithEmail(values?.email, values?.password,values.username);
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
