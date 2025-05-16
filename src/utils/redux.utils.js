import apiClient from '@api/axios.config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

/**
 * Creates a reusable API thunk.
 * @param {string} typePrefix
 * @param {{ url: string | function(*): string, method: string, transformResponse?: function(*) }} config
 */
export const createApiThunk = (typePrefix, config) => {
  return createAsyncThunk(typePrefix, async (params, { rejectWithValue }) => {
    try {
      const url = typeof config.url === 'function' ? config.url(params) : config.url;
      const response = await apiClient.request({
        url,
        method: config.method,
        data: config.method !== 'GET' ? params : undefined,
        params: config.method === 'GET' ? params : undefined,
      });

      return config.transformResponse ? config.transformResponse(response.data) : response.data;
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  });
};

export function createCustomSlice(name, initialState, reducers, asyncThunkActions = []) {
  return createSlice({
    name,
    initialState,
    reducers,
    extraReducers: (builder) => {
      asyncThunkActions.forEach(
        ({ thunk, statusType = 'fetch', onPending, onFulfilled, onRejected }) => {
          builder
            .addCase(thunk.pending, (state) => {
              state.status = { type: statusType, state: 'loading' };
              state.error = null;
              if (onPending) onPending(state);
            })
            .addCase(thunk.fulfilled, (state, action) => {
              state.status = { type: statusType, state: 'succeeded' };
              if (onFulfilled) onFulfilled(state, action);
            })
            .addCase(thunk.rejected, (state, action) => {
              state.status = { type: statusType, state: 'failed' };
              state.error = action.payload?.message || 'An unknown error occurred';
              if (onRejected) onRejected(state, action);
            });
        },
      );
    },
  });
}
