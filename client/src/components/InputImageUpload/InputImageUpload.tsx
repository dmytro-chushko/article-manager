import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, ButtonProps, InputProps } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { VisuallyHiddenInput } from './InputImageUpload.styled';
import { ChangeEvent } from 'react';

interface IInputImageUploadProps extends Partial<ButtonProps & InputProps> {
  onChangeFile: (filePath: string) => void;
}

export const InputImageUpload = ({
  onChangeFile,
  ...props
}: IInputImageUploadProps) => {
  const { t } = useTranslation();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files && onChangeFile(URL.createObjectURL(e.target.files[0]));

  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      {...props}
    >
      {t('button.upload')}
      <VisuallyHiddenInput type="file" onChange={handleChangeImage} />
    </Button>
  );
};
