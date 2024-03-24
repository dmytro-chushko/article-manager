import { Container, styled } from '@mui/material';

export const BpContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    height: '100svh',
    '& main': {
      flexGrow: 1,
    },
  },
}));
