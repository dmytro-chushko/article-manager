import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ILoaderReducer } from 'src/types/reducer';
import { ReducerPath } from 'src/utils/consts';

const initialState: ILoaderReducer = {
  isShown: false,
};

export const loader = createSlice({
  name: ReducerPath.LOADER,
  initialState,
  reducers: {
    setLoaderStatus(state, action: PayloadAction<boolean>) {
      state.isShown = action.payload;
    },
  },
});

export const { setLoaderStatus } = loader.actions;
