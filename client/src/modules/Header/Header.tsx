import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLInk } from 'react-router-dom';
import { AppRoute } from 'src/utils/consts';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <Box py={2}>
      <Link component={RouterLInk} to={AppRoute.SIGN_IN}>
        {t('link.signIn')}
      </Link>
    </Box>
  );
};
