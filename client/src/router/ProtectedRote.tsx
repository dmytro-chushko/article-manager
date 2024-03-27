import { Outlet, Navigate } from 'react-router-dom';
import { useGetIsLogged } from 'src/redux/reducers/isLogged';
import { AppRoute } from 'src/utils/consts';

export const PrivateRoute = () => {
  const isLogged = useGetIsLogged();
  return isLogged ? <Outlet /> : <Navigate to={AppRoute.SIGN_IN} />;
};
