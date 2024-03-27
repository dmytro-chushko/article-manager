import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIsLoggedReducer } from 'src/types/reducer';

import { ReducerPath } from 'src/utils/consts';

const initialState: IIsLoggedReducer = {
  isLogged: false,
};

export const isLogged = createSlice({
  name: ReducerPath.IS_LOGGED,
  initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged } = isLogged.actions;
