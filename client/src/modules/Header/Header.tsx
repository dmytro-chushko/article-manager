import { Grid } from '@mui/material';

import { AdminAuth } from '../AdminAuth';
import { SearchAndSort } from '../SearchAndSort';

export const Header = () => {
  return (
    <Grid container alignItems="center" justifyContent="space-between" py={2}>
      <Grid item>
        <SearchAndSort />
      </Grid>
      <Grid item>
        <AdminAuth />
      </Grid>
    </Grid>
  );
};
