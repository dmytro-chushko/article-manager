import { Theme } from '@mui/material';

export const searchFieldStyles = (theme: Theme) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '400px',
  },
});
