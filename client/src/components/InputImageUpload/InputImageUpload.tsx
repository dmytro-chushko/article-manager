import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, ButtonProps } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { VisuallyHiddenInput } from './InputImageUpload.styled';

export const InputImageUpload = (props: ButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      {...props}
    >
      {t('button.upload')}
      <VisuallyHiddenInput type="file" />
    </Button>
  );
};
