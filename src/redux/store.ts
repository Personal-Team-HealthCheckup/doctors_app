import {configureStore} from '@reduxjs/toolkit';
import Auth from './reducers/auth';
import Products from './reducers/products';

export const store = configureStore({
  reducer: {
    Auth,
    Products
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
