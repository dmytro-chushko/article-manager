import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AdminAuth = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleModalOpen}>
        {t('button.signIn')}
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box>Form</Box>
      </Modal>
    </>
  );
};
