import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// import { Header } from '..';
import { useTranslation } from 'react-i18next';
import { Loader } from 'src/components/Loader';
import { BpContainer } from './Body.styled';

export const Body = () => {
  const { t } = useTranslation();

  return (
    <BpContainer>
      <header>{/* <Header /> */}</header>
      <main>
        <Suspense fallback={<Loader open />}>
          <Outlet />
        </Suspense>
      </main>
      <footer>{t('footer')}</footer>
    </BpContainer>
  );
};
