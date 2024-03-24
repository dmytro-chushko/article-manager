import { configureStore } from '@reduxjs/toolkit';

import { articleApi } from './api/article.api';
import { loader } from './reducers/loader';
import { errorHandler } from './middlewares/erorr-handler.middleware';

export const store = configureStore({
  reducer: {
    loader: loader.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(articleApi.middleware).concat(errorHandler),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
