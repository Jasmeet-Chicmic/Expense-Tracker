import { useDispatch, useSelector } from 'react-redux';
import CustomForm from '../../../../../Components/Shared/Form/CustomForm';
import { EDIT_PROFILE_SCHEMA } from './helper/EditProfileSchema';
import { RootState } from '../../../../../Store';
import ICONS from '../../../../../assets'; // Adjust the path as necessary
import useFirbase from '../../../../../Hooks/useFirbase';
import { auth } from '../../../../../firebase/firebase';
import { closeModal } from '../../../../../Store/Modal';

const EditProfileModal = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const photoURL =
    useSelector((state: RootState) => state.user.photoUrl) ||
    ICONS.expanseTrackerLogo; // Fallback to a default logo
  const dispatch = useDispatch();
  const { updateUserDetails } = useFirbase();
  const handleSaveProfile = async (data: any) => {
    console.log(data);
    await updateUserDetails(auth?.currentUser?.uid as string, data.Name);
    
    dispatch(closeModal());
  };

  return (
    <div className="p-4">
      {/* User Image */}
      <div className="flex justify-center mb-4">
        <img
          src={photoURL}
          alt="User Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-600"
        />
      </div>

      {/* Custom Form for Editing Profile */}
      <CustomForm
        id="expense-form"
        formData={EDIT_PROFILE_SCHEMA}
        defaultValues={{ Name: userName }}
        onSubmit={handleSaveProfile}
        submitBtnClassName="btn btn-primary btn-md"
        isDisabledSubmit={false}
        submitText="Save"
      />
    </div>
  );
};

export default EditProfileModal;
