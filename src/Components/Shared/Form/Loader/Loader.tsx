import { Audio } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Store';

const Loader = () => {
  const loaderState = useSelector((state: RootState) => state.loader.isLoading);

  return (
    loaderState && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Audio height="80" width="80" color="green" ariaLabel="loading" />
      </div>
    )
  );
};

export default Loader;
