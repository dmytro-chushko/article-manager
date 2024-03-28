import * as yup from 'yup';

import { IEditArticleForm } from 'src/types/form';

export const updateArticleSchema = (): yup.ObjectSchema<IEditArticleForm> => {
  return yup.object({
    title: yup
      .string()
      .max(300, JSON.stringify(['validation.maxChar', { num: '300' }]))
      .required(JSON.stringify(['validation.required'])),
    description: yup
      .string()
      .max(5000, JSON.stringify(['validation.maxChar', { num: '5000' }]))
      .required(JSON.stringify(['validation.required'])),
  });
};
