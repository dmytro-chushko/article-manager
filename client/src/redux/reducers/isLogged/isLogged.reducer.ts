import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIsLoggedReducer } from 'src/types/reducer';

import { ReducerPath } from 'src/utils/consts';

const initialState: IIsLoggedReducer = {
  isLogged: false,
  userEmail: '',
};

export const isLogged = createSlice({
  name: ReducerPath.IS_LOGGED,
  initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<IIsLoggedReducer>) {
      state.isLogged = action.payload.isLogged;
      state.userEmail = action.payload.userEmail;
    },
  },
});

export const { setIsLogged } = isLogged.actions;
