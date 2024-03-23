import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// import { Header } from '..';

import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { Loader } from 'src/components/Loader';

export const Body = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <header>{/* <Header /> */}</header>
      <main>
        <Suspense fallback={<Loader open />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>{t('footer')}</footer>
    </Container>
  );
};
