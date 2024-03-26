import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { CustomInput } from 'src/components';
import { ISignInForm } from 'src/types/form';
import { signInFormSchema } from 'src/utils/consts/validation';

export const SignInForm = () => {
  const { t } = useTranslation();
  const schema = signInFormSchema();
  const { control, handleSubmit } = useForm<ISignInForm>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISignInForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" rowSpacing={2} mb={2}>
        <Grid item>
          <CustomInput
            type="text"
            name="email"
            label={t('label.email')}
            control={control}
          />
        </Grid>
        <Grid item>
          <CustomInput
            type="password"
            name="password"
            label={t('label.password')}
            control={control}
          />
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Button variant="outlined" type="button">
            {t('button.goBack')}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            {t('button.signIn')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
