import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, ButtonProps, FormHelperText, InputProps } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { VisuallyHiddenInput } from './InputImageUpload.styled';

interface IInputImageUploadProps<T extends FieldValues>
  extends Partial<ButtonProps & InputProps> {
  onChangeFile: (filePath: string) => void;
  control: Control<T>;
  name: Path<T>;
}

export const InputImageUpload = <T extends FieldValues>({
  onChangeFile,
  control,
  name,
  ...props
}: IInputImageUploadProps<T>) => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files && e.target.files[0]);
    e.target.files && field.onChange(e.target.files[0]);
    e.target.files && onChangeFile(URL.createObjectURL(e.target.files[0]));
  };
  console.log(invalid, error, field.value);
  return (
    <>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        {...props}
      >
        {t('button.upload')}
        <VisuallyHiddenInput
          type="file"
          {...field}
          value=""
          onChange={handleChangeImage}
          error={invalid}
        />
      </Button>
      {invalid && (
        <FormHelperText error>
          {t(JSON.parse(error?.message || ''))}
        </FormHelperText>
      )}
    </>
  );
};
