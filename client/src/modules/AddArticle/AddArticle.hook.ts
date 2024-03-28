import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateArticleMutation } from 'src/redux/api';
import { useGetUserEmail } from 'src/redux/reducers/isLogged';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { ICreateArticleForm } from 'src/types/form';
import { createArticleSchema } from 'src/utils/validation/createArticleSchema';

export const useAddArticle = () => {
  const [isAddFormShown, setIsAddFormShown] = useState<boolean>(false);
  const schema = createArticleSchema();
  const setLoaderStatus = useSetLoaderStatus();
  const userEmail = useGetUserEmail();
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const { control, handleSubmit, reset } = useForm<ICreateArticleForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleClickAddButton = () => {
    setIsAddFormShown(!isAddFormShown);
    reset();
  };

  const handleClickAway = () => {
    setIsAddFormShown(false);
    reset();
  };

  const handleSubmitForm = handleSubmit(
    async (data: ICreateArticleForm) =>
      await createArticle({ ...data, link: '', creator: [userEmail] }),
  );

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    isAddFormShown,
    control,
    handleSubmitForm,
    handleClickAddButton,
    handleClickAway,
  };
};
