import { configureStore } from '@reduxjs/toolkit';
import Auth from './reducers/auth';
import Products from './reducers/products';
import Reactotron from '../config/reactotron.config';

const rootReducer = {
  Auth,
  Products,
};

// ✅ Add enhancer only in dev mode
const enhancers = (getDefaultEnhancers: any) => {
  if (__DEV__ && Reactotron.createEnhancer) {
    return getDefaultEnhancers().concat(Reactotron.createEnhancer());
  }
  return getDefaultEnhancers();
};

// ✅ Configure store
export const store = configureStore({
  reducer: rootReducer,
  enhancers,
});

// ✅ Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

// ✅ Export store
export default store;
