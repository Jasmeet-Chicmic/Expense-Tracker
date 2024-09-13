import { useNavigate } from 'react-router-dom';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';
import { SIGN_UP_FORM_SCHEMA } from './signUpSchema';
import { ROUTES } from '../../../../../Shared/Constants';
import { auth } from '../../../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../../../Store/Loader';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async (values: any) => {
    let data: any = null;
    console.log('Loading dispatched');

    dispatch(setLoading(true));
    console.log('Loading dispatched 2');
    try {
      data = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(data);

      dispatch(setLoading(false));
      navigate(ROUTES.LOGIN);
    } catch (error) {
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
          Create an account{' '}
          <span
            onClick={() => {
              navigate(ROUTES.LOGIN);
            }}
          >
            here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
