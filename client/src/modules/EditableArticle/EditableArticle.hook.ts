import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'src/hooks';
import { useUpdateArticleMutation } from 'src/redux/api';

import { IEditArticleForm } from 'src/types/form';
import { updateArticleSchema } from 'src/utils/validation';

interface IEditabeArticleHook {
  id?: string;
  title?: string;
  description?: string;
}

export const useEditableArticleHook = ({
  id,
  title,
  description,
}: IEditabeArticleHook) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updateArticle] = useUpdateArticleMutation();
  const schema = updateArticleSchema();
  const { control, handleSubmit, watch, reset } = useForm<IEditArticleForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title || '',
      description: description || '',
    },
  });
  const inputTitle = useDebounce(watch('title'), 500);
  const inputDescription = useDebounce(watch('description'), 500);

  const handleClickEdit = () => {
    setIsEdit(!isEdit);
    reset({ title, description });
  };

  const handleClickAway = () => {
    setIsEdit(false);
    reset({ title, description });
  };

  const onSubmit = async (data: IEditArticleForm) => {
    id && (await updateArticle({ ...data, id }));
  };

  useEffect(() => {
    isEdit && handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTitle, inputDescription]);

  return {
    isEdit,
    control,
    handleClickEdit,
    handleClickAway,
  };
};
