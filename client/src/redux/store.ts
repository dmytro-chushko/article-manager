import { configureStore } from '@reduxjs/toolkit';

import { loader } from './reducers/loader';
import { errorHandler } from './middlewares/erorr-handler.middleware';
import { articleApi, authApi } from './api';

export const store = configureStore({
  reducer: {
    loader: loader.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(articleApi.middleware)
      .concat(authApi.middleware)
      .concat(errorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
