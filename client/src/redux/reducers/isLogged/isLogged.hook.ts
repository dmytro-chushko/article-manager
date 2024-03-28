import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { setIsLogged } from './isLogged.reducer';
import { IIsLoggedReducer } from 'src/types/reducer';

export const getIsLogged = (state: RootState) => state.isLogged.isLogged;

export const getUserEmail = (state: RootState) => state.isLogged.userEmail;

export const useGetIsLogged = () => {
  return useAppSelector(getIsLogged);
};

export const useGetUserEmail = () => {
  return useAppSelector(getUserEmail);
};

export const useSetIsLogged = () => {
  const dispatch = useAppDispatch();

  return (userData: IIsLoggedReducer) => dispatch(setIsLogged(userData));
};
