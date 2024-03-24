import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'src/i18n/config';
import App from './App.tsx';
import { store } from './redux/store.ts';
import { globalStyles } from './styles/globalStyles.tsx';
import { theme } from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
