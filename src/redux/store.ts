import { configureStore } from '@reduxjs/toolkit';
import Auth from './reducers/auth';
import Reactotron from '../config/reactotron.config';

const rootReducer = {
  Auth,
};

// ✅ Add enhancer only in dev mode

// ✅ Configure store
export const store = configureStore({
  reducer: rootReducer,
  enhancers: getDefaultEnhancers => {
    const reactotronEnhancer = __DEV__ ? [Reactotron.createEnhancer!()] : [];
    return getDefaultEnhancers().concat(reactotronEnhancer);
  },
});

// ✅ Export types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

// ✅ Export store
export default store;
