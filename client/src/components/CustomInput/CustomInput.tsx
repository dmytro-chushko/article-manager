import { InputProps, TextField } from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ICustomInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const CustomInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: ICustomInputProps<T>) => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ name, control });

  return (
    <TextField
      {...(label ? { label } : {})}
      {...field}
      error={invalid}
      helperText={invalid && t(JSON.parse(error?.message || ''))}
      InputProps={inputProps}
    />
  );
};
