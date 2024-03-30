import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'src/hooks';
import { useSetSearch, useSetSort } from 'src/redux/reducers/searchParams';
import { ISearchParamsForm } from 'src/types/form';
import { SortParams } from 'src/utils/consts';

export const useSearchAndSort = () => {
  const setSearch = useSetSearch();
  const setSort = useSetSort();
  const { control, handleSubmit, watch } = useForm<ISearchParamsForm>({
    defaultValues: {
      search: '',
      sort: SortParams.DESC,
    },
  });
  const inputSearch = useDebounce(watch('search'), 500);
  const inputSort = useDebounce(watch('sort'), 500);

  const onSubmit = ({ search, sort }: ISearchParamsForm) => {
    setSearch(search);
    setSort(sort);
  };

  useEffect(() => {
    handleSubmit(onSubmit)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, inputSort]);

  return {
    control,
  };
};
