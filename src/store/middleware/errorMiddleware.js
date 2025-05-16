import { isRejectedWithValue } from '@reduxjs/toolkit';

export const errorMiddleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // Handle global error notifications here
    console.error('API Error:', action.payload);
  }
  return next(action);
};