import { Navigate, Outlet } from 'react-router-dom';
import { useGetIsLogged } from 'src/redux/reducers/isLogged';

export type IPublicRouteProps = {
  path: string;
};

export const PublicRoute = ({ path }: IPublicRouteProps) => {
  const isLogged = useGetIsLogged();
  return !isLogged ? <Outlet /> : <Navigate to={path} replace />;
};
