import {
  combineReducers,
  configureStore,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import StorageProvider from '../helper/Storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import Auth from './reducers/auth';
import Profile from './reducers/profileSlice';
import Reactotron from '../config/reactotron.config';

type ReactotronConsole = {
  display?: (config: {
    name?: string;
    preview?: string;
    value?: unknown;
  }) => void;
  log?: (...args: unknown[]) => void;
};

declare global {
  interface Console {
    tron?: ReactotronConsole;
  }
}

const persistConfig = {
  key: 'root',
  storage: StorageProvider,
  whitelist: ['Auth'],
  blacklist: ['Auth.loading', 'Auth.error', 'Auth.message'],
};

const rootReducer = combineReducers({
  Auth,
  Profile,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Add enhancer only in dev mode

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  enhancers: getDefaultEnhancers => {
    const reactotronEnhancer: StoreEnhancer[] =
      __DEV__ && typeof Reactotron.createEnhancer === 'function'
        ? [Reactotron.createEnhancer()]
        : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  },
});

// ✅ Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

// ✅ Export store
export default store;
export const persistor = persistStore(store);
if (__DEV__ && process.env.NODE_ENV !== 'test') {
  persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState();
    const snapshot = store.getState();
    console.tron?.display?.({
      name: 'PERSISTOR_STATE',
      preview: `bootstrapped: ${bootstrapped}`,
      value: { bootstrapped, snapshot },
    });
  });
}
