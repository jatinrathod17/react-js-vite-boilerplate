import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './middleware/errorMiddleware';
import { alertReducer } from './slices/alertSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(errorMiddleware),
});
