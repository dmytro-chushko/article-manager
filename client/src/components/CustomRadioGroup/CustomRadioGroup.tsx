import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ICustomRadioGroupProps<T extends FieldValues>
  extends RadioGroupProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const CustomRadioGroup = <T extends FieldValues>({
  control,
  name,
  label,
  children,
  ...radioGroupProps
}: ICustomRadioGroupProps<T>) => {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { error, invalid },
  } = useController({ control, name });
  return (
    <FormControl error={invalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <RadioGroup {...field} {...radioGroupProps}>
        {children}
      </RadioGroup>
      {invalid && (
        <FormHelperText error>
          {t(JSON.parse(error?.message || ''))}
        </FormHelperText>
      )}
    </FormControl>
  );
};
