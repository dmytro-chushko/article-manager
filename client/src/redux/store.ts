import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { loader } from './reducers/loader';
import { errorHandler } from './middlewares/erorr-handler.middleware';
import { articleApi, authApi } from './api';
import { persistedThemeReducer } from './persist-configs';

export const store = configureStore({
  reducer: {
    isLogged: persistedThemeReducer,
    loader: loader.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(articleApi.middleware)
      .concat(authApi.middleware)
      .concat(errorHandler),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
