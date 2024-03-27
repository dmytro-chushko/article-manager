import { Button, Link } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLInk } from 'react-router-dom';

import { useLogOutAdminMutation } from 'src/redux/api';
import { useGetIsLogged, useSetIsLogged } from 'src/redux/reducers/isLogged';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { AppRoute } from 'src/utils/consts';

export const AdminAuth = () => {
  const { t } = useTranslation();
  const setLoaderStatus = useSetLoaderStatus();
  const setIsLogged = useSetIsLogged();
  const isLogged = useGetIsLogged();
  const [logOutAdmin, { isLoading, isSuccess }] = useLogOutAdminMutation();

  const handleLogOut = async () => {
    await logOutAdmin();
  };

  useEffect(() => {
    isSuccess && setIsLogged(false);
  }, [isSuccess, setIsLogged]);

  useEffect(() => {
    setLoaderStatus(isLoading);
  }, [isLoading, setLoaderStatus]);

  return (
    <>
      {isLogged ? (
        <Button variant="text" onClick={handleLogOut}>
          {t('button.logOut')}
        </Button>
      ) : (
        <Link component={RouterLInk} to={AppRoute.SIGN_IN}>
          {t('link.signIn')}
        </Link>
      )}
    </>
  );
};
