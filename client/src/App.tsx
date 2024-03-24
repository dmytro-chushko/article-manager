import { Loader } from './components';
import { useGetLoaderStatus } from './redux/reducers/loader';
import { MainRouter } from './router/MainRouter';

function App() {
  const isShown = useGetLoaderStatus();

  return (
    <>
      <MainRouter />
      <Loader open={isShown} />
    </>
  );
}

export default App;
