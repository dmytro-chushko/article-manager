import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import noImage from 'src/assets/no_image.webp';
import { useCreateArticleMutation } from 'src/redux/api';
import { useGetUserEmail } from 'src/redux/reducers/isLogged';
import { useSetLoaderStatus } from 'src/redux/reducers/loader';
import { ICreateArticle } from 'src/types/api';
import { ICreateArticleForm } from 'src/types/form';
import { createArticleSchema } from 'src/utils/validation/createArticleSchema';

export const useAddArticle = () => {
  const [isAddFormShown, setIsAddFormShown] = useState<boolean>(false);
  const [image, setImage] = useState<string>(noImage);
  const schema = createArticleSchema();
  const setLoaderStatus = useSetLoaderStatus();
  const userEmail = useGetUserEmail();
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const { control, handleSubmit, reset } = useForm<ICreateArticleForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
    },
  });

  const handleClickAddButton = () => {
    setIsAddFormShown(!isAddFormShown);
    setImage(noImage);
    reset();
  };

  const handleClickAway = () => {
    setIsAddFormShown(false);
    setImage(noImage);
    reset();
  };

  const handleChangeImage = (filePath: string) => setImage(filePath);

  const handleSubmitForm = handleSubmit(async (values: ICreateArticleForm) => {
    const data: ICreateArticle = new FormData();

    data.append('title', values.title);
    data.append('description', values.description);
    values.image && data.append('image', values.image);
    data.append('link', '');
    data.append('creator[0]', userEmail);

    await createArticle(data);
    handleClickAway();
  });

  useEffect(() => {
    setLoaderStatus(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    isAddFormShown,
    image,
    control,
    handleSubmitForm,
    handleClickAddButton,
    handleClickAway,
    handleChangeImage,
  };
};
