import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';
import { setLimit, setPage, setSearch, setSort } from '.';
import { SortParams } from 'src/utils/consts';

export const getSearch = (state: RootState) => state.searchParams.search;

export const getSort = (state: RootState) => state.searchParams.sort;

export const getPage = (state: RootState) => state.searchParams.page;

export const getLimit = (state: RootState) => state.searchParams.limit;

export const useGetSearch = () => {
  return useAppSelector(getSearch);
};

export const useGetSort = () => {
  return useAppSelector(getSort);
};

export const useGetPage = () => {
  return useAppSelector(getPage);
};

export const useGetLimit = () => {
  return useAppSelector(getLimit);
};

export const useSetSearch = () => {
  const dispatch = useAppDispatch();

  return (search: string) => dispatch(setSearch(search));
};

export const useSetSort = () => {
  const dispatch = useAppDispatch();

  return (sort: SortParams) => dispatch(setSort(sort));
};

export const useSetPage = () => {
  const dispatch = useAppDispatch();

  return (page: number) => dispatch(setPage(page));
};

export const useSetLimit = () => {
  const dispatch = useAppDispatch();

  return (limit: number) => dispatch(setLimit(limit));
};
