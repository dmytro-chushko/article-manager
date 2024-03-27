import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Body } from 'src/modules';
import { AppRoute } from 'src/utils/consts';
import { PrivateRoute } from './ProtectedRote';
import { PublicRoute } from './PublicRoute';

const Admin = lazy(() => import('src/pages/Admin'));
const Feed = lazy(() => import('src/pages/Feed'));
const SignIn = lazy(() => import('src/pages/SignIn'));
const PageNotFound = lazy(() => import('src/pages/PageNotFound'));

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.FEED} element={<Body />}>
          <Route index element={<Feed />} />
          <Route element={<PrivateRoute />}>
            <Route path={AppRoute.ADMIN} element={<Admin />} />
          </Route>
          <Route element={<PublicRoute path={AppRoute.ADMIN} />}>
            <Route path={AppRoute.SIGN_IN} element={<SignIn />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
