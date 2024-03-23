import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Body } from 'src/modules';
import { AppRoute } from 'src/utils/consts';

const Admin = lazy(() => import('src/pages/Admin'));
const Feed = lazy(() => import('src/pages/Feed'));
const PageNotFound = lazy(() => import('src/pages/PageNotFound'));

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.FEED} element={<Body />}>
          <Route index element={<Feed />} />
          <Route path={AppRoute.ADMIN} element={<Admin />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
