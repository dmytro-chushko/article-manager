import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { setIsLogged } from './isLogged.reducer';

export const getIsLogged = (state: RootState) => state.isLogged.isLogged;

export const useGetIsLogged = () => {
  return useAppSelector(getIsLogged);
};

export const useSetIsLogged = () => {
  const dispatch = useAppDispatch();

  return (isDark: boolean) => dispatch(setIsLogged(isDark));
};
