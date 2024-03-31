import { Grid } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { AppRoute } from 'src/utils/consts';
import { AdminAuth } from '../AdminAuth';
import { SearchAndSort } from '../SearchAndSort';

export const Header = () => {
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];

  return (
    <Grid
      container
      direction={{ xs: 'column', lg: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'start', lg: 'center' }}
      justifyContent="space-between"
      py={2}
    >
      {currentLocation !== AppRoute.SIGN_IN && (
        <Grid item order={{ xs: 2, lg: 1 }}>
          <SearchAndSort />
        </Grid>
      )}
      <Grid item order={{ xs: 1, lg: 2 }}>
        <AdminAuth />
      </Grid>
    </Grid>
  );
};
