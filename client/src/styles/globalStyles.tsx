import { GlobalStyles } from '@mui/material';

export const globalStyles = (
  <GlobalStyles
    styles={() => ({
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },

      'ul, ol': {
        listStyle: 'none',
      },

      img: {
        display: 'block',
        height: 'auto',
        maxWidth: '100%',
      },
    })}
  />
);
