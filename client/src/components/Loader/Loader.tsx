import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

interface ILoaderProps {
  open: boolean;
}

const modalRootElement = document.querySelector('#loader');

export const Loader = ({ open }: ILoaderProps) => {
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRootElement?.appendChild(element);

    return () => {
      modalRootElement?.removeChild(element);
    };
  }, [element]);

  return createPortal(
    <Backdrop open={open}>
      <CircularProgress
        color="primary"
        size={300}
        thickness={8}
        sx={{ color: 'common.white' }}
      />
    </Backdrop>,
    element,
  );
};
