import { ToastContainer } from 'react-toastify';
import { Loader } from './components';
import { useGetLoaderStatus } from './redux/reducers/loader';
import { MainRouter } from './router/MainRouter';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const isShown = useGetLoaderStatus();

  return (
    <>
      <MainRouter />
      <ToastContainer />
      <Loader open={isShown} />
    </>
  );
}

export default App;
