import ProfileSection from '../../../Views/Dashboard/Components/ProfileSection';
import { AppLayoutProps } from '../AppLayout.d';
// import Navbar from '../Public/Navbar';

function PrivateLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      <div className="h-full w-full flex">
        <ProfileSection></ProfileSection>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default PrivateLayout;
