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
    image: yup
      .mixed<File>()
      .test(
        'fileSize',
        JSON.stringify(['validation.fileSize']),
        (value?: File) => {
          console.log(value && value.size);
          return (value && value.size <= 2000000) || value === undefined;
        },
      )
      .test('type', JSON.stringify(['validation.fileType']), (value?: File) => {
        return (
          (value &&
            (value.type === 'image/jpeg' ||
              value.type === 'image/jpg' ||
              value.type === 'image/png' ||
              value.type === 'image/webp')) ||
          value === undefined
        );
      }),
  });
};
