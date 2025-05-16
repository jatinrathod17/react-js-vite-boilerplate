import { createSlice } from '@reduxjs/toolkit';

// Possible icon types
// ['warning', 'error', 'success', 'info', 'question', 'delete', 'none'];

const initialState = {
  show: false,
  title: '',
  message: '',
  confirmText: '',
  cancelText: '',
  onConfirm: () => {},
  onCancel: () => {},
  icon: 'none',
  iconSize: 24,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      return { ...state, ...action.payload, show: true };
    },
    hideAlert: (state) => {
      return { ...state, show: false };
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
