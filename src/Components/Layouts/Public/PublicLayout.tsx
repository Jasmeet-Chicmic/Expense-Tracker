import { AppLayoutProps } from '../AppLayout.d';


function PublicLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default PublicLayout;
