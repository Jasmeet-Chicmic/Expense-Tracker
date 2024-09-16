import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import RootRouter from './Routes/RootRouter';
import 'firebaseui/dist/firebaseui.css';
import './App.css';
import Loader from './Components/Shared/Form/Loader/Loader';
import NotificationWrapper from './Components/Layouts/Public/NotificationWrapper';
import ModalManager from './Shared/Modal/ModalManager';
import Modal from 'react-modal';
const baseName = import.meta.env.VITE_BASE_NAME;
Modal.setAppElement('#root');
function App() {
  // const [count, setCount] = useState<number>(0);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Loader></Loader>
        <HelmetProvider>
          <NotificationWrapper>
            <BrowserRouter basename={baseName}>
              <ModalManager></ModalManager>
              <RootRouter />
            </BrowserRouter>
          </NotificationWrapper>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
