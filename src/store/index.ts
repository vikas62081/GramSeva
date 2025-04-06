import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {familyApi} from './slices/familyApiSlice';

export const store = configureStore({
  reducer: {
    [familyApi.reducerPath]: familyApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(familyApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
