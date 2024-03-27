import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { isLogged } from '../reducers/isLogged/isLogged.reducer';

export const isLoggedPersistConfig = {
  key: 'isLogged',
  storage,
};

export const persistedThemeReducer = persistReducer(
  isLoggedPersistConfig,
  isLogged.reducer,
);
