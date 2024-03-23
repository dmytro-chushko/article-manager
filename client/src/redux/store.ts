import { configureStore } from '@reduxjs/toolkit';

import { loader } from './reducers/loader';

export const store = configureStore({
  reducer: {
    loader: loader.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
