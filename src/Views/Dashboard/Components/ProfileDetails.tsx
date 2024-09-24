import ICONS from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Import the edit icon
import { MODAL_TYPES, openModal } from '../../../Store/Modal';

const ProfileDetails = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const photoURL = useSelector((state: RootState) => state.user.photoUrl);
  const dispatch = useDispatch();
  // Function to handle profile edit
  const handleEditProfile = () => {
    console.log('Edit Profile');
    dispatch(openModal({ modalType: MODAL_TYPES.EDIT_PROFILE }));
    // Navigate to the edit profile page
  };

  return (
    <div className="relative flex flex-col items-center p-4 border-b border-gray-700">
      {/* Edit icon in the top right corner */}
      <button
        onClick={handleEditProfile}
        className="absolute top-2 right-2 p-1 rounded-full focus:outline-none transition duration-200 ease-in-out"
        aria-label="Edit Profile" // Accessibility label
      >
        <FontAwesomeIcon icon={faEdit} className="w-5 h-5 text-white-600" />
      </button>

      <img
        src={photoURL || ICONS.expanseTrackerLogo}
        alt="User Profile"
        className="w-24 h-24 rounded-full border-4 border-gray-600"
      />
      <h2 className="mt-2 text-xl font-semibold">{userName}</h2>
    </div>
  );
};

export default ProfileDetails;
