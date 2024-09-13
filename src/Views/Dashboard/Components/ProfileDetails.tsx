import ICONS from '../../../assets';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Store';

const ProfileDetails = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const photoURL = useSelector((state: RootState) => state.user.photoUrl);
  return (
    <div className="flex flex-col items-center p-4 border-b border-gray-700">
      <img
        src={photoURL||ICONS.expanseTrackerLogo}
        alt="User Profile"
        className="w-24 h-24 rounded-full border-4 border-gray-600"
      />
      <h2 className="mt-2 text-xl font-semibold">{userName}</h2>
    </div>
  );
};

export default ProfileDetails;
