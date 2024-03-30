import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ISearchParamsReducer } from 'src/types/reducer';

import { ReducerPath, SortParams } from 'src/utils/consts';

const initialState: ISearchParamsReducer = {
  search: '',
  sort: SortParams.DESC,
  page: 1,
  limit: 10,
};

export const searchParams = createSlice({
  name: ReducerPath.SEARCH_PARAMS,
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<SortParams>) {
      state.sort = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setSearch, setSort, setPage, setLimit } = searchParams.actions;
