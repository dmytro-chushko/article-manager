import { Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLInk, useLocation } from 'react-router-dom';

import { useLogOutAdminMutation } from 'src/redux/api';
import { useSetIsLogged } from 'src/redux/reducers/isLogged';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { AppRoute } from 'src/utils/consts';

export const AdminAuth = () => {
  const { t } = useTranslation();
  const setLoaderStatus = useSetLoaderStatus();
  const setIsLogged = useSetIsLogged();
  const [logOutAdmin, { isLoading, isSuccess }] = useLogOutAdminMutation();
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];

  const handleLogOut = async () => {
    await logOutAdmin();
  };

  useEffect(() => {
    isSuccess && setIsLogged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {!currentLocation && (
        <Button variant="text" component={RouterLInk} to={AppRoute.ADMIN}>
          {t('button.admin')}
        </Button>
      )}
      {currentLocation === AppRoute.SIGN_IN && (
        <Button variant="text" component={RouterLInk} to={AppRoute.FEED}>
          {t('button.feed')}
        </Button>
      )}
      {currentLocation === AppRoute.ADMIN && (
        <Grid container spacing={2}>
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
        </Grid>
      )}
    </>
  );
};
