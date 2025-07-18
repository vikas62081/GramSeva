import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {familyApi} from './slices/familyApiSlice';
import {eventApi} from './slices/eventApiSlice';
import {dashboardApi} from './slices/dashboardApiSlice';
import {authApi} from './slices/authApiSlice';
import {userApi} from './slices/userApiSlice';

export const store = configureStore({
  reducer: {
    [familyApi.reducerPath]: familyApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      familyApi.middleware,
      eventApi.middleware,
      dashboardApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
