import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLInk, useLocation } from 'react-router-dom';

import { useLogOutAdminMutation } from 'src/redux/api';
import {
  useGetIsLogged,
  useGetUserEmail,
  useSetIsLogged,
} from 'src/redux/reducers/isLogged';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { AppRoute } from 'src/utils/consts';

export const AdminAuth = () => {
  const { t } = useTranslation();
  const isLogged = useGetIsLogged();
  const userEmail = useGetUserEmail();
  const setLoaderStatus = useSetLoaderStatus();
  const setIsLogged = useSetIsLogged();
  const [logOutAdmin, { isLoading, isSuccess }] = useLogOutAdminMutation();
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];

  const handleLogOut = async () => {
    await logOutAdmin();
  };

  useEffect(() => {
    isSuccess && setIsLogged({ userEmail: '', isLogged: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
      {isLogged && (
        <Grid item>
          <Typography variant="subtitle2" color="primary">
            {userEmail}
          </Typography>
        </Grid>
      )}
      {!currentLocation && (
        <Grid item>
          <Button variant="text" component={RouterLInk} to={AppRoute.ADMIN}>
            {t('button.admin')}
          </Button>
        </Grid>
      )}
      {currentLocation === AppRoute.SIGN_IN && (
        <Grid item>
          <Button variant="text" component={RouterLInk} to={AppRoute.FEED}>
            {t('button.feed')}
          </Button>
        </Grid>
      )}
      {currentLocation === AppRoute.ADMIN && (
        <>
          <Grid item>
            <Button variant="text" component={RouterLInk} to={AppRoute.FEED}>
              {t('button.feed')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="text" onClick={handleLogOut}>
              {t('button.logOut')}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};
