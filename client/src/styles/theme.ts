import { createTheme } from '@mui/material';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 780,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily:
            'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        },
      },
    },
  },
});
