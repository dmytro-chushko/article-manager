import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { setLoaderStatus } from './loader.reducer';

export const getLoaderStatus = (state: RootState) => state.loader.isShown;

export const useGetLoaderStatus = () => {
  return useAppSelector(getLoaderStatus);
};

export const useSetLoaderStatus = () => {
  const dispatch = useAppDispatch();

  return (isShown: boolean) => dispatch(setLoaderStatus(isShown));
};
