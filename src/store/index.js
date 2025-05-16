import { configureStore } from '@reduxjs/toolkit';
import { errorMiddleware } from './middleware/errorMiddleware';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
});

