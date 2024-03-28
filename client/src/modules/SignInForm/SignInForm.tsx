import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEffect } from 'react';
import { CustomInput } from 'src/components';
import { useLoginAdminMutation } from 'src/redux/api';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { ISignInForm } from 'src/types/form';
import { signInFormSchema } from 'src/utils/validation';
import { useSetIsLogged } from 'src/redux/reducers/isLogged';

export const SignInForm = () => {
  const { t } = useTranslation();
  const setLoaderStatus = useSetLoaderStatus();
  const setIsLogged = useSetIsLogged();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const schema = signInFormSchema();
  const { control, handleSubmit } = useForm<ISignInForm>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ISignInForm) => {
    const userData = await loginAdmin(data);
    'data' in userData &&
      setIsLogged({ userEmail: userData.data.email, isLogged: true });
  };

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
