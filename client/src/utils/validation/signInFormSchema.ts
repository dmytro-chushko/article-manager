import * as yup from 'yup';

import { ISignInForm } from 'src/types/form';

export const signInFormSchema = (): yup.ObjectSchema<ISignInForm> => {
  return yup.object({
    email: yup
      .string()
      .email(JSON.stringify(['validation.incorrectEmail']))
      .required(JSON.stringify(['validation.required'])),
    password: yup.string().required(JSON.stringify(['validation.required'])),
  });
};
