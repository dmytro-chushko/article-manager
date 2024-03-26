import { Grid } from '@mui/material';
import { SignInForm } from 'src/modules';

const SignIn = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid item>
        <SignInForm />
      </Grid>
    </Grid>
  );
};

export default SignIn;
