import { createApiThunk, createCustomSlice } from '@utils/redux.utils';

const getUserList = createApiThunk('users/getList', {
  url: '/users',
  method: 'GET',
});

const initialState = {
  status: { type: null, state: 'idle' },
  error: null,
  users: [],
};

const userSlice = createCustomSlice(
  'users',
  initialState,
  {
    // reducers
    clearUsers(state) {
      state.users = [];
    },
  },
  [
    {
      thunk: getUserList,
      statusType: 'fetch',
      onFulfilled: (state, action) => {
        state.users = action.payload.data;
      },
    },
  ],
);

export const { clearUsers } = userSlice.actions;
export const userReducer = userSlice.reducer;
